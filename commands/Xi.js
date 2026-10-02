/*
  Command: Xi
  Description: Live number purchase directly from real 5SIM API
*/

var MUSTAFA_5SIM_TOKEN = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4MTkxMzcxMTQsImlhdCI6MTc4NzYwMTExNCwicmF5IjoiNTZlYmFlNjg0NGQyMTAzZjAyZjUyMzJlYjVhODViNTEiLCJzdWIiOjQ0MzcwMDF9.qEpXfNoatnjn3MLJhQErUVmgfIJ-cP_laTBFdz8RkeMietQrjYqZnRHTd23NjPxVPwn0HpoAz4lAmOwTiuPjaUQkU2u9QCnh2i89MAedpfm2kosspiug1Ux6o7pJ-2fVqPGW27cQtGmOz-vZne997NCbdCc7eDxoX3ZknvorIu1ZmaCEnVlk2-t-YdHAi90GzVqjrvE0dZqZM4Mp-IgX8z71Bv1neikePV2RsE68hGMM8Z2bONHMeAqxhtezVcW0ykW1pCk_NLjcSnTWFXo_L_dgVvZLQnPB1n-ROqFan55gB-uEkuU0KN0gkvnozT9_N4wTWjAYiLTy1S3-vaooDA";

var uid = "" + (user.telegramid || "");
var target_chat_id = (chat && chat.chatid) ? chat.chatid : user.telegramid;

// 1. Parse params: service, country, price, server_id
var service = "whatsapp";
var country = "colombia";
var price = 15.0;
var server_id = "srv-kahlani";

if (typeof params !== "undefined" && params) {
  var p_arr = ("" + params).trim().split(/\s+/);
  if (p_arr[0]) service = p_arr[0].toLowerCase();
  if (p_arr[1]) country = p_arr[1].toLowerCase();
  if (p_arr[2]) price = parseFloat(p_arr[2]) || price;
  if (p_arr[3]) server_id = p_arr[3].toLowerCase();
}

// Map service aliases
if (service === "wa" || service === "واتساب") service = "whatsapp";
if (service === "tg" || service === "تيليجرام") service = "telegram";

// 2. Strict Balance Verification
var user_bal_str = Bot.getProperty("balance_" + uid) || User.getProperty("balance");
var user_bal = (user_bal_str !== undefined && user_bal_str !== null) ? parseFloat(user_bal_str) : 0.0;

if (isNaN(user_bal) || user_bal < price) {
  var no_bal_msg = "⚠️ *عذراً! رصيدك غير كافٍ لشراء هذا الرقم*\n\n" +
    "💰 رصيدك الحالي: *" + (isNaN(user_bal) ? "0.0" : user_bal.toFixed(1)) + " ₽*\n" +
    "💸 سعر الرقم المطلوب: *" + price + " ₽*\n\n" +
    "يرجى شحن حسابك أولاً بالضغط على زر (•🎳 أشحن رصيدك•) عبر الكريمي، النجم، أو كروت الشحن.";
  
  Bot.sendInlineKeyboard([
    [ { title: "•🎳 أشحن رصيدك الآن•", command: "Payment" } ],
    [ { title: "🏡 القائمة الرئيسية", command: "/start" } ]
  ], no_bal_msg);
  return;
}

var srv_display = "سلفر الكحلاني (عشوائي)";
if (server_id === "hero-sms") srv_display = "سيرفر HeroSMS المعتمد (#1513844)";
if (server_id === "5sim" || server_id === "srv-1") srv_display = "سيرفر مصطفى (5SIM.NET)";
if (server_id === "auto") srv_display = "الفحص التلقائي الذكي لجميع السيرفرات";

// 3. Inform user that live purchase request is being sent
Bot.sendMessage("⏳ *جاري الاتصال بـ " + srv_display + " وسحب رقم لدولة " + country + "... يرجى الانتظار ثوانٍ*", { parse_mode: "Markdown" });

// 4. Send real HTTP request based on target server
if (server_id === "hero-sms" || server_id === "srv-kahlani") {
  var country_id_map = {
    "russia": 0, "ukraine": 1, "egypt": 21, "albania": 44, "yemen": 30, "colombia": 33,
    "saudi": 53, "saudiarabia": 53, "iraq": 47, "jordan": 116, "uae": 95, "kuwait": 100,
    "algeria": 58, "morocco": 37, "turkey": 68, "angola": 76, "argentina": 39, "indonesia": 6
  };
  var cid = country_id_map[country] !== undefined ? country_id_map[country] : 33;
  var svc_code = service === "whatsapp" ? "wa" : (service === "telegram" ? "tg" : "go");
  var hero_url = "https://hero-sms.com/stubs/handler_api.php?api_key=HEROSMS_USER_KEY_1513844&action=getNumber&service=" + svc_code + "&country=" + cid;

  HTTP.get({
    url: hero_url,
    success: "on_hero_buy " + price + " " + country + " " + service + " " + server_id
  });
} else {
  // Default to 5SIM
  var buy_url = "https://5sim.net/v1/user/buy/activation/" + country + "/any/" + service;

  HTTP.get({
    url: buy_url,
    headers: {
      "Authorization": "Bearer " + MUSTAFA_5SIM_TOKEN,
      "Accept": "application/json"
    },
    success: "on_5sim_buy " + price + " " + country + " " + service + " " + server_id
  });
}
