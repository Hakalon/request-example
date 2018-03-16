'use strict';

var reqSender = require('request-promise-native');
var JsSHA = require('jssha');

var motcSender = reqSender.defaults({
  baseUrl: 'http://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/',
  headers: getAuthorizationHeader()
});
// let apiAddr = 'http://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/Taipei/912?$top=1&$format=JSON';
var city = 'Taipei';
var route = '912';

console.log('Starting sending request!');

motcSender.get({
  url: city + '/' + route + '?$top=1&$format=JSON'
}).then(function (resp) {
  console.log('This is the response!');
  console.log(JSON.parse(resp));
}).catch(function (err) {
  console.log('There is an error! ' + err);
});

// MOTC授權認證
function getAuthorizationHeader() {
  var appID = '31c5632cc08d4421abf734566fd50ed2';
  var appKey = 'CNaXup9EDeew3oyoa8N8CWdE2ZI';
  var GMTString = new Date().toGMTString();
  var shaObj = new JsSHA('SHA-1', 'TEXT');

  shaObj.setHMACKey(appKey, 'TEXT');
  shaObj.update('x-date: ' + GMTString);

  var HMAC = shaObj.getHMAC('B64');
  var authorization = 'hmac username="' + appID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';

  // 若要減少傳輸可以再加上Accept-Encoding: 'gzip'，但使用時就必須額外做解壓縮的動作，否則會得到一串亂碼。
  return {
    Authorization: authorization, 'X-Date': GMTString
  };
}