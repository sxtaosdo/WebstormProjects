/**
 * Created by lg on 16/12/8.
 */

NetData.initUserinfoUi();

$(".shareTips").on("click",function() {
    $(".shareTips").addClass("hidden");
})

$(".p1_btn01").on("click",function() {
    $(".p1_box01").addClass("hidden");
    $(".p1_box02").removeClass("hidden");
})
$(".p1_btn02").on("click",function() {
    $(".p1_box01").addClass("hidden");
    $(".p1_box03").removeClass("hidden");
})

$(".p1_btn03").on("click",function() {
    $(".p1_box02").addClass("hidden");
    $(".p1_box03").removeClass("hidden");
})

$(".p1_btn04").on("click",function() {
    NetData.getHelp(function(pam){
        console.log('getHelp callback',pam);
        if(pam =='success'){
            $(".p1_box03").addClass("hidden");
            $(".p1_box04").removeClass("hidden");
        }else{
            alert('请检查网络！');
        }
    })
})

$(".p1_btn05").on("click",function() {
    $(".shareTips").removeClass("hidden");
})

$(".p2_btn01").on("click",function() {
    $(".p2_box01").addClass("hidden");
    $(".p2_box02").removeClass("hidden");
})
$(".p2_btn03").on("click",function() {
    window.location.href = './index.html';
})

$(".p2_btn02").on("click",function() {
    // $(".p2_box02").addClass("hidden");
    // $(".p2_box03").removeClass("hidden");
    // return;
    NetData.helpFriend(function(pam){
        if(pam=='help_success'){
            $(".p2_box02").addClass("hidden");
            $(".p2_box03").removeClass("hidden");
        }else{
            alert('助力失败！');
        }
    })

})
$(".p3_btn01").on("click",function() {
    $(".p3_box01").addClass("hidden");
    $(".p3_box02").removeClass("hidden");
})
$(".p3_btn02").on("click",function() {
    // $(".p3_box02").addClass("hidden");
    // $(".p3_box03").removeClass("hidden");
    // return;
    NetData.helpFriend(function(pam){
        if(pam=='help_success'){
            $(".p3_box02").addClass("hidden");
            $(".p3_box03").removeClass("hidden");
        }else{
            alert('助力失败！');
        }
    })

})
$(".p3_btn03").on("click",function() {
    window.location.href= './index.html';
})
$(".p4_btn01").on("click",function() {
    $(".p4_box01").addClass("hidden");
    $(".p4_box02").removeClass("hidden");
})
$(".p4_btn02").on("click",function() {
    // $(".p4_box02").addClass("hidden");
    // $(".p4_box03").removeClass("hidden");
    // return;
    NetData.helpFriend(function(pam){
        if(pam=='help_success'){
            $(".p4_box02").addClass("hidden");
            $(".p4_box03").removeClass("hidden");
        }else{
            alert('助力失败！');
        }
    })

})
$(".p4_btn03").on("click",function() {
    window.location.href= './index.html';
})

$('.prize_btn01').on('click',function(){
    // $(".prize_box01").addClass('hidden');
    // $(".prize_success").removeClass('hidden');
    // //$(".prize_fail").removeClass('hidden');
    // return;
    NetData.startlottery(function(_prizeid) {
        if(_prizeid=="4"){
            $(".prize_fail").removeClass('hidden');
        }else{
            $(".prize_success").removeClass('hidden');
        }

    });
})

$(".prize_btn02").on("click",function(){
    //显示提交用户信息界面
    $(".userInfoBox").removeClass("hidden");

})
$(".prize_btn03").on("click",function(){
    window.location.href= './index.html';
})

//提交用户信息
$(".subBtn").on("click",function(){
    //检测并提交用户信息
    NetData.checkUserInfo(function(pam) {
        if(pam=="success"){
            alert('恭喜你提交成功');
            setTimeout(function(){
                window.location.href = './index.html';
            },4000);
        }
    })
    //window.location.href= './index.html';
})