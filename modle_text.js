//文本识别 
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

var http = require('http');
var querystring = require('querystring');

var APPID = "5d26ea0f";
var API_KEY = "33c6363fc2929fe22798061d0134d050";
var AUTH_ID = "bf1b10dbf47f19d14a49a167693b76cd";
var AUE = "raw";
var CLIENT_IP = "127.0.0.1";
var SAMPLE_RATE = "16000";
var DATA_TYPE = "text";
var SCENE = "main_box";
var LAT = "39.938838";
var LNG = "116.368624";
var RESULT_LEVEL = "complete";
var FILE_PATH = ""
// 个性化参数，需转义
var PERS_PARAM = "{\\\"auth_id\\\":\\\"d5b0dc83de48502afffd4c379a65a1b0\\\"}";

var X_CurTime = Math.floor(Date.now() / 1000);
// var param = "{\"result_level\":\"" + RESULT_LEVEL + "\",\"aue\":\"" + AUE + "\",\"scene\":\"" + SCENE + "\",\"auth_id\":\"" + AUTH_ID + "\",\"data_type\":\"" + DATA_TYPE + "\",\"sample_rate\":\"" + SAMPLE_RATE + "\",\"lat\":\"" + LAT + "\",\"lng\":\"" + LNG + "\"}";
var param = "{\"result_level\":\"" + RESULT_LEVEL + "\",\"scene\":\"" + SCENE + "\",\"auth_id\":\"" + AUTH_ID + "\",\"data_type\":\"" + DATA_TYPE + "\",\"lat\":\"" + LAT + "\",\"lng\":\"" + LNG + "\"}";
//使用个性化参数时参数格式如下：
// var param = "{\"result_level\":\""+RESULT_LEVEL+"\",\"aue\":\""+AUE+"\",\"scene\":\""+SCENE+"\",\"auth_id\":\""+AUTH_ID+"\",\"data_type\":\""+DATA_TYPE+"\",\"sample_rate\":\""+SAMPLE_RATE+"\",\"lat\":\""+LAT+"\",\"lng\":\""+LNG+"\",\"pers_param\":\""+PERS_PARAM+"\"}";
var X_Param = new Buffer.from(param).toString('base64');
var X_CheckSum = md5(API_KEY + X_CurTime + X_Param);
var options = {
    hostname: 'openapi.xfyun.cn',
    port: 80,
    path: '/v2/aiui',
    method: 'POST',
    headers: {
        'X-Param': X_Param,
        'X-CurTime': X_CurTime,
        'X-CheckSum': X_CheckSum,
        'X-Appid': APPID
    }
}

// var data = fs.readFileSync(path.resolve(FILE_PATH));
let data = "上海天气"

var req = http.request(options, function (res) {
    console.log('Status:', res.statusCode);
    res.setEncoding('utf-8');
    res.on('data', function (chun) {
        console.log('response：\r\n');
        fs.writeFileSync("./文本识别返回结果.js", "res = " + chun)
        console.info(chun);
    });
    res.on('end', function () {
        console.log('end');
    });
});

req.on('error', function (err) {
    console.error(err);
});

req.write(data);
req.end();

function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
};