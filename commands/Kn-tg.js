/*
  Command: Kn-tg
  Description: Dynamic Telegram numbers country list
*/

var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;

var text = "📢 *اختر دولة لشراء رقم تيليجرام (Telegram):*\n\n" +
  "اختر الدولة وسيقوم البوت بطلب الرقم لك فورياً عبر السيرفر الفعلي المباشر ↘️";

// 1. Default prices if not customized
var default_tg = {
  "colombia": { "name": "كولومبيا 🇨🇴 ($0.10)", "price": 10.0 },
  "egypt": { "name": "مصر 🇪🇬 (3M رقم)", "price": 15.0 },
  "angola": { "name": "أنغولا 🇦🇴", "price": 12.0 },
  "albania": { "name": "ألبانيا 🇦🇱", "price": 18.0 },
  "argentina": { "name": "الأرجنتين 🇦🇷", "price": 22.0 },
  "russia": { "name": "روسيا 🇷🇺", "price": 15.0 },
  "ukraine": { "name": "أوكرانيا 🇺🇦", "price": 16.0 },
  "indonesia": { "name": "إندونيسيا 🇮🇩", "price": 12.0 }
};

// 2. Load dynamic customized prices
var tg_countries = default_tg;
var stored_str = Bot.getProperty("prices_data_json");
if (stored_str) {
  try {
    var full = JSON.parse(stored_str);
    if (full && full.telegram && Object.keys(full.telegram).length > 0) {
      tg_countries = full.telegram;
    }
  } catch(e) {}
}

// 3. Build keyboard dynamically in pairs
var keyboard = [];
var keys = Object.keys(tg_countries);

for (var i = 0; i < keys.length; i += 2) {
  var row = [];
  var k1 = keys[i];
  var item1 = tg_countries[k1];
  row.push({
    text: item1.name + " ¦ " + item1.price + " ₽",
    callback_data: "Xi tg " + k1 + " " + item1.price
  });

  if (i + 1 < keys.length) {
    var k2 = keys[i + 1];
    var item2 = tg_countries[k2];
    row.push({
      text: item2.name + " ¦ " + item2.price + " ₽",
      callback_data: "Xi tg " + k2 + " " + item2.price
    });
  }
  keyboard.push(row);
}

keyboard.push([
  { text: "- رجوع 🔙", callback_data: "Buynum" }
]);

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
