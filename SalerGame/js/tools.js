/**
 * Created by cheilchina on 2017/3/24.
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
                console.log(true)
                return true;
            }
        } catch (e) {
            console.log(false)
            return false;
        }
        console.log(false)
        return false;
    }

    //解析配置文件
    function parseConfig() {
        configList = config.question;
    }

    return {
        init: struct,
        destruct: destruct,
        create: createQuestion,
        getHelp: getHelp,
        solve: solve
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
                    break;
                case CONFIG_THING:
                    cores += ScoreConfig.scoreType.thing;
                    break;
            }
        }
        onChange();
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
 * 头像
 * @type {{init, destruct, setHead, getHead, selectHead, enableHead, getOriginal}}
 */
var Head2 = function () {
    //上边界
    var TOP = 200;
    //左边界
    var LEFT = 50;
    //直径
    var LENGTH = 267;
    //最大缩放比
    var MAX_SIZE = 1280;
    //第一次触摸
    var isFristTouch = true;
    //当前缩放
    var lastScale = 1;
    //容器
    var headContent;
    //移动速率
    var MOVE_SPEED = 15;
    //是否选择的头像
    var isSelectHead = false;

    var headCon;
    var headBmp;
    var headAll;

    function struct() {
        headCon = new createjs.MovieClip();
        headMask = new createjs.Shape();
        headMask.graphics.beginFill("#ff0000").drawCircle(640 >> 1, 475, LENGTH);
        beginPoint = {};

        headAll = new createjs.Container();
        headAll.addChild(headCon);

        window.onmousewheel = document.onmousewheel = pcTest;
    }

    function destruct() {
        enableHead();
    }

    function pcTest(e) {
        // e = e || window.event;
        // console.log("wheelDelta:" + e.wheelDelta + "\tdetail:" + e.detail);
        if (e.wheelDelta > 0) {
            headCon.scaleY = headCon.scaleX = (headCon.scaleY + 0.03);
        } else {
            headCon.scaleY = headCon.scaleX = (headCon.scaleY - 0.03);
        }
        console.log("headCon.scaleY:" + headCon.scaleY);
    }

    //设置头像
    function setHead() {
        hammertime.on('panmove', function (ev) {
            if (ev.type == "panmove") {
                headCon.x = ev.velocityX * MOVE_SPEED + headCon.x;
                headCon.y = ev.velocityY * MOVE_SPEED + headCon.y;
            }
        });

        hammertime.on("pinchin", function (e) {
            setHeadScale(e);
        });

        hammertime.on("pinchout", function (e) {
            var max = Math.max(headCon.scaleX * headCon.getBounds().width, headCon.scaleY * headCon.getBounds().height)
            if (max < MAX_SIZE) {
                setHeadScale(e);
            }
        });
        hammertime.on("pinchend", function (e) {
            lastScale = headCon.scaleY;
        });
    }

    function setHeadScale(e) {
        headCon.scaleY = headCon.scaleX = e.scale * lastScale;
    }

    //选择头像
    function selectHead(content, callback) {
        headContent = content;
        var btn = document.getElementById("inputBtn");
        btn.onchange = function () {
            var temp = document.getElementById("inputBtn").files[0];
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
        setHead();
    }

    function onHead(imageData) {
        clearnHead();
        headBmp = new createjs.Bitmap(imageData);

        headCon.addChild(headBmp);
        headCon.mask = headMask;

        var bound = headBmp.getBounds();
        headCon.regX = bound.width >> 1;
        headCon.regY = bound.height >> 1;

        headCon.x = document.body.clientWidth >> 1;
        headCon.y = document.body.clientHeight >> 1;
        var min = Math.min(bound.width, bound.height);
        lastScale = headCon.scaleX = headCon.scaleY = 640 / min;
        lastBound = headCon.getBounds();
        headContent.addChildAt(headAll, 0);
        clone();
    }

    //克隆一个头像
    // function clone() {
    //     var tempHead = new createjs.Bitmap();
    //     var temp = tempHead.draw(headAll);
    //     console.log(temp);
    //     // headContent.parent.removeChild(headContent);
    //     exportRoot.stage.addChild(tempHead);
    // }

    function clearnHead() {
        if (headBmp && headBmp.parent) {
            headBmp.parent.removeChild(headBmp);
        }
    }

    function getHead() {
        return headAll;
    }

    function enableHead() {
        hammertime.off("pinchin");
        hammertime.off("pinchout");
        hammertime.off("pinchend");
        hammertime.off("panmove");
    }

    function getOriginal() {
        return headCon;
    }

    return {
        init: struct,
        destruct: destruct,
        setHead: setHead,
        getHead: getHead,
        selectHead: selectHead,
        enableHead: enableHead,
        getOriginal: getOriginal,
        isSelectHead: isSelectHead
    }
}()

/**
 * Created by cheilchina on 2017/3/28.
 */
var Head = function () {
    //头像
    var bmp;
    //头像遮罩
    var headMask;
    //图片方向
    var Orientation;
    //缩放比例
    var lastScale;
    //移动速率
    var MOVE_SPEED = 15;
    //头像最小半径
    var headr = 267;
    //图片最大宽度
    var maxw = 640;
    //图片最小宽度；
    var minw = 532;
    //实际高宽
    var bmph;
    var bmpw;
    //last状态
    var lastx;
    var lasty;
    var lastwidth;
    var lastheight;
    var movex;
    var movey;
    //遮罩4个边的坐标
    var maskleft = 320 - headr;
    var maskright = 320 + headr;
    var masktop;
    var maskbottom;
    //获取图片高度宽度
    var PixelXDimension;
    var PixelYDimension;
    var headContent;

    function struct() {
        //手指动作缩放位移头像
        var pinch = document.getElementById("canvas");
        hammertime = new Hammer(pinch);
        hammertime.add(new Hammer.Pinch());
        hammertime.on('panmove', function (ev) {
            if (PixelYDimension < PixelXDimension) {
                bmph = PixelXDimension * bmp.scaleX / 2;
                bmpw = PixelYDimension * bmp.scaleY / 2;
                if (ev.type == "panmove") {
                    if ((bmp.x + ev.velocityX * MOVE_SPEED + bmpw ) <= maskright) {
                        bmp.x = maskright - bmpw;
                    } else if ((bmp.x + ev.velocityX * MOVE_SPEED - bmpw) >= maskleft) {
                        bmp.x = maskleft + bmpw;
                    } else {
                        bmp.x = ev.velocityX * MOVE_SPEED + bmp.x;
                    }
                    if ((bmp.y + ev.velocityY * MOVE_SPEED + bmph) <= maskbottom) {
                        bmp.y = maskbottom - bmph;
                    } else if ((bmp.y + ev.velocityY * MOVE_SPEED - bmph) >= masktop) {
                        bmp.y = masktop + bmph;
                    } else {
                        bmp.y = ev.velocityY * MOVE_SPEED + bmp.y;
                    }
                }
            } else {
                bmpw = PixelXDimension * bmp.scaleX / 2;
                bmph = PixelYDimension * bmp.scaleY / 2;
                if (ev.type == "panmove") {
                    if ((bmp.x + ev.velocityX * MOVE_SPEED + bmpw ) <= maskright) {
                        bmp.x = maskright - bmpw;
                    } else if ((bmp.x + ev.velocityX * MOVE_SPEED - bmpw) >= maskleft) {
                        bmp.x = maskleft + bmpw;
                    } else {
                        bmp.x = ev.velocityX * MOVE_SPEED + bmp.x;
                    }
                    if ((bmp.y + ev.velocityY * MOVE_SPEED + bmph) <= maskbottom) {
                        bmp.y = maskbottom - bmph;
                    } else if ((bmp.y + ev.velocityY * MOVE_SPEED - bmph) >= masktop) {
                        bmp.y = masktop + bmph;
                    } else {
                        bmp.y = ev.velocityY * MOVE_SPEED + bmp.y;
                    }
                }
            }
        });
        hammertime.on("pinchin", function (e) {
            if (PixelYDimension < PixelXDimension) {
                bmph = PixelXDimension * bmp.scaleX / 2;
                bmpw = PixelYDimension * bmp.scaleY / 2;
                if (bmp.scaleX * PixelYDimension > minw) {
                    if (bmp.x + bmpw - 5 < maskright) {
                        bmp.x = maskright - bmpw;
                    }
                    if (bmp.x - bmpw + 5 > maskleft) {
                        bmp.x = maskleft + bmpw;
                    }
                    if (bmp.y + bmph - 5 < maskbottom) {
                        bmp.y = maskbottom - bmph;
                    }
                    if (bmp.y - bmph + 5 > masktop) {
                        bmp.y = masktop + bmph;
                    }
                    setHeadScale(e);
                    console.log("bmp.x+bmpw-5:", bmp.x + bmpw - 5);
                } else {
                    bmp.scaleX = bmp.scaleY = minw / PixelYDimension;
                }
                lastx = bmp.x;
                lasty = bmp.y;
                lastwidth = PixelXDimension * bmp.scaleX;
                lastheight = PixelXDimension * bmp.scaleY;
            }
            // if (PixelXDimension < PixelYDimension) {
            //     if (bmp.scaleX * PixelXDimension >= minw) {
            //         setHeadScale(e);
            //     } else {
            //         bmp.scaleX = bmp.scaleY = minw / PixelXDimension;
            //     }
            // }
            if (PixelXDimension < PixelYDimension) {
                bmpw = PixelXDimension * bmp.scaleX / 2;
                bmph = PixelYDimension * bmp.scaleY / 2;
                if (bmp.scaleX * PixelXDimension > minw) {
                    if (bmp.x + bmpw - 5 < maskright) {
                        bmp.x = maskright - bmpw;
                    }
                    if (bmp.x - bmpw + 5 > maskleft) {
                        bmp.x = maskleft + bmpw;
                    }
                    if (bmp.y + bmph - 5 < maskbottom) {
                        bmp.y = maskbottom - bmph;
                    }
                    if (bmp.y - bmph + 5 > masktop) {
                        bmp.y = masktop + bmph;
                    }
                    setHeadScale(e);
                    console.log("bmp.x+bmpw-5:", bmp.x + bmpw - 5);
                } else {
                    bmp.scaleX = bmp.scaleY = minw / PixelXDimension;
                }
                lastx = bmp.x;
                lasty = bmp.y;
                lastwidth = PixelYDimension * bmp.scaleX;
                lastheight = PixelYDimension * bmp.scaleY;
            }
        });

        hammertime.on("pinchout", function (e) {
            if (PixelYDimension < PixelXDimension) {
                if (bmp.scaleX * PixelXDimension <= maxw) {
                    setHeadScale(e);
                } else {
                    bmp.scaleX = bmp.scaleY = maxw / PixelYDimension;
                }
            }
            if (PixelXDimension < PixelYDimension) {
                if (bmp.scaleX <= 1138 / PixelXDimension) {
                    setHeadScale(e);
                } else {
                    bmp.scaleX = bmp.scaleY = 1138 / PixelXDimension;
                }
            }
        });
        hammertime.on("pinchend", function (e) {
            lastScale = bmp.scaleY;
        });
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
        // setHead();


        // var abc = document.getElementById("inputs");
        // abc.onchange = function () {
        //     var temp = document.getElementById("inputs").files[0];
        //     EXIF.getData(temp, function () {
        //         EXIF.getAllTags(temp);
        //         EXIF.getTag(temp, 'Orientation');
        //         EXIF.getTag(temp, 'PixelXDimension');
        //         EXIF.getTag(temp, 'PixelYDimension');
        //         PixelXDimension = EXIF.getTag(temp, 'PixelXDimension');
        //         PixelYDimension = EXIF.getTag(temp, 'PixelYDimension');
        //         Orientation = EXIF.getTag(temp, 'Orientation');
        //     });
        //     var reader = new FileReader();
        //     reader.readAsDataURL(temp);
        //     reader.onload = function () {
        //         onHead(reader.result);
        //     };
        // }
        // abc.click();
    }

    function onHead(imageData) {
        var temp = (document.body.clientHeight >> 1) - 62;
        window.onmousewheel = document.onmousewheel = pcTest;
        //		图形遮罩
        headMask = new createjs.Shape();
        headMask.graphics.beginFill("#ff0000").drawCircle(320, temp, headr);
        //		生成遮罩头像
        if (!imageData) {
            console.log('imageData err-->');
            return;
        }
        clearnHead();
        bmp = new createjs.Bitmap(imageData);
        bmp.mask = headMask;
        if (!PixelXDimension) {
            PixelXDimension = bmp.getBounds().width;
            PixelYDimension = bmp.getBounds().height;
        }
        bmp.regX = PixelXDimension / 2;
        bmp.regY = PixelYDimension / 2;
        bmp.x = 320;
        bmp.y = temp;
        maskbottom = bmp.y + headr;
        masktop = bmp.y - headr;
        maskleft = bmp.x - headr;
        maskright = bmp.x + headr;

        // maskbottom = bmp.y + headr;
        // masktop = bmp.y - headr;
        if (PixelYDimension < PixelXDimension) {
            bmp.scaleX = 640 / PixelYDimension;
            bmp.scaleY = 640 / PixelYDimension;
            lastScale = bmp.scaleX;
        }
        if (PixelXDimension < PixelYDimension) {
            bmp.scaleX = 1138 / PixelXDimension;
            bmp.scaleY = 1138 / PixelXDimension;
            lastScale = bmp.scaleX;
        }
        if (Orientation == 6) {
            bmp.rotation = 90;
            console.log("6");
        }
        if (Orientation == 3) {
            bmp.rotation = 180;
            console.log("3");
        }
        if (Orientation == 8) {
            bmp.rotation = 270;
            console.log("8");
        }
        headContent.addChild(bmp);
    }

    function setHeadScale(e) {
        bmp.scaleY = bmp.scaleX = e.scale * lastScale;
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
            stage.update();
        }
    }

    function destruct() {

    }

    function enableHead() {
        hammertime.off("pinchin");
        hammertime.off("pinchout");
        hammertime.off("pinchend");
        hammertime.off("panmove");
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
        headMask: headMask,
        enableHead: enableHead
    }
}
()


