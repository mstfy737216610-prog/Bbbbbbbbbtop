/*
  Command: add_country
  Description: Guided instructions for adding a country and setting prices
*/

var text = "➕ *طريقة وإضافة دولة وسعرها داخل البوت:* 🌐\n\n" +
  "👇 *يمكنك إضافة دول شائعة بنقرة واحدة من الأزرار بالأسفل:*\n" +
  "أو أرسل أمر الإضافة بالصيغة:\n\n" +
  "1️⃣ *لإضافة دولة في واتساب:*\n" +
  "`/setprice wa yemen 25 اليمن 🇾🇪`\n" +
  "`/setprice wa saudi 30 السعودية 🇸🇦`\n" +
  "`/setprice wa egypt 18 مصر 🇪🇬`\n\n" +
  "2️⃣ *لإضافة دولة في تيليجرام:*\n" +
  "`/setprice tg yemen 15 اليمن 🇾🇪`\n" +
  "`/setprice tg colombia 10 كولومبيا 🇨🇴`\n\n" +
  "💡 فور الضغط أو إرسال الأمر، ستُضاف الدولة فورياً إلى قائمة الشراء لجميع الزبائن!";

var keyboard = [
  [
    { text: "🇾🇪 إضافة اليمن 25₽ (واتساب)", callback_data: "quick_add wa yemen 25 اليمن_🇾🇪" },
    { text: "🇸🇦 إضافة السعودية 30₽ (واتساب)", callback_data: "quick_add wa saudi 30 السعودية_🇸🇦" }
  ],
  [
    { text: "🇪🇬 إضافة مصر 18₽ (واتساب)", callback_data: "quick_add wa egypt 18 مصر_🇪🇬" },
    { text: "🇮🇶 إضافة العراق 20₽ (واتساب)", callback_data: "quick_add wa iraq 20 العراق_🇮🇶" }
  ],
  [
    { text: "🇾🇪 إضافة اليمن 15₽ (تيليجرام)", callback_data: "quick_add tg yemen 15 اليمن_🇾🇪" },
    { text: "🇪🇬 إضافة مصر 12₽ (تيليجرام)", callback_data: "quick_add tg egypt 12 مصر_🇪🇬" }
  ],
  [
    { text: "🏷️ فتح جدول الأسعار الكامل", callback_data: "prices_menu" },
    { text: "👑 لوحة الأدمن", callback_data: "admin_panel" }
  ]
];

Bot.sendInlineKeyboard(keyboard, text);
