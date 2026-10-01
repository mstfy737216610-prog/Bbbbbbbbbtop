/*
  Command: setprice
  Description: Add or edit country price dynamically from inside the bot
*/

var admin_ids = ["8338869162", "7607633343", "5987430521"];
var user_id = "" + (user.telegramid || "");

var is_admin = false;
for (var i = 0; i < admin_ids.length; i++) {
  if (user_id === admin_ids[i]) {
    is_admin = true;
    break;
  }
}

if (!is_admin) {
  Bot.sendMessage("⛔️ عذراً، هذا الأمر مخصص لمالك البوت فقط.");
  return;
}

var raw = "" + (params || "");
if (!raw && typeof message !== "undefined" && message) {
  raw = ("" + message).replace(/^\/?(setprice|تسعير)/i, "").trim();
}

var parts = raw.trim().split(/\s+/);

if (parts.length < 3) {
  var help = "⚠️ *صيغة إضافة أو تعديل سعر دولة:*\n\n" +
    "`/setprice <الخدمة> <كود_الدولة> <السعر> [الاسم_بالعربي]`\n\n" +
    "📌 *أمثلة صحيحة:*\n" +
    "• `/setprice wa yemen 25 اليمن 🇾🇪`\n" +
    "• `/setprice wa colombia 12 كولومبيا 🇨🇴`\n" +
    "• `/setprice tg colombia 8 كولومبيا 🇨🇴`\n" +
    "• `/setprice tg egypt 14 مصر 🇪🇬`\n" +
    "• `/setprice wa saudi 30 السعودية 🇸🇦`";

  Bot.sendMessage(help, { parse_mode: "Markdown" });
  return;
}

var raw_service = parts[0].toLowerCase();
var raw_country = parts[1].toLowerCase();
var price = parseFloat(parts[2]) || 0;
var display_name = parts.slice(3).join(" ") || "";

// Normalize service
var service = "whatsapp";
if (raw_service === "tg" || raw_service === "telegram" || raw_service === "تيليجرام") {
  service = "telegram";
}

if (price <= 0) {
  Bot.sendMessage("❌ يرجى إدخال سعر صحيح أكبر من الصفر.");
  return;
}

// Fallback display name if not provided
if (!display_name) {
  var default_names = {
    "colombia": "كولومبيا 🇨🇴",
    "albania": "ألبانيا 🇦🇱",
    "angola": "أنغولا 🇦🇴",
    "egypt": "مصر 🇪🇬",
    "yemen": "اليمن 🇾🇪",
    "saudi": "السعودية 🇸🇦",
    "saudiarabia": "السعودية 🇸🇦",
    "argentina": "الأرجنتين 🇦🇷",
    "ukraine": "أوكرانيا 🇺🇦",
    "indonesia": "إندونيسيا 🇮🇩",
    "russia": "روسيا 🇷🇺",
    "iraq": "العراق 🇮🇶",
    "vietnam": "فيتنام 🇻🇳",
    "afghanistan": "أفغانستان 🇦🇫"
  };
  display_name = default_names[raw_country] || raw_country.toUpperCase();
}

// Load current prices
var stored_str = Bot.getProperty("prices_data_json");
var prices = {};
if (stored_str) {
  try {
    prices = JSON.parse(stored_str);
  } catch(e) {
    prices = {};
  }
}
if (!prices.whatsapp) prices.whatsapp = {};
if (!prices.telegram) prices.telegram = {};

// Update entry
prices[service][raw_country] = {
  "name": display_name,
  "price": price
};

// Save back
Bot.setProperty("prices_data_json", JSON.stringify(prices), "string");

var success_text = "🎉 *تم حفظ وتحديث سعر الدولة بنجاح!* ✅\n\n" +
  "📱 *الخدمة:* *" + (service === "whatsapp" ? "واتساب (WhatsApp)" : "تيليجرام (Telegram)") + "*\n" +
  "🌐 *الدولة:* *" + display_name + "* (`" + raw_country + "`)\n" +
  "💰 *السعر الجديد للعملاء:* `*" + price + " ₽*` (روبل)\n\n" +
  "💡 *الآن تظهر هذه الدولة بالسعر الجديد مباشرة لجميع مستخدمي البوت عند الضغط على شراء رقم!*";

Bot.sendInlineKeyboard([
  [ { title: "🏷️ العودة لجدول الأسعار", command: "prices_menu" } ],
  [ { title: "💬 فحص قائمة واتساب", command: "Kn-wa" }, { title: "📢 فحص قائمة تيليجرام", command: "Kn-tg" } ],
  [ { title: "👑 لوحة الأدمن", command: "admin_panel" } ]
], success_text);
