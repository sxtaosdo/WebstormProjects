/**
 * Created by sxt on 2017/2/20.
 * 视图
 * 产生事件
 */
var View = function () {
    var RUN_STATE_STOP = 1;
    var RUN_STATE_RUN = 2;
    var RUN_STATE_DROP = 3;
    //头像直径
    var HEAD_RADIUS = 100;
    //当前关卡
    var currentLevel = 0;
    //
    var lastLevel = 0;
    //当前状态
    var runState = 0;
    //游戏视图容器
    var container;

    function struct() {
        changeLevel(1);
    }

    function changeLevel(level) {
        lastLevel = currentLevel;
        currentLevel = level;
    }

    function destruct() {
        currentLevel = lastLevel = 0;
    }

    function showGameScene(con) {
        container = con;
        var head = Head.getHead()
        container.addChild(head);
        var ori = Head.getOriginal()

        //0320新算法
        var oriScale = ori.getBounds();
        var tempScaleHeight = HEAD_RADIUS / (oriScale.width * ori.scaleY);
        var tempScaleWidth = HEAD_RADIUS / (oriScale.height * ori.scaleX);
        var newScale = Math.min(tempScaleHeight, tempScaleWidth);
        var finalWidth = HEAD_RADIUS / newScale;
        var finalHeight = HEAD_RADIUS / newScale;
        createjs.Tween.get(head).to({scaleY: newScale, scaleX: newScale}, 400);
        console.log("newScale:" + newScale);
    }

    return {
        init: struct,
        changeLevel: changeLevel,
        destruct: destruct,
        showGameScene: showGameScene
    }
}()


/**
 * 题库
 */
var QuestionBank = function () {
    //答题总数
    var questionNum = 10;
    //求助删除的选项数量
    var delErrorNum = 2;
    //已经出现过的提
    var showedList;
    //题库配置
    var configList;
    //当前题目
    var currentQuest;

    function struct() {
        showedList = [];
        configList = [];
        parseConfig();
    }

    function destruct() {
        configList = configList.concat(showedList);
    }

    //产生一个问题
    function createQuestion() {
        var tempId = Math.floor(Math.random() * configList.length);
        var question = configList.splice(tempId, 1)[0];
        if (question) {
            showedList.push(question);
            currentQuest = randomItem(question);
            if (true) {//调试用代码
                var temp = "";
                for (var i = 0; i < question.item.length; i++) {
                    if (question.item[i].key) {
                        temp += ("[" + question.item[i].text + "]" + "|");
                        question.answer.push(i);
                    } else {
                        temp += question.item[i].text + "|";
                    }
                }
                console.log(question.questText + "\t" + temp);
            }
            return currentQuest;
        } else {
            console.error("没有题目");
        }
    }

    //求助
    function getHelp() {
        var max = Math.min(currentQuest.item.length - 1, delErrorNum);
        var delList = [];
        while (delList.length < max) {
            var key = Math.floor(Math.random() * currentQuest.item.length)
            if (currentQuest.answer.indexOf(key) == -1) {
                if (delList.indexOf(key) == -1) {
                    delList.push(key);
                }
            }
        }
        console.log(delList);
        return delList;
    }

    //打乱选项顺序
    function randomItem(question) {
        var tempItem = [];
        var tempKey = 0;
        try {
            while (question.item.length > 0) {
                tempKey = Math.floor(Math.random() * question.item.length);
                tempItem.push(question.item.splice(tempKey, 1)[0]);
            }
            question.item = tempItem;
            return question;
        } catch (e) {
            return null;
        }
    }

    //答题，仅单选题
    function solve(key) {
        try {
            if (currentQuest.item[key].key) {
                console.log(true)
                return true;
            }
        } catch (e) {
            console.log(false)
            return false;
        }
        console.log(false)
        return false;
    }

    //解析配置文件
    function parseConfig() {
        configList = config.question;
    }

    return {
        init: struct,
        destruct: destruct,
        create: createQuestion,
        getHelp: getHelp,
        solve: solve
    }
}()


/**
 * 计分器
 */
var ScoreIndicator = function () {
    //当前的分
    var cores = 0;
    //得分配置
    var config;
    //标准分
    var verage = 0;

    function struct() {
        cores = 0;
    }

    function destruct() {
        cores = 0;
    }

    function add() {
        cores = 0;
    }

    function minus() {
        if (cores < 0) {
            cores = 0;
        }
    }

    //当前分值与标准分值的差值
    function offset() {
        return 0;
    }

    //解析配置文件
    function parseConfig() {

    }

    return {
        init: struct,
        destruct: destruct,
        minus: minus,
        add: add,
        offset: offset,
        cores: cores
    }
}()

var Head = function () {
    //上边界
    var TOP = 200;
    //左边界
    var LEFT = 50;
    //直径
    var LENGTH = 267;
    //最大缩放比
    var MAX_SIZE = 1280;
    //第一次触摸
    var isFristTouch = true;
    //当前缩放
    var lastScale = 1;
    //容器
    var headContent;
    //移动速率
    var MOVE_SPEED = 15;

    var hammertime;
    var headCon;
    var headBmp;
    var headAll;

    function struct() {
        headCon = new createjs.MovieClip();
        headMask = new createjs.Shape();
        headMask.graphics.beginFill("#ff0000").drawCircle(640 >> 1, 475, 267);

        var temp = document.getElementById("canvas");
        hammertime = new Hammer(temp);
        hammertime.add(new Hammer.Pinch());
        beginPoint = {};

        headAll = new createjs.Container();
        headAll.addChild(headCon);
    }

    function destruct() {
        enableHead();
    }

    //设置头像
    function setHead() {
        hammertime.on('panmove', function (ev) {
            if (ev.type == "panmove") {
                headCon.x = ev.velocityX * MOVE_SPEED + headCon.x;
                headCon.y = ev.velocityY * MOVE_SPEED + headCon.y;
            }
        });

        hammertime.on("pinchin", function (e) {
            setHeadScale(e);

        });

        hammertime.on("pinchout", function (e) {
            var max = Math.max(headCon.scaleX * headCon.getBounds().width, headCon.scaleY * headCon.getBounds().height)
            if (max < MAX_SIZE) {
                setHeadScale(e);
            }
        });
        hammertime.on("pinchend", function (e) {
            lastScale = headCon.scaleY;
        });
    }

    function setHeadScale(e) {
        headCon.scaleY = headCon.scaleX = e.scale * lastScale;
    }

    //选择头像
    function selectHead(content) {
        headContent = content;
        var btn = document.getElementById("inputBtn");
        btn.onchange = function () {
            var temp = document.getElementById("inputBtn").files[0];
            var reader = new FileReader();
            reader.readAsDataURL(temp);
            reader.onload = function () {
                lastScale = 1;
                onHead(reader.result);
            };
        }
        btn.click();
        setHead();
    }

    function onHead(imageData) {
        clearnHead();
        headBmp = new createjs.Bitmap(imageData);

        headCon.addChild(headBmp);
        headCon.mask = headMask;

        var bound = headBmp.getBounds();
        headCon.regX = bound.width >> 1;
        headCon.regY = bound.height >> 1;

        headCon.x = document.body.clientWidth >> 1;
        headCon.y = document.body.clientHeight >> 1;
        var min = Math.min(bound.width, bound.height);
        lastScale = headCon.scaleX = headCon.scaleY = 640 / min;
        lastBound = headCon.getBounds();
        headContent.addChildAt(headAll, 0);
        clone();
    }

    //克隆一个头像
    function clone() {
        var tempHead = new createjs.Bitmap();
        var temp = tempHead.draw(headAll);
        console.log(temp);
        // headContent.parent.removeChild(headContent);
        exportRoot.stage.addChild(tempHead);
    }

    function clearnHead() {
        if (headBmp && headBmp.parent) {
            headBmp.parent.removeChild(headBmp);
        }
    }

    function getHead() {
        return headAll;
    }

    function enableHead() {
        hammertime.off("pinchin");
        hammertime.off("pinchout");
        hammertime.off("pinchend");
        hammertime.off("panmove");
    }

    function getOriginal() {
        return headCon;
    }

    return {
        init: struct,
        destruct: destruct,
        setHead: setHead,
        getHead: getHead,
        selectHead: selectHead,
        enableHead: enableHead,
        getOriginal: getOriginal
    }
}()
