/*
  Command: servers_menu
  Description: Manage SMS Provider Servers directly from inside the Bot
*/

var admin_id = "8338869162";
var user_id = "" + (user.telegramid || "");
var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;

if (user_id !== admin_id) return;

var text = "🌐 *إدارة السيرفرات ومواقع التوريد الحقيقية:*\n\n" +
  "تستطيع من هنا:\n" +
  "1️⃣ التحكم بسلفر الكحلاني المعتمد (عشوائي).\n" +
  "2️⃣ ضبط سيرفر HeroSMS وسيرفر 5SIM الحقيقيين.\n" +
  "3️⃣ تعديل نسبة الربح المضافة لكل موقع.\n" +
  "4️⃣ فحص الرصيد الحقيقي المتبقي في حسابك بكل موقع.\n\n" +
  "المواقع المتصلة حالياً:\n" +
  "• سلفر الكحلاني (عشوائي): `ONLINE` 🟢 (نشط)\n" +
  "• سيرفر HeroSMS (#1513844): `ONLINE` 🟢 (نشط)\n" +
  "• سيرفر مصطفى 5SIM (#4437001): `ONLINE` 🟢 (نشط)\n" +
  "• سيرفر SMS-Activate الاحتياطي: `ONLINE` 🟢";

var keyboard = [
  [
    { text: "🎲 إعدادات سلفر الكحلاني (عشوائي)", callback_data: "kahlani_server" }
  ],
  [
    { text: "🦸‍♂️ إعدادات سيرفر HeroSMS (#1513844)", callback_data: "hero_sms" }
  ],
  [
    { text: "➕ إضافة موقع جديد بالرابط و API", callback_data: "add_custom_site" },
    { text: "💸 كشف أرصدة المواقع الحقيقية", callback_data: "check_all_balances" }
  ],
  [
    { text: "⚙️ تعديل نسبة ربح المواقع", callback_data: "edit_profit_margins" }
  ],
  [
    { text: "👑 لوحة الأدمن", callback_data: "admin_panel" },
    { text: "🔙 رجوع", callback_data: "admin_panel" }
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
