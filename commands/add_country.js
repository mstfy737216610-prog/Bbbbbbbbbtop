/*
  Command: add_country
  Description: Guided instructions for adding a country and setting prices
*/

var text = "➕ *طريقة إضافة أو تعديل دولة وسعرها داخل البوت:* 🌐\n\n" +
  "تستطيع إضافة أي دولة تريدها بالضغط على الأمر أدناه ونسخه وتعديله:\n\n" +
  "1️⃣ *لإضافة دولة في واتساب:*\n" +
  "`/setprice wa colombia 12 كولومبيا 🇨🇴`\n" +
  "`/setprice wa yemen 22 اليمن 🇾🇪`\n" +
  "`/setprice wa egypt 18 مصر 🇪🇬`\n\n" +
  "2️⃣ *لإضافة دولة في تيليجرام:*\n" +
  "`/setprice tg colombia 8 كولومبيا 🇨🇴`\n" +
  "`/setprice tg egypt 12 مصر 🇪🇬`\n\n" +
  "💡 *كود الدولة بالإنجليزي:* يجب أن يكون مثل (colombia, yemen, egypt, albania, angola, saudi, argentina, ukraine, russia).\n" +
  "فور إرسال الأمر، ستُضاف الدولة فورياً إلى قائمة الشراء لجميع الزبائن!";

var keyboard = [
  [ { text: "🏷️ فتح جدول الأسعار الكامل", callback_data: "prices_menu" } ],
  [ { text: "👑 لوحة الأدمن", callback_data: "admin_panel" } ]
];

Bot.sendInlineKeyboard(keyboard, text);
