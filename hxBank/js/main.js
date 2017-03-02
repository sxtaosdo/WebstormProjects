/**
 * Created by cheilchina on 2017/2/28.
 */
var Main = function () {
    var startIndex = 0;
    var currentPage = 0 + startIndex;
    var maxPageNum = 2;
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
                    if (currentPage >= maxPageNum) {
                        currentPage = maxPageNum - 1;
                        return;
                    }
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
                    if (currentPage < 0) {
                        currentPage = 0;
                        return;
                    }
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
        Animiation.create(exportRoot.pageMc.p5.contentText, Animiation.ADD_TEXT, 1000);
        TweenMax.fromTo(exportRoot.pageMc.p5.centerMc, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 0.8,
            rotation: 0,
            ease: Back.easeOut.config(1.7)
        });
        setTimeout(function () {
            isAddText = false;
        }, 1000)
        Animiation.create(exportRoot.pageMc.p5.text1, Animiation.UP_FADE_IN, 0.5, 1.5);
        Animiation.create(exportRoot.pageMc.p5.text2, Animiation.UP_FADE_IN, 0.5, 2);
        Animiation.create(exportRoot.pageMc.p5.text3, Animiation.RIGHT_FADE_IN, 0.5, 2.5);
        Animiation.create(exportRoot.pageMc.p5.text4, Animiation.RIGHT_FADE_IN, 0.5, 3);

    }

    function page6() {
        isAddText = true;

        exportRoot.pageMc.p6.gotoAndStop(0);

        TweenMax.fromTo(exportRoot.pageMc.p6.centerIcon, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 1,
            rotation: 0,
            ease: Back.easeOut.config(1.7)
        });

        Animiation.create(exportRoot.pageMc.p6.contentText, Animiation.ADD_TEXT, 1000);

        setTimeout(function () {
            isAddText = false;
        }, 1000);

        //arrow============================================================================
        TweenMax.fromTo(exportRoot.pageMc.p6.arrow1, 0.8, {
            x: exportRoot.pageMc.p6.arrow1.x + 10,
            y: exportRoot.pageMc.p6.arrow1.y + 10,
            alpha: 0
        }, {
            y: exportRoot.pageMc.p6.arrow1.y - 10,
            x: exportRoot.pageMc.p6.arrow1.x - 10,
            alpha: 1,
            delay: 1.5,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(exportRoot.pageMc.p6.arrow2, 0.8, {
            x: exportRoot.pageMc.p6.arrow2.x - 10,
            y: exportRoot.pageMc.p6.arrow2.y + 10,
            alpha: 0
        }, {
            y: exportRoot.pageMc.p6.arrow2.y - 10,
            x: exportRoot.pageMc.p6.arrow2.x + 10,
            alpha: 1,
            delay: 2.5,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(exportRoot.pageMc.p6.arrow3, 0.8, {
            // x: exportRoot.pageMc.p6.arrow3.x - 10,
            y: exportRoot.pageMc.p6.arrow3.y - 10,
            alpha: 0
        }, {
            y: exportRoot.pageMc.p6.arrow3.y + 10,
            // x: exportRoot.pageMc.p6.arrow3.x + 10,
            alpha: 1,
            delay: 3.5,
            ease: Back.easeOut.config(1.7)
        });

        //icon============================================================================
        TweenMax.fromTo(exportRoot.pageMc.p6.icon1, 0.8, {
            x: exportRoot.pageMc.p6.icon1.x + 10,
            y: exportRoot.pageMc.p6.icon1.y + 10,
            alpha: 0
        }, {
            y: exportRoot.pageMc.p6.icon1.y - 10,
            x: exportRoot.pageMc.p6.icon1.x - 10,
            alpha: 1,
            delay: 1.9,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(exportRoot.pageMc.p6.icon2, 0.8, {
            x: exportRoot.pageMc.p6.icon2.x - 10,
            y: exportRoot.pageMc.p6.icon2.y + 10,
            alpha: 0
        }, {
            y: exportRoot.pageMc.p6.icon2.y - 10,
            x: exportRoot.pageMc.p6.icon2.x + 10,
            alpha: 1,
            delay: 2.9,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(exportRoot.pageMc.p6.icon3, 0.8, {
            // x: exportRoot.pageMc.p6.arrow3.x - 10,
            y: exportRoot.pageMc.p6.icon3.y - 10,
            alpha: 0
        }, {
            y: exportRoot.pageMc.p6.icon3.y + 10,
            // x: exportRoot.pageMc.p6.arrow3.x + 10,
            alpha: 1,
            delay: 3.9,
            ease: Back.easeOut.config(1.7)
        });

        //text============================================================================
        TweenMax.fromTo(exportRoot.pageMc.p6.text1, 0.8, {
            // x: exportRoot.pageMc.p6.text1.x + 10,
            y: exportRoot.pageMc.p6.text1.y + 10,
            alpha: 0
        }, {
            y: exportRoot.pageMc.p6.text1.y - 10,
            // x: exportRoot.pageMc.p6.text1.x - 10,
            alpha: 1,
            delay: 2.3,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(exportRoot.pageMc.p6.text2, 0.8, {
            // x: exportRoot.pageMc.p6.text2.x - 10,
            y: exportRoot.pageMc.p6.text2.y + 10,
            alpha: 0
        }, {
            y: exportRoot.pageMc.p6.text2.y - 10,
            // x: exportRoot.pageMc.p6.text2.x + 10,
            alpha: 1,
            delay: 3.3,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(exportRoot.pageMc.p6.text3, 0.8, {
            // x: exportRoot.pageMc.p6.arrow3.x - 10,
            y: exportRoot.pageMc.p6.text3.y - 10,
            alpha: 0
        }, {
            y: exportRoot.pageMc.p6.text3.y + 10,
            // x: exportRoot.pageMc.p6.arrow3.x + 10,
            alpha: 1,
            delay: 4.3,
            ease: Back.easeOut.config(1.7)
        });

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
                    // createjs.Tween.get(mc, {override: true}).wait(delay).to({y: mc.y - 10, alpha: 1}, time);
                    // TweenMax.to(mc, 0.8,   ease: Back.easeOut.config(1.7)     })
                    TweenMax.to(mc, time, {y: mc.y - 10, alpha: 1, ease: Back.easeOut.config(1.7), delay: delay});
                    break;
                case RIGHT_FADE_IN:
                    mc.x -= 10;
                    mc.alpha = 0;
                    // createjs.Tween.get(mc, {override: true}).wait(delay).to({x: mc.x + 10, alpha: 1}, time);
                    TweenMax.to(mc, time, {x: mc.x + 10, alpha: 1, ease: Back.easeOut.config(1.7), delay: delay})
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