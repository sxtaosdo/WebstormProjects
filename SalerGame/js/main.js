/**
 * Created by zafir on 16/12/12.
 */

var _domain = 'http://support-cn.samsung.com/campaign/monitor/WeChat';
var WebData = (function () {
    //活动说明
    var _data = {};
    var zsList = ["华东支社", "华北支社","华南支社", "华中支社","东北支社","西北支社","西南支社"];
    var areaArr = [["安徽","浙江","江苏","上海","温州"],
        ["北京", "天津", "河北", "山东", "山西", "内蒙"],
        ["广州", "深圳", "广西", "福州", "厦门"],
        ["河南","湖北","湖南","江西"],
        ["辽宁","黑龙江","吉林"],
        ["陕西", "甘肃","青海","宁夏","新疆"],
        ["四川","云南","重庆","贵州"]]

    function initIntro(){initSelect()}
    var initSelect = function(){
        $("#zs").html("");
        for(var i = 0;i<zsList.length;i++){
            var dom = '<option value="'+i+'">'+zsList[i]+'</option>';
            $("#zs").append(dom);
        }
        setArea(0)
        $("#zs").change(function(){
            $("#area").html("");
            console.log($(this).val());
            setArea($(this).val());
        })
    }

    var setArea = function(i){
        $("#area").html("")
        console.log($("#area").val());
        for(var j = 0;j<areaArr[i].length;j++){
            var dom = '<option value="'+j+'">'+areaArr[i][j]+'</option>';
            $("#area").append(dom);
        }
    }

    var isChecking = false;
    //提交用户信息
    function subitInfo(){
        console.log($("#zs").val(),$("#area").val());
        if($("#userName").val().length == 0 ){
            alert("请填写姓名");
            return;
        }
        if(!GStringTools.isMobile($("#userPhone").val())){
            alert('手机格式有误！');
            return;
        }
        //isChecking = true;

        // var zs = zsList[$("#zs").val()]
        // var area = areaArr[$("#zs").val()][$("#area").val()]
        // var name = $("#userName").val();
        // var tel = $("#userPhone").val();

        _data.branch = zsList[$("#zs").val()];
        _data.area = areaArr[$("#zs").val()][$("#area").val()];
        _data.name = $("#userName").val();
        _data.phone = $("#userPhone").val();

        console.log('_data',_data);
        showIntro(false);
        $(window).trigger('nextPage');
    }


    function savewinner(_m) {
        //_data.v = _m;
        var zs = zsList[$("#zs").val()]
        var area = areaArr[$("#zs").val()][$("#area").val()]
        var name = $("#userName").val();
        var tel = $("#userPhone").val();
        var _url = "../savewinner.aspx";
        $.ajax({
            type: "POST",
            // dataType: "json",
            url: _url,
            contentType : "application/json",
            //data:_data,
            data:{"branch":zs,"area":area,"name":name,"phone":tel,"v":_m},
            success: function (data) {
                console.log("data  = " + (data));
                switch (data){
                    case "0" :
                        //保存成功；
                        alert("保存成功！");
                        break;
                    case "1" :
                        //请求参数不全或为空
                        alert("保存失败！");
                        break;
                    case "2" :
                        //请求参数不全或为空
                        alert("2");
                        break; 
                   case "3" :
                        //请求参数不全或为空
                        alert("3");
                        break; 
                }

            },
            error:function(data){
                //alert("请检查网络");
                console.log("err",data);
                // location.reload();
            }

        })
        console.log('savewinner-->',_data);
    }
    function showIntro(b) {
        if(b){
            $(".intro").addClass('show');
        }else{
            $(".intro").removeClass('show');
        }
    }
    return {
        initIntro:initIntro,
        subitInfo:subitInfo,
        showIntro:showIntro,
        savewinner:savewinner
    }
})()

$(function () {
    WebData.initIntro();
    WebData.showIntro(true);
})
$('.ruleBtn_cir').on('click',function () {
    //WebData.subitInfo();
    WebData.savewinner(100);
    // WebData.showIntro(false);
    // $(window).trigger('nextPage');
});

//监听 该事件 进入下一页
// $(window).on('nextPage',function () {
//     console.log('listener  nextPage');
// });


var _wxReady = false;

var _domain1 = "http://support-cn.samsung.com//campaign/monitor/WeChat/h5/"
var _domain2 = "http://support-cn.samsung.com/campaign/ssd/960"
var shareData = {
    'title': '新年财神到 好运福气来',
    'description': '新年财神到 好运福气来',
    'url': _domain1+"/index.html",
    'picURL': _domain1+'/img/share.jpg'
};

function addWeiXinShare(){
    var _data = {url:location.href};
    $.ajax({
        url:'http://support-cn.samsung.com/campaign/monitor/WeChat/Api_Share.aspx',
        type: "GET",
        dataType: 'jsonp',
        jsonp:"callbackparam",
        jsonpCallback:"jsonpCallback",
        data: _data,
        success: function (json) {
            //客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数 
            window.shareData.url ="http://support-cn.samsung.com//campaign/monitor/WeChatOut/index.html";
            wx.config({
                debug: false,
                appId: json.appId,//'<?php echo $signPackage["appId"];?>',
                timestamp: json.timestamp,//<?php echo $signPackage["timestamp"];?>,
                nonceStr: json.nonceStr,//'<?php echo $signPackage["nonceStr"];?>',
                signature: json.signature,//'<?php echo $signPackage["signature"];?>',
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ'
                ]
            });

            window.shareData = shareData;
            wx.ready(function(){
                resetWeixinConfig();
            });
        } });
}

function setShare() {
    $.ajax({
        type: "GET",
        /*dataType: "json",*/
        url: "http://support-cn.samsung.com/campaign/monitor/WeChat/Api_Share.aspx",
        /*data:{"branch":zs,"area":area,"name":name,"phone":tel,"v":_m},*/
        success: function (data) {
            console.log("data  = " + (data));
            var json = eval(data)
            console.log(json)
            wx.config({
                debug: false,
                appId: json.appId,//'<?php echo $signPackage["appId"];?>',
                timestamp: json.timestamp,//<?php echo $signPackage["timestamp"];?>,
                nonceStr: json.nonceStr,//'<?php echo $signPackage["nonceStr"];?>',
                signature: json.signature,//'<?php echo $signPackage["signature"];?>',
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ'
                ]
            });
            shareData.url =_domain2+"/index.html";
            window.shareData = shareData;

            if(_wxReady){
                console.log("===wx.ready ed===");
                resetWeixinConfig();
            }else{
                wx.ready(function(){
                    console.log("===wx.ready ing===");
                    _wxReady = true;
                    resetWeixinConfig();
                });
            }
        },
        error:function(data)
        {
            console.log(data)
        }

    })



}
function resetWeixinConfig() {
    console.log("===resetWeixinConfig===");
    wx.onMenuShareTimeline({
        title: window.shareData.title, // 分享标题
        link: window.shareData.url, // 分享链接
        imgUrl:window.shareData.picURL, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            console.log('分享朋友后 success',window.shareData);
            // setShareCount()
        },
        cancel: function () {
            console.log('分享朋友后 cancel',window.shareData);
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareAppMessage({
        title: window.shareData.title, // 分享标题
        desc: window.shareData.description, // 分享描述
        link: window.shareData.url, // 分享链接
        imgUrl:window.shareData.picURL, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            console.log('分享朋友后 success',window.shareData);
            // 用户确认分享后执行的回调函数
            // setShareCount()
        },
        cancel: function () {
            console.log('分享朋友后 cancel',window.shareData);
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareQQ({
        title: window.shareData.title, // 分享标题
        desc: window.shareData.description, // 分享描述
        link: window.shareData.url, // 分享链接
        imgUrl:window.shareData.picURL, // 分享图标
        success: function () {
            console.log('分享朋友后 success',window.shareData);
            // 用户确认分享后执行的回调函数
            // setShareCount()
        },
        cancel: function () {
            console.log('分享朋友后 cancel',window.shareData);
            // 用户取消分享后执行的回调函数
        }
    });
}

var GStringTools = (function(){
    //是否为手机号码
    var isMobile = function(str){
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(myreg.test(str)) { return true;}
        return false;
    }
    //是否为电子邮箱
    var isEmail = function(str){
        var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        if(emailReg.test(str)){return true;}
        return false;
    }
    //是否为电话号码
    var isPhone = function(strPhone) {
        var phoneRegWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/;
        var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/;
        var prompt = "您输入的电话号码不正确!"
        if( strPhone.length > 9 ) {
            if( phoneRegWithArea.test(strPhone) ){
                return true;
            }else{
                //alert( prompt );
                return false;
            }
        }else {
            if (phoneRegNoArea.test(strPhone)) {
                return true;
            } else {
                return false;
            }
        }
    }
    /*
     是否为数字
     */
    var isNumber = function(str){
        var re = new RegExp("^[0-9]+$");
        if (str.search(re) != -1) { return true;}
        return false;
    }
    /*
     str是否为空
     */
    var isNull = function(str){
        var regu = new RegExp("^[ ]+$");
        return regu.test(str);
    }
    /*
     *JavaScript精确获取字符串长度，使用str.match匹配相关正则内容，
     * 字符串区分中英文，一个中文2个字节,英文一个
     */
    var getStrLength = function(str){
        var cArr = str.match(/[^\x00-\xff]/ig);
        return str.length + (cArr == null ? 0 : cArr.length);
    }

    /*
     获取链接的查询字符串，如：var link = "http:baidu.com?id=121&cid=1";
     getUrlVars(link).id;
     getUrlVars(link).cid;
     *
     * */
    var getUrlVars = function(url) {
        var vars = [],hash;

        var hashes = url.slice(url.indexOf('?') + 1).split('&');
        //var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    /*
     删除前后空格
     * */

    var trim = function(str){
        return str.replace(/(^\s*)|(\s*$)/g,'');;
    }
    return {isMobile:isMobile,
        isEmail:isEmail,
        isPhone:isPhone,
        isNumber:isNumber,
        isNull:isNull,
        getUrlVars:getUrlVars,
        trim:trim,
        getStrLength:getStrLength
    }


})();