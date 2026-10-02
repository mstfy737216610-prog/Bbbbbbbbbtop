/*
  Command: c_adj
  Description: Adjust price by delta (+1, -1, +5, -5) and sync
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

var raw = "" + (params || "");
var parts = raw.trim().split(/\s+/);
var service = parts[0] || "whatsapp";
var country = parts[1] || "yemen";
var delta = parseFloat(parts[2]) || 1.0;

var stored_str = Bot.getProperty("prices_data_json");
var prices = {};
if (stored_str) {
  try {
    prices = JSON.parse(stored_str);
  } catch(e) {}
}

if (!prices[service]) prices[service] = {};
if (!prices[service][country]) {
  prices[service][country] = { name: country, price: 15.0 };
}

var current = prices[service][country].price || 15.0;
var new_price = +(Math.max(1, current + delta)).toFixed(1);
prices[service][country].price = new_price;

Bot.setProperty("prices_data_json", JSON.stringify(prices), "string");

Bot.runCommand("c_edit " + service + " " + country);
