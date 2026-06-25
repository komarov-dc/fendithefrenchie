'use strict';

/**
 * Fendi's Food Hut — order backend.
 *
 * - Receives orders from the static website (POST /api/order)
 * - Stores them in SQLite (server/orders.db)
 * - Notifies the team's Telegram group
 * - Serves an iPad admin panel (GET /admin) + admin API (GET/PATCH /api/orders)
 *
 * Pay-at-booth model: NO online payment is handled here.
 */

require('dotenv').config();

const path = require('path');
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const PORT = Number(process.env.PORT) || 8787;
const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ORDERS_CHAT_ID = process.env.ORDERS_CHAT_ID || '';
const ROBERT_MENTION = process.env.ROBERT_MENTION || '';
const ADMIN_USER = process.env.ADMIN_USER || 'robert';
const ADMIN_PASS = process.env.ADMIN_PASS || 'change-me';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'https://fendithefrenchie.com';

const VALID_STATUSES = ['new', 'preparing', 'ready', 'done', 'cancelled'];

// ---------------------------------------------------------------------------
// Database
// ---------------------------------------------------------------------------

const db = new Database(path.join(__dirname, 'orders.db'));
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id         INTEGER PRIMARY KEY,
    ref        TEXT,
    items_json TEXT,
    total      INTEGER,
    name       TEXT,
    phone      TEXT,
    note       TEXT,
    pickup     TEXT,
    lang       TEXT,
    status     TEXT DEFAULT 'new',
    created_at INTEGER
  );
`);

const insertOrder = db.prepare(`
  INSERT INTO orders (ref, items_json, total, name, phone, note, pickup, lang, status, created_at)
  VALUES (@ref, @items_json, @total, @name, @phone, @note, @pickup, @lang, 'new', @created_at)
`);

const selectOrders = db.prepare(`
  SELECT id, ref, items_json, total, name, phone, note, pickup, lang, status, created_at
  FROM orders
  ORDER BY id DESC
`);

const selectOrderById = db.prepare('SELECT id FROM orders WHERE id = ?');
const updateStatus = db.prepare('UPDATE orders SET status = ? WHERE id = ?');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** HTML-escape user-supplied text before putting it in a Telegram HTML message. */
function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Generate a short order ref like FFH-1234. */
function makeRef() {
  const n = crypto.randomInt(0, 10000); // 0..9999
  return 'FFH-' + String(n).padStart(4, '0');
}

/** Coerce a value to a finite integer, or null if not possible. */
function toInt(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.round(n) : null;
}

/** Constant-time-ish credential comparison for Basic auth. */
function safeEqual(a, b) {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/** Express middleware: require HTTP Basic auth against ADMIN_USER/ADMIN_PASS. */
function basicAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, encoded] = header.split(' ');
  if (scheme === 'Basic' && encoded) {
    let decoded = '';
    try {
      decoded = Buffer.from(encoded, 'base64').toString('utf8');
    } catch (_) {
      decoded = '';
    }
    const idx = decoded.indexOf(':');
    const user = idx >= 0 ? decoded.slice(0, idx) : '';
    const pass = idx >= 0 ? decoded.slice(idx + 1) : '';
    if (safeEqual(user, ADMIN_USER) && safeEqual(pass, ADMIN_PASS)) {
      return next();
    }
  }
  res.set('WWW-Authenticate', 'Basic realm="Fendi Admin", charset="UTF-8"');
  return res.status(401).json({ ok: false, error: 'Unauthorized' });
}

/** Map a DB row to the JSON shape the admin panel expects (items parsed). */
function rowToOrder(row) {
  let items = [];
  try {
    items = JSON.parse(row.items_json || '[]');
  } catch (_) {
    items = [];
  }
  return {
    id: row.id,
    ref: row.ref,
    items,
    total: row.total,
    name: row.name,
    phone: row.phone,
    note: row.note,
    pickup: row.pickup,
    status: row.status,
    created_at: row.created_at,
  };
}

/**
 * Send the Telegram notification for a new order.
 * Never throws — on failure it logs and resolves (order is already stored).
 */
async function notifyTelegram(order) {
  if (!BOT_TOKEN || !ORDERS_CHAT_ID) {
    console.warn(
      '[telegram] BOT_TOKEN or ORDERS_CHAT_ID not set — skipping notification for ' +
        order.ref
    );
    return;
  }

  const lines = [];
  lines.push(`\u{1F6CE} <b>NEW ORDER</b> #${escapeHtml(order.ref)}`);

  for (const item of order.items) {
    const qty = toInt(item.qty) || 1;
    const name = escapeHtml(item.name);
    const price = toInt(item.price);
    const priceStr = price != null ? ` — ${price} ฿` : '';
    lines.push(`${qty}× ${name}${priceStr}`);
  }

  lines.push('━━━━━━━━');
  lines.push(`<b>TOTAL: ${escapeHtml(order.total)} ฿</b> · pay at booth`);

  const who = [`\u{1F464} <b>${escapeHtml(order.name)}</b>`];
  if (order.phone) who.push(`\u{1F4DE} ${escapeHtml(order.phone)}`);
  lines.push(who.join(' · '));

  if (order.pickup) lines.push(`⏰ ${escapeHtml(order.pickup)}`);
  if (order.note) lines.push(`\u{1F4DD} ${escapeHtml(order.note)}`);
  if (ROBERT_MENTION) lines.push(ROBERT_MENTION);

  const text = lines.join('\n');

  try {
    const resp = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: ORDERS_CHAT_ID,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
          text,
        }),
      }
    );
    if (!resp.ok) {
      const body = await resp.text().catch(() => '');
      console.error(
        `[telegram] sendMessage failed (${resp.status}) for ${order.ref}: ${body}`
      );
    }
  } catch (err) {
    console.error(`[telegram] sendMessage error for ${order.ref}:`, err.message);
  }
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '64kb' }));

// CORS — allow the website origin for the order POST + preflight.
const corsOptions = {
  origin: CORS_ORIGIN,
  methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// --- Health -----------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// --- Create order (public, from the website) --------------------------------
app.post('/api/order', async (req, res) => {
  const body = req.body || {};
  const items = Array.isArray(body.items) ? body.items : null;
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';

  // Validation: items non-empty, name + phone present.
  if (!items || items.length === 0) {
    return res.status(400).json({ ok: false, error: 'No items in order' });
  }
  const itemsValid = items.every(
    (it) => it && typeof it === 'object' && typeof it.name === 'string' && it.name.trim()
  );
  if (!itemsValid) {
    return res.status(400).json({ ok: false, error: 'Invalid item in order' });
  }
  if (!name) {
    return res.status(400).json({ ok: false, error: 'Name is required' });
  }
  if (!phone) {
    return res.status(400).json({ ok: false, error: 'Phone is required' });
  }

  // Normalise items (keep only name/qty/price; coerce numbers).
  const normItems = items.map((it) => ({
    name: String(it.name).trim(),
    qty: toInt(it.qty) || 1,
    price: toInt(it.price),
  }));

  // Trust the website's total if numeric, else derive from items.
  let total = toInt(body.total);
  if (total == null) {
    total = normItems.reduce(
      (sum, it) => sum + (it.price != null ? it.price * it.qty : 0),
      0
    );
  }

  const note = typeof body.note === 'string' ? body.note.trim() : '';
  const pickup = typeof body.pickup === 'string' ? body.pickup.trim() : '';
  const lang = typeof body.lang === 'string' ? body.lang.trim().slice(0, 8) : '';
  const ref = makeRef();
  const created_at = Date.now();

  const order = {
    ref,
    items: normItems,
    total,
    name,
    phone,
    note,
    pickup,
    lang,
  };

  try {
    insertOrder.run({
      ref,
      items_json: JSON.stringify(normItems),
      total,
      name,
      phone,
      note,
      pickup,
      lang,
      created_at,
    });
  } catch (err) {
    console.error('[db] failed to insert order:', err.message);
    return res.status(500).json({ ok: false, error: 'Could not store order' });
  }

  // Notify Telegram, but never let a Telegram failure break the response.
  await notifyTelegram(order);

  return res.json({ ok: true, ref });
});

// --- List orders (admin) ----------------------------------------------------
app.get('/api/orders', basicAuth, (req, res) => {
  const rows = selectOrders.all();
  res.json({ orders: rows.map(rowToOrder) });
});

// --- Update order status (admin) --------------------------------------------
app.patch('/api/orders/:id', basicAuth, (req, res) => {
  const id = toInt(req.params.id);
  const status = req.body && typeof req.body.status === 'string' ? req.body.status : '';

  if (id == null) {
    return res.status(400).json({ ok: false, error: 'Invalid id' });
  }
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ ok: false, error: 'Invalid status' });
  }
  if (!selectOrderById.get(id)) {
    return res.status(404).json({ ok: false, error: 'Order not found' });
  }

  updateStatus.run(status, id);
  return res.json({ ok: true });
});

// --- Admin panel ------------------------------------------------------------
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/', (req, res) => {
  res.redirect('/admin');
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Fendi's Food Hut order backend listening on http://localhost:${PORT}`);
  console.log(`  admin panel:  http://localhost:${PORT}/admin`);
  console.log(`  CORS origin:  ${CORS_ORIGIN}`);
  if (!BOT_TOKEN) {
    console.log('  telegram:     DISABLED (BOT_TOKEN empty) — orders stored but not sent');
  }
});
