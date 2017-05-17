/**
 * Created by zafir on 16/12/12.
 */
var _wxReady = false;

var _domain1 = "http://109.254.1.157:3333/build/"
var _domain2 = "http://109.254.1.157:3333/build/"
var shareData = {
    'title': '三星盖乐世 S8 | S8+',
    'description': '三星盖乐世 S8 | S8+',
    'url': _domain1 + "/index.html",
    // 'picURL': _domain1 + '/assets/images/favicon152x152.png'
};

function addWeiXinShare() {
    var _data = {url: location.href};
    $.ajax({
        url: 'http://support-cn.samsung.com/campaign/monitor/WeChat/Api_Share.aspx',
        type: "GET",
        dataType: 'jsonp',
        jsonp: "callbackparam",
        jsonpCallback: "jsonpCallback",
        data: _data,
        success: function (json) {
            //客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数 
            window.shareData.url = "http://support-cn.samsung.com//campaign/monitor/WeChatOut/index.html";
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
            wx.ready(function () {
                resetWeixinConfig();
            });
        }
    });
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
            shareData.url = _domain2 + "/index.html";
            window.shareData = shareData;

            if (_wxReady) {
                console.log("===wx.ready ed===");
                resetWeixinConfig();
            } else {
                wx.ready(function () {
                    console.log("===wx.ready ing===");
                    _wxReady = true;
                    resetWeixinConfig();
                });
            }
        },
        error: function (data) {
            console.log(data)
        }

    })


}
function resetWeixinConfig() {
    console.log("===resetWeixinConfig===");
    wx.onMenuShareTimeline({
        title: window.shareData.title, // 分享标题
        link: window.shareData.url, // 分享链接
        imgUrl: window.shareData.picURL, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            console.log('分享朋友后 success', window.shareData);
            // setShareCount()
        },
        cancel: function () {
            console.log('分享朋友后 cancel', window.shareData);
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareAppMessage({
        title: window.shareData.title, // 分享标题
        desc: window.shareData.description, // 分享描述
        link: window.shareData.url, // 分享链接
        imgUrl: window.shareData.picURL, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            console.log('分享朋友后 success', window.shareData);
            // 用户确认分享后执行的回调函数
            // setShareCount()
        },
        cancel: function () {
            console.log('分享朋友后 cancel', window.shareData);
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareQQ({
        title: window.shareData.title, // 分享标题
        desc: window.shareData.description, // 分享描述
        link: window.shareData.url, // 分享链接
        imgUrl: window.shareData.picURL, // 分享图标
        success: function () {
            console.log('分享朋友后 success', window.shareData);
            // 用户确认分享后执行的回调函数
            // setShareCount()
        },
        cancel: function () {
            console.log('分享朋友后 cancel', window.shareData);
            // 用户取消分享后执行的回调函数
        }
    });
}

var GStringTools = (function () {
    //是否为手机号码
    var isMobile = function (str) {
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (myreg.test(str)) {
            return true;
        }
        return false;
    }
    //是否为电子邮箱
    var isEmail = function (str) {
        var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        if (emailReg.test(str)) {
            return true;
        }
        return false;
    }
    //是否为电话号码
    var isPhone = function (strPhone) {
        var phoneRegWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/;
        var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/;
        var prompt = "您输入的电话号码不正确!"
        if (strPhone.length > 9) {
            if (phoneRegWithArea.test(strPhone)) {
                return true;
            } else {
                //alert( prompt );
                return false;
            }
        } else {
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
    var isNumber = function (str) {
        var re = new RegExp("^[0-9]+$");
        if (str.search(re) != -1) {
            return true;
        }
        return false;
    }
    /*
     str是否为空
     */
    var isNull = function (str) {
        var regu = new RegExp("^[ ]+$");
        return regu.test(str);
    }
    /*
     *JavaScript精确获取字符串长度，使用str.match匹配相关正则内容，
     * 字符串区分中英文，一个中文2个字节,英文一个
     */
    var getStrLength = function (str) {
        var cArr = str.match(/[^\x00-\xff]/ig);
        return str.length + (cArr == null ? 0 : cArr.length);
    }

    /*
     获取链接的查询字符串，如：var link = "http:baidu.com?id=121&cid=1";
     getUrlVars(link).id;
     getUrlVars(link).cid;
     *
     * */
    var getUrlVars = function (url) {
        var vars = [], hash;

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

    var trim = function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }
    return {
        isMobile: isMobile,
        isEmail: isEmail,
        isPhone: isPhone,
        isNumber: isNumber,
        isNull: isNull,
        getUrlVars: getUrlVars,
        trim: trim,
        getStrLength: getStrLength
    }
})();