/**
 * Created by cheilchina on 2016/12/12.
 */
var MainJs = (function () {
    //上次鼠标抬起时的角度
    var mosueUpRoation = 0;
    //最小移动角度
    var minMoveRoation = 36;
    /**鼠标按下时,表盘的角度*/
    var mouseDownRoation = 0;
    //鼠标按下时,鼠标的角度
    var mouseDownArrRoation = 0;
    //当前指针索引
    var index = 0;
    //最大指针索引
    var maxIndex = 10;
    //
    var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    //当前页
    var currentPage = 1;
    //最大页
    var maxPage = 3;
    //是否锁定切换页
    var isLockPage = false;

    var onInit = function () {
        GameJs.init();
        createjs.Touch.enable(stage);
        exportRoot.addEventListener("mousedown", onMouseDown)
        exportRoot.addEventListener("pressup", onMouseUp)
    }

    function onMouseDown(evt) {
        // console.log("onMouseDown\t rotation:" + exportRoot.btn.rotation);
        exportRoot.addEventListener("pressmove", onUpdate)
        mouseDownArrRoation = -Math.atan2(evt.localX - exportRoot.btn.x, evt.localY - exportRoot.btn.y) * 180 / Math.PI;
        mouseDownRoation = exportRoot.btn.rotation
    }

    function onMouseUp(evt) {
        // console.log("onMouseUp");
        exportRoot.removeEventListener("pressmove", onUpdate)
        mosueUpRoation = exportRoot.btn.rotation;
        tempRoation = 0;
    }

    function onUpdate(evt) {
        //=====================
        exportRoot.btn.rotation = -Math.atan2(evt.localX - exportRoot.btn.x, evt.localY - exportRoot.btn.y) * 180 / Math.PI - (mouseDownArrRoation - mouseDownRoation);

        var newRoation = exportRoot.btn.rotation - mouseDownRoation;
        if (newRoation > 180) {
            newRoation -= 360;
        } else if (newRoation < -180) {
            newRoation += 360;
        }
        newRoation = (newRoation) % 360;

        if ((newRoation > minMoveRoation) || (newRoation < -minMoveRoation)) {
            if (newRoation > minMoveRoation) {
                index++;
                GameJs.addIndex()
            } else {
                index--;
                GameJs.cutIndex()
            }
            mouseDownArrRoation = -Math.atan2(evt.localX - exportRoot.btn.x, evt.localY - exportRoot.btn.y) * 180 / Math.PI;
            mouseDownRoation = exportRoot.btn.rotation
        }
    }

    return {
        init: onInit,
        maxIndex: maxIndex,
        index: index
    }
})()




