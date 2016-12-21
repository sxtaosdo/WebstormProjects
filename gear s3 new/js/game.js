/**
 * Created by cheilchina on 2016/12/14.
 */
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
    //是否开始游戏
    var isStar = false;
    //是否在结束界面
    var isEndPage = false;
    //是否正在播放切页动画
    var isChangePage = false;

    var init = function () {
        console.log("init")
        exportRoot.gameView.gotoAndStop(0);


        exportRoot.gameView.btn.addEventListener("click", level1);
        exportRoot.btn.addEventListener("mousedown", onMouseDown);
        exportRoot.gameView.btn2.addEventListener("click", showRule);
        exportRoot.gameView.topIcon.visible = false;
        exportRoot.gameView.icon.iconGroup1.gotoAndStop(0)

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

        exportRoot.gameView.contentImage.gotoAndStop(0);
        exportRoot.gameView.daojishi.gotoAndStop(0);
        showErrorText(false);
        exportRoot.gameView.nameText.visible = false;

        //============
        GUtil.addFrameEvent(exportRoot.gameView.icon.iconGroup1, 'complete', function () {
            isChangePage = false;
        })
        GUtil.addFrameEvent(exportRoot.gameView.icon.iconGroup2, 'complete', function () {
            isChangePage = false;
        })
        GUtil.addFrameEvent(exportRoot.gameView.icon.iconGroup3, 'complete', function () {
            isChangePage = false;
        })

        GUtil.addFrameEvent(exportRoot.gameView, 0, function () {
            exportRoot.gameView.icon.iconGroup1.gotoAndStop(0)
        })
        GUtil.addFrameEvent(exportRoot.gameView.topIcon, 0, function () {
            clearnTimer(exportRoot.gameView.timeBox);
        })
        GUtil.addFrameEvent(exportRoot.gameView, 'lastFrame', function () {
            exportRoot.gameView.successMc.timeBox2.visible = true;
        })
        GUtil.addFrameEvent(exportRoot.gameView, 'showIcon', function () {
            // downtimeControl.reset();
            downtimeControl.start(exportRoot.gameView.timeBox, function () {
                endPage();
            }, 120);
            exportRoot.gameView.topIcon.gotoAndPlay(1);
        })

        GUtil.addFrameEvent(exportRoot.gameView.topIcon, 'iconShowComplete', function () {
            exportRoot.gameView.nameText.gotoAndStop(9);
            exportRoot.gameView.pointMc.gotoAndStop(49);
            exportRoot.gameView.bgImgae.gotoAndStop(0);
            exportRoot.gameView.topPage.gotoAndPlay(0);
            exportRoot.gameView.iconText.visible = true;

            showTaskIcon();
        })
        GUtil.addFrameEvent(exportRoot.gameView, 'level', function () {
            exportRoot.gameView.contentImage.gotoAndStop(0);
            exportRoot.gameView.iconText.visible = false;
        })


        GUtil.addFrameEvent(exportRoot.gameView, 'level1Complete', function () {
            exportRoot.gameView.icon.visible = true;
            exportRoot.gameView.icon.gotoAndStop(0);
            exportRoot.gameView.icon.iconGroup1.gotoAndPlay(1);
            exportRoot.gameView.pointMc.gotoAndStop(49);
            exportRoot.gameView.contentImage.gotoAndStop(0)
            exportRoot.gameView.nameText.visible = true;
            exportRoot.gameView.topIcon.visible = true;
            exportRoot.gameView.topIcon.gotoAndPlay(1);
            isStar = true;
        })

        GUtil.addFrameEvent(exportRoot.gameView, 'level2Complete', function () {
            exportRoot.gameView.icon.visible = true;
            exportRoot.gameView.contentImage.gotoAndStop(0)
            exportRoot.gameView.icon.gotoAndStop(0);
            exportRoot.gameView.icon.iconGroup1.gotoAndPlay(1);
            exportRoot.gameView.nameText.visible = true;
            updateIndexInfo()
            isStar = true;
        })
        GUtil.addFrameEvent(exportRoot.gameView, 'level3Complete', function () {
            exportRoot.gameView.icon.visible = true;
            exportRoot.gameView.contentImage.gotoAndStop(0)
            exportRoot.gameView.icon.gotoAndStop(0);
            exportRoot.gameView.icon.iconGroup1.gotoAndPlay(1);
            exportRoot.gameView.nameText.visible = true;
            updateIndexInfo()
            isStar = true;
        })
        GUtil.addFrameEvent(exportRoot.gameView, '第1关开始位置', function () {
            exportRoot.gameView.daojishi.gotoAndPlay(1);
            clearnTimer(exportRoot.gameView.timeBox);
        })
        GUtil.addFrameEvent(exportRoot.gameView, '第2关开始位置', function () {
            exportRoot.gameView.daojishi.gotoAndPlay(1);
        })
        GUtil.addFrameEvent(exportRoot.gameView, '第3关开始位置', function () {
            exportRoot.gameView.daojishi.gotoAndPlay(1);
        })
    }

    function showRule() {
        WebData.showRule();
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
        try {
            LinkClick('cn:gears3tryandbuy_20161220_525:click_startgame', 'o')
        } catch (e) {

        }
    }

    function reset() {
        currentLavel = 1;
        exportRoot.btn.visible = true;
        exportRoot.gameView.gotoAndPlay(1);
        exportRoot.gameView.pointMc.gotoAndStop(49)
        exportRoot.gameView.daojishi.gotoAndStop(0);
        exportRoot.gameView.contentImage.gotoAndStop(0)
        exportRoot.gameView.topIcon.visible = false;
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
    }

    function level3() {
        exportRoot.gameView.gotoAndPlay('第3关开始位置');
        createTaskData(levelTask[2]);
        showTaskIcon();
        currentPage = 0;
        index = 0;
        // updateIndexInfo();
    }

    function level1() {
        reset();
        createTaskData(levelTask[0]);
        currentPage = 0;
        index = 0;
        // updateIndexInfo();
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
        var key = false;
        for (var obj in currentLevelIndex) {
            var p = config[obj - 1]
            var level = p[0];
            var index = p[1];
            if (level == (currentPage + 1)) {
                if (index == pointIndex) {
                    key = true;
                    if (currentLevelIndex[obj] == false) {
                        return;
                    }
                    exportRoot.gameView.icon["iconGroup" + (currentPage + 1)]["icon" + (pointIndex + 1)].gotoAndPlay(10);
                    findedNum++;
                    currentLevelIndex[obj] = false;

                    try {
                        exportRoot.gameView.bgImgae.gotoAndPlay(1)
                        exportRoot.gameView.bgImgae.bg.gotoAndStop(obj - 1);
                        exportRoot.gameView.topIcon["i" + (obj)].gotoAndStop(0);
                        exportRoot.gameView.contentImage.visible = true;
                        exportRoot.gameView.contentImage.centerImage.gotoAndStop(obj - 1);
                        exportRoot.gameView.contentImage.gotoAndPlay(1);
                        exportRoot.gameView.icon["iconGroup" + currentLavel].gotoAndPlay('out');
                        createjs.Sound.play("trueSound")
                        isInfo = true;
                        console.log(currentLevelIndex);
                    } catch (e) {
                        console.error("i:" + i + "\n" + e);
                    }

                }
            }
        }

        if (!key) {
            var instance = createjs.Sound.play("errorSound")
            showErrorText(true);
        }

        if (findedNum >= levelTask[currentLavel - 1]) {
            goNextLevel();
        }
    }

    function showErrorText(key) {
        exportRoot.gameView.errorTextMc.visible = key;
        if (isStar) {
            exportRoot.gameView.nameText.visible = !key;
        }
    }

    function goNextLevel() {
        isStar = false;
        isInfo = false;
        currentLavel += 1;
        findedNum = 0;
        if (currentLavel > maxLevel) {
            onGameSuccess();
        } else {
            exportRoot.gameView.icon.visible = false;
            exportRoot.gameView.contentImage.visible = false;
            exportRoot.gameView.nameText.visible = false;
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
        console.log("当前页数-：" + currentPage)
        updatePage()

    }

    function pageDown() {
        currentPage++;
        console.log("当前页数+：" + currentPage)
        updatePage();
    }

    function check() {
        if (!isEndPage) {
            tick = createjs.Sound.play("moveSound");
            showErrorText(false);
        }
        if (isStar == false) {//是否已经进入游戏
            return false;
        }
        if (isInfo) {//如果在详情界面则退出
            exportRoot.gameView.contentImage.gotoAndStop(0);
            exportRoot.gameView.icon["iconGroup" + currentLavel].gotoAndStop(15);
            isInfo = false;
            return false;
        }
        return true
    }

    function updatePage() {
        isChangePage = true;
        exportRoot.gameView.topPage.gotoAndStop('l' + (lastPage + 1) + (currentPage + 1));
        console.log("l" + lastPage + currentPage)
        exportRoot.gameView.icon.gotoAndStop(currentPage);
        exportRoot.gameView.icon.visible = true;
        lastPage = currentPage;
    }

    function endPage(a) {
        // $('#dida')[0].stop();
        isEndPage = true;
        exportRoot.gameView.icon.visible = false;
        exportRoot.btn.visible = false;
        exportRoot.gameView.contentImage.gotoAndStop(0)
        exportRoot.gameView.successMc.timeBox2.visible = false;
        stage.update()
        clearnTimer(exportRoot.gameView.timeBox);
        exportRoot.gameView.nameText.visible = false;
        isStar = false;
        if (gameResour) {
            var instance = createjs.Sound.play("successSound")
            exportRoot.gameView.successMc.visible = true;
            exportRoot.gameView.failMc.visible = false;
            setTimeout(function () {
                try {
                    exportRoot.gameView.successMc.timeBox2.visible = true;
                    exportRoot.gameView.successMc.timeBox2.n5.gotoAndStop(a[0])
                    exportRoot.gameView.successMc.timeBox2.n4.gotoAndStop(a[1])
                    exportRoot.gameView.successMc.timeBox2.n3.gotoAndStop(a[2])
                    exportRoot.gameView.successMc.timeBox2.n2.gotoAndStop(a[3])
                    exportRoot.gameView.successMc.timeBox2.n1.gotoAndStop(a[4])
                    exportRoot.gameView.successMc.timeBox2.n0.gotoAndStop(a[6])
                } catch (e) {
                    console.error("a:" + a + "\t " + e);
                }
            }, 100)
            var key = Math.floor(Math.random() * 4);
            exportRoot.gameView.successMc.randomText.gotoAndStop(key);
            WebData.startlottery(score, function () {
            });
            console.log("endPage");
        } else {
            var instance = createjs.Sound.play("failSound")
            exportRoot.gameView.successMc.visible = false;
            exportRoot.gameView.failMc.visible = true;
            var key = Math.floor(Math.random() * 5);
            exportRoot.gameView.failMc.randomText2.gotoAndStop(key);
        }
        exportRoot.gameView.gotoAndStop(315);
        exportRoot.gameView.btnReplay.addEventListener("click", replay);
        exportRoot.gameView.shareBtn.addEventListener("click", share);
        exportRoot.gameView.jimiBtn.addEventListener("click", jimi);
        exportRoot.gameView.bugBtn.addEventListener("click", bug);
    }

    function share() {
        WebData.showshare();
        try {
            LinkClick('cn:gears3tryandbuy_20161220_525:share', 'o');
        } catch (e) {

        }
    }

    function jimi() {
        WebData.showsecret()
        try {
            LinkClick('cn:gears3tryandbuy_20161220_525:gears3_detail', 'o');
        } catch (e) {

        }
    }

    function bug() {
        window.location.href = "https://www.samsungshop.com.cn/item/SM-R760/341.htm";
        try {
            LinkClick('cn:gears3tryandbuy_20161220_525:buy_gears3', 'o');
        } catch (e) {

        }
    }

    function replay() {
        isEndPage = false;
        exportRoot.gameView.btnReplay.removeEventListener("click", replay)
        level1();
        try {
            LinkClick('cn:gears3tryandbuy_20161220_525:challenge_again', 'o');
        } catch (e) {

        }

    }

    function onGameSuccess() {
        gameResour = true;
        downtimeControl.stop(function (data) {
            score = data;
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
                        index = maxIndex[currentPage] - 1;
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
                        index = 0;
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
        console.log("nameText:" + currentPage + "\t index:" + index)
        //图标指向动画
        try {
            exportRoot.gameView.icon["iconGroup" + (currentPage + 1)]["icon" + (index + 1)].gotoAndPlay(1);
            if (exportRoot.gameView.icon["iconGroup" + (currentPage + 1)]["icon" + (lastIndex + 1)]) {
                exportRoot.gameView.icon["iconGroup" + (currentPage + 1)]["icon" + (lastIndex + 1)].gotoAndPlay(5);
            }
        } catch (e) {
            console.error("currentPage:" + currentPage + "index:" + index + e);
        }

        lastIndex = index;
        exportRoot.gameView.iconText.visible = false;
        setTimer()
    }

    function clearnTimer(box) {
        box.n5.gotoAndStop(0)
        box.n4.gotoAndStop(0)
        box.n3.gotoAndStop(0)
        box.n2.gotoAndStop(0)
        box.n1.gotoAndStop(0)
        box.n0.gotoAndStop(0)
    }

    return {
        init: init,
        addIndex: addIndex,
        cutIndex: cutIndex,
        currentPage: currentPage,
        index: index
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
var score = 0;

//声音
var tick