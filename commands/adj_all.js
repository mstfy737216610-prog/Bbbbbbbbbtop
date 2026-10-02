/*
  Command: adj_all
  Description: Adjust all country prices at once (+1 or -1)
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
if (!is_admin) return;

var delta = parseFloat(params) || 1.0;

var stored_str = Bot.getProperty("prices_data_json");
var prices = {};
if (stored_str) {
  try {
    prices = JSON.parse(stored_str);
  } catch(e) {}
}

if (prices.whatsapp) {
  var wa_keys = Object.keys(prices.whatsapp);
  for (var i = 0; i < wa_keys.length; i++) {
    var k = wa_keys[i];
    prices.whatsapp[k].price = +(Math.max(1, (prices.whatsapp[k].price || 15) + delta)).toFixed(1);
  }
}

if (prices.telegram) {
  var tg_keys = Object.keys(prices.telegram);
  for (var j = 0; j < tg_keys.length; j++) {
    var tk = tg_keys[j];
    prices.telegram[tk].price = +(Math.max(1, (prices.telegram[tk].price || 15) + delta)).toFixed(1);
  }
}

Bot.setProperty("prices_data_json", JSON.stringify(prices), "string");

Bot.runCommand("prices_menu");
