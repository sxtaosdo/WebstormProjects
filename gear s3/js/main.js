/**
 * Created by cheilchina on 2016/12/12.
 */
var MainJs = (function () {
    //上次鼠标抬起时的角度
    var mosueUpRoation = 0;
    //最小移动角度
    var minMoveRoation = 30;
    /**鼠标按下时,表盘的角度*/
    var mouseDownRoation = 0;
    //鼠标按下时,鼠标的角度
    var mouseDownArrRoation = 0;
    //当前指针索引
    var index = 0;
    //最大指针索引
    var maxIndex = 10;
    //本次移动的角度
    var tempRoation = 0;

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
        mosueUpRoation = exportRoot.btn.rotation;
        tempRoation = 0;
    }

    function onUpdate(evt) {

        exportRoot.btn.rotation = -Math.atan2(evt.localX - exportRoot.btn.x, evt.localY - exportRoot.btn.y) * 180 / Math.PI - (mouseDownArrRoation - mouseDownRoation);
        tempRoation += Math.atan2(evt.localX - exportRoot.btn.x, evt.localY - exportRoot.btn.y) * 180 / Math.PI;

        var temp1 = exportRoot.btn.rotation - mouseDownRoation
        if (temp1 < 0) {
            temp1 = 360 + temp1;
        }
        var temp = Math.floor((temp1) / minMoveRoation)
        if (index != temp) {
            if (temp > index) {
                if (temp > maxIndex) {
                    index = 1;
                    return;
                }
                index++;
            } else {
                if (temp < 1) {
                    // console.log("\t index:" + index + "\t temp:" + temp + "\t ro:" + temp1);
                    index = maxIndex;
                    return;
                }
                index--;
            }
            updateDial()
        }
        console.log("tempRoation:" + tempRoation);
        // console.log("index:" + index + "\t temp:" + temp + "\t ro:" + temp1);
    }

    function updateDial() {
        console.log("updateDial:" + index);
        if (index > maxIndex) {
            //该向后翻页了
        } else if (index < 1) {
            //该向前翻页了
        }
        // exportRoot.portMc.x = exportRoot["p" + index].x;
        // exportRoot.portMc.y = exportRoot["p" + index].y;
        if (exportRoot["p" + index]) {
            createjs.Tween.get(exportRoot.portMc).to({
                x: exportRoot["p" + index].x,
                y: exportRoot["p" + index].y
            }, 200, Ease.quintOut)
        }
    }


    return {
        init: onInit
    }
})()




