/*
  Command: del_country
  Description: Delete a country from the purchase menu
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
var parts = raw.trim().split(/\s+/);

if (parts.length < 2) {
  Bot.sendMessage("⚠️ صيغة الحذف:\n`/del_country <wa/tg> <كود_الدولة>`\nمثال:\n`/del_country wa russia`", { parse_mode: "Markdown" });
  return;
}

var svc = (parts[0].toLowerCase() === "tg" || parts[0].toLowerCase() === "telegram") ? "telegram" : "whatsapp";
var country = parts[1].toLowerCase();

var stored_str = Bot.getProperty("prices_data_json");
if (stored_str) {
  try {
    var prices = JSON.parse(stored_str);
    if (prices[svc] && prices[svc][country]) {
      delete prices[svc][country];
      Bot.setProperty("prices_data_json", JSON.stringify(prices), "string");
      Bot.sendInlineKeyboard([
        [ { title: "🏷️ العودة لجدول الأسعار", command: "prices_menu" } ],
        [ { title: "👑 لوحة الأدمن", command: "admin_panel" } ]
      ], "🗑 *تم حذف دولة `" + country + "` من قائمة " + svc + " بنجاح!*");
      return;
    }
  } catch(e) {}
}

Bot.sendMessage("⚠️ الدولة غير موجودة في القائمة.");
