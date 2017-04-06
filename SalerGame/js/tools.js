/**
 * Created by sxt on 2017/3/24.
 */

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
    }

    function destruct() {
        configList = configList.concat(showedList);
        showedList = [];
    }

    //产生一个问题
    function createQuestion() {
        var tempId = Math.floor(Math.random() * configList.length);
        var question = configList.splice(tempId, 1)[0];
        if (question) {
            showedList.push(question);
            currentQuest = randomItem(question);
            if (true) {//调试用代码
                var temp = "";
                for (var i = 0; i < question.item.length; i++) {
                    if (question.item[i].key) {
                        temp += ("[" + question.item[i].text + "]" + "|");
                        question.answer.push(i);
                    } else {
                        temp += question.item[i].text + "|";
                    }
                }
                console.log(question.questText + "\t" + temp);
            }
            return currentQuest;
        } else {
            console.error("没有题目");
        }
    }

    //求助
    function getHelp() {
        var max = Math.min(currentQuest.item.length - 1, delErrorNum);
        var delList = [];
        while (delList.length < max) {
            var key = Math.floor(Math.random() * currentQuest.item.length)
            if (currentQuest.answer.indexOf(key) == -1) {
                if (delList.indexOf(key) == -1) {
                    delList.push(key);
                }
            }
        }
        console.log(delList);
        return delList;
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

    //答题，仅单选题
    function solve(key) {
        try {
            if (currentQuest.item[key].key) {
                return true;
            }
        } catch (e) {
            return false;
        }
        return false;
    }

    //解析配置文件
    function parseConfig() {
        configList = config.question;
    }

    //检查题库中剩余题目的数量
    function checkQuestionBank() {
        if (configList.length < config.game.maxQuestions) {
            destruct();
        }
    }

    return {
        init: struct,
        destruct: destruct,
        create: createQuestion,
        getHelp: getHelp,
        solve: solve,
        checkQuestionBank: checkQuestionBank
    }
}()


/**
 * 计分器
 */
var ScoreIndicator = function () {
    //当前的分
    var cores = 0;
    //得分配置
    var ScoreConfig;
    //标准分
    var verage = 0;
    //答题
    var CONFIG_QUESTION = "question";
    //障碍
    var CONFIG_THING = "thing";
    //求助
    var CONFIG_HElp = "help";
    //
    var changeCallback;

    function struct() {
        cores = 0;
        ScoreConfig = config.score;
    }

    function destruct() {
        cores = 0;
    }

    function add(type) {
        if (cores < ScoreConfig.max) {
            switch (type) {
                case CONFIG_QUESTION:
                    cores += ScoreConfig.scoreType.question;
                    setTimeout(onChange, 590);//答题正确加钱延时
                    break;
                case CONFIG_THING:
                    cores += ScoreConfig.scoreType.thing;
                    onChange();
                    break;
            }
        }
    }

    function minus(type) {
        switch (type) {
            case CONFIG_QUESTION:
                cores -= ScoreConfig.scoreType.question;
                break;
            case CONFIG_THING:
                cores -= ScoreConfig.scoreType.thing;
                break;
            case CONFIG_HElp:
                cores -= ScoreConfig.scoreType.help;
                break;
        }
        if (cores < 0) {
            cores = 0;
        }
        onChange();
    }

    function onChange() {
        changeCallback(cores);
    }

    function getCores() {
        return cores;
    }

    //当前分值与标准分值的差值
    function offset() {
        return 0;
    }

    function register(call) {
        changeCallback = call;
        onChange();
    }

    return {
        init: struct,
        destruct: destruct,
        minus: minus,
        add: add,
        offset: offset,
        cores: getCores,
        register: register,
        CONFIG_QUESTION: CONFIG_QUESTION,
        CONFIG_THING: CONFIG_THING,
        CONFIG_HElp: CONFIG_HElp
    }
}()


/**
 * Created by yyn on 2017/3/28.
 */
var Head = function () {
    var MOVE_SPEED = 15;
    var headContent;
    //=================================
    //遮罩4个边的坐标
    var maskleft;
    var maskright;
    var masktop;
    var maskbottom;
    var maskleft1;
    var maskright1;
    var masktop1;
    var maskbottom1;
    //获取图片高度宽度
    var PixelXDimension;
    var PixelYDimension;
    //图片高度宽度
    var pw;
    var ph;
    //头像最小半径
    var headr = 267;
    var headr1 = 53;
    //图片最大宽度
    var maxw = 640;
    var maxh = 1138;
    var maxw1 = maxw * headr1 / headr;
    var maxh1 = maxh * headr1 / headr;
    //图片最小宽度；
    var minw = 532;
    var minw1 = minw * headr1 / headr;
    //实际高宽
    var bmph;
    var bmpw;
    var bmph1;
    var bmpw1;
    //图片方向
    var Orientation;
    //缩放比例
    var lastScale;
    var lastScale1;
    //头像
    var bmp;
    //预览头像
    var bmp1;

    var sx = 565;
    var sy = 65;

    function struct() {
        var pinch = document.getElementById("canvas");
        hammertime = new Hammer(pinch);
        hammertime.add(new Hammer.Pinch());
        hammertime.on('panmove', function (ev) {
            bmpw = pw * bmp.scaleX / 2;
            bmph = ph * bmp.scaleY / 2;
            bmph1 = ph * bmp1.scaleX / 2;
            bmpw1 = pw * bmp1.scaleY / 2;
            if (ev.type == "panmove") {
                if (bmp.x + ev.velocityX * MOVE_SPEED + bmpw <= maskright) {
                    bmp.x = maskright - bmpw;
                    bmp1.x = maskright1 - bmpw1;
                } else if (bmp.x + ev.velocityX * MOVE_SPEED - bmpw >= maskleft) {
                    bmp.x = maskleft + bmpw;
                    bmp1.x = maskleft1 + bmpw1;
                } else {
                    bmp.x = ev.velocityX * MOVE_SPEED + bmp.x;
                    bmp1.x = ev.velocityX * MOVE_SPEED * 53 / headr + bmp1.x;
                }
                if (bmp.y + ev.velocityY * MOVE_SPEED + bmph <= maskbottom) {
                    bmp.y = maskbottom - bmph;
                    bmp1.y = maskbottom1 - bmph1;
                } else if (bmp.y + ev.velocityY * MOVE_SPEED - bmph >= masktop) {
                    bmp.y = masktop + bmph;
                    bmp1.y = masktop1 + bmph1;
                } else {
                    bmp.y = ev.velocityY * MOVE_SPEED + bmp.y;
                    bmp1.y = ev.velocityY * MOVE_SPEED * 53 / headr + bmp1.y;
                }
            }
        });
        hammertime.on("pinchin", function (e) {
            bmpw = pw * bmp.scaleX / 2;
            bmph = ph * bmp.scaleY / 2;
            bmpw1 = pw * bmp1.scaleX / 2;
            bmph1 = ph * bmp1.scaleY / 2;
            if (ph < pw) {
                if (bmp.scaleY * ph > minw) {
                    if (bmp.x + bmpw - 5 < maskright) {
                        bmp.x = maskright - bmpw;
                        bmp1.x = maskright1 - bmpw1;
                    }
                    if (bmp.x - bmpw + 5 > maskleft) {
                        bmp.x = maskleft + bmpw;
                        bmp1.x = maskleft1 + bmpw1;
                    }
                    if (bmp.y + bmph - 5 < maskbottom) {
                        bmp.y = maskbottom - bmph;
                        bmp1.y = maskbottom1 - bmph1;
                    }
                    if (bmp.y - bmph + 5 > masktop) {
                        bmp.y = masktop + bmph;
                        bmp1.y = masktop1 + bmph1;
                    }
                    setHeadScale(e);

                } else {
                    bmp.scaleX = bmp.scaleY = minw / ph;
                    bmp1.scaleX = bmp1.scaleY = minw1 / ph;
                }
            } else {
                if (bmp.scaleX * pw > minw) {
                    if (bmp.x + bmpw - 5 < maskright) {
                        bmp.x = maskright - bmpw;
                        bmp1.x = maskright1 - bmpw1;
                    }
                    if (bmp.x - bmpw + 5 > maskleft) {
                        bmp.x = maskleft + bmpw;
                        bmp1.x = maskleft1 + bmpw1;
                    }
                    if (bmp.y + bmph - 5 < maskbottom) {
                        bmp.y = maskbottom - bmph;
                        bmp1.y = maskbottom1 - bmph1;
                    }
                    if (bmp.y - bmph + 5 > masktop) {
                        bmp.y = masktop + bmph;
                        bmp1.y = masktop1 + bmph1;
                    }
                    setHeadScale(e);
                } else {
                    bmp.scaleX = bmp.scaleY = minw / pw;
                    bmp1.scaleX = bmp1.scaleY = minw1 / pw;
                }
            }
        });

        hammertime.on("pinchout", function (e) {
            if (ph < pw) {
                if (bmp.scaleY * ph < maxh) {
                    setHeadScale(e);
                } else {
                    bmp.scaleX = bmp.scaleY = maxh / ph;
                    bmp1.scaleX = bmp1.scaleY = maxh1 / ph;
                }
            } else {
                if (bmp.scaleX < maxw / pw) {
                    setHeadScale(e);
                } else {
                    bmp.scaleX = bmp.scaleY = maxw / pw;
                    bmp1.scaleX = bmp1.scaleY = maxw1 / pw;
                }
            }
        });
        hammertime.on("pinchend", function (e) {
            lastScale = bmp.scaleY;
            lastScale1 = bmp1.scaleY;
        });
        var temp = (document.body.clientHeight >> 1) - 60;
        window.onmousewheel = document.onmousewheel = pcTest;
        //		图形遮罩
        headMask = new createjs.Shape();
        headMask.graphics.beginFill("#ff0000").drawCircle(320, temp, headr);
        headMask1 = new createjs.Shape();
        headMask1.graphics.beginFill("#ff0000").drawCircle(sx, sy, headr1);
    }

    //上传头像
    function selectHead(content, callback) {
        headContent = content;
        var btn = document.getElementById("inputBtn");
        btn.onchange = function () {
            var temp = document.getElementById("inputBtn").files[0];
            EXIF.getData(temp, function () {
                EXIF.getAllTags(temp);
                EXIF.getTag(temp, 'Orientation');
                EXIF.getTag(temp, 'PixelXDimension');
                EXIF.getTag(temp, 'PixelYDimension');
                PixelXDimension = EXIF.getTag(temp, 'PixelXDimension');
                PixelYDimension = EXIF.getTag(temp, 'PixelYDimension');
                Orientation = EXIF.getTag(temp, 'Orientation');
            });
            console.log("PixelXDimension" + PixelXDimension);

            var reader = new FileReader();
            reader.readAsDataURL(temp);
            reader.onload = function () {
                lastScale = 1;
                Head.isSelectHead = true;
                onHead(reader.result);
                if (callback) {
                    callback.call();
                }
            };
        }
        btn.click();
    }

    function onHead(imageData) {
        //		生成遮罩头像
        if (!imageData) {
            console.log('imageData err-->');
            return;
        }
        clearnHead();
        bmp = new createjs.Bitmap(imageData);
        bmp1 = new createjs.Bitmap(imageData);
        bmp.mask = headMask;
        bmp1.mask = headMask1;
        if (!PixelXDimension) {
            pw = bmp.getBounds().width;
            ph = bmp.getBounds().height;
            bmp.regX = pw / 2;
            bmp.regY = ph / 2;
            bmp1.regX = pw / 2;
            bmp1.regY = ph / 2;
        } else {
            if ((Orientation == 0) || (Orientation == 1)) {
                ph = PixelYDimension;
                pw = PixelXDimension;
                bmp.regX = pw / 2;
                bmp.regY = ph / 2;
                bmp1.regX = pw / 2;
                bmp1.regY = ph / 2;
            } else {
                pw = PixelYDimension;
                ph = PixelXDimension;
                bmp.regX = ph / 2;
                bmp.regY = pw / 2;
                bmp1.regX = ph / 2;
                bmp1.regY = pw / 2;
            }
        }

        bmp1.x = sx;
        bmp1.y = sy;

        bmp.x = 320;
        bmp.y = (document.body.clientHeight >> 1) - 60;
        maskbottom = bmp.y + headr;
        masktop = bmp.y - headr;
        maskleft = bmp.x - headr;
        maskright = bmp.x + headr;

        maskbottom1 = bmp1.y + headr1;
        masktop1 = bmp1.y - headr1;
        maskleft1 = bmp1.x - headr1;
        maskright1 = bmp1.x + headr1;
        if (ph < pw) {
            bmp.scaleX = 1138 / ph;
            bmp.scaleY = 1138 / ph;
            lastScale = bmp.scaleX;
            console.log(bmp.scaleY);
        } else {
            bmp.scaleX = 640 / pw;
            bmp.scaleY = 640 / pw;
            lastScale = bmp.scaleX;
        }
        bmp1.scaleX = bmp.scaleX * 53 / headr;
        bmp1.scaleY = bmp.scaleY * 53 / headr;
        if (Orientation == 6) {
            bmp.rotation = 90
            bmp1.rotation = 90;
            console.log("6");
        }
        if (Orientation == 3) {
            bmp.rotation = 180
            bmp1.rotation = 180;
            console.log("3");
        }
        if (Orientation == 8) {
            bmp.rotation = 270
            bmp1.rotation = 270;
            console.log("8");
        }
        exportRoot.stage.addChild(bmp1);
        headContent.addChild(bmp);
    }

    function setHeadScale(e) {
        bmp.scaleY = bmp.scaleX = e.scale * lastScale;
        bmp1.scaleY = bmp1.scaleX = e.scale * lastScale1;
    }

    function pcTest(e) {
        // e = e || window.event;
        // console.log("wheelDelta:" + e.wheelDelta + "\tdetail:" + e.detail);
        if (e.wheelDelta > 0) {
            bmp.scaleY = bmp.scaleX = (bmp.scaleY + 0.03);
        } else {
            bmp.scaleY = bmp.scaleX = (bmp.scaleY - 0.03);
        }
    }

    function clearnHead() {
        if (bmp && bmp.parent) {
            bmp.parent.removeChild(bmp);
            bmp = null;
            bmp1.parent.removeChild(bmp1);
            bmp1 = null;
            stage.update();
        }
    }

    function destruct() {
        window.onmousewheel = document.onmousewheel = null;
    }

    function enableHead() {
        hammertime.off("pinchin");
        hammertime.off("pinchout");
        hammertime.off("pinchend");
        hammertime.off("panmove");
        hammertime.off("pinch");
    }

    function getHead() {
        var headall = new createjs.MovieClip();
        headall.addChild(bmp);
        headall.y = -33;
        headall.x = -3;
        // exportRoot.p2.p2player.player.playerhead.playerhead1.addChild(headall);
        return headall;
    }

    return {
        init: struct,
        destruct: destruct,
        getHead: getHead,
        selectHead: selectHead,
        enableHead: enableHead
    }
}
()


