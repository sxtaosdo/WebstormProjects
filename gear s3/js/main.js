/**
 * Created by cheilchina on 2016/12/12.
 */
var MainJs = (function () {
    //上次鼠标抬起时的角度
    var tempRoation = 0;
    var minMoveDistance = 30;
    //最小移动角度
    var minMoveRoation = 30;
    //鼠标按下时,表盘的角度
    var mouseDownRoation = 0;
    //鼠标按下时,鼠标的角度
    var mouseDownArrRoation = 0;
    //当前指针索引
    var index = 0;
    //最大指针索引
    var maxIndex = 10;

    var onInit = function () {
        createjs.Touch.enable(stage);
        exportRoot.addEventListener("mousedown", onMouseDown)
        exportRoot.addEventListener("pressup", onMouseUp)
    }

    function onMouseDown(evt) {
        console.log("onMouseDown\t rotation:" + exportRoot.btn.rotation);
        exportRoot.addEventListener("pressmove", onUpdate)
        mouseDownArrRoation = -Math.atan2(evt.localX - exportRoot.btn.x, evt.localY - exportRoot.btn.y) * 180 / Math.PI;
        mouseDownRoation = exportRoot.btn.rotation
    }

    function onMouseUp(evt) {
        console.log("onMouseUp");
        exportRoot.removeEventListener("pressmove", onUpdate)
        tempRoation = exportRoot.btn.rotation;
    }

    function onUpdate(evt) {

        exportRoot.btn.rotation = -Math.atan2(evt.localX - exportRoot.btn.x, evt.localY - exportRoot.btn.y) * 180 / Math.PI - (mouseDownArrRoation - mouseDownRoation);

        var temp1 = exportRoot.btn.rotation - mouseDownRoation
        if (temp1 < 0) {
            temp1
        }
        if (Math.abs(temp1) > minMoveRoation) {
            var temp = Math.floor((temp1) / minMoveRoation)
            // console.log("temp" + temp);
            if (index != temp) {
                if (temp > index) {
                    index++;
                } else {
                    index--;
                }
                updateDial()
            }
            console.log("index:" + index + "\t temp:" + temp + "\t roation:" + exportRoot.btn.rotation);
        }
    }

    function updateDial() {
        console.log("updateDial")
        if (index >= maxIndex) {
            //该向后翻页了
        } else if (index < 1) {
            //该向前翻页了
        }
    }


    return {
        init: onInit
    }
})()




