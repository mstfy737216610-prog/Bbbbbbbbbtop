/*
  Command: kahlani_server / mohammed_server
  Description: Settings and control for Kahlani Server
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

var profit = Bot.getProperty("mohammed_server_profit") || "2.0";
var url = Bot.getProperty("mohammed_server_url") || "https://hero-sms.com/stubs/handler_api.php";
var key = Bot.getProperty("mohammed_server_key") || "HEROSMS_USER_KEY_1513844";

var text = "🎲 *إعدادات سلفر الكحلاني (عشوائي) المعتمد:*\n\n" +
  "• *الحالة:* `ONLINE` 🟢 (نشط ومفعل للشراء)\n" +
  "• *الاسم المعتمد:* `سلفر الكحلاني (عشوائي)`\n" +
  "• *رابط السلفر:* `" + url + "`\n" +
  "• *مفتاح الـ API:* `" + (key.length > 10 ? key.substring(0, 8) + "..." : key) + "`\n" +
  "• *هامش الربح المضاف:* `+" + profit + " ₽` لكل رقم\n" +
  "• *المهمة:* توريد أرقام مباشرة وعشوائية فائقة السرعة\n\n" +
  "اختر الإجراء المطلوب من الأزرار بالأسفل ⬇️";

var keyboard = [
  [
    { text: "🔄 فحص اتصال السلفر ⚡", callback_data: "test_mohammed_server" },
    { text: "💰 تعديل نسبة الربح", callback_data: "edit_mohammed_profit" }
  ],
  [
    { text: "🔑 تعديل مفتاح API", callback_data: "edit_mohammed_key" },
    { text: "🌐 تعديل رابط السلفر", callback_data: "edit_mohammed_url" }
  ],
  [
    { text: "🏷️ جدول الأسعار والدول", callback_data: "prices_menu" },
    { text: "🌐 قائمة السيرفرات", callback_data: "servers_menu" }
  ],
  [
    { text: "👑 لوحة الأدمن", callback_data: "admin_panel" },
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
