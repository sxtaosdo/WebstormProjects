/**
 * Created by lg on 16/12/14.
 */

var default_username = '请输入真实姓名';
var default_mobile = '请输入手机号码';
var default_email = '请输入邮箱地址';
var cur_username = '';
var cur_mobile = '';
var cur_email = '';

var initUserinfoUi = function() {
    $("#username_txt").val(default_username);
    $("#mobile_txt").val(default_mobile);
    $("#email_txt").val(default_email);
    //$("#username_txt").maxLength = 50;

    $("#username_txt").change(function(){
        cur_username = GStringTools.trim($("#username_txt").val());
    })
    $("#username_txt").focusin(function(){
        if(cur_username==default_username || cur_username==''){
            $("#username_txt").val('');
        }
    })
    $("#username_txt").focusout(function(){
        if(cur_username==default_username || cur_username==''){
            $("#username_txt").val(default_username);
        }
    })

    $("#mobile_txt").change(function(){
        cur_mobile = GStringTools.trim($("#mobile_txt").val());
    })
    $("#mobile_txt").focusin(function(){
        if(cur_mobile==default_mobile || cur_mobile==''){
            $("#mobile_txt").val('');
        }
    })
    $("#mobile_txt").focusout(function(){
        if(cur_mobile==default_mobile || cur_mobile==''){
            $("#mobile_txt").val(default_mobile);
        }
    })


    $("#email_txt").change(function(){
        cur_email = GStringTools.trim($("#email_txt").val());
    })
    $("#email_txt").focusin(function(){
        if(cur_email==default_email || cur_email==''){
            $("#email_txt").val('');
        }
    })
    $("#email_txt").focusout(function(){
        if(cur_email==default_email || cur_email==''){
            $("#email_txt").val(default_email);
        }
    })

    //=====提交用户信息=====
    $(".subBtn").on("click",function(){
        WebData.checkUserInfo(function(){
            console.log('用户信息提交成功！');
        });
    })


    // $(".closeBtn").on("click",function(){
    //    $('.useInfo').addClass("alpha");
    // })



    //开始抽奖
    $(".lotteryBtn").on("click",lottery);
    function lottery(){
        WebData.startlottery('121212',function (_id) {
            console.log('startlottery callback抽奖返回！'+_id);
        })
    }
    // $(".prize_btn4").on("click",function(){
    //     window.location.href = './index.html';
    // })
}

$(".rulecloseBtn").on("click",function(){
    $('.holder').addClass("hidden");
    $('.ruleBox').addClass("hidden");
})
initUserinfoUi();
var WebData = (function() {

//++++++++++ 提交用户信息 ++++++++++++++++++++++
    var checkUserInfo = function(_callback) {
        if(cur_username=='' || cur_username == default_username){
            alert(default_username);
            return;
        }
        if(cur_mobile=='' || cur_mobile == default_mobile){
            alert(default_mobile);
            return;
        }
        if(cur_email=='' || cur_email == default_email){
            alert(default_email);
            return;
        }
        if(!GStringTools.isMobile(cur_mobile)){
            alert('手机格式有误！');
            return;
        }
        if(!GStringTools.isEmail(cur_email)){
            alert('邮箱格式有误！');
            return;
        }

        var _data = {'username':cur_username,'mobile':cur_mobile,'email':cur_email};
        subUserInfo(_data,_callback);
    }
    var islock = false;
    var subUserInfo = function(_data,_callback){
        if(islock) return;
        islock = true;

        $.post(_domain2+"/Api_Reg.aspx?r="+Math.random(),_data,function(data) {
            //var _json = JSON.parse(data);
            console.log('Api_Reg',data);

            try {
                var _json = JSON.parse(data);
            }catch (e){
                alert('json 解析有误：'+data);
            }
            if(_json.state=='0'){
                alert("用户信息提交成功！");
                setTimeout(function() {
                    hiddenuseInfo();
                    //window.location.href = './index.html';
                },2000)
                _callback('success');
            }else if(_json.state=='1'){
                //失败，未中奖:
                alert('失败，未中奖');
                setTimeout(function() {
                    window.location.href = './index.html';
                },3000)
            }else if(_json.state=='2'){
                //失败，姓名为空
                alert('失败，姓名为空');
                islock = false;
            }else if(_json.state=='3'){
                //失败，手机号错误
                alert('失败，手机号错误');
                islock = false;
            }else if(_json.state=='4'){
                //失败，手机号错误
                alert('失败，email错误');
                islock = false;
            }else if(_json.state=='5'){
                //失败，已中过奖
                alert('失败，已中过奖');
                islock = false;
            }

        }).fail(function(){
        });

    }
    var showuseInfo = function(){
        $(".holder").removeClass("hidden");
        $(".useInfo").removeClass("hidden");
        $(".ruleBox").addClass("hidden");
    }
    var hiddenuseInfo = function() {
        $(".holder").addClass("hidden");
        $(".useInfo").addClass("hidden");
    }
    //++++++++++ 抽奖接口 ++++++++++++++++++++++
    var _startlotteryLock = false;
    var startlottery = function(_score,_callback) {
        // if(_startlotteryLock) return;
        //  _startlotteryLock = true;
        //将毫秒转化成秒
        var myscore = _score/1000>>0;
        $.get("./Api_Luckdraw.aspx?r="+Math.random(),{score:myscore},function(data) {
            //var _json = JSON.parse(data);
            console.log('Api_Luckdraw',data);
            try {
                var _json = JSON.parse(data);
            }catch (e){
                alert('json 解析有误：'+data);
            }
            if(_json.state == '0'){
                //成功 msg=中奖信息(0=错误，1=C9手机,2=C7手机,3=C5手机,4=谢谢参与)
                _callback(_json.msg);
                if(_json.msg != '4'){
                    showuseInfo();
                }

            }else if(_json.state == '1'){
                alert('活动还未开始');
                setTimeout(function(){
                    window.location.href = './index.html';
                },3000);
            }else if(_json.state == '2'){
                alert('活动已经结束');
                setTimeout(function(){
                    window.location.href = './index.html';
                },3000);
            }else if(_json.state == '4'){
                alert('游戏积分错误');
                setTimeout(function(){
                    window.location.href = './index.html';
                },3000);
            }
        }).fail(function() {
            //谢谢参与
            //_callback('4');
        });
    }

    var showRule = function() {
        document.removeEventListener('touchstart',backed);
        document.removeEventListener('touchmove',backed);
        $(".holder").removeClass("hidden");
        $('.ruleBox').removeClass("hidden");
    }

    return {
        checkUserInfo:checkUserInfo,
        startlottery:startlottery,
        showRule:showRule

    }
})();