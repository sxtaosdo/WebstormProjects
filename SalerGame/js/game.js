/**
 * Created by sxt on 2017/2/13.
 */
var Game = function () {
    //菜单
    var STATE_MENU = 1;
    //开始
    var STATE_BEGIN = 2;
    //游戏中
    var STATE_GAME = 3;
    //结束
    var STATE_END = 4;
    //当前游戏状态
    var currentState;

    function init() {

    }

    function changeState(state) {
        switch (state) {
            case STATE_MENU:
                break;
            case STATE_BEGIN:
                break;
            case STATE_GAME:
                break;
            case STATE_END:
                break;
        }
    }

    return {
        init: init
    }
}()