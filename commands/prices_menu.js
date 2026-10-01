/*
  Command: prices_menu
  Description: Interactive Countries and Prices Management Panel inside the Bot
*/

var admin_ids = ["8338869162", "7607633343", "5987430521"];
var user_id = "" + (user.telegramid || "");
var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;

var is_admin = false;
for (var i = 0; i < admin_ids.length; i++) {
  if (user_id === admin_ids[i]) {
    is_admin = true;
    break;
  }
}

if (!is_admin) {
  Bot.sendMessage("⛔️ عذراً، هذا القسم مخصص لمالك البوت فقط.");
  return;
}

// Load dynamic prices data or use default
var default_prices = {
  "whatsapp": {
    "colombia": { "name": "كولومبيا 🇨🇴 (الأرخص)", "price": 15.0 },
    "albania": { "name": "ألبانيا 🇦🇱 (ممتاز)", "price": 15.0 },
    "angola": { "name": "أنغولا 🇦🇴", "price": 18.0 },
    "egypt": { "name": "مصر 🇪🇬", "price": 20.0 },
    "argentina": { "name": "الأرجنتين 🇦🇷", "price": 16.0 },
    "ukraine": { "name": "أوكرانيا 🇺🇦", "price": 16.0 },
    "indonesia": { "name": "إندونيسيا 🇮🇩", "price": 10.0 },
    "russia": { "name": "روسيا 🇷🇺", "price": 45.0 }
  },
  "telegram": {
    "colombia": { "name": "كولومبيا 🇨🇴 ($0.10)", "price": 10.0 },
    "egypt": { "name": "مصر 🇪🇬 (3M رقم)", "price": 15.0 },
    "angola": { "name": "أنغولا 🇦🇴", "price": 12.0 },
    "albania": { "name": "ألبانيا 🇦🇱", "price": 18.0 },
    "argentina": { "name": "الأرجنتين 🇦🇷", "price": 22.0 },
    "russia": { "name": "روسيا 🇷🇺", "price": 15.0 },
    "ukraine": { "name": "أوكرانيا 🇺🇦", "price": 16.0 },
    "indonesia": { "name": "إندونيسيا 🇮🇩", "price": 12.0 }
  }
};

var stored_str = Bot.getProperty("prices_data_json");
var prices = default_prices;
if (stored_str) {
  try {
    prices = JSON.parse(stored_str);
  } catch(e) {
    prices = default_prices;
  }
} else {
  Bot.setProperty("prices_data_json", JSON.stringify(default_prices), "string");
}

// Build text list
var wa_list = "";
var wa_keys = Object.keys(prices.whatsapp || {});
for (var w = 0; w < wa_keys.length; w++) {
  var k = wa_keys[w];
  var item = prices.whatsapp[k];
  wa_list += "• `" + k + "` ➔ *" + item.price + " ₽* (" + item.name + ")\n";
}

var tg_list = "";
var tg_keys = Object.keys(prices.telegram || {});
for (var t = 0; t < tg_keys.length; t++) {
  var tk = tg_keys[t];
  var titem = prices.telegram[tk];
  tg_list += "• `" + tk + "` ➔ *" + titem.price + " ₽* (" + titem.name + ")\n";
}

var text = "🏷️ *لوحة إدارة وتعديل أسعار الدول من داخل البوت* 💰\n\n" +
  "💬 *أسعار أرقام واتساب الحالية:*\n" + (wa_list || "لا توجد دول\n") + "\n" +
  "📢 *أسعار أرقام تيليجرام الحالية:*\n" + (tg_list || "لا توجد دول\n") + "\n" +
  "━━━━━━━━━━━━━━━━━━\n" +
  "✏️ *لتعديل أو إضافة أي دولة وسعر جديد أرسل:*\n" +
  "`/setprice <الخدمة> <كود_الدولة> <السعر> <الاسم_بالعربي>`\n\n" +
  "📌 *أمثلة جاهزة للنسخ والتعديل:*\n" +
  "`/setprice wa yemen 25 اليمن 🇾🇪`\n" +
  "`/setprice wa colombia 14 كولومبيا 🇨🇴`\n" +
  "`/setprice tg colombia 8 كولومبيا 🇨🇴`\n" +
  "`/setprice tg egypt 12 مصر 🇪🇬`\n" +
  "`/setprice wa saudi 35 السعودية 🇸🇦`\n\n" +
  "🗑 *لحذف دولة من القائمة:*\n" +
  "`/del_country wa russia`\n" +
  "`/del_country tg ukraine`";

var keyboard = [
  [
    { text: "➕ شرح وطريقة إضافة دولة جديدة", callback_data: "add_country" }
  ],
  [
    { text: "💬 معاينة قائمة واتساب", callback_data: "Kn-wa" },
    { text: "📢 معاينة قائمة تيليجرام", callback_data: "Kn-tg" }
  ],
  [
    { text: "👑 العودة للوحة الأدمن", callback_data: "admin_panel" },
    { text: "🏡 القائمة الرئيسية", callback_data: "/start" }
  ]
];

try {
  Api.sendMessage({
    chat_id: target_chat_id,
    text: text,
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: keyboard }
  });
} catch(e) {
  Bot.sendInlineKeyboard(keyboard, text);
}
