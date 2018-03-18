'use strict';

var reqSenderPro = require('request-promise-native');
var reqSender = require('request');
var JsSHA = require('jssha');

var headers = getAuthorizationHeader();
var city = 'Taipei';
var route = '912';

var motcSenderPro = reqSenderPro.defaults({
  baseUrl: 'http://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/',
  // headers: headers
  headers: headers
});

var motcSender = reqSender.defaults({
  baseUrl: 'http://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/',
  // headers: headers
  headers: headers
});

// #region Request with promise-native

// Using Promise to do the request.
console.log('Starting sending request by request-promise-native!');

motcSenderPro.get({ url: city + '/' + route + '?$top=1&$format=JSON' }).then(function (resp) {
  console.log('This is the response!');
  console.log(JSON.parse(resp));
}).catch(function (err) {
  console.log('There is an error! ' + err);
});
// #endregion

// #region Request without promise

// Not using Promise to do the request.
console.log('Starting sending request by request!');

motcSender.get({ url: city + '/' + route + '?$top=1&$format=JSON' }, function (err, resp, body) {
  if (err) {
    console.log('There is something wrong on sending request by request.');
    console.log(err);
  }
  // console.log('Here is the response: ');
  // console.log(resp);
  console.log('Here is the body: ');
  console.log(JSON.parse(body));
});
// #endregion

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