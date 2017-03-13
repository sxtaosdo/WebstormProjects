/**
 * Created by sxt on 2017/2/20.
 * 视图
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


/**
 * 题库
 */
var QuestionBank = function () {

    //答题总数
    var questionNum = 10;
    //已经出现过的提
    var showedList;
    //题库配置
    var config;

    function struct() {
        showedList = [];
    }

    function destruct() {
        showedList = [];
    }

    //产生一个问题
    function createQuestion() {
        return false;
    }

    return {
        init: struct,
        destruct: destruct,
        create: createQuestion
    }
}()


/**
 * 积分器
 */
var ScoreIndicator = function () {
    //当前的分
    var cores = 0;
    //得分配置
    var config;
    //
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
        cores = 0;
    }

    //当前分值与标准分值的差值
    function offset() {
        return 0;
    }

    return {
        init: struct,
        destruct: destruct,
        minus: minus,
        add: add,
        offset: offset
    }
}()
