/**
 * Created by sxt on 2017/2/13.
 */
var Scene = function () {
    //当前游戏状态
    var currentState;
    //上一个游戏状态
    var lastState;
    //当前游戏场景
    var currentScene;
    //头像
    var headBmp;
    //头像遮罩
    var headMask;
    //logo
    var logo;
    var adFlag;

    function struct() {
        changeState(GameState.STATE_NULL);
        lastState = GameState.STATE_NULL;
        if (headBmp && headBmp.parent) {
            headBmp.parent.removeChild(headBmp);
        }
        headBmp = new createjs.Bitmap();
        if (!headMask) {
            headMask = new createjs.Shape();
            headMask.graphics.beginFill("#ff0000").drawCircle(640 >> 1, 475, 267);
        }

        var temp = document.getElementById("canvas");
        hammertime = new Hammer(temp);
        hammertime.add(new Hammer.Pinch());

        //init
        View.init();
        QuestionBank.init();
        ScoreIndicator.init();
        Head.init();
        logo = new lib.logoClass();
        adFlag = new lib.adFlag();
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
    }

    function resizeCanvas(evt) {
        if (adFlag) {
            // adFlag.y = document.body.clientHeight - 30;
            adFlag.y = window.innerHeight - 30;
        }
    }

    function changeState(state) {
        lastState = currentState;
        currentState = state;
        if (currentScene && currentScene.parent) {
            exportRoot.stage.removeChild(currentScene);
        }
        switch (state) {
            case GameState.STATE_NULL:
                WebData.showIntro(false);
                showQrcode(false);
                changeState(GameState.STATE_INIT);
                break;
            case GameState.STATE_INIT:
                currentScene = new lib.page1();
                currentScene.goBtn.addEventListener("click", function () {
                    changeState(GameState.STATE_USER_INFO);
                    // changeState(GameState.STATE_END);
                })
                createjs.Touch.enable(stage);
                break;
            case GameState.STATE_USER_INFO:
                currentScene = null;
                WebData.showIntro(true);
                $("#animation_container").addClass("hidden2");
                $(window).on('nextPage', function () {
                    changeState(GameState.STATE_HEAD_UPLOAD);
                    WebData.showIntro(false);
                    $("#animation_container").removeClass("hidden2");
                    document.querySelector('body').addEventListener('touchstart', touchstartEnable);
                });
                document.querySelector('body').removeEventListener('touchstart', touchstartEnable);
                break;
            case GameState.STATE_GUIDE:
                Head.destruct();
                currentScene = new lib.page6();
                currentScene.addEventListener("guideComplete", onDuideComplete);
                break;
            case GameState.STATE_HEAD_UPLOAD:
                currentScene = new lib.page3();
                currentScene.p3Btn1.addEventListener("click", function () {
                    Head.selectHead(currentScene, function () {
                        currentScene.p3Btn2.gotoAndStop(1);
                    });
                });
                currentScene.p3Btn2.addEventListener("click", function () {
                    changeState(GameState.STATE_GUIDE);
                });
                break;
            case GameState.STATE_GAME:
                showQrcode(false);
                currentScene = new lib.page4();
                Head.enableHead();
                View.showGameScene(currentScene);
                break;
            case GameState.STATE_END:
                currentScene = new lib.page5();
                currentScene.p5Btn.addEventListener("click", function () {
                    ScoreIndicator.destruct();
                    changeState(GameState.STATE_GAME);
                })
                currentScene.awardText.text = ScoreIndicator.cores();
                QuestionBank.checkQuestionBank();
                setTimeout(function () {
                    if (currentState == GameState.STATE_END) {
                        showQrcode(true);
                    }
                }, 1200);
                WebData.savewinner(ScoreIndicator.cores());//发送游戏结果
                break;
        }
        if (currentScene) {
            exportRoot.stage.addChild(currentScene);
        } else {
            if (GameState.STATE_USER_INFO != currentState) {
                throw("当前场景为空，STATE:" + currentState);
            }
        }
        exportRoot.stage.addChild(logo);
        exportRoot.stage.addChild(adFlag);
    }

    //隐藏二维码
    function showQrcode(key) {
        if (key) {
            document.querySelector('body').removeEventListener('touchstart', touchstartEnable);
            $("#qrcode").removeClass("hidden2");
            // $("#qrcode").css({"top": (screen.width / window.innerWidth) * 454.5});
            // $("#qrcode").css({
            //     "top": "515px",
            //     "left": "50%",
            //     "margin-left": -115,
            //     "height": 210,
            //     "width": 210
            // });
        } else {
            document.querySelector('body').addEventListener('touchstart', touchstartEnable);
            $("#qrcode").addClass("hidden2");
        }
    }

    function onDuideComplete(e) {
        currentScene.removeEventListener("guideComplete", onDuideComplete);
        if (currentScene.parent) {
            currentScene.parent.removeChild(currentScene);
        }
        changeState(GameState.STATE_GAME);
    }

    function destruct() {
        lastState = currentState = null;
    }

    function getScene() {
        return currentScene;
    }

    return {
        init: struct,
        destruct: destruct,
        currentState: currentState,
        changeState: changeState,
        getScene: getScene
    }
}()

var GameState = function () {
    //未运行
    var STATE_NULL = 0;
    //初始化完毕
    var STATE_INIT = 1;
    //填写用户信息
    var STATE_USER_INFO = 2;
    //教学
    var STATE_GUIDE = 3
    //头像上传
    var STATE_HEAD_UPLOAD = 4;
    //游戏中
    var STATE_GAME = 5;
    //结束,结算
    var STATE_END = 6;

    return {
        STATE_NULL: STATE_NULL,
        STATE_INIT: STATE_INIT,
        STATE_HEAD_UPLOAD: STATE_HEAD_UPLOAD,
        STATE_USER_INFO: STATE_USER_INFO,
        STATE_GAME: STATE_GAME,
        STATE_END: STATE_END,
        STATE_GUIDE: STATE_GUIDE
    }
}()

var hammertime;