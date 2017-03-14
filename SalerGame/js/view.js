/**
 * Created by sxt on 2017/2/20.
 * 视图
 * 产生事件
 */
var View = function () {
    var RUN_STATE_STOP = 1;
    var RUN_STATE_RUN = 2;
    var RUN_STATE_DROP = 3;
    //当前关卡
    var currentLevel = 0;
    //
    var lastLevel = 0;
    //当前状态
    var runState = 0;

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
        //test
        createQuestion();
    }

    function destruct() {
        configList = configList.concat(showedList);
    }

    //产生一个问题
    function createQuestion() {
        var tempId = Math.floor(Math.random() * configList.length);
        var question = configList.splice(tempId, 1)[0];
        if (!question) {
            console.log(tempId);
        }
        showedList.push(question);
        currentQuest = randomItem(question);
        if (true) {//调试用代码
            var temp = "";
            for (var i = 0; i < question.item.length; i++) {
                if (question.item[i].key) {
                    temp += ("[" + question.item[i].text + "]" + "|");
                } else {
                    temp += question.item[i].text + "|";
                }
            }
            console.log(question.questText + "\t" + temp);
        }
        return currentQuest;
    }

    //求助
    function getHelp() {

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

    //解析配置文件
    function parseConfig() {
        configList = config.question;
    }

    return {
        init: struct,
        destruct: destruct,
        create: createQuestion,
        getHelp: getHelp
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
