/**
 * Created by cheilchina on 2016/12/21.
 */
var initJs = function () {
    console.log(11111111);


    exportRoot.mc1.gotoAndStop(0);

    $(window).swipe({
        //事件，滑动的方向，滑动的距离，一次滑动的时间 , 几根手指
        swipeUp: function (event, direction, distance, duration, fingerCount) {
            exportRoot.mc1.y -= 100;
            createjs.Tween.get(exportRoot.mc1).
        },
        swipeDown: function (event, direction, distance, duration, fingerCount) {
            exportRoot.mc1.y += 100;
        }
    });

    exportRoot.mc1

}