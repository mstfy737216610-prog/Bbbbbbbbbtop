/*
  Command: Kn-wa
  Description: Dynamic WhatsApp numbers country list
*/

var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;

var text = "💬 *اختر دولة لشراء رقم واتساب (WhatsApp):*\n\n" +
  "اختر الدولة وسيقوم البوت بطلب الرقم لك فورياً عبر السيرفر الفعلي المباشر ↘️";

// 1. Default prices if not customized
var default_wa = {
  "colombia": { "name": "كولومبيا 🇨🇴 (الأرخص)", "price": 15.0 },
  "albania": { "name": "ألبانيا 🇦🇱 (ممتاز)", "price": 15.0 },
  "angola": { "name": "أنغولا 🇦🇴", "price": 18.0 },
  "egypt": { "name": "مصر 🇪🇬", "price": 20.0 },
  "argentina": { "name": "الأرجنتين 🇦🇷", "price": 16.0 },
  "ukraine": { "name": "أوكرانيا 🇺🇦", "price": 16.0 },
  "indonesia": { "name": "إندونيسيا 🇮🇩", "price": 10.0 },
  "russia": { "name": "روسيا 🇷🇺", "price": 45.0 }
};

// 2. Load dynamic customized prices
var wa_countries = default_wa;
var stored_str = Bot.getProperty("prices_data_json");
if (stored_str) {
  try {
    var full = JSON.parse(stored_str);
    if (full && full.whatsapp && Object.keys(full.whatsapp).length > 0) {
      wa_countries = full.whatsapp;
    }
  } catch(e) {}
}

// 3. Build keyboard dynamically in pairs
var keyboard = [];
var keys = Object.keys(wa_countries);

for (var i = 0; i < keys.length; i += 2) {
  var row = [];
  var k1 = keys[i];
  var item1 = wa_countries[k1];
  row.push({
    text: item1.name + " ¦ " + item1.price + " ₽",
    callback_data: "select_server wa " + k1 + " " + item1.price
  });

  if (i + 1 < keys.length) {
    var k2 = keys[i + 1];
    var item2 = wa_countries[k2];
    row.push({
      text: item2.name + " ¦ " + item2.price + " ₽",
      callback_data: "select_server wa " + k2 + " " + item2.price
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
