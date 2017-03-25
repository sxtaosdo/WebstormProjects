/**
 * Created by sxt on 2017/2/20.
 * 游戏
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
    var roomIndex = -1;
    //事件节点索引
    var nodeIndex = -1;
    //小人朝向
    var is2Left = true;
    //是否击中陷阱
    var isHit = false;

    function struct() {
        hammertime.on("press", function (e) {
            changeState(RUN_STATE_RUN);
        });
        hammertime.on("pressup", function (e) {
            changeState(RUN_STATE_STOP);
        });
        hammertime.on("swipeup", function (e) {
            if (runState == RUN_STATE_CHOOSE) {
                changeState(RUN_STATE_CROSS);
            }
        });
        hammertime.get('swipe').set({
            direction: Hammer.DIRECTION_UP
        });

    }

    function changeLevel(level) {
        lastLevel = currentLevel;
        is2Left = true;
        isHit = false;
        currentLevelConfig = config.game.levelConfig[level - 1];

        currentLevel = level;
        initLevelScene()
        changeState(RUN_STATE_STOP);
    }

    function initLevelScene() {
        var list;
        roomIndex = 1;
        nodeIndex = 1;
        Scene.getScene().gotoAndStop(currentLevel - 1);
        man = Scene.getScene()["level" + currentLevel].manMc;
        monster = Scene.getScene()["level" + currentLevel].monsterMc;
        man.manMc.gotoAndStop(0);
        if (currentLevel < config.game.maxLevel) {
            man.addEventListener("ManRunComplete", function () {//小人跑完了
                changeLevel(currentLevel + 1);
            });
        } else {
            //最后一页
            Scene.getScene()["level" + currentLevel].addEventListener("gameComplete", function () {//游戏完成了
                Scene.changeState(GameState.STATE_END);
            });
            Scene.getScene()["level" + currentLevel].completeMc.visible = false;
            monster.addEventListener("monsterRunComplete", function () {
                Scene.getScene()["level" + currentLevel].completeMc.visible = true;
                Scene.getScene()["level" + currentLevel].completeMc.gotoAndPlay(1);
            });
        }

        //处理问题=
        for (var i = 0; i < currentLevelConfig.room.length; i++) {
            GUtil.addFrameEvent(man, ("问题" + (i + 1)), function () {
                console.log("问题" + "\t" + man.labels[roomIndex].label);
                // Scene.getScene()["level" + currentLevel]["room" + roomIndex].gotoAndPlay(1);
                // createjs.Tween.get(man).to({scaleX: 0.5, scaleY: 0.5, alpha: 0}, 100).call(function () {
                changeState(RUN_STATE_QUESTION);
                // });
                roomIndex++;
            });
        }
        list = getIncludeFrames(man, "出现");
        for (i = 0; i < list.length; i++) {
            GUtil.addFrameEvent(man, list[i], function () {
                console.log("出现" + "\t");
                // changeState(RUN_STATE_QUESTION);
                // roomIndex++;
                //小怪兽止步
                if (monster) {
                    monster.stop();
                }
                if (man) {
                    man.stop();
                }
            });
        }


        //处理人物遇到障碍停止
        list = getIncludeFrames(man, "停");
        for (i = 0; i < list.length; i++) {
            GUtil.addFrameEvent(man, list[i], function () {
                //终止游戏
                changeState(RUN_STATE_CHOOSE);
            });
        }

        //处理转身
        list = getIncludeFrames(man, "转身");
        for (i = 0; i < list.length; i++) {
            GUtil.addFrameEvent(man, list[i], function () {
                if (is2Left) {
                    man.manMc.gotoAndStop(1);
                } else {
                    man.manMc.gotoAndStop(3);
                }
                console.log("is2Left:" + is2Left + "\t man.manMc:" + man.manMc.currentFrame);
            });
        }
        list = getIncludeFrames(monster, "转身");
        for (i = 0; i < list.length; i++) {
            GUtil.addFrameEvent(monster, list[i], function () {
                console.log("转身");
                if (is2Left) {
                    monster.monsterMc.gotoAndStop(1);
                } else {
                    monster.monsterMc.gotoAndStop(3);
                }
            });
        }

        //处理小怪兽扔炸弹
        list = GUtil.labelToFrameList(monster, "扔障碍");
        list = list.concat(GUtil.labelToFrameList(monster, "扔炸弹"))
        for (i = 0; i < list.length; i++) {
            GUtil.addFrameEvent(monster, list[i], function () {
                isHit = (Math.random() * 100) < currentLevelConfig.node[nodeIndex - 1].power ? true : false;
                if (isHit) {

                    //播放动画
                    Scene.getScene()["level" + currentLevel]["node" + nodeIndex].gotoAndPlay(1);
                }
                nodeIndex++;
            });
        }
    }

    //获得包含name的帧
    function getIncludeFrames(mc, name) {
        var list = []
        for (var k = 0; k < mc.labels.length; k++) {
            if (mc.labels[k].label.indexOf(name) > -1) {
                list.push(mc.labels[k].position);
            }
        }
        return list;
    }

    function destruct() {
        currentLevel = lastLevel = 0;
    }

    function onMoneyChage(num) {
        container.moneyMc.moneyText.text = String(num);
    }

    //切换到游戏场景
    function showGameScene(con) {
        container = con;
        ScoreIndicator.register(onMoneyChage);
        var head = Head.getHead()
        container.addChild(head);
        var ori = Head.getOriginal()
        changeLevel(1);
        man.manMc.headBox.visible = Head.isSelectHead

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
            createjs.Tween.get(head).to({scaleY: newScale * ori.scaleY, scaleX: newScale * ori.scaleX}, 400);
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
                man.alpha = 1;
                man.scaleX = man.scaleY = 1;
                man.play();
                monster.play();
                break;
            case RUN_STATE_CHOOSE:
                container.gameBtn.gotoAndStop(1);
                container.gameBtn.visible = true;
                if (monster) {
                    monster.stop();
                }
                if (man) {
                    man.stop();
                }
                break;
            case RUN_STATE_CROSS:
                if (man) {

                    createjs.Tween.get(man).to({y: man.y - 100}, 400).call(function () {
                        createjs.Tween.get(man).to({y: man.y + 100}, 400);
                    });
                }
                changeState(RUN_STATE_RUN);
                break;
            case RUN_STATE_DROP:
                break;
            case RUN_STATE_QUESTION:
                //小屋动画
                Scene.getScene()["level" + currentLevel]["room" + roomIndex].gotoAndPlay(1);
                createjs.Tween.get(man).to({scaleX: 0.5, scaleY: 0.5, alpha: 0}, 100).call(function () {
                    // changeState(RUN_STATE_QUESTION);
                    //小人进屋消失
                    if (man) {
                        man.visible = false;
                        // man.stop();
                    }

                    //弹出答题面板
                    setTimeout(showQuestionPanel, 500);
                });
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
        questionPanel.questionMc.questionPanelMc.getHelpBtn.addEventListener("click", onGetHelp);
        questionPanel.sucessMc.visible = false;
        questionPanel.x = (640 - 507) >> 1;
        questionPanel.y = 86;
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
        questionPanel.questionMc.questionPanelMc.delLineMc1.visible = false;
        questionPanel.questionMc.questionPanelMc.delLineMc2.visible = false;
        questionPanel.questionMc.questionPanelMc.delLineMc3.visible = false;
        questionPanel.questionMc.questionPanelMc.delLineMc4.visible = false;
    }

    function hideQuestionPanel() {
        questionPanel.questionMc.questionPanelMc.removeEventListener("click", onSelectAnswer);
        questionPanel.questionMc.questionPanelMc.getHelpBtn.removeEventListener("click", onGetHelp);
        setTimeout(function () {
            if (questionPanel) {
                if (questionPanel.parent) {
                    questionPanel.parent.removeChild(questionPanel);
                }
                questionPanel.questionMc.gotoAndStop(0);
            }
            changeState(RUN_STATE_RUN);
        }, 900)
    }

    function onGetHelp(evt) {
        questionPanel.questionMc.questionPanelMc.getHelpBtn.removeEventListener("click", onGetHelp);
        var data = QuestionBank.getHelp();
        for (var i = 0; i < data.length; i++) {
            questionPanel.questionMc.questionPanelMc["delLineMc" + (data[i] + 1)].visible = true;
        }
    }

    function onSelectAnswer(evt) {
        if (evt.target) {
            var key = -1;
            switch (evt.target) {
                case questionPanel.questionMc.questionPanelMc.item1:
                    key = 0;
                    break;
                case questionPanel.questionMc.questionPanelMc.item2:
                    key = 1;
                    break;
                case questionPanel.questionMc.questionPanelMc.item3:
                    key = 2;
                    break;
                case questionPanel.questionMc.questionPanelMc.item4:
                    key = 3;
                    break;
            }
            if (key > -1) {
                if (QuestionBank.solve(key)) {
                    ScoreIndicator.add(ScoreIndicator.CONFIG_QUESTION)
                    questionPanel.sucessMc.visible = true;
                    questionPanel.sucessMc.gotoAndPlay(1);
                } else {
                    ScoreIndicator.minus(ScoreIndicator.CONFIG_QUESTION)
                }
                hideQuestionPanel();
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

