/*
  Command: select_server
  Description: In-bot Server Selection screen per country
*/

var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;
var uid = "" + (user.telegramid || "");

var raw = "" + (params || "");
var parts = raw.trim().split(/\s+/);
var service = parts[0] || "whatsapp";
var country = parts[1] || "yemen";
var price = parseFloat(parts[2]) || 15.0;

// Resolve country name
var stored_str = Bot.getProperty("prices_data_json");
var country_name = country;
if (stored_str) {
  try {
    var pObj = JSON.parse(stored_str);
    if (pObj[service] && pObj[service][country] && pObj[service][country].name) {
      country_name = pObj[service][country].name;
    }
  } catch(e) {}
}

var user_bal_str = Bot.getProperty("balance_" + uid) || User.getProperty("balance");
var user_bal = (user_bal_str !== undefined && user_bal_str !== null) ? parseFloat(user_bal_str) : 0.0;

var text = "📱 *شراء رقم جديد ✅*\n\n" +
  "• *التطبيق:* *" + (service === "whatsapp" ? "واتس اب - WHATSAPP" : "تيليجرام - TELEGRAM") + "*\n" +
  "• *الدولة:* *" + country_name + "*\n" +
  "• *السعر المعتمد:* `*" + price + " ₽*` (روبل)\n" +
  "• *رصيدك الحالي:* `*" + (isNaN(user_bal) ? "0.0" : user_bal.toFixed(1)) + " ₽*`\n\n" +
  "🧩 *قم باختيار السيرفر المطلوب لسحب الرقم:*\n" +
  "يختلف التوفر وجودة الأرقام من سيرفر لآخر ✔️";

var keyboard = [
  [
    { text: "🎲 سلفر الكحلاني (عشوائي) ¦ " + price + " ₽", callback_data: "Xi " + service + " " + country + " " + price + " srv-kahlani" }
  ],
  [
    { text: "👑 سيرفر HeroSMS المعتمد ¦ " + price + " ₽", callback_data: "Xi " + service + " " + country + " " + price + " hero-sms" }
  ],
  [
    { text: "💎 سيرفر مصطفى (5SIM.NET) ¦ " + price + " ₽", callback_data: "Xi " + service + " " + country + " " + price + " 5sim" }
  ],
  [
    { text: "⚡ فحص السيرفرات تلقائياً (Auto-Scan)", callback_data: "Xi " + service + " " + country + " " + price + " auto" }
  ],
  [
    { text: "🔙 اختيار دولة أخرى", callback_data: "Kn-" + (service === "whatsapp" ? "wa" : "tg") },
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
