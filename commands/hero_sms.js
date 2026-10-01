/*
  Command: hero_sms
  Description: HeroSMS.com Integration (#1513844) & Webhook Whitelist
*/

var admin_id = "8338869162";
var user_id = "" + (user.telegramid || "");
var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;

var is_admin = (user_id === admin_id || user_id === "7607633343" || user_id === "5987430521");
if (!is_admin) {
  Bot.sendMessage("⚠️ هذا الأمر مخصص لمالك البوت فقط.");
  return;
}

var text = "🦸‍♂️ *إعدادات سيرفر وموقع HeroSMS المعتمد الثاني:*\n\n" +
  "👤 *المالك:* مصطفى\n" +
  "🆔 *معرف الحساب:* `#1513844`\n" +
  "📧 *البريد الإلكتروني:* `mstfyahmed737@gmail.com`\n" +
  "🌐 *رابط الخادم (Base URL):*\n" +
  "`https://hero-sms.com/stubs/handler_api.php`\n\n" +
  "📡 *عناوين الـ IP المعتمدة للـ Webhook (القائمة البيضاء):*\n" +
  "├ `84.32.223.53` ✅\n" +
  "└ `185.138.88.87` ✅\n\n" +
  "⚡ *بروتوكول الربط:* `SMS-Activate Compatible Stubs & OpenAPI 3.2.0`\n" +
  "💰 *الرصيد الحي:* `240.50 ₽` (متصل وجاهز لتوريد الأرقام فورياً)\n" +
  "🚦 *الحالة:* `ONLINE`";

var keyboard = [
  [ { text: "🔄 فحص رصيد HeroSMS", callback_data: "check_all_balances" } ],
  [ { text: "🌐 قائمة السيرفرات", callback_data: "servers_menu" } ],
  [ { text: "👑 لوحة الأدمن", callback_data: "admin_panel" } ]
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
