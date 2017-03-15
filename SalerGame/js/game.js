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

    function struct() {
        currentState = GameState.STATE_NULL;
        lastState = GameState.STATE_NULL;
        //init
        View.init();
        QuestionBank.init();
        ScoreIndicator.init();
        //test
        QuestionBank.create();
        QuestionBank.getHelp();
    }

    function changeState(state) {
        lastState = currentState;
        currentState = state;
        exportRoot.stage.removeChild(currentScene);
        switch (state) {
            case GameState.STATE_NULL:
                break;
            case GameState.STATE_INIT:
                currentScene = new lib.page1();
                break;
            case GameState.STATE_HEAD_UPLOAD:
                currentScene = new lib.page3();
                break;
            case GameState.STATE_GAME:
                currentScene = new lib.page4();
                break;
            case GameState.STATE_END:
                currentScene = new lib.page5();
                break;
        }
        exportRoot.stage.addChild(currentScene);

    }

    function destruct() {
        lastState = currentState = null;
    }

    function onHead(imageData) {
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#ff0000").drawCircle(110, 110, 100);
        var bmp = new createjs.Bitmap(imageData);
        bmp.mask = shape;
        exportRoot.stage.addChild(bmp);
    }

    function page1(){

    }

    return {
        init: struct,
        destruct: destruct,
        currentState: currentState,
        onHead: onHead
    }
}()

var GameState = function () {
    //未运行
    var STATE_NULL = 0;
    //初始化完毕
    var STATE_INIT = 1;
    //头像上传
    var STATE_HEAD_UPLOAD = 2;
    //游戏中
    var STATE_GAME = 3;
    //结束,结算
    var STATE_END = 4;

    return {
        STATE_NULL: STATE_NULL,
        STATE_INIT: STATE_INIT,
        STATE_HEAD_UPLOAD: STATE_HEAD_UPLOAD,
        // STATE_BEGIN: STATE_BEGIN,
        STATE_GAME: STATE_GAME,
        STATE_END: STATE_END
    }
}()