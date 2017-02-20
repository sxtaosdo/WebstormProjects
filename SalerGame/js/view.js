/**
 * Created by sxt on 2017/2/20.
 */
var View = function () {

    var currentLevel = 0;
    var lastLevel = 0;

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

    return {
        init: struct,
        changeLevel: changeLevel,
        destruct: destruct,
    }
}()