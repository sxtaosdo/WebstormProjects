/**
 * Created by lg on 16/12/7.
 */

//initUserinfoUi();

var NetData = (function(){
    var default_username = '请输入用户名';
    var default_mobile = '请输入手机号码';
    var cur_username = '请输入用户名';
    var cur_mobile = '请输入手机号码';
    var initBasePic = function(){
        $(".vid").attr({"src":"./video/vid.mp4","poster":"video/shoot.jpg"});
        $(".rule_bg2").attr({"src":"images/rule_bg2.jpg"});
        $(".logo").attr({"src":"images/logo.png"});
        $(".famiao").attr({"src":"images/text0.png"});
        $(".ad").attr({"src":"images/adtext.png"});
        $(".ruleBtn2").attr({"src":"images/text3.png"});
        $(".bg01").attr({"src":"images/prize_1.jpg"});
        $(".bg02").attr({"src":"images/prize_2.jpg"});
        $(".bg03").attr({"src":"images/prize_3.jpg"});
        $(".bg04").attr({"src":"images/prize_4.jpg"});
    }
    var initUserinfoUi = function() {
        $("#username_txt").val(default_username);
        $("#mobile_txt").val(default_mobile);
        // $("#address_txt").val(default_address);

        $("#username_txt").maxLength = 50;

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

        $(".prize_btn3").on("click",function(){
            NetData.checkUserInfo();
        })
        $(".prize_btn4").on("click",function(){
            window.location.href = './index.html';
        })


        $("#vid")[0].addEventListener("click",function(){
            $("#vid")[0].play();
        })

        $(".closeBtn").on("click",function() {
            $("#vid")[0].pause();
            $(".vidBox").addClass("hidden");
        })
        $(".ruleBtn2").on("click",function() {
            $(".rule_box").removeClass("alpha");
        })
        $(".ruleBtn").on("click",function() {
            $(".rule_box").addClass("alpha");
        })
    }

    //_data  = {username:'',mobile:'',address:''}
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
        if(!GStringTools.isMobile(cur_mobile)){
            alert('手机格式有误！');
            return;
        }

        var _data = {'username':cur_username,'mobile':cur_mobile};
        subUserInfo(_data,_callback);
    }
    var islock = false;
    var subUserInfo = function(_data,_callback){
        if(islock) return;
        islock = true;

        LinkClick('cn:ssd960pro_20161208_521:click_lijiyaoqing','o');
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
                    window.location.href = './index.html';
                },3000)
                _callback('success');
            }else if(_json.state=='1'){
                //失败，未中奖:
                alert('失败，未中奖');
                setTimeout(function() {
                    window.location.href = './index.html';
                },3000)
                //islock = false;
            }else if(_json.state=='2'){
                //失败，姓名为空
                alert('失败，姓名为空');
                islock = false;
            }else if(_json.state=='4'){
                //失败，手机号错误
                alert('失败，手机号错误');
                islock = false;
            }else if(_json.state=='5'){
                //失败，地址为空
                alert('失败，地址为空');
                islock = false;
            }else if(_json.state=='6'){
                //失败，已中过奖
                alert('失败，已中过奖');
                islock = false;

            }

        }).fail(function(){
            //_callback('error');
            //alert('提交失败！');
        });

    }

    //++++++++++ 抽奖接口 ++++++++++++++++++++++
    var _startlotteryLock = false;
    var startlottery = function(_callback) {
        if(_startlotteryLock) return;
        _startlotteryLock = true;
        var prizeObj = {'1':'三星960PRO（512G）','2':'三星存储卡（32G）+三星极简背包','3':'20元话费','4':'谢谢参与'};
        $.get(_domain2+"/Api_Luckdraw.aspx?r="+Math.random(),function(data) {
            //var _json = JSON.parse(data);
            console.log('Api_Luckdraw',data);
            try {
                var _json = JSON.parse(data);
            }catch (e){
                alert('json 解析有误：'+data);
            }
            if(_json.state == '0'){
                //成功
                $('.prize_box').removeClass('hidden');
                console.log('恭喜中奖！'+prizeObj[_json.msg]);
                if(_json.msg == '1'){
                    //1等奖
                    $('.prize1').removeClass('hidden');
                    $('.prize').removeClass('hidden');
                }else if(_json.msg == '2'){
                    //2等奖
                    $('.prize2').removeClass('hidden');
                    $('.prize').removeClass('hidden');
                }else if(_json.msg == '3'){
                    //3等奖
                    $('.prize3').removeClass('hidden');
                    $('.prize').removeClass('hidden');
                }else{
                    //谢谢参与
                    $('.prize4').removeClass('hidden');
                    $('.prize').addClass('hidden');
                    LinkClick('cn:ssd960pro_20161208_521:click_start','o');
                }
                _callback(_json.msg);
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
            }else if(_json.state == '3'){
                alert('未登录');
                setTimeout(function(){
                    window.location.href = './index.html';
               },3000);
            }else if(_json.state == '4'){
                alert('好友不够');
                setTimeout(function(){
                    window.location.href = './index.html';
               },3000);
            }else if(_json.state == '5'){
                //alert('已中奖');
                //谢谢参与
                $('.prize_box').removeClass('hidden');
                $('.prize4').removeClass('hidden');
                $('.prize').addClass('hidden');
                LinkClick('cn:ssd960pro_20161208_521:click_start','o');
            }
        }).fail(function() {
            //谢谢参与
            //_callback('4');
        });
    }

    //+++++++++++获取用户与好友头像、昵称接口：+++++++++++++
    var  getUserInfo = function(__id,_callback){
        //var _id = __id==''?'':'?id='+__id;
        $.get(_domain2+"/Api_GetUser.aspx?id="+__id+"&r="+Math.random(),function(data) {
            console.log('getUserInfo data-->',data);
            try {
                var _json = JSON.parse(data);
            }catch (e){
                alert('json 解析有误：'+data);
            }
            _json = _json[0];
            //发起者中奖状态
            userInfo.sponsorReg = _json.Reg;
            //发起者昵称
            userInfo.sponsorNick = _json.UNickName || '';
            //当前用户的ID
            userInfo.curUserId = _json.UID || '';

            userInfo.isgetHelp = _json.Start || '';

            console.log('getUserInfo _json-->',_json);

            //alert(data);
            //判断是否授权成功！
            if(_json.UNickName && GStringTools.trim(_json.UNickName) != ''){
                //得到助力的数量
                var n = 0;
                //userInfo.supporterNum =  data.match(/FNickName/g)==null?0:data.match(/FNickName/g).length;
                //if(userInfo.supporterNum>0){
                for(var i = 1;i<=3;i++){
                    if(_json['FNickName'+i] != ''){
                        //n++;
                        n=i;
                    }
                    userInfo.supporterlist.push({'FNickName':_json['FNickName'+i],'FTX':_json['FTX'+i]});
                }
                //}
                userInfo.supporterNum = n;
                console.log('获取用户信息成功',userInfo.supporterNum);
                if(_json.Reg=='1'){
                    //中奖但是没有提交个人信息，强制让其填写用户信息
                    userInfo.prizeId = _json.Oil;
                    _callback(true);
                }else{
                    _callback(false);
                }
            }else {
                //获取用户信息失败,跳转到授权页面
                console.log('获取用户信息失败,跳转到授权页面');
                authorize();
            }
            console.log('userInfo-->',userInfo);
            //initUI();

        }).fail(function(){
            //获取用户信息失败,跳转到授权页面
           //alert('获取用户信息失败!');
            //authorize();
        });
    }


    // ============== 助力 帮助确认接口==============
    var _helpFriendLock = false;
    var helpFriend = function(__callback) {
        if(_helpFriendLock)return;
        _helpFriendLock = true;
        console.log('派发助力！');
        $.get(_domain2+"/Api_Join.aspx?id="+userInfo.sponsorId+"&r="+Math.random(),function(data) {
            //var _json = JSON.parse(data);
            console.log('helpFriend',data);
            try {
                var _json = JSON.parse(data);
            }catch (e){
                alert('json 解析有误：'+data);
            }
            if(_json.state=='0'){
                //成功
                __callback('help_success');
            }else{
                _helpFriendLock = false;
                __callback('help_fail');
                //alert('助力失败！');
            }

        })
    }

    // ============== 微信授权 ==============
    var authorize = function() {
        //携带参数 发起者的ID
        window.location.href = _domain2+'/callback.aspx?grant_type=weixin&id='+userInfo.sponsorId;
    }

    var _getHelpLock = false;
    var getHelp = function(_callback) {
        if(_getHelpLock) return;
        _getHelpLock = true;
        $.post(_domain2+"/Api_Start.aspx?r="+Math.random(),function(data) {
            console.log('Api_Start',data);
            //var _json = JSON.parse(data);
            try {
                var _json = JSON.parse(data);
            }catch (e){
                alert('json 解析有误：'+data);
            }
            if(_json.state=='0'){
                //成功
                _callback('success');
            }else{
                _getHelpLock = false;
                _callback('fail');
                //alert('助力失败！');
            }

        }).fail(function(){
           // alert('Api_Start失败');
        })
    }

    var isAbleHelp = function(__callback){
        $.get(_domain2+"/Api_GetJoin.aspx?id="+userInfo.sponsorId+"&r="+Math.random(),function(data) {
            //var _json = JSON.parse(data);
            console.log('isAbleHelp',data);
            try {
                var _json = JSON.parse(data);
            }catch (e){
                alert('json 解析有误：'+data);
            }
            if(_json.msg=='0'){
                //成功
                __callback(true);
            }else{
                __callback(false);
                //alert('助力失败！');
            }

        })
    }

    function playVideo() {
        $(".vidBox").removeClass("hidden");
        $("#vid")[0].play();
    }
    function showRule() {
        $(".rule_box").removeClass("alpha");
    }

    function showInfoUI() {
        $('.prize_box').removeClass('hidden');
        if(userInfo.prizeId == 1){
            //1等奖
            $('.prize1').removeClass('hidden');
            $('.prize').removeClass('hidden');
        }else if(userInfo.prizeId == 2){
            //2等奖
            $('.prize2').removeClass('hidden');
            $('.prize').removeClass('hidden');
        }else if(userInfo.prizeId == 3){
            //3等奖
            $('.prize3').removeClass('hidden');
            $('.prize').removeClass('hidden');
        }else{
            //谢谢参与
            $('.prize4').removeClass('hidden');
            $('.prize').addClass('hidden');
        }
    }

    return {
        helpFriend:helpFriend,
        authorize:authorize,
        getUserInfo:getUserInfo,
        subUserInfo:subUserInfo,
        startlottery:startlottery,
        initUserinfoUi:initUserinfoUi,
        checkUserInfo:checkUserInfo,
        getHelp:getHelp,
        playVideo:playVideo,
        showRule:showRule,
        isAbleHelp:isAbleHelp,
        initBasePic:initBasePic,
        showInfoUI:showInfoUI
    }
})()




