/*
  Command: on_hero_buy
  Description: Callback when HeroSMS / Kahlani API responds with purchased number
*/

var parts = ("" + (params || "")).trim().split(/\s+/);
var price = parseFloat(parts[0]) || 15.0;
var country = parts[1] || "الدولة";
var service = parts[2] || "whatsapp";
var server_id = parts[3] || "srv-kahlani";
var uid = "" + (user.telegramid || "");

var srv_display = (server_id === "hero-sms") ? "سيرفر HeroSMS المعتمد" : "سلفر الكحلاني (عشوائي)";

var text_raw = "" + (content || "");

// 1. Success case: ACCESS_NUMBER:id:phone
if (text_raw.indexOf("ACCESS_NUMBER") !== -1) {
  var p = text_raw.split(":");
  var order_id = p[1] || ("HERO" + Date.now());
  var real_phone = p[2] || "";

  var cur_bal = parseFloat(Bot.getProperty("balance_" + uid) || User.getProperty("balance") || "0");
  var new_bal = +(Math.max(0, cur_bal - price)).toFixed(2);
  Bot.setProperty("balance_" + uid, "" + new_bal, "string");
  User.setProperty("balance", "" + new_bal, "string");

  User.setProperty("current_active_order_id", order_id, "string");
  User.setProperty("current_active_phone", real_phone, "string");
  User.setProperty("current_order_price", "" + price, "string");
  User.setProperty("current_order_country", country, "string");
  User.setProperty("current_order_service", service, "string");

  var success_text = "🎉 *تم شراء وتخصيص الرقم بنجاح من " + srv_display + "!* 📱\n\n" +
    "☎️ *الرقم الفعلي:* `" + real_phone + "`\n" +
    "🆔 *رقم الطلب:* `#" + order_id + "`\n" +
    "📱 *الخدمة:* *" + service.toUpperCase() + "*\n" +
    "🌐 *الدولة:* *" + country + "*\n" +
    "💰 *السعر:* *" + price + " ₽* (تم خصمه)\n" +
    "💷 *رصيدك المتبقي:* *" + new_bal + " ₽*\n" +
    "⏳ *الصلاحية:* `15:00 دقيقة`\n\n" +
    "⚠️ *الخطوة التالية الهامة:*\n" +
    "1️⃣ انسخ الرقم وضعه في التطبيق واطلب كود الـ SMS.\n" +
    "2️⃣ اضغط على زر (📩 اجلب الكود ♻️) بالأسفل لاستلام رمز التحقق الفعلي.";

  Bot.sendInlineKeyboard([
    [ { title: "📩 اجلب الكود ♻️", command: "check_real_code " + order_id } ],
    [ { title: "🚫 إلغاء واسترجاع الرصيد فوراً", command: "cancel_real_number " + order_id } ],
    [ { title: "🏡 القائمة الرئيسية", command: "/start" } ]
  ], success_text);
  return;
}

// 2. No numbers or error case -> Immediate in-place retry keyboard!
var cur_bal = parseFloat(Bot.getProperty("balance_" + uid) || User.getProperty("balance") || "0");
var no_num_msg = "❌ *لم يتم تنفيذ طلبك حالياً*\n\n" +
  "نظراً لعدم توفر أرقام حالياً في *" + srv_display + "* لدولة *" + country + "* لتطبيق *" + service.toUpperCase() + "*.\n\n" +
  "💰 *تم استرجاع رصيدك كاملاً لمحافظتك فوراً.*\n" +
  "💷 رصيدك الحالي: *" + (isNaN(cur_bal) ? "0.0" : cur_bal.toFixed(1)) + " ₽*\n\n" +
  "👇 *يمكنك إعادة المحاولة فوراً بنقرة واحدة أو تجربة سيرفر آخر مباشرة دون الخروج:*";

Bot.sendInlineKeyboard([
  [ { title: "🔄 إعادة المحاولة فوراً (نفس السيرفر)", command: "Xi " + service + " " + country + " " + price + " " + server_id } ],
  [ { title: "🎲 تجربة بسلفر الكحلاني فوراً", command: "Xi " + service + " " + country + " " + price + " srv-kahlani" } ],
  [ { title: "👑 تجربة بـ HeroSMS فوراً", command: "Xi " + service + " " + country + " " + price + " hero-sms" } ],
  [ { title: "💎 تجربة بـ 5SIM.NET فوراً", command: "Xi " + service + " " + country + " " + price + " 5sim" } ],
  [ { title: "⚡ فحص وتجربة السيرفرات تلقائياً", command: "Xi " + service + " " + country + " " + price + " auto" } ],
  [ { title: "🧩 اختيار سيرفر آخر", command: "select_server " + service + " " + country + " " + price } ],
  [ { title: "🔙 اختيار دولة أخرى", command: "Kn-" + (service === "whatsapp" ? "wa" : "tg") }, { title: "🏡 القائمة الرئيسية", command: "/start" } ]
], no_num_msg);
