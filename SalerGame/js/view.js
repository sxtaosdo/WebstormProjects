/**
 * Created by sxt on 2017/2/20.
 * 视图
 * 产生事件
 */
var View = function () {
    //奔跑状态-停止
    var RUN_STATE_STOP = 1;
    //奔跑状态-奔跑
    var RUN_STATE_RUN = 2;
    //奔跑状态-待选择
    var RUN_STATE_CHOOSE = 3;
    //奔跑状态-通过
    var RUN_STATE_CROSS = 4
    //奔跑状态-掉落
    var RUN_STATE_DROP = 5;
    //奔跑状态-答题
    var RUN_STATE_QUESTION = 6;
    //头像直径
    var HEAD_RADIUS = 100;
    //当前关卡
    var currentLevel = 0;
    //当前关卡配置
    var currentLevelConfig;
    //当前游戏状态
    // var currentState;
    //
    var lastLevel = 0;
    //当前状态
    var runState = 0;
    //游戏视图容器
    var container;
    //小人
    var man;
    //小怪兽
    var monster;
    //答题面板
    var questionPanel;
    //问题房屋索引
    var roomIndex;

    function struct() {
        hammertime.on("press", function (e) {
            changeState(RUN_STATE_RUN);
        });
        hammertime.on("pressup", function (e) {
            changeState(RUN_STATE_STOP);
        });
        hammertime.on("swipeup", function (e) {
            changeState(RUN_STATE_CROSS);
        });
        createjs.Ticker.addEventListener("tick", function (e) {
            if (man) {
                if (man.labels) {
                    // console.log(man.frame.name)
                    if (runState != RUN_STATE_QUESTION) {
                        for (var i = 0; i < man.labels.length; i++) {
                            if (man.currentFrame == man.labels[i].position) {
                                if (man.labels[i].label.indexOf("问题") > -1) {
                                    console.log("问题" + "\t" + man.labels[i].label);
                                    roomIndex = parseInt(man.labels[i].label.substr(2));
                                    changeState(RUN_STATE_QUESTION)
                                } else if (man.labels[i].label.indexOf("转身") > -1) {
                                    console.log("转身" + "\t" + man.labels[i].label)
                                }
                            }
                        }
                    }
                }
            }
        })
    }

    function changeLevel(level) {
        lastLevel = currentLevel;
        currentLevelConfig = config.game.levelConfig[level - 1];

        currentLevel = level;
        initLevelScene()
        createLevel();
        changeState(RUN_STATE_STOP);
    }

    function initLevelScene() {
        Game.getScene().gotoAndStop(currentLevel - 1);
        man = Game.getScene()["level" + currentLevel].manMc;
        monster = Game.getScene()["level" + currentLevel].monsterMc;
        if (currentLevel < config.game.maxLevel) {
            man.addEventListener("ManRunComplete", function () {//小人跑完了
                changeLevel(currentLevel + 1);
            });
        } else {
            //最后一页
            Game.getScene()["level" + currentLevel].addEventListener("gameComplete", function () {//游戏完成了
                Game.changeState(GameState.STATE_END);
            });
            Game.getScene()["level" + currentLevel].completeMc.visible = false;
            monster.addEventListener("monsterRunComplete", function () {
                Game.getScene()["level" + currentLevel].completeMc.visible = true;
                Game.getScene()["level" + currentLevel].completeMc.gotoAndPlay(1);
            });
        }
    }

    //生成关卡
    function createLevel() {
        for (var i = 0; i < currentLevelConfig.node.length; i++) {
            currentLevelConfig.node[i]
        }
    }


    function destruct() {
        currentLevel = lastLevel = 0;
    }

    //切换到游戏场景
    function showGameScene(con) {
        container = con;
        var head = Head.getHead()
        container.addChild(head);
        var ori = Head.getOriginal()
        changeLevel(1);

        container.gameBtn.addEventListener("click", function () {
            changeState(RUN_STATE_RUN);
        });
        changeState(RUN_STATE_STOP);

        //0320新算法
        var oriScale = ori.getBounds();
        if (oriScale) {
            var tempScaleHeight = HEAD_RADIUS / (oriScale.width * ori.scaleY);
            var tempScaleWidth = HEAD_RADIUS / (oriScale.height * ori.scaleX);
            var newScale = Math.min(tempScaleHeight, tempScaleWidth);
            var finalWidth = HEAD_RADIUS / newScale;
            var finalHeight = HEAD_RADIUS / newScale;
            createjs.Tween.get(head).to({scaleY: newScale, scaleX: newScale}, 400);
        }
    }

    function changeState(state) {
        // currentState = runState;
        switch (state) {
            case RUN_STATE_STOP:
                container.gameBtn.gotoAndStop(0);
                container.gameBtn.visible = true;
                break;
            case RUN_STATE_RUN:
                container.gameBtn.visible = false;
                man.visible = true;
                man.play();
                monster.play();
                break;
            case RUN_STATE_CHOOSE:
                break;
            case RUN_STATE_CROSS:
                break;
            case RUN_STATE_DROP:
                break;
            case RUN_STATE_QUESTION:
                //小人进屋消失
                if (man) {
                    man.visible = false;
                    man.stop();
                }
                //小屋动画
                Game.getScene()["level" + currentLevel]["room" + roomIndex].gotoAndPlay(1);
                //弹出答题面板
                setTimeout(showQuestionPanel,500);
                //游戏暂停
                //小怪兽止步
                if (monster) {
                    monster.stop();
                }
                break;

        }
        runState = state;
    }

    function showQuestionPanel() {
        if (!questionPanel) {
            questionPanel = new lib.questionMc();
            questionPanel.sucessMc.stop();
        }
        questionPanel.questionMc.questionPanelMc.addEventListener("click", onSelectAnswer);
        questionPanel.sucessMc.visible = false;
        exportRoot.stage.addChild(questionPanel);
        stage.update();
        questionPanel.questionMc.gotoAndPlay(1);
        var question = QuestionBank.create();
        questionPanel.questionMc.questionPanelMc.titleText.text = "春季有奖问答";
        questionPanel.questionMc.questionPanelMc.questionText.text = question.questText;
        questionPanel.questionMc.questionPanelMc.questionText1.text = question.item[0].text;
        questionPanel.questionMc.questionPanelMc.questionText2.text = question.item[1].text;
        questionPanel.questionMc.questionPanelMc.questionText3.text = question.item[2].text;
        questionPanel.questionMc.questionPanelMc.questionText4.text = question.item[3].text;
    }

    function hideQuestionPanel() {
        questionPanel.questionMc.questionPanelMc.removeEventListener("click", onSelectAnswer);
        setTimeout(function () {
            if (questionPanel) {
                if (questionPanel.parent) {
                    questionPanel.parent.removeChild(questionPanel);
                }
            }
            changeState(RUN_STATE_RUN);
        }, 900)
    }

    function onSelectAnswer(evt) {
        if (evt.target) {
            if (evt.target.name) {
                if (evt.target.name.indexOf("questionText") > -1) {
                    var key = evt.target.name.substr(12);
                    if (QuestionBank.solve(parseInt(key) - 1)) {
                        console.log(true);
                        questionPanel.sucessMc.visible = true;
                        questionPanel.sucessMc.gotoAndPlay(1);
                    } else {
                        console.log(false);

                    }
                    hideQuestionPanel();
                }
            }
        }
    }

    return {
        init: struct,
        changeLevel: changeLevel,
        destruct: destruct,
        showGameScene: showGameScene,
        changeState: changeState
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

    var headCon;
    var headBmp;
    var headAll;

    function struct() {
        headCon = new createjs.MovieClip();
        headMask = new createjs.Shape();
        headMask.graphics.beginFill("#ff0000").drawCircle(640 >> 1, 475, 267);
        beginPoint = {};

        headAll = new createjs.Container();
        headAll.addChild(headCon);

        window.onmousewheel = document.onmousewheel = pcTest;
    }

    function destruct() {
        enableHead();
    }

    function pcTest(e) {
        // e = e || window.event;
        // console.log("wheelDelta:" + e.wheelDelta + "\tdetail:" + e.detail);
        if (e.wheelDelta > 0) {
            headCon.scaleY = headCon.scaleX = (headCon.scaleY + 0.03);
        } else {
            headCon.scaleY = headCon.scaleX = (headCon.scaleY - 0.03);
        }
        console.log("headCon.scaleY:" + headCon.scaleY);
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
    function selectHead(content, callback) {
        headContent = content;
        var btn = document.getElementById("inputBtn");
        btn.onchange = function () {
            var temp = document.getElementById("inputBtn").files[0];
            var reader = new FileReader();
            reader.readAsDataURL(temp);
            reader.onload = function () {
                lastScale = 1;
                onHead(reader.result);
                if (callback) {
                    callback.call();
                }
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
