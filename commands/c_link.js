/*
  Command: c_link
  Description: Link a country to a specific server (Kahlani, HeroSMS, 5SIM)
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
var server_id = parts[2] || "srv-kahlani";

var srv_name = "سلفر الكحلاني (عشوائي)";
if (server_id === "hero-sms") srv_name = "سيرفر HeroSMS المعتمد";
if (server_id === "5sim" || server_id === "srv-1") srv_name = "سيرفر مصطفى (5SIM.NET)";

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

prices[service][country].server = server_id;
prices[service][country].serverName = srv_name;

Bot.setProperty("prices_data_json", JSON.stringify(prices), "string");

Bot.runCommand("c_edit " + service + " " + country);
