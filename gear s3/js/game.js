/**
 * Created by cheilchina on 2016/12/14.
 */
var GameJs = (function () {

    var init = function () {
        console.log("init")
        exportRoot.gameView.gotoAndStop(0);
        exportRoot.gameView.btn.addEventListener("click", level1);
        exportRoot.addEventListener("mousedown", onMouseDown);
        // setTimeout(function () {
        //     exportRoot.gameView.gotoAndStop(0);
        //     exportRoot.gameView.btn.addEventListener("click", level1)
        // }, 1000)
        // GUtil.addFrameEvent(exportRoot.gameView, 0, function () {
        //     exportRoot.gameView.gotoAndStop(0);
        //     exportRoot.gameView.btn.addEventListener("click", level1)
        // })
        // exportRoot.addEventListener("mousedown", onMouseDown);
    }

    function onMouseDown() {
        exportRoot.gameView.toolTips.visible = false;
    }

    function level1() {

        exportRoot.gameView.gotoAndPlay(1);

        // GUtil.addFrameEvent(exportRoot.gameView, 'showIcon', function () {
            // exportRoot.gameView.icon.gotoAndStop(0);
            // exportRoot.gameView.topIcon.gotoAndPlay(1);
        // })
        GUtil.addFrameEvent(exportRoot.gameView, 'level', function () {
            exportRoot.gameView.contentImage.gotoAndStop(0);
            exportRoot.gameView.iconText.visible = false;
            // stop(exportRoot.gameView.contentImage, 0);
        })

    }

    function initTime() {

    }

    return {
        init: init
    }
})()