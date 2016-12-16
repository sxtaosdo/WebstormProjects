/**
 * Created by cheilchina on 2016/12/14.
 */
var GameJs = (function () {
    //当前关卡的任务目标
    var currentLevelIndex = [];
    //已找到的目标
    var completeLevelIndex = [];
    //当前关卡
    var currentLavel = 0;
    //当前页数
    var currentPage = 0;
    //当前指针位置
    var index = 0;

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
        exportRoot.gameView.icon.addEventListener("click", onIconClick)
        for (var j = 0; j < 3; j++) {
            for (var i = 0; i < 10; i++) {
                try {
                    exportRoot.gameView.icon["iconGroup" + (j + 1)]["icon" + (i + 1)].name = String(i);
                } catch (e) {
                    console.log("i:" + i + "\t j:" + j)
                }
            }
        }
    }

    function onIconClick(evt) {
        console.log(evt.target.name)
        if (portIndex == parseInt(evt.target.name)) {
            showBg(portIndex)
        }
    }

    function onMouseDown() {
        exportRoot.removeEventListener("mousedown", onMouseDown);
        exportRoot.gameView.toolTips.visible = false;
    }

    function level1() {
        currentLavel = 1;
        exportRoot.btn.visible = true;
        exportRoot.gameView.gotoAndPlay(1);
        exportRoot.gameView.topPage.gotoAndStop('3个表盘切换');
        exportRoot.gameView.pointMc.gotoAndStop(49)

        GUtil.addFrameEvent(exportRoot.gameView, 'showIcon', function () {
            downtimeControl.start(exportRoot.gameView.timeBox, function () {
                endPage();
            }, 120)

            exportRoot.gameView.topIcon.gotoAndPlay(1);
        })
        GUtil.addFrameEvent(exportRoot.gameView.topIcon, 'iconShowComplete', function () {
            exportRoot.gameView.nameText.gotoAndStop(9)
            exportRoot.gameView.pointMc.gotoAndStop(49)
            exportRoot.gameView.bgImgae.gotoAndStop(0)
            // for (var i = 0; i < iconNumList[0]; i++) {
            //     var key = Math.floor(Math.random() * 7) + 1;
            //     console.log("key:" + key)
            //     exportRoot.gameView.iconText.visible = true;
            //     exportRoot.gameView.topIcon["i" + key].gotoAndStop(1);
            //
            //     currentLevelIndex.push(key);
            // }
            exportRoot.gameView.iconText.visible = true;
            exportRoot.gameView.topIcon.i1.gotoAndStop(1);
            exportRoot.gameView.topIcon.i2.gotoAndStop(1);

            currentLevelIndex.push(1);
            currentLevelIndex.push(2);

        })
        GUtil.addFrameEvent(exportRoot.gameView, 'level', function () {
            exportRoot.gameView.contentImage.gotoAndStop(0);
            exportRoot.gameView.iconText.visible = false;
        })

    }

    function initTime() {

    }

    function setPoint(index) {//0~9
        portIndex = index;
        exportRoot.gameView.pointMc.gotoAndStop(exportRoot.gameView.pointMc.totalFrames - index * (exportRoot.gameView.pointMc.totalFrames / MainJs.maxIndex));
        if (exportRoot.gameView.icon["iconGroup" + currentLavel]) {
            if (exportRoot.gameView.icon["iconGroup" + currentLavel]["icon" + index]) {
                exportRoot.gameView.icon["iconGroup" + currentLavel]["icon" + index].gotoAndPlay(1);
            }
        }
        var key = nameConfig[currentPage - 1];
        exportRoot.gameView.nameText.gotoAndStop(key - index - 1);
        setTimer(index);
    }

    function setTimer(pointIndex) {
        if (currentTimer > 0) {
            clearTimeout(currentTimer);
        }
        // currentTimer = setTimeout(function () {
        //     for (var i = 0; i < currentLevelIndex.length; i++) {
        //         var p = config[currentLevelIndex[i] - 1]
        //         var level = p[0];
        //         var index = p[1];
        //         if (level == currentPage) {
        //             if (index == pointIndex) {
        //                 exportRoot.gameView.icon["iconGroup" + currentLavel]["icon" + (pointIndex + 1)].gotoAndPlay(10);
        //                 console.log("flash");
        //                 if (completeLevelIndex.indexOf(i) < 0) {
        //                     completeLevelIndex.push(i);
        //                 }
        //                 exportRoot.gameView.iconText.gotoAndStop(8)
        //                 exportRoot.gameView.bgImgae.gotoAndPlay(1)
        //                 exportRoot.gameView.iconText.textContent.gotoAndStop(i);
        //                 exportRoot.gameView.bgImgae.bg.gotoAndStop(i);
        //                 exportRoot.gameView.topIcon["i" + (i + 1)].gotoAndStop(0);
        //             }
        //         }
        //     }
        //     if (completeLevelIndex.length > 1) {
        //         // goNextLevel();
        //         onGameSuccess();
        //     }
        // }, 500);
    }

    function showBg(pointIndex) {
        for (var i = 0; i < currentLevelIndex.length; i++) {
            var p = config[currentLevelIndex[i] - 1]
            var level = p[0];
            var index = p[1];
            if (level == currentPage) {
                if (index == pointIndex) {
                    exportRoot.gameView.icon["iconGroup" + currentLavel]["icon" + (pointIndex + 1)].gotoAndPlay(10);
                    console.log("flash");
                    if (completeLevelIndex.indexOf(i) < 0) {
                        completeLevelIndex.push(i);
                    }
                    exportRoot.gameView.iconText.gotoAndStop(8)
                    exportRoot.gameView.bgImgae.gotoAndPlay(1)
                    exportRoot.gameView.iconText.textContent.gotoAndStop(i);
                    exportRoot.gameView.bgImgae.bg.gotoAndStop(i);
                    exportRoot.gameView.topIcon["i" + (i + 1)].gotoAndStop(0);
                }
            }
        }
        if (completeLevelIndex.length > 1) {
            // goNextLevel();
            onGameSuccess();
        }
    }

    function goNextLevel() {
        currentLavel += 1;
        this["level" + currentLavel]();
    }

    function level2() {
        exportRoot.gameView.gotoAndPlay('第2关开始位置');
    }

    function pageUp() {
        currentPage--
        // if (currentPage < 0) {
        //     currentPage = 0;
        //     return;
        // }
        console.log("当前页数-：" + currentPage)
        updatePage()
    }

    function pageDown() {
        currentPage++;
        // if (currentPage > maxPage - 1) {
        //     currentPage = maxPage - 1;
        //     return ;
        // }
        console.log("当前页数+：" + currentPage)
        updatePage();
    }

    function updatePage() {
        exportRoot.gameView.topPage.gotoAndStop(pagePointConfig[currentPage + 1]);
        exportRoot.gameView.icon.gotoAndStop(currentPage);
    }

    function endPage() {
        exportRoot.btn.visible = false;
        exportRoot.gameView.gotoAndStop(315);
        exportRoot.gameView.btnReplay.addEventListener("click", replay)

    }

    function replay() {
        exportRoot.gameView.btnReplay.removeEventListener("click", replay)
        // level1();
        // init();
        window.location.href = "./index.html";//删除删除删除删除删除删除删除删除删除
    }

    function onGameSuccess() {
        downtimeControl.stop(function (data) {
            console.log("game success")
            // console.log('游戏用时:' + _t);
            var a = downtimeControl.formatTime(data)
            exportRoot.gameView.timeBox.n5.gotoAndStop(a[0])
            exportRoot.gameView.timeBox.n4.gotoAndStop(a[1])
            exportRoot.gameView.timeBox.n3.gotoAndStop(a[2])
            exportRoot.gameView.timeBox.n2.gotoAndStop(a[3])
            exportRoot.gameView.timeBox.n1.gotoAndStop(a[4])
            exportRoot.gameView.timeBox.n0.gotoAndStop(a[6])
            endPage();
        })
    }

    function addIndex() {
        index++;
        if (index > maxIndex - 1) {
            index = 0;
            //翻页
            pageDown();
        }
        updateIndexInfo();
    }

    function cutIndex() {
        index--;
        if (index < 0) {
            index = maxIndex;
            //翻页
            pageUp();
        }
        updateIndexInfo();
    }

    function updateIndexInfo() {
        console.log("index" + index);
        exportRoot.gameView.pointMc.gotoAndStop(pointLocationConfig[index] - 1);
    }

    return {
        init: init,
        setPoint: setPoint,
        addIndex: addIndex,
        cutIndex: cutIndex
    }
})()

var config = [[1, 8], [1, 1], [2, 6], [1, 7], [2, 1], [2, 3], [3, 3]];
var nameConfig = [10, 20, 26];
var pagePointConfig = [5, 9, 13]//删除删除删除删除删除删除删除删除删除

//=============
var maxIndex = 10;
var maxPage = 3;

//指针动画对应每个点的帧数
var pointLocationConfig = [50, 43, 38, 33, 28, 23, 18, 13, 8, 1]
