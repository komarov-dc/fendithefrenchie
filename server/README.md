# Fendi's Food Hut — Order Backend

A tiny Node.js service that powers ordering for the **Fendi's Food Hut** street-food
booth (open 24/7, pay-at-booth — **no online payment**).

It does four things:

1. **Receives orders** from the static website (`POST /api/order`).
2. **Stores** them in a local SQLite file (`orders.db`).
3. **Notifies** the team's Telegram group the moment an order comes in.
4. **Serves an admin panel** (`/admin`) tuned for the owner's iPad — see live orders,
   tap them through New → Preparing → Ready → Done.

No build step. No framework magic. ~1 file of server code + 1 HTML page.

---

## What's in here

| File             | Purpose                                                            |
| ---------------- | ----------------------------------------------------------------- |
| `server.js`      | Express server: API + SQLite + Telegram + serves the admin panel. |
| `admin.html`     | Self-contained iPad order board (HTML/CSS/JS, no build).          |
| `package.json`   | Dependencies + `npm start`.                                       |
| `.env.example`   | Copy to `.env` and fill in the secrets.                          |
| `orders.db`      | Created automatically on first run (don't commit it).            |

---

## API

| Method & path           | Auth        | Body / notes                                                                 |
| ----------------------- | ----------- | ---------------------------------------------------------------------------- |
| `POST /api/order`       | none (CORS) | `{ items:[{name,qty,price}], total, name, phone, note, pickup, lang }` → `{ ok, ref }` |
| `GET  /api/orders`      | Basic auth  | `{ orders:[...] }`, newest first                                             |
| `PATCH /api/orders/:id` | Basic auth  | `{ status }` ∈ `new｜preparing｜ready｜done｜cancelled` → `{ ok:true }`        |
| `GET  /admin`           | none*       | The iPad panel (auth happens inside, against the same Basic creds).         |
| `GET  /api/health`      | none        | `{ ok:true }`                                                                |

`POST /api/order` validates that `items` is non-empty and `name` + `phone` are present;
bad input returns `400 { ok:false, error }`. Each order gets a short ref like `FFH-1234`.
The order total is in **Thai Baht (฿)**, stored as an integer.

\* The `/admin` HTML is public, but it's useless without the Basic-auth credentials,
which it sends with every API call.

---

## Run locally

Requires **Node 18+** (uses the built-in global `fetch`).

```bash
cd server
npm install
cp .env.example .env      # then edit .env
npm start
```

Open <http://localhost:8787/admin>. Sign in with `ADMIN_USER` / `ADMIN_PASS`.

> Leave `BOT_TOKEN` **empty** while testing — the server then just logs
> "telegram skipped" instead of messaging the real group.

Quick smoke test:

```bash
# create an order
curl -s http://localhost:8787/api/order \
  -H 'Content-Type: application/json' \
  -d '{"items":[{"name":"Combo Box","qty":2,"price":149}],"total":298,"name":"Anna","phone":"+66 81 234 5678","pickup":"in 20 min","note":"extra chili","lang":"en"}'
# → {"ok":true,"ref":"FFH-1234"}

# list orders (admin)
curl -s -u robert:change-me http://localhost:8787/api/orders
```

---

## Environment variables (`.env`)

| Var              | Default                          | What it is                                                              |
| ---------------- | -------------------------------- | ---------------------------------------------------------------------- |
| `PORT`           | `8787`                           | Port the Node process listens on.                                      |
| `BOT_TOKEN`      | _(empty)_                        | Token for **@fendi_business_bot** (from @BotFather). Empty = no Telegram. |
| `ORDERS_CHAT_ID` | `-1003785384757`                 | The orders group chat id (already correct — the bot is in it).         |
| `ROBERT_MENTION` | _(empty)_                        | Optional text appended to each message to ping Robert, e.g. `@robert`. |
| `ADMIN_USER`     | `robert`                         | Basic-auth username for the admin panel + admin API.                   |
| `ADMIN_PASS`     | `change-me`                      | **Change this** to a strong password before going live.                |
| `CORS_ORIGIN`    | `https://fendithefrenchie.com`   | The only origin allowed to POST orders.                                |

> **Telegram note:** @fendi_business_bot is already a member of the orders group.
> This service uses the `sendMessage` HTTP API, which does **not** conflict with the
> existing Claude Code Channels polling — only registering a *webhook* would.

---

## Deploy to a VPS

### 0. Get the code on the server

```bash
# on the VPS
git clone <your-repo> fendi && cd fendi/server   # or scp the server/ folder up
npm install
cp .env.example .env && nano .env                 # fill BOT_TOKEN, set a strong ADMIN_PASS
```

### 1. Keep it running with pm2 (recommended)

```bash
npm install -g pm2
pm2 start server.js --name fendi-orders
pm2 save
pm2 startup        # follow the printed command so it survives reboots
# logs:  pm2 logs fendi-orders
```

<details>
<summary>Alternative: systemd unit</summary>

`/etc/systemd/system/fendi-orders.service`:

```ini
[Unit]
Description=Fendi's Food Hut order backend
After=network.target

[Service]
Type=simple
WorkingDirectory=/home/deploy/fendi/server
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=3
Environment=NODE_ENV=production
# .env in WorkingDirectory is loaded by dotenv automatically

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now fendi-orders
sudo journalctl -u fendi-orders -f
```

</details>

### 2. ⚠️ HTTPS is REQUIRED — put nginx + Let's Encrypt in front

The website is served over **HTTPS**, so browsers **block** it from POSTing to a
plain `http://` API ("mixed content"). The order button will silently fail.
**You must expose the API over HTTPS.**

The clean way: give the API its own subdomain (e.g. `api.fendithefrenchie.com`),
point its DNS `A` record at the VPS, and reverse-proxy `443 → localhost:8787`.

Install nginx + certbot, then create
`/etc/nginx/sites-available/api.fendithefrenchie.com`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name api.fendithefrenchie.com;

    # certbot will fill in the SSL bits below; HTTP just redirects to HTTPS.
    location / {
        proxy_pass         http://127.0.0.1:8787;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/api.fendithefrenchie.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# issue + auto-install the cert (this rewrites the block to listen on 443)
sudo certbot --nginx -d api.fendithefrenchie.com
```

Certbot turns the above into a 443 server block with the Let's Encrypt cert and adds
an HTTP→HTTPS redirect. Certs auto-renew via certbot's timer.

Verify:

```bash
curl https://api.fendithefrenchie.com/api/health      # → {"ok":true}
```

### 3. Point the website at the API

In `.env`, keep `CORS_ORIGIN=https://fendithefrenchie.com` (the site's origin — this is
what the API allows to POST). Then, on the **website**, set its order endpoint
(`ORDER_API`) to the API's HTTPS URL:

```
ORDER_API = https://api.fendithefrenchie.com
```

(That change lives in the website code, not in this server.)

### 4. Open the iPad panel

On the booth iPad, go to `https://api.fendithefrenchie.com/admin`, sign in with the
admin credentials, and "Add to Home Screen" for a full-screen app feel.

---

## The Telegram message

When an order arrives, the group gets something like:

```
🛎 NEW ORDER #FFH-1234
2× Combo Box — 149 ฿
1× Loaded Fries — 89 ฿
━━━━━━━━
TOTAL: 387 ฿ · pay at booth
👤 Anna · 📞 +66 81 234 5678
⏰ in 20 min
📝 extra chili
@robert
```

All customer input is HTML-escaped before sending. If Telegram is unreachable, the
order is **still stored** and the API still returns `{ ok, ref }` — the failure is just
logged to the console.

---

## Maintenance

- **Backups:** the only stateful file is `server/orders.db` (plus `-wal`/`-shm`). Copy it
  somewhere safe periodically.
- **Reset orders:** stop the service, delete `orders.db*`, restart (table is recreated).
- **Change the password:** edit `ADMIN_PASS` in `.env`, restart, and re-sign-in on the iPad.
