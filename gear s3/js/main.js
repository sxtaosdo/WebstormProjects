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

        var temp1 = exportRoot.btn.rotation
        if (temp1 < 0) {
            temp1 = 360 + temp1 % 360;
        } else if (temp1 > 360) {
            temp1 = temp1 % 360;
        }
        temp1 = Math.floor((temp1) / minMoveRoation);
        if (index != temp1) {
            if (temp1 == 0) {
                //该向后翻页了
                // console.log("该向后翻页了")
                changePageDown()
            } else if (temp1 == 9) {
                //该向前翻页了
                // console.log("该向前翻页了")
                changePageUp()
            }
            index = temp1;

            updateDial()
        }
        if (index < 0) {
            console.log(index + "\t rotation:" + exportRoot.btn.rotation);
        }
        if (index > 10) {
            console.log(index + "\t rotation:" + exportRoot.btn.rotation);
        }
        console.log(index);
    }

    function updateDial() {
        if (exportRoot["p" + (index + 1)]) {
            createjs.Tween.removeTweens("p" + (index + 1));
            createjs.Tween.get(exportRoot.portMc).to({
                x: exportRoot["p" + (index + 1)].x,
                y: exportRoot["p" + (index + 1)].y
            }, 100, Ease.quintOut);
        }
    }

    function changePageUp() {
        if (currentPage < 1) {
            currentPage = 1;
        } else {
            currentPage--;
        }
        updatePage();
    }

    function changePageDown() {
        if (currentPage > maxPage) {
            currentPage = maxPage;
        } else {
            currentPage++
        }
        updatePage();
    }

    function updatePage() {
        isLockPage = true;
        //**.gotoAndStop(currentPage);
        if (exportRoot["page" + currentPage]) {
            exportRoot.currentPageMc.x = exportRoot["page" + currentPage].x
            exportRoot.currentPageMc.y = exportRoot["page" + currentPage].y
        }

    }

    return {
        init: onInit
    }
})()




