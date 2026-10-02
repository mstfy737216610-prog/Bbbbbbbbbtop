/*
  Command: c_edit
  Description: In-bot interactive country price and server linker
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
if (!is_admin) return;

var raw = "" + (params || "");
var parts = raw.trim().split(/\s+/);
var service = parts[0] || "whatsapp";
var country = parts[1] || "yemen";

var stored_str = Bot.getProperty("prices_data_json");
var prices = {};
if (stored_str) {
  try {
    prices = JSON.parse(stored_str);
  } catch(e) {}
}

var item = (prices[service] && prices[service][country]) ? prices[service][country] : {
  name: country,
  price: 15.0,
  server: "srv-kahlani",
  serverName: "سلفر الكحلاني (عشوائي)"
};

var server_name = item.serverName || (item.server === "hero-sms" ? "سيرفر HeroSMS" : (item.server === "5sim" ? "سيرفر مصطفى (5SIM)" : "سلفر الكحلاني (عشوائي)"));

var text = "🌍 *تعديل دولة " + item.name + " فورياً:* ⚙️\n\n" +
  "📱 *الخدمة:* *" + (service === "whatsapp" ? "واتساب (WhatsApp)" : "تيليجرام (Telegram)") + "*\n" +
  "🌐 *كود الدولة:* `" + country + "`\n" +
  "💰 *السعر الحالي:* `*" + item.price + " ₽*` (روبل)\n" +
  "🔗 *السيرفر المربوط:* *" + server_name + "*\n\n" +
  "👇 *اختر الإجراء المطلوب من الأزرار بالأسفل للتعديل الفوري:*";

var keyboard = [
  [
    { text: "➕ زيادة +1 ₽", callback_data: "c_adj " + service + " " + country + " +1" },
    { text: "➖ إنقاص -1 ₽", callback_data: "c_adj " + service + " " + country + " -1" }
  ],
  [
    { text: "➕ زيادة +5 ₽", callback_data: "c_adj " + service + " " + country + " +5" },
    { text: "➖ إنقاص -5 ₽", callback_data: "c_adj " + service + " " + country + " -5" }
  ],
  [
    { text: "🎲 ربط بسلفر الكحلاني", callback_data: "c_link " + service + " " + country + " srv-kahlani" }
  ],
  [
    { text: "👑 ربط بـ HeroSMS", callback_data: "c_link " + service + " " + country + " hero-sms" },
    { text: "💎 ربط بـ 5SIM", callback_data: "c_link " + service + " " + country + " 5sim" }
  ],
  [
    { text: "🗑 حذف الدولة من القائمة", callback_data: "del_country " + service + " " + country }
  ],
  [
    { text: "🏷️ جدول الأسعار الكامل", callback_data: "prices_menu" },
    { text: "👑 لوحة الأدمن", callback_data: "admin_panel" }
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
