/**
 * Created by sxt on 2017/2/13.
 */
var Game = function () {
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

    function struct() {
        currentState = GameState.STATE_NULL;
        lastState = GameState.STATE_NULL;
        if (headBmp && headBmp.parent) {
            headBmp.parent.removeChild(headBmp);
        }
        headBmp = new createjs.Bitmap();
        if (!headMask) {
            headMask = new createjs.Shape();
            headMask.graphics.beginFill("#ff0000").drawCircle(640 >> 1, 475, 267);
        }

        //init
        View.init();
        QuestionBank.init();
        ScoreIndicator.init();
        Head.init();
        //test
        QuestionBank.create();
        QuestionBank.getHelp();
        changeState(GameState.STATE_INIT);
    }

    function changeState(state) {
        lastState = currentState;
        currentState = state;
        if (currentScene && currentScene.parent) {
            exportRoot.stage.removeChild(currentScene);
        }
        switch (state) {
            case GameState.STATE_NULL:
                break;
            case GameState.STATE_INIT:
                currentScene = new lib.page1();
                currentScene.goBtn.addEventListener("click", function () {
                    changeState(GameState.STATE_HEAD_UPLOAD);
                })
                break;
            case GameState.STATE_USER_INFO:
                // currentScene = new lib.page1();
                currentScene = null;
                break;
            case GameState.STATE_HEAD_UPLOAD:
                currentScene = new lib.page3();
                currentScene.p3Btn1.addEventListener("click", function () {
                    Head.selectHead();
                });
                currentScene.p3Btn2.addEventListener("click", function () {
                    changeState(GameState.STATE_GAME);
                });
                break;
            case GameState.STATE_GAME:
                currentScene = new lib.page4();
                View.showGameScene();
                break;
            case GameState.STATE_END:
                currentScene = new lib.page5();
                break;
        }
        if (currentScene) {
            exportRoot.stage.addChild(currentScene);
        }
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
    //头像上传
    var STATE_HEAD_UPLOAD = 3;
    //游戏中
    var STATE_GAME = 4;
    //结束,结算
    var STATE_END = 5;

    return {
        STATE_NULL: STATE_NULL,
        STATE_INIT: STATE_INIT,
        STATE_HEAD_UPLOAD: STATE_HEAD_UPLOAD,
        STATE_USER_INFO: STATE_USER_INFO,
        STATE_GAME: STATE_GAME,
        STATE_END: STATE_END
    }
}()