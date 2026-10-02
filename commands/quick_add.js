/*
  Command: quick_add
  Description: Quick add country preset from button
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
var price = parseFloat(parts[2]) || 15.0;
var name = parts.slice(3).join(" ").replace(/_/g, " ") || country;

var stored_str = Bot.getProperty("prices_data_json");
var prices = {};
if (stored_str) {
  try {
    prices = JSON.parse(stored_str);
  } catch(e) {}
}

if (!prices[service]) prices[service] = {};
prices[service][country] = {
  name: name,
  price: price,
  server: "srv-kahlani",
  serverName: "سلفر الكحلاني (عشوائي)"
};

Bot.setProperty("prices_data_json", JSON.stringify(prices), "string");

Bot.runCommand("prices_menu");
