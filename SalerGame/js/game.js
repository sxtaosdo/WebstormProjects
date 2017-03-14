/**
 * Created by sxt on 2017/2/13.
 */
var Game = function () {
    //当前游戏状态
    var currentState;
    //上一个游戏状态
    var lastState;

    function struct() {
        currentState = GameState.STATE_NULL;
        lastState = GameState.STATE_NULL;
        View.init();
        QuestionBank.init();
        ScoreIndicator.init();
    }

    function changeState(state) {
        lastState = currentState;
        currentState = state;
        switch (state) {
            case GameState.STATE_NULL:
                break;
            case GameState.STATE_INIT:
                break;
            case GameState.STATE_MENU:
                break;
            case GameState.STATE_BEGIN:
                break;
            case GameState.STATE_GAME:
                break;
            case GameState.STATE_END:
                break;
        }
    }

    function destruct() {
        lastState = currentState = null;
    }

    return {
        init: struct,
        destruct: destruct,
        currentState: currentState
    }
}()

var GameState = function () {
    //未运行
    var STATE_NULL = 0;
    //初始化完毕
    var STATE_INIT = 1;
    //菜单
    var STATE_MENU = 2;
    //开始
    var STATE_BEGIN = 3;
    //游戏中
    var STATE_GAME = 4;
    //结束
    var STATE_END = 5;

    return {
        STATE_NULL: STATE_NULL,
        STATE_INIT: STATE_INIT,
        STATE_MENU: STATE_MENU,
        STATE_BEGIN: STATE_BEGIN,
        STATE_GAME: STATE_GAME,
        STATE_END: STATE_END
    }
}()