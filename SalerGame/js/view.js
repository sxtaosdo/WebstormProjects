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
    //头像容器
    var headContainer;

    function struct() {
        headContainer = new createjs.Container();
        changeLevel(1);
    }

    function changeLevel(level) {
        lastLevel = currentLevel;
        currentLevel = level;
    }

    function destruct() {
        currentLevel = lastLevel = 0;
    }

    function showGameScene() {
        var head = Head.getHead()
        Game.getScene().addChild(head);
        var info = head.getBounds();
        var min = Math.min(info.width, info.height);
        // head.scaleY = head.scaleX = HEAD_RADIUS / min;
        createjs.Tween.get(head).to({scaleY: HEAD_RADIUS / min, scaleX: HEAD_RADIUS / min}, 800);
        test();
    }

    function test() {
        $(window).swipe({
            swipeUp: function (event, direction, distance, duration, fingerCount) {
                headContainer.scaleX = headContainer.scaleY = (headContainer.scaleX + 0.1)
            },
        });
        $(window).swipe({
            swipeDown: function (event, direction, distance, duration, fingerCount) {
                headContainer.scaleX = headContainer.scaleY = (headContainer.scaleX - 0.1)
            },
        });
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
    //

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
    var headCon;
    var headBmp;
    var headMask;

    function struct() {
        headCon = new createjs.Container();
        headMask = new createjs.Shape();
        headMask.graphics.beginFill("#ff0000").drawCircle(640 >> 1, 475, 267);
    }

    function destruct() {

    }

    function setHead(data) {

    }

    function selectHead() {
        var btn = document.getElementById("inputBtn");
        btn.onchange = function () {
            var temp = document.getElementById("inputBtn").files[0];
            console.log(temp);
            var reader = new FileReader();
            reader.readAsDataURL(temp);
            reader.onload = function () {
                onHead(reader.result);
            };
        }
        btn.click();
    }

    function onHead(imageData) {
        clearnHead();
        headBmp = new createjs.Bitmap(imageData);
        headBmp.mask = headMask;
        headCon.addChild(headBmp);
        exportRoot.stage.addChild(headCon);
    }

    function clearnHead() {
        if (headBmp && headBmp.parent) {
            headBmp.parent.removeChild(headBmp);
        }
    }

    function getHead() {
        return headCon;
    }

    return {
        init: struct,
        destruct: destruct,
        setHead: setHead,
        getHead: getHead,
        selectHead: selectHead
    }
}()
