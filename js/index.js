/**
 * Created by hxsd on 2016/5/17.
 */
var styCity = "北京";
var url = "http://wthrcdn.etouch.cn/weather_mini?city=" + styCity;   //url的拼接
$(function () {
    
    $.getJSON(url,function (oRequest) {         //Ajax的请求操作
        handle200(oRequest);
    });
    
    choseCity();   //调用省市联动函数
    
    $("#search").click(function () {
        styCity = $("#city").val();
        url = "http://wthrcdn.etouch.cn/weather_mini?city=" + styCity;
        $("#today").children(".title").html("今天 " + styCity);
        $.getJSON(url,function (oRequest) {
            handle200(oRequest);
        });
    });

});

function handle200(oRequest) {
    var $Box = $("#today");
    var strWenDu = oRequest.data.wendu;
    var strGanMao = oRequest.data.ganmao;
    var $content = $Box.children("div.weather_content");
    $content.children(".wenDu").html(strWenDu + "℃");
    $content.children(".ganMao").html(strGanMao);

    var $forecast = $(".forecast");
    var oForecast = oRequest.data.forecast;
    for (var i in oForecast){                   
        $($forecast[i]).children(".title").html(oForecast[i].date);  //为预报的日期赋值
        
        var tianQi = whichTianQi(oForecast[i].type);                 //得到天气的图片的名称
        $($forecast[i]).children(".pic").children("img").attr("src","images/" + tianQi);    //给图片的src赋值
        
        var low = oForecast[i].low;
        var high = oForecast[i].high;
        $($forecast[i]).children(".weather_content").children(".wenDu").html(low + " / " + high);   //低温和高温赋值
        var fengXing = oForecast[i].fengxiang;
        var fengLi = oForecast[i].fengli;
        $($forecast[i]).children(".weather_content").children(".fX").html(fengXing + "，" + fengLi);   //风向信息赋值 
    }
}
function whichTianQi(type) {              //判断forecast的type的值，返回相应的图片名称
    switch (type){
        case "晴" :
            return "qing.png";
        case "多云":
            return "duoyun.png";
        case "阴" :
            return "yin.png";
        case "小雨" :
            return "xiaoyu.png";
        case "小到中雨" :
        case "中雨" :
            return "zhongyu.png";
        case "中到大雨":
        case "大雨" :
            return "dayu.png";
        case "阵雨" :
            return "zhenyu.png";
        case "雷阵雨" :
            return "leizhenyu.png";
        case "暴雨" :
            return "baoyu.png";
        case "大到暴雨" :
            return "dadaobaoyu.png";
		case "霾" :
			return "mai.png";
        case "雾" :
            return "wu.png";
        default :
            return "san.png";
    }
}
