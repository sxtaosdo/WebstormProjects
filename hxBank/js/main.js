/**
 * Created by cheilchina on 2017/2/28.
 */
var Main = function () {
    var startIndex = 0;
    var currentPage = 0 + startIndex;
    var isMoving = false;
    var pageHeight = 1334;
    var pageFun = [];
    var isAddText = false;

    function struct() {
        exportRoot.pageMc.y = 0;
        pageFun = [page5, page6, page7, page8, page9, page10];
        page5();
        $(window).swipe({
            swipeUp: function (event, direction, distance, duration, fingerCount) {
                if (isCanChange()) {
                    currentPage += 1;
                    createjs.Tween.removeTweens(exportRoot.pageMc);
                    isMoving = true;
                    createjs.Tween.get(exportRoot.pageMc).to({y: -(currentPage - startIndex) * pageHeight}, 500).call(function () {
                        isMoving = false;
                    })
                    checkPage();
                }
            },
        });
        $(window).swipe({
            swipeDown: function (event, direction, distance, duration, fingerCount) {
                if (isCanChange()) {
                    currentPage -= 1;
                    createjs.Tween.removeTweens(exportRoot.pageMc);
                    isMoving = true;
                    createjs.Tween.get(exportRoot.pageMc).to({y: -(currentPage - startIndex) * pageHeight}, 500).call(function () {
                        isMoving = false;
                    })
                    checkPage();
                }
            },
        });
    }

    function checkPage() {
        if (pageFun[currentPage]) {
            pageFun[currentPage]();
        }

    }

    function page5() {
        isAddText = true;
        Animiation.create(exportRoot.pageMc.p5.contentText, Animiation.ADD_TEXT, 2000);
        setTimeout(function () {
            isAddText = false;
        },2000)
        Animiation.create(exportRoot.pageMc.p5.text1, Animiation.UP_FADE_IN, 500, 2500);
        Animiation.create(exportRoot.pageMc.p5.text2, Animiation.UP_FADE_IN, 500, 3000);
        Animiation.create(exportRoot.pageMc.p5.text3, Animiation.RIGHT_FADE_IN, 500, 3500);
        Animiation.create(exportRoot.pageMc.p5.text4, Animiation.RIGHT_FADE_IN, 500, 4000);

    }

    function page6() {
        isAddText = true;
        exportRoot.pageMc.p6.gotoAndStop(0);
        Animiation.create(exportRoot.pageMc.p6.contentText, Animiation.ADD_TEXT, 2000)
        setTimeout(function () {
            isAddText = false;
            exportRoot.pageMc.p6.gotoAndStop(1);
        }, 2000);
    }

    function page7() {
        isAddText = true;
        exportRoot.pageMc.p7.gotoAndStop(0);
        Animiation.create(exportRoot.pageMc.p7.contentText, Animiation.ADD_TEXT, 2000)
        setTimeout(function () {
            isAddText = false;
            exportRoot.pageMc.p7.gotoAndPlay(1);
        }, 2000);
    }

    function page8() {

    }

    function page9() {

    }

    function page10() {

    }

    function isCanChange() {
        if (isAddText || isMoving) {
            return false;
        }
        return true;
    }

    return {
        init: struct
    }
}()

var Animiation = function () {
    var UP_FADE_IN = 0;
    var RIGHT_FADE_IN = 1;
    var ADD_TEXT = 100;

    function create(mc, name, time, delay) {
        if (mc) {
            if (!delay) {
                delay = 0;
            }
            switch (name) {
                case UP_FADE_IN:
                    mc.y += 10;
                    mc.alpha = 0;
                    createjs.Tween.get(mc, {override: true}).wait(delay).to({y: mc.y - 10, alpha: 1}, time);
                    break;
                case RIGHT_FADE_IN:
                    mc.x -= 10;
                    mc.alpha = 0;
                    createjs.Tween.get(mc, {override: true}).wait(delay).to({x: mc.x + 10, alpha: 1}, time);
                    break;
                case ADD_TEXT:
                    var str = [];
                    var len = mc.text.length
                    for (var i = 0; i < len; i++) {
                        str.push(mc.text.substr(i, 1));
                    }
                    mc.text = "";
                    var tk = setInterval(function () {
                        if (mc.text.length < len) {
                            mc.text += str.shift();
                        } else {
                            clearInterval(tk);
                        }
                    }, time / len);
                    break;
            }

        }
        return this;
    }

    function addText(mc, time) {

    }

    return {
        create: create,
        UP_FADE_IN: UP_FADE_IN,
        ADD_TEXT: ADD_TEXT,
        RIGHT_FADE_IN: RIGHT_FADE_IN,
    }

}()