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
    //奔跑状态-复活
    var RUN_STATE_REVIVE = 7;
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
    //怪兽朝向
    var is2LeftMonster = true;
    //是否击中陷阱
    var isHit = false;
    //答题结果
    var answer = false;
    //当前房间的题目数量
    var roomQuestionNum = 0;

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
        is2LeftMonster = true;
        currentLevelConfig = config.game.levelConfig[level - 1];

        currentLevel = level;
        initLevelScene()
        changeState(RUN_STATE_STOP);
    }

    function initLevelScene() {
        var list;
        roomIndex = 1;
        nodeIndex = 1;
        var scene = Scene.getScene()
        scene.gotoAndStop(currentLevel - 1);
        console.log("Scene.getScene():" + scene.currentFrame)


        man = scene["level" + currentLevel].manMc;

        console.log("man:" + man.y);
        stage.update();
        /*GUtil.addFrameEvent(man.manMc, 0, function () {
            man.stop();
        })*/
        man.stop();
        man.manMc.gotoAndStop(1);
        man.manMc.headBox.headContainor.visible = Head.isSelectHead;

        monster = Scene.getScene()["level" + currentLevel].monsterMc;

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

        //处理问题
        for (var i = 0; i < currentLevelConfig.room.length; i++) {
            GUtil.addFrameEvent(man, ("问题" + (i + 1)), function () {
                // console.log("问题" + "\t" + man.labels[roomIndex].label);
                changeState(RUN_STATE_QUESTION);
                roomIndex++;
            });
        }
        list = getIncludeFrames(man, "出现");
        for (i = 0; i < list.length; i++) {
            GUtil.addFrameEvent(man, list[i], function () {
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
                if (isHit) {
                    changeState(RUN_STATE_CHOOSE);
                }
            });
        }
        //复活
        list = getIncludeFrames(man, "复活");
        for (i = 0; i < list.length; i++) {
            GUtil.addFrameEvent(man, list[i], function () {
                if (runState == RUN_STATE_DROP) {//终止游戏
                    man.stop();
                    monster.stop();
                }
            });
        }

        //处理转身
        list = getIncludeFrames(man, "转身");
        for (i = 0; i < list.length; i++) {
            GUtil.addFrameEvent(man, list[i], function () {
                if (is2Left) {
                    man.manMc.gotoAndStop(1);
                    setTimeout(function () {
                        man.manMc.gotoAndStop(2)
                        man.manMc.headBox.headContainor.visible = Head.isSelectHead;
                        man.manMc.angleMc1.alpha = 1;
                    }, 246);
                } else {
                    man.manMc.gotoAndStop(3);
                    setTimeout(function () {
                        man.manMc.gotoAndStop(0)
                        man.manMc.headBox.headContainor.visible = Head.isSelectHead;
                        man.manMc.angleMc1.alpha = 2;
                    }, 246);
                }
                is2Left = !is2Left;
            });
        }
        list = getIncludeFrames(monster, "转身");
        for (i = 0; i < list.length; i++) {
            GUtil.addFrameEvent(monster, list[i], function () {
                if (is2LeftMonster) {
                    monster.monsterMc.gotoAndStop(1);
                    setTimeout(function () {
                        monster.monsterMc.gotoAndStop(2);
                    }, 266);
                } else {
                    monster.monsterMc.gotoAndStop(3);
                    setTimeout(function () {
                        monster.monsterMc.gotoAndStop(0);
                    }, 266);
                }
                is2LeftMonster = !is2LeftMonster;
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
        // addHead();
    }

    //获得包含name的帧
    function getIncludeFrames(mc, name) {
        var list = [];
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

        changeLevel(1);

        container.gameBtn.visible = false;

        setTimeout(function () {
            container.gameBtn.visible = true;
            container.gameBtn.addEventListener("click", function () {
                if (runState == RUN_STATE_STOP) {
                    changeState(RUN_STATE_RUN);
                    man.manMc.gotoAndStop(0);
                }
            });
            changeState(RUN_STATE_STOP);

            addHead();
        }, 1400);
    }

    function addHead() {
        var head = Head.getHead();
        // createjs.Tween.get(head).to({scaleY: 53 / 267, scaleX: 53 / 267}, 400);
        head.scaleY = head.scaleX = 53 / 267;
        man.manMc.headBox.headContainor.addChildAt(head, 0)
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
                resetMan();
                man.play();
                monster.play();
                man.visible = true;
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
                //倒计时
                setTimeout(function () {
                    //掉落
                    if (runState == RUN_STATE_CHOOSE) {
                        changeState(RUN_STATE_DROP);
                    }
                }, 1000);
                break;
            case RUN_STATE_CROSS:
                if (man) {
                    createjs.Tween.get(man).to({y: man.y - 90}, 300).call(function () {
                        createjs.Tween.get(man).to({y: man.y + 90}, 300);
                    });
                }
                changeState(RUN_STATE_RUN);
                break;
            case RUN_STATE_DROP:
                man.play();
                monster.play();
                ScoreIndicator.minus(ScoreIndicator.CONFIG_HElp);
                var mc = is2Left ? man.manMc.angleMc1 : man.manMc.angleMc2;
                createjs.Tween.get(mc).wait(200).to({
                    scaleX: 0,
                    scaleY: 0,
                    y: 100,
                    alpha: 0
                }, 300).wait(500).call(function () {
                    changeState(RUN_STATE_REVIVE);
                });
                break;
            case RUN_STATE_QUESTION:
                //小屋动画
                Scene.getScene()["level" + currentLevel]["room" + roomIndex].gotoAndPlay(1);
                var mc = is2Left ? man.manMc.angleMc1 : man.manMc.angleMc2;
                createjs.Tween.get(mc).to({scaleX: 0.3, scaleY: 0.3, alpha: 0}, 100).call(function () {
                    //弹出答题面板
                    roomQuestionNum = 0;
                    man.visible = false;
                    setTimeout(showQuestionPanel, 500);
                });
                break;
            case RUN_STATE_REVIVE:
                if (monster) {
                    monster.stop();
                }
                resetMan();
                createjs.Tween.get(man).to({alpha: 0}).wait(150).call(function () {//复活后闪几下
                    createjs.Tween.get(man).to({alpha: 1}).wait(150).call(function () {
                        createjs.Tween.get(man).to({alpha: 0}).wait(150).call(function () {
                            createjs.Tween.get(man).to({alpha: 1}).wait(300).call(function () {
                                changeState(RUN_STATE_RUN);
                            })
                        })
                    })
                })
                break;

        }
        runState = state;
    }

    function resetMan() {
        if (man) {
            man.manMc.angleMc1.scaleX = man.manMc.angleMc1.scaleY = 1;
            man.manMc.angleMc2.scaleX = man.manMc.angleMc2.scaleY = 1;
            man.manMc.angleMc1.y = 0;
            man.manMc.angleMc2.y = 0;

            if (is2Left) {
                man.manMc.angleMc1.alpha = 1;
                man.manMc.angleMc2.alpha = 0;
            } else {
                man.manMc.angleMc1.alpha = 0;
                man.manMc.angleMc2.alpha = 1;
            }

            man.stop();
        } else {
            console.error("man为空");
        }
    }

    function showQuestionPanel() {
        if (!questionPanel) {
            questionPanel = new lib.questionMc();
            questionPanel.successMc.stop();
            questionPanel.failMc.stop();
        }
        roomQuestionNum++;
        questionPanel.questionMc.questionPanelMc.addEventListener("click", onSelectAnswer);
        questionPanel.questionMc.questionPanelMc.getHelpBtn.addEventListener("click", onGetHelp);
        questionPanel.successMc.visible = false;
        questionPanel.failMc.visible = false;
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
            if (roomQuestionNum < config.game.levelConfig[currentLevel - 1].room[roomIndex - 2].questions) {
                showQuestionPanel();
            } else {
                changeState(RUN_STATE_RUN);
            }
            man.manMc.headBox.expressionMc.gotoAndStop(answer ? 0 : 1);
        }, 900);
    }

    function onGetHelp(evt) {
        questionPanel.questionMc.questionPanelMc.getHelpBtn.removeEventListener("click", onGetHelp);
        var data = QuestionBank.getHelp();
        for (var i = 0; i < data.length; i++) {
            questionPanel.questionMc.questionPanelMc["delLineMc" + (data[i] + 1)].visible = true;
        }
        ScoreIndicator.minus(ScoreIndicator.CONFIG_HElp);
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
                answer = QuestionBank.solve(key)
                if (answer) {
                    ScoreIndicator.add(ScoreIndicator.CONFIG_QUESTION)
                    questionPanel.successMc.visible = true;
                    questionPanel.successMc.gotoAndPlay(1);
                } else {
                    questionPanel.failMc.visible = true;
                    questionPanel.failMc.gotoAndPlay(1);
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

