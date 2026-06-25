/* Lightweight i18n for the Fendi's Food Hut site.
   Text-node replacement: no HTML tagging needed. English is the source (implicit).
   Add languages by adding a column to DICT. Brand names, prices & "THB" stay as-is.
   ⚠ Thai for the marketing/breakfast copy is best-effort — have a native speaker review.
*/
(function () {
  var SUPPORTED = { en: "EN", ru: "RU", th: "ไทย" }; // add zh / de later
  var ORDER = ["en", "th", "ru"];

  var DICT = {
    ru: {
      // ---- Nav / CTAs ----
      "About": "О нас", "Gallery": "Галерея", "Adventures": "Приключения",
      "Menu": "Меню", "Breakfast": "Завтраки", "Franchise": "Франшиза", "Contact": "Контакты",
      "Follow the Journey": "Следить за приключениями", "Order at the Booth": "Заказать в будке",
      "Build Yours": "Собрать свой", "See the Menu": "Смотреть меню", "View Full Menu": "Всё меню",
      "Full Menu →": "Всё меню →", "Read More": "Подробнее", "Apply Now": "Оставить заявку",
      "Get the details": "Узнать детали", "Start Building": "Начать сборку", "See Favorites": "Хиты",
      // ---- Homepage 2026 redesign: header / nav ----
      "Home": "Главная", "Food Booth": "Будка с едой", "Fendi": "Fendi",
      "Hotdogs & Fried Chicken": "Хот-доги и жареная курица",
      "Open Every Day": "Открыто каждый день", "in Pattaya": "в Паттайе",
      "See Our Menu": "Смотреть меню",
      // ---- Homepage 2026 redesign: hero ----
      "Pattaya's Favorite Street Food": "Любимая уличная еда Паттайи",
      "CRISPY CHICKEN.": "ХРУСТЯЩАЯ КУРИЦА.", "JUICY HOTDOGS.": "СОЧНЫЕ ХОТ-ДОГИ.",
      "GOOD VIBES.": "ХОРОШЕЕ НАСТРОЕНИЕ.",
      "From our booth in Pattaya to adventures across Thailand — Fendi brings you food, fun and happiness 24 hours a day!": "От нашей будки в Паттайе до приключений по всему Таиланду — Fendi дарит вам еду, веселье и счастье 24 часа в сутки!",
      "Visit Our Booth": "Зайти в будку",
      // ---- Homepage 2026 redesign: feature strip ----
      "24 Hours": "24 часа", "Open all day, every day": "Открыто весь день, каждый день",
      "Freshly Cooked": "Готовим свежим", "Made to order, always hot": "Готовим на заказ, всегда горячее",
      "Quality Ingredients": "Качественные продукты", "Premium chicken & real ingredients": "Премиальная курица и натуральные продукты",
      "Good food brings us together": "Хорошая еда объединяет нас",
      // ---- Homepage 2026 redesign: best sellers ----
      "Best Sellers": "Хиты продаж",
      "The crispy, juicy favorites people line up for.": "Хрустящие и сочные любимцы, за которыми выстраиваются очереди.",
      "Crispy Chicken Box": "Бокс с хрустящей курицей", "Signature Hot Dog": "Фирменный хот-дог",
      "Family Bucket": "Семейное ведёрко",
      // ---- Homepage 2026 redesign: split (Meet Fendi / Food Booth) ----
      "Meet Fendi": "Знакомьтесь — Fendi", "Official Happiness Officer": "Главный по счастью",
      "Fendi the Frenchie travels Thailand reviewing food, meeting friends and spreading joy everywhere! Follow Fendi's adventures on TikTok & Instagram!": "Френч-бульдог Fendi путешествует по Таиланду, пробует еду, заводит друзей и дарит радость повсюду! Следите за приключениями Fendi в TikTok и Instagram!",
      "You'll find us in the heart of Pattaya! Crispy chicken, juicy hotdogs and good vibes — 24 hours a day.": "Вы найдёте нас в самом сердце Паттайи! Хрустящая курица, сочные хот-доги и хорошее настроение — 24 часа в сутки.",
      "Get Directions": "Проложить маршрут",
      // ---- Homepage 2026 redesign: menu highlights ----
      "Menu Highlights": "Что в меню",
      "Everything from chicken boxes to ice-cold drinks.": "Всё — от куриных боксов до ледяных напитков.",
      "Explore the Menu": "Открыть меню",
      // ---- Homepage 2026 redesign: journey ----
      "Follow Our Journey": "Следите за нашими приключениями",
      "Food, friends and fun from Pattaya to all around Thailand!": "Еда, друзья и веселье — от Паттайи до всего Таиланда!",
      "Follow on TikTok @fendi.frenchie": "Подписаться в TikTok @fendi.frenchie",
      "Follow on Instagram @fendi.frenchie": "Подписаться в Instagram @fendi.frenchie",
      // ---- Homepage 2026 redesign: footer ----
      "Pattaya · Thailand": "Паттайя · Таиланд",
      "© 2026 Fendi's Food Hut · Fendi. All rights reserved.": "© 2026 Fendi's Food Hut · Fendi. Все права защищены.",
      // ---- Homepage hero ----
      "Thailand based. Dog approved.": "Из Таиланда. Одобрено собакой.",
      "Exploring Thailand.": "Исследуем Таиланд.", "Spreading Love.": "Дарим любовь.",
      "Serving Happiness.": "Подаём счастье.",
      "Fendi the Frenchie travels, discovers, and shares love everywhere she goes — and now she's serving up crispy fried chicken & juicy hotdogs at": "Френч-бульдог Fendi путешествует, открывает мир и дарит любовь повсюду — а теперь подаёт хрустящую курицу и сочные хот-доги в",
      "in Pattaya!": "в Паттайе!",
      "Our Food Booth": "Наша будка", "Watch Adventures": "Смотреть приключения",
      "Crispy outside,": "Хрустит снаружи,", "happy inside!": "счастье внутри!",
      // ---- Feature cards ----
      "in Pattaya. Hotdogs, fried chicken & good vibes — open all day, every day.": "в Паттайе. Хот-доги, жареная курица и хорошее настроение — весь день, каждый день.",
      "Made With Love": "С любовью",
      "Crispy, juicy & made fresh daily with quality ingredients and our secret recipes.": "Хрустящее и сочное, готовим свежим каждый день из качественных продуктов по нашим секретным рецептам.",
      "All Dogs, All People, One Love": "Все собаки, все люди, одна любовь",
      "We believe in kindness, inclusion, and putting a smile on every face.": "Мы за доброту, открытость и улыбку на каждом лице.",
      // ---- Menu teaser (home) ----
      "Fendi's Food Hut Menu": "Меню Fendi's Food Hut",
      "Crispy chicken,": "Хрустящая курица,", "juicy hotdogs & more": "сочные хот-доги и не только",
      "Made fresh, served with love at our booth in Pattaya.": "Готовим свежим, подаём с любовью в нашей будке в Паттайе.",
      "Fendi's Latest Adventures": "Последние приключения Fendi", "Come along for the ride.": "Поехали с нами.",
      "Coding a dating app for dogs": "Пишем приложение для знакомств собак",
      "Reviewing street food in Bangkok": "Обзор уличной еды в Бангкоке",
      "Riding the Fendi scooter through Phuket": "Катаемся на скутере Fendi по Пхукету",
      // ---- Franchise ----
      "Open a New": "Открой новую", "Location": "точку",
      "Be one of the first to bring Fendi's Food Hut to your community. Proven recipes, full support and a simple 24/7 model — we'll help you set it up.": "Стань одним из первых, кто привезёт Fendi's Food Hut в свой район. Проверенные рецепты, полная поддержка и простая модель 24/7 — поможем всё настроить.",
      "Flagship in Pattaya": "Флагман в Паттайе", "Proven model": "Проверенная модель",
      "Recipes & support": "Рецепты и поддержка", "All dogs, all people": "Все собаки, все люди",
      // ---- Find us / footer ----
      "Find Us": "Где нас найти", "Come say hi in Pattaya": "Заходи в гости в Паттайе",
      "Wrapped & ready, all day every day. Pull up to the Fendi's Food Hut booth.": "Завёрнуто и готово, весь день каждый день. Подъезжай к будке Fendi's Food Hut.",
      "Open 24 Hours": "Работаем 24 часа", "Every single day — breakfast, lunch & late-night.": "Каждый день — завтрак, обед и поздний вечер.",
      "Pattaya, Thailand": "Паттайя, Таиланд", "📍 Pattaya, Thailand": "📍 Паттайя, Таиланд",
      "🕐 Open 24 Hours": "🕐 Работаем 24 часа", "🐾 All dogs, all people, one love": "🐾 Все собаки, все люди, одна любовь",
      "Follow us on social for our exact spot & daily specials.": "Подписывайся в соцсетях — там точное место и спецпредложения дня.",
      // ---- Menu page ----
      "The": "", "Menu": "Меню", "Hotdogs & Fried Chicken": "Хот-доги и жареная курица",
      "Crispy fried chicken and juicy hotdogs — made fresh, served with love at Fendi's food booth in Pattaya.": "Хрустящая жареная курица и сочные хот-доги — готовим свежим и с любовью в будке Fendi в Паттайе.",
      "Chicken Boxes": "Куриные боксы", "Hot Dogs": "Хот-доги", "Sauces": "Соусы", "Drinks": "Напитки",
      "Our Chicky Story": "Наша история",
      "Lite Box": "Лайт бокс", "Pop Box": "Поп бокс", "Trio Box": "Трио бокс",
      "Combo Box": "Комбо бокс", "Family Box": "Семейный бокс", "Ultimate Box": "Ультимейт бокс",
      "Crispy chicken & choice of sauce": "Хрустящая курица и соус на выбор",
      "Crispy chicken, fries & sauce": "Хрустящая курица, картофель фри и соус",
      "Chicken bites, fries & sauce": "Кусочки курицы, картофель фри и соус",
      "Crispy chicken, fries & drink": "Хрустящая курица, картофель фри и напиток",
      "Large chicken, large fries, 2 sauces": "Большая курица, большой фри, 2 соуса",
      "Family set, large fries, drinks, 3 sauces": "Семейный сет, большой фри, напитки, 3 соуса",
      "Classic Dog": "Классический хот-дог", "Cheese Dog": "Хот-дог с сыром",
      "Bacon Dog": "Хот-дог с беконом", "Chili Dog": "Чили-дог",
      "Sausage, ketchup, mustard": "Сосиска, кетчуп, горчица",
      "Sausage, cheese sauce, ketchup, mustard": "Сосиска, сырный соус, кетчуп, горчица",
      "Sausage, bacon, ketchup, mustard": "Сосиска, бекон, кетчуп, горчица",
      "Sausage, chili sauce, onions": "Сосиска, соус чили, лук",
      "Coke": "Кока-кола", "Sprite": "Спрайт", "Water": "Вода",
      "Cheddar Cheese": "Сырный соус", "White Mayo": "Майонез", "BBQ Sauce": "Соус барбекю",
      "Black Pepper": "Чёрный перец", "Spicy Sauce": "Острый соус", "Signature Sauce": "Фирменный соус",
      "Fresh Chicken": "Свежая курица", "Carefully selected quality chicken.": "Тщательно отобранная качественная курица.",
      "Quality Controlled": "Контроль качества", "GMP, HACCP & Halal certified facilities.": "Производство по стандартам GMP, HACCP и Halal.",
      "Cooked Fresh": "Готовим свежим", "Every order cooked fresh and served hot.": "Каждый заказ готовим свежим и подаём горячим.",
      "Since 2006": "С 2006 года", "Proudly serving Thailand with love.": "С гордостью и любовью кормим Таиланд.",
      "New": "Новинка", "Build Your Own Breakfast Sandwich": "Собери свой сэндвич на завтрак",
      "Pick your base, add your meat, choose your cheese — from 159 ฿.": "Выбери основу, добавь мясо, выбери сыр — от 159 ฿.",
      "Breakfast all day. All dogs, all people, one love.": "Завтрак весь день. Все собаки, все люди, одна любовь.",
      "Find us at the Fendi's Food Hut booth — open 24/7!": "Ищи нас у будки Fendi's Food Hut — работаем 24/7!",
      "Love our food? Follow Fendi!": "Нравится наша еда? Подпишись на Fendi!",
      // ---- Breakfast page ----
      "Breakfast · Wrapped & Ready": "Завтрак · завёрнуто и готово",
      "Served 4am–11am · Limited time": "Подаётся 4:00–11:00 · Ограниченное время",
      "Build Your Own": "Собери свой", "Breakfast Sandwich": "Сэндвич на завтрак",
      "carbs + protein.": "углеводы + белок.",
      "Pick your base, stack your meat, choose your cheese — egg & cheese to full double-meat. Made fresh, wrapped to go.": "Выбери основу, добавь мясо, выбери сыр — от «яйцо и сыр» до двойного мяса. Готовим свежим, заворачиваем с собой.",
      "Build it your way": "Собери по-своему",
      "Egg & cheese included.": "Яйцо и сыр включены.",
      "Step 1 · Choose your base": "Шаг 1 · Выбери основу", "(carbs)": "(углеводы)",
      "Step 2 · Add your meat": "Шаг 2 · Добавь мясо", "(protein)": "(белок)",
      "Step 3 · Choose your cheese": "Шаг 3 · Выбери сыр", "(included)": "(включено)",
      "Your sandwich": "Твой сэндвич", "Total": "Итого",
      "Crowd Favorites": "Любимое всеми", "Or grab a classic": "Или возьми классику",
      "Named after the cities that made them famous. Don't feel like building? Just point.": "Названы в честь городов, что их прославили. Не хочешь собирать? Просто покажи пальцем.",
      "Egg & cheese on a buttery croissant. The one that started it all.": "Яйцо и сыр на масляном круассане. Тот самый, с которого всё началось.",
      "Bacon, egg & cheese on a chewy bagel. Deli-style.": "Бекон, яйцо и сыр на тягучем бейгле. Как в деликатесной.",
      "Sausage, egg & cheese on a flaky biscuit. Southern comfort.": "Сосиска, яйцо и сыр на слоёном бисквите. Южный уют.",
      "Steak, egg & cheese on toast. Big and hearty.": "Стейк, яйцо и сыр на тосте. Большой и сытный.",
      "Double meat — bacon + ham — egg & cheese on a croissant. Go big.": "Двойное мясо — бекон + ветчина — яйцо и сыр на круассане. По-крупному.",
      "Build your own": "Собери свой", "Your sandwich, your rules. Start from 159 ฿.": "Твой сэндвич, твои правила. От 159 ฿.",
      "Prices are placeholders — final pricing to be confirmed.": "Цены предварительные — финальные уточняются.",
      "The Original": "Оригинал", "The New York": "Нью-Йорк", "The Nashville": "Нашвилл",
      "The Texan": "Техасский", "The Heavyweight": "Тяжеловес"
    },

    th: {
      // ---- Nav / CTAs ----
      "About": "เกี่ยวกับ", "Gallery": "แกลเลอรี", "Adventures": "การผจญภัย",
      "Menu": "เมนู", "Breakfast": "อาหารเช้า", "Franchise": "แฟรนไชส์", "Contact": "ติดต่อ",
      "Follow the Journey": "ติดตามการเดินทาง", "Order at the Booth": "สั่งที่ร้าน",
      "Build Yours": "สร้างของคุณ", "See the Menu": "ดูเมนู", "View Full Menu": "ดูเมนูทั้งหมด",
      "Full Menu →": "เมนูทั้งหมด →", "Read More": "อ่านเพิ่มเติม", "Apply Now": "สมัครเลย",
      "Get the details": "ดูรายละเอียด", "Start Building": "เริ่มสร้าง", "See Favorites": "เมนูยอดนิยม",
      // ---- Homepage 2026 redesign: header / nav ----
      "Home": "หน้าแรก", "Food Booth": "ร้านอาหาร", "Fendi": "เฟนดิ",
      "Hotdogs & Fried Chicken": "ฮอทดอก & ไก่ทอด",
      "Open Every Day": "เปิดทุกวัน", "in Pattaya": "ในพัทยา",
      "See Our Menu": "ดูเมนูของเรา",
      // ---- Homepage 2026 redesign: hero ----
      "Pattaya's Favorite Street Food": "สตรีทฟู้ดยอดนิยมของพัทยา",
      "CRISPY CHICKEN.": "ไก่ทอดกรอบ", "JUICY HOTDOGS.": "ฮอทดอกฉ่ำ",
      "GOOD VIBES.": "บรรยากาศดี",
      "From our booth in Pattaya to adventures across Thailand — Fendi brings you food, fun and happiness 24 hours a day!": "จากร้านของเราในพัทยาสู่การผจญภัยทั่วเมืองไทย — เฟนดิมอบอาหาร ความสนุก และความสุขให้คุณ 24 ชั่วโมงทุกวัน!",
      "Visit Our Booth": "แวะมาที่ร้าน",
      // ---- Homepage 2026 redesign: feature strip ----
      "24 Hours": "24 ชั่วโมง", "Open all day, every day": "เปิดทั้งวัน ทุกวัน",
      "Freshly Cooked": "ปรุงสดใหม่", "Made to order, always hot": "ทำตามสั่ง ร้อนเสมอ",
      "Quality Ingredients": "วัตถุดิบคุณภาพ", "Premium chicken & real ingredients": "ไก่พรีเมียมและวัตถุดิบแท้",
      "Good food brings us together": "อาหารดี ๆ ทำให้เราอยู่ด้วยกัน",
      // ---- Homepage 2026 redesign: best sellers ----
      "Best Sellers": "เมนูขายดี",
      "The crispy, juicy favorites people line up for.": "เมนูกรอบฉ่ำสุดโปรดที่คนต่อแถวรอ",
      "Crispy Chicken Box": "กล่องไก่ทอดกรอบ", "Signature Hot Dog": "ฮอทดอกซิกเนเจอร์",
      "Family Bucket": "ถังครอบครัว",
      // ---- Homepage 2026 redesign: split (Meet Fendi / Food Booth) ----
      "Meet Fendi": "มารู้จักเฟนดิ", "Official Happiness Officer": "หัวหน้าฝ่ายความสุข",
      "Fendi the Frenchie travels Thailand reviewing food, meeting friends and spreading joy everywhere! Follow Fendi's adventures on TikTok & Instagram!": "เฟนดิเฟรนช์บูลด็อกเที่ยวทั่วไทย รีวิวอาหาร พบเพื่อนใหม่ และแบ่งปันความสุขทุกที่! ติดตามการผจญภัยของเฟนดิทาง TikTok และ Instagram!",
      "You'll find us in the heart of Pattaya! Crispy chicken, juicy hotdogs and good vibes — 24 hours a day.": "เจอเราได้ใจกลางพัทยา! ไก่กรอบ ฮอทดอกฉ่ำ และบรรยากาศดี ๆ — 24 ชั่วโมงทุกวัน",
      "Get Directions": "ดูเส้นทาง",
      // ---- Homepage 2026 redesign: menu highlights ----
      "Menu Highlights": "เมนูเด่น",
      "Everything from chicken boxes to ice-cold drinks.": "ครบทุกอย่างตั้งแต่กล่องไก่จนถึงเครื่องดื่มเย็น ๆ",
      "Explore the Menu": "สำรวจเมนู",
      // ---- Homepage 2026 redesign: journey ----
      "Follow Our Journey": "ติดตามการเดินทางของเรา",
      "Food, friends and fun from Pattaya to all around Thailand!": "อาหาร เพื่อน และความสนุก จากพัทยาสู่ทั่วเมืองไทย!",
      "Follow on TikTok @fendi.frenchie": "ติดตามใน TikTok @fendi.frenchie",
      "Follow on Instagram @fendi.frenchie": "ติดตามใน Instagram @fendi.frenchie",
      // ---- Homepage 2026 redesign: footer ----
      "Pattaya · Thailand": "พัทยา · ประเทศไทย",
      "© 2026 Fendi's Food Hut · Fendi. All rights reserved.": "© 2026 Fendi's Food Hut · Fendi. สงวนลิขสิทธิ์",
      // ---- Homepage hero ----
      "Thailand based. Dog approved.": "อยู่เมืองไทย หมาการันตี",
      "Exploring Thailand.": "สำรวจเมืองไทย", "Spreading Love.": "แบ่งปันความรัก",
      "Serving Happiness.": "เสิร์ฟความสุข",
      "Fendi the Frenchie travels, discovers, and shares love everywhere she goes — and now she's serving up crispy fried chicken & juicy hotdogs at": "เฟนดิเฟรนช์บูลด็อกเดินทาง ค้นพบ และแบ่งปันความรักไปทุกที่ — ตอนนี้เสิร์ฟไก่ทอดกรอบและฮอทดอกสุดฉ่ำที่",
      "in Pattaya!": "ในพัทยา!",
      "Our Food Booth": "ร้านของเรา", "Watch Adventures": "ดูการผจญภัย",
      "Crispy outside,": "กรอบนอก", "happy inside!": "สุขข้างใน!",
      // ---- Feature cards ----
      "in Pattaya. Hotdogs, fried chicken & good vibes — open all day, every day.": "ในพัทยา ฮอทดอก ไก่ทอด และบรรยากาศดี ๆ — เปิดทั้งวัน ทุกวัน",
      "Made With Love": "ทำด้วยใจ",
      "Crispy, juicy & made fresh daily with quality ingredients and our secret recipes.": "กรอบ ฉ่ำ ทำสดใหม่ทุกวันด้วยวัตถุดิบคุณภาพและสูตรลับของเรา",
      "All Dogs, All People, One Love": "ทุกสุนัข ทุกคน หนึ่งเดียวคือความรัก",
      "We believe in kindness, inclusion, and putting a smile on every face.": "เราเชื่อในความเมตตา การมีส่วนร่วม และรอยยิ้มบนทุกใบหน้า",
      // ---- Menu teaser ----
      "Fendi's Food Hut Menu": "เมนู Fendi's Food Hut",
      "Crispy chicken,": "ไก่กรอบ", "juicy hotdogs & more": "ฮอทดอกฉ่ำ และอื่น ๆ",
      "Made fresh, served with love at our booth in Pattaya.": "ทำสดใหม่ เสิร์ฟด้วยใจที่ร้านของเราในพัทยา",
      "Fendi's Latest Adventures": "การผจญภัยล่าสุดของเฟนดิ", "Come along for the ride.": "มาร่วมเดินทางกัน",
      "Coding a dating app for dogs": "เขียนแอปหาคู่สำหรับสุนัข",
      "Reviewing street food in Bangkok": "รีวิวสตรีทฟู้ดในกรุงเทพ",
      "Riding the Fendi scooter through Phuket": "ขี่สกู๊ตเตอร์เฟนดิเที่ยวภูเก็ต",
      // ---- Franchise ----
      "Open a New": "เปิดสาขาใหม่", "Location": "ของคุณ",
      "Be one of the first to bring Fendi's Food Hut to your community. Proven recipes, full support and a simple 24/7 model — we'll help you set it up.": "เป็นหนึ่งในคนแรกที่นำ Fendi's Food Hut มาสู่ชุมชนของคุณ สูตรที่พิสูจน์แล้ว การสนับสนุนเต็มที่ และโมเดล 24 ชั่วโมงที่ง่าย — เราช่วยคุณตั้งต้น",
      "Flagship in Pattaya": "สาขาแรกในพัทยา", "Proven model": "โมเดลที่พิสูจน์แล้ว",
      "Recipes & support": "สูตรและการสนับสนุน", "All dogs, all people": "ทุกสุนัข ทุกคน",
      // ---- Find us / footer ----
      "Find Us": "หาเราเจอ", "Come say hi in Pattaya": "แวะมาทักทายที่พัทยา",
      "Wrapped & ready, all day every day. Pull up to the Fendi's Food Hut booth.": "ห่อพร้อมเสิร์ฟ ทั้งวันทุกวัน แวะมาที่ร้าน Fendi's Food Hut",
      "Open 24 Hours": "เปิด 24 ชั่วโมง", "Every single day — breakfast, lunch & late-night.": "ทุกวัน — เช้า กลางวัน และดึก",
      "Pattaya, Thailand": "พัทยา ประเทศไทย", "📍 Pattaya, Thailand": "📍 พัทยา ประเทศไทย",
      "🕐 Open 24 Hours": "🕐 เปิด 24 ชั่วโมง", "🐾 All dogs, all people, one love": "🐾 ทุกสุนัข ทุกคน หนึ่งเดียวคือความรัก",
      "Follow us on social for our exact spot & daily specials.": "ติดตามโซเชียลเราเพื่อดูจุดที่ตั้งและโปรประจำวัน",
      // ---- Menu page ----
      "The": "", "Menu": "เมนู", "Hotdogs & Fried Chicken": "ฮอทดอก & ไก่ทอด",
      "Crispy fried chicken and juicy hotdogs — made fresh, served with love at Fendi's food booth in Pattaya.": "ไก่ทอดกรอบและฮอทดอกฉ่ำ — ทำสดใหม่ เสิร์ฟด้วยใจที่ร้านเฟนดิในพัทยา",
      "Chicken Boxes": "กล่องไก่", "Hot Dogs": "ฮอทดอก", "Sauces": "ซอส", "Drinks": "เครื่องดื่ม",
      "Our Chicky Story": "เรื่องราวของเรา",
      "Lite Box": "ไลท์บ็อกซ์", "Pop Box": "ป๊อปบ็อกซ์", "Trio Box": "ทรีโอบ็อกซ์",
      "Combo Box": "คอมโบบ็อกซ์", "Family Box": "แฟมิลี่บ็อกซ์", "Ultimate Box": "อัลติเมทบ็อกซ์",
      "Crispy chicken & choice of sauce": "ไก่กรอบ และซอสให้เลือก",
      "Crispy chicken, fries & sauce": "ไก่กรอบ เฟรนช์ฟรายส์ และซอส",
      "Chicken bites, fries & sauce": "ไก่ชิ้นพอดีคำ เฟรนช์ฟรายส์ และซอส",
      "Crispy chicken, fries & drink": "ไก่กรอบ เฟรนช์ฟรายส์ และเครื่องดื่ม",
      "Large chicken, large fries, 2 sauces": "ไก่ใหญ่ เฟรนช์ฟรายส์ใหญ่ 2 ซอส",
      "Family set, large fries, drinks, 3 sauces": "เซ็ตครอบครัว เฟรนช์ฟรายส์ใหญ่ เครื่องดื่ม 3 ซอส",
      "Classic Dog": "ฮอทดอกคลาสสิก", "Cheese Dog": "ฮอทดอกชีส",
      "Bacon Dog": "ฮอทดอกเบคอน", "Chili Dog": "ฮอทดอกพริก",
      "Sausage, ketchup, mustard": "ไส้กรอก ซอสมะเขือเทศ มัสตาร์ด",
      "Sausage, cheese sauce, ketchup, mustard": "ไส้กรอก ซอสชีส ซอสมะเขือเทศ มัสตาร์ด",
      "Sausage, bacon, ketchup, mustard": "ไส้กรอก เบคอน ซอสมะเขือเทศ มัสตาร์ด",
      "Sausage, chili sauce, onions": "ไส้กรอก ซอสพริก หอมใหญ่",
      "Coke": "โค้ก", "Sprite": "สไปร์ท", "Water": "น้ำดื่ม",
      "Cheddar Cheese": "เชดด้าชีส", "White Mayo": "มายองเนส", "BBQ Sauce": "ซอสบาร์บีคิว",
      "Black Pepper": "พริกไทยดำ", "Spicy Sauce": "ซอสเผ็ด", "Signature Sauce": "ซอสซิกเนเจอร์",
      "Fresh Chicken": "ไก่สดคุณภาพ", "Carefully selected quality chicken.": "คัดสรรไก่คุณภาพอย่างพิถีพิถัน",
      "Quality Controlled": "ควบคุมคุณภาพ", "GMP, HACCP & Halal certified facilities.": "โรงงานมาตรฐาน GMP, HACCP และ Halal",
      "Cooked Fresh": "ปรุงสดใหม่", "Every order cooked fresh and served hot.": "ทุกออเดอร์ปรุงสดและเสิร์ฟร้อน",
      "Since 2006": "ตั้งแต่ปี 2006", "Proudly serving Thailand with love.": "ภูมิใจเสิร์ฟคนไทยด้วยความรัก",
      "New": "ใหม่", "Build Your Own Breakfast Sandwich": "สร้างแซนด์วิชอาหารเช้าของคุณ",
      "Pick your base, add your meat, choose your cheese — from 159 ฿.": "เลือกแป้ง เพิ่มเนื้อ เลือกชีส — เริ่มต้น 159 บาท",
      "Breakfast all day. All dogs, all people, one love.": "อาหารเช้าทั้งวัน ทุกสุนัข ทุกคน หนึ่งเดียวคือความรัก",
      "Find us at the Fendi's Food Hut booth — open 24/7!": "เจอเราที่ร้าน Fendi's Food Hut — เปิด 24 ชั่วโมง!",
      "Love our food? Follow Fendi!": "ชอบอาหารเราไหม? ติดตามเฟนดิ!",
      // ---- Breakfast page ----
      "Breakfast · Wrapped & Ready": "อาหารเช้า · ห่อพร้อมเสิร์ฟ",
      "Served 4am–11am · Limited time": "เสิร์ฟ 04:00–11:00 น. · เวลาจำกัด",
      "Build Your Own": "สร้างของคุณเอง", "Breakfast Sandwich": "แซนด์วิชอาหารเช้า",
      "carbs + protein.": "แป้ง + โปรตีน",
      "Pick your base, stack your meat, choose your cheese — egg & cheese to full double-meat. Made fresh, wrapped to go.": "เลือกแป้ง เพิ่มเนื้อ เลือกชีส — ตั้งแต่ไข่กับชีสไปจนถึงเนื้อสองชั้น ทำสดใหม่ ห่อพร้อมไป",
      "Build it your way": "สร้างในแบบของคุณ",
      "Egg & cheese included.": "รวมไข่และชีสแล้ว",
      "Step 1 · Choose your base": "ขั้นที่ 1 · เลือกแป้ง", "(carbs)": "(แป้ง)",
      "Step 2 · Add your meat": "ขั้นที่ 2 · เพิ่มเนื้อ", "(protein)": "(โปรตีน)",
      "Step 3 · Choose your cheese": "ขั้นที่ 3 · เลือกชีส", "(included)": "(รวมแล้ว)",
      "Your sandwich": "แซนด์วิชของคุณ", "Total": "รวม",
      "Crowd Favorites": "เมนูยอดนิยม", "Or grab a classic": "หรือเลือกเมนูคลาสสิก",
      "Named after the cities that made them famous. Don't feel like building? Just point.": "ตั้งชื่อตามเมืองที่ทำให้มันโด่งดัง ไม่อยากสร้างเอง? แค่ชี้เลย",
      "Egg & cheese on a buttery croissant. The one that started it all.": "ไข่และชีสบนครัวซองต์เนยหอม จุดเริ่มต้นของทุกอย่าง",
      "Bacon, egg & cheese on a chewy bagel. Deli-style.": "เบคอน ไข่ และชีสบนเบเกิลหนึบ สไตล์เดลี่",
      "Sausage, egg & cheese on a flaky biscuit. Southern comfort.": "ไส้กรอก ไข่ และชีสบนบิสกิตกรอบ สไตล์ใต้",
      "Steak, egg & cheese on toast. Big and hearty.": "สเต๊ก ไข่ และชีสบนขนมปังปิ้ง ใหญ่และจุใจ",
      "Double meat — bacon + ham — egg & cheese on a croissant. Go big.": "เนื้อสองชั้น — เบคอน + แฮม — ไข่และชีสบนครัวซองต์ จัดเต็ม",
      "Build your own": "สร้างของคุณเอง", "Your sandwich, your rules. Start from 159 ฿.": "แซนด์วิชของคุณ กฎของคุณ เริ่มต้น 159 บาท",
      "Prices are placeholders — final pricing to be confirmed.": "ราคานี้เป็นราคาชั่วคราว — รอยืนยันราคาสุดท้าย",
      "The Original": "ดิ ออริจินอล", "The New York": "ดิ นิวยอร์ก", "The Nashville": "ดิ แนชวิลล์",
      "The Texan": "ดิ เท็กซัน", "The Heavyweight": "ดิ เฮฟวี่เวท"
    }
  };

  function detect() {
    try {
      var saved = localStorage.getItem("lang");
      if (saved && SUPPORTED[saved]) return saved;
    } catch (e) {}
    var b = (navigator.language || "en").slice(0, 2).toLowerCase();
    return SUPPORTED[b] ? b : "en";
  }

  var nodes = null;
  function collect() {
    nodes = [];
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode && n.parentNode.nodeName;
        if (p === "SCRIPT" || p === "STYLE" || p === "NOSCRIPT" || p === "OPTION") return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = walker.nextNode())) nodes.push({ node: n, en: n.nodeValue });
  }

  function apply(lang) {
    if (!SUPPORTED[lang]) lang = "en";
    if (!nodes) collect();
    var d = DICT[lang] || {};
    for (var i = 0; i < nodes.length; i++) {
      var it = nodes[i], key = it.en.trim();
      if (lang !== "en" && d.hasOwnProperty(key)) {
        it.node.nodeValue = it.en.replace(key, d[key]);
      } else {
        it.node.nodeValue = it.en;
      }
    }
    document.documentElement.lang = lang;
    try { localStorage.setItem("lang", lang); } catch (e) {}
    var sel = document.getElementById("langSel");
    if (sel) sel.value = lang;
  }
  window.setLang = apply;

  function ready() {
    collect();
    apply(detect());
    var sel = document.getElementById("langSel");
    if (sel) sel.addEventListener("change", function () { apply(sel.value); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready);
  else ready();
})();
