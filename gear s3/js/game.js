/**
 * Created by cheilchina on 2016/12/14.
 */

function endPage(a) {
    exportRoot.btn.visible = false;
    exportRoot.gameView.gotoAndStop(315);
    if (true) {
        console.log(a,exportRoot.gameView.successMc.timeBox2.n5);
        exportRoot.gameView.successMc.visible = true;
        exportRoot.gameView.failMc.visible = false;

        setTimeout(function(){
            exportRoot.gameView.successMc.timeBox2.visible = true;
            exportRoot.gameView.successMc.timeBox2.n5.gotoAndStop(a[0])
            exportRoot.gameView.successMc.timeBox2.n4.gotoAndStop(a[1])
            exportRoot.gameView.successMc.timeBox2.n3.gotoAndStop(a[2])
            exportRoot.gameView.successMc.timeBox2.n2.gotoAndStop(a[3])
            exportRoot.gameView.successMc.timeBox2.n1.gotoAndStop(a[4])
            exportRoot.gameView.successMc.timeBox2.n0.gotoAndStop(a[6])
        },30)



    } else {
        exportRoot.gameView.successMc.visible = false;
        exportRoot.gameView.failMc.visible = true;
    }

    //exportRoot.gameView.btnReplay.addEventListener("click", replay)

}
var GameJs = (function () {
    //当前关卡的任务目标
    var currentLevelIndex = {};
    //已找到的目标
    // var completeLevelIndex = [];
    //当前关卡
    var currentLavel = 0;
    //当前页数
    var currentPage = 0;
    //当前指针位置
    var index = 0;
    //上一个指向的图标
    var lastIndex = 0;
    //上一页
    var lastPage = 0;
    //计时器
    var currentTimer = -1;
    //是否进入详情状态
    var isInfo = false;
    //游戏结果
    var gameResour = false;
    //已经找到的任务图标数量
    var findedNum = 0;

    var init = function () {
        console.log("init")
        exportRoot.gameView.gotoAndStop(0);

        exportRoot.gameView.btn.addEventListener("click", level1);
        exportRoot.btn.addEventListener("mousedown", onMouseDown);

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
        GUtil.addFrameEvent(exportRoot.gameView, 'showIcon', function () {
            // downtimeControl.reset();
            downtimeControl.start(exportRoot.gameView.timeBox, function () {
                endPage();
            }, 120);

            exportRoot.gameView.topIcon.gotoAndPlay(1);
        })

        GUtil.addFrameEvent(exportRoot.gameView.topIcon, 'iconShowComplete', function () {
            exportRoot.gameView.nameText.gotoAndStop(9)
            exportRoot.gameView.pointMc.gotoAndStop(49)
            exportRoot.gameView.bgImgae.gotoAndStop(0)
            exportRoot.gameView.topPage.gotoAndPlay(0);
            exportRoot.gameView.iconText.visible = true;

            showTaskIcon();
        })
        GUtil.addFrameEvent(exportRoot.gameView, 'level', function () {
            exportRoot.gameView.contentImage.gotoAndStop(0);
            exportRoot.gameView.iconText.visible = false;
        })


        GUtil.addFrameEvent(exportRoot.gameView, 'level2Complete', function () {
            updatePage()
            updateIndexInfo();
        })
        GUtil.addFrameEvent(exportRoot.gameView, 'level3Complete', function () {
            updatePage()
            updateIndexInfo();
        })
    }

    function onIconClick(evt) {
        console.log("click btn index:" + evt.target.name)
        if (index == parseInt(evt.target.name)) {
            showBg(index)
        }
    }

    function onMouseDown() {
        exportRoot.removeEventListener("mousedown", onMouseDown);
        exportRoot.gameView.toolTips.visible = false;
    }

    function reset() {
        currentLavel = 1;
        exportRoot.btn.visible = true;
        exportRoot.gameView.gotoAndPlay(1);
        exportRoot.gameView.pointMc.gotoAndStop(49)
    }

    //生成关卡目标数据
    function createTaskData(num) {
        currentLevelIndex = {};
        var total = 0;
        var i = 0;
        console.log("当前关卡任务图标索引：")
        while (total != num) {
            var key = Math.floor(Math.random() * 7) + 1;
            if (!currentLevelIndex[key]) {
                currentLevelIndex[key] = true;
                total++;
                console.log(key);
            }
        }
    }

    function level2() {
        exportRoot.gameView.gotoAndPlay('第2关开始位置');
        createTaskData(levelTask[1]);
        showTaskIcon();
        currentPage = 0;
        index = 0;
        updateIndexInfo();
        // updatePage();
    }

    function level3() {
        exportRoot.gameView.gotoAndPlay('第3关开始位置');
        createTaskData(levelTask[2]);
        showTaskIcon();
        currentPage = 0;
        index = 0;
        updateIndexInfo();
        // updatePage();
    }

    function level1() {
        reset();

        createTaskData(levelTask[0]);
        index = 0;
        updateIndexInfo();
    }

    function showTaskIcon() {
        try {
            for (var obj in currentLevelIndex) {
                console.log(obj);
                exportRoot.gameView.topIcon["i" + obj].gotoAndStop(1);
            }
        } catch (e) {
            console.error("obj" + obj + "\n " + e);
        }
    }

    function setPoint(index) {//0~9
        // portIndex = index;
        // exportRoot.gameView.pointMc.gotoAndStop(exportRoot.gameView.pointMc.totalFrames - index * (exportRoot.gameView.pointMc.totalFrames / MainJs.maxIndex));
        // if (exportRoot.gameView.icon["iconGroup" + currentLavel]) {
        //     if (exportRoot.gameView.icon["iconGroup" + currentLavel]["icon" + index]) {
        //         exportRoot.gameView.icon["iconGroup" + currentLavel]["icon" + index].gotoAndPlay(1);
        //     }
        // }
        // var key = nameConfig[currentPage - 1];
        // exportRoot.gameView.nameText.gotoAndStop(key - index - 1);
        // setTimer(index);
    }

    //停留处理
    function setTimer() {
        if (currentTimer > 0) {
            clearTimeout(currentTimer);
        }
        currentTimer = setTimeout(function () {
            for (var obj in currentLevelIndex) {
                var p = config[obj - 1];
                var level = p[0];
                var px = p[1];
                if (level == (currentPage + 1)) {
                    if (px == index) {
                        //图标闪烁
                        exportRoot.gameView.icon["iconGroup" + (currentPage + 1)]["icon" + (index + 1)].gotoAndPlay(10);
                        //图标详细描述
                        exportRoot.gameView.iconText.visible = true;
                        exportRoot.gameView.iconText.gotoAndPlay(1)
                        exportRoot.gameView.iconText.textContent.gotoAndStop(obj - 1);
                    }
                }
            }

        }, 1000);
    }

    //点击处理
    function showBg(pointIndex) {
        for (var obj in currentLevelIndex) {
            var p = config[obj - 1]
            var level = p[0];
            var index = p[1];
            if (level == (currentPage + 1)) {
                if (index == pointIndex) {
                    exportRoot.gameView.icon["iconGroup" + (currentPage + 1)]["icon" + (pointIndex + 1)].gotoAndPlay(10);
                    // console.log("flash");
                    // if (completeLevelIndex.indexOf(i) < 0) {
                    //     completeLevelIndex.push(i);
                    // }
                    findedNum++;
                    currentLevelIndex[obj] = true;

                    try {
                        exportRoot.gameView.bgImgae.gotoAndPlay(1)
                        exportRoot.gameView.bgImgae.bg.gotoAndStop(obj - 1);
                        exportRoot.gameView.topIcon["i" + (obj)].gotoAndStop(0);
                        exportRoot.gameView.contentImage.centerImage.gotoAndStop(obj - 1);
                        exportRoot.gameView.contentImage.gotoAndPlay(1);
                        exportRoot.gameView.icon["iconGroup" + currentLavel].gotoAndPlay('out');
                        isInfo = true;
                    } catch (e) {
                        console.error("i:" + i + "\n" + e);
                    }

                }
            }
        }

        if (findedNum >= levelTask[currentLavel - 1]) {
            goNextLevel();
        }
    }

    function goNextLevel() {
        currentLavel += 1;
        findedNum = 0;
        if (currentLavel > maxLevel) {
            onGameSuccess();
        } else {
            try {
                switch (currentLavel) {
                    case 2:
                        level2()
                        break;
                    case 3:
                        level3()
                        break;
                }
                // this["level" + currentLavel]();
            } catch (e) {
                console.error("currentLavel:" + currentLavel + "\n" + e);
            }

        }
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

    function check() {
        if (isInfo) {//如果在详情界面则退出
            exportRoot.gameView.contentImage.gotoAndStop(0);
            exportRoot.gameView.icon["iconGroup" + currentLavel].gotoAndStop(15);
            isInfo = false;
            return false;
        }
        return true
    }

    function updatePage() {
        exportRoot.gameView.topPage.gotoAndPlay('l' + (lastPage + 1) + (currentPage + 1));
        console.log("l" + lastPage + currentPage)
        exportRoot.gameView.icon.gotoAndStop(currentPage);
        lastPage = currentPage;
    }



    function replay() {
        exportRoot.gameView.btnReplay.removeEventListener("click", replay)
        // level1();
        // init();
        // window.location.href = "./index.html";//删除删除删除删除删除删除删除删除删除
        level1();
    }

    function onGameSuccess() {
        gameResour = true;
        downtimeControl.stop(function (data) {
            var a = downtimeControl.formatTime(data)
            console.log("game success,用时：" + a);

            endPage(a);
        })
    }

    function addIndex() {
        if (check()) {
            index++;
            if (index >= maxIndex[currentPage]) {
                // index = 0;
                switch (currentPage) {
                    case 0:
                    case 1:
                        index = 1;
                        break;
                    case 2:
                        return;
                }
                //翻页
                pageDown();
            }
            updateIndexInfo();
        }

    }

    function cutIndex() {
        if (check()) {
            index--;
            if (index < 0) {
                index = maxIndex[currentPage];
                switch (currentPage) {
                    case 1:
                    case 2:
                        index = 8;
                        break;
                    case 0:
                        return;
                }
                //翻页
                pageUp();
            }
            updateIndexInfo();
        }

    }

    function updateIndexInfo() {
        // console.log("index" + index);
        exportRoot.gameView.pointMc.gotoAndStop(pointLocationConfig[index] - 1);
        exportRoot.gameView.nameText.gotoAndStop(currentPage);
        exportRoot.gameView.nameText["textList" + (currentPage + 1)].gotoAndStop(index);
        //图标指向动画
        exportRoot.gameView.icon["iconGroup" + (currentPage + 1)]["icon" + (index + 1)].gotoAndPlay(1);
        if (exportRoot.gameView.icon["iconGroup" + (currentPage + 1)]["icon" + (lastIndex + 1)]) {
            exportRoot.gameView.icon["iconGroup" + (currentPage + 1)]["icon" + (lastIndex + 1)].gotoAndPlay(5);
        }
        lastIndex = index;
        exportRoot.gameView.iconText.visible = false;
        setTimer()
    }

    return {
        init: init,
        setPoint: setPoint,
        addIndex: addIndex,
        cutIndex: cutIndex
    }
})()
//任务图标所在页数和索引
var config = [[1, 8], [1, 1], [2, 6], [1, 6], [2, 1], [2, 3], [3, 3]];
// var nameConfig = [10, 20, 26];
// var pagePointConfig = [5, 9, 13]//删除删除删除删除删除删除删除删除删除
//关卡任务的图标数量
var levelTask = [3, 5, 7];
//每页最大图标数量
var maxIndex = [10, 10, 6]

//=============
var maxPage = 3;
var maxLevel = 3;

//指针动画对应每个点的帧数
var pointLocationConfig = [50, 43, 38, 33, 28, 23, 18, 13, 8, 1]
