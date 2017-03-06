/**
 * Created by cheilchina on 2017/2/28.
 */
var Main = function () {
    var startIndex = 0;
    var currentPage = 0 + startIndex;
    var maxPageNum = 10;
    var isMoving = false;
    var pageHeight = 1334;
    var pageFun = [];
    var isAddText = false;

    function struct(mc) {
        exportRoot.pageMc = mc;
        exportRoot.addChild(exportRoot.pageMc);
        exportRoot.pageMc.y = 0;
        pageFun = [page1, page2, page3, page4, page5, page6, page7, page8, page9, page10];
        page1();
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

    function page1() {
        exportRoot.pageMc.p1.gotoAndPlay(0);
        // setTimeout(function(){},1000);
        TweenMax.killAll();
        for (var i = 1; i < 7; i++) {
            exportRoot.pageMc.p1["text" + i].alpha = 0;
            TweenMax.fromTo(exportRoot.pageMc.p1["text" + i], 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
                scaleX: 1,
                scaleY: 1,
                opacity: 1,
                delay: (i * 0.2) + 2,
                rotation: 0,
                alpha: 1,
                ease: Back.easeOut.config(1.7)
            });
        }
    }

    function page2() {
        TweenMax.killAll();
        // exportRoot.pageMc.p1["text" + i].alpha = 0;
        TweenMax.fromTo(exportRoot.pageMc.p2.p2t1, 0.8, {scaleX: 0, scaleY: 0, opacity: 0}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 0.5,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });
        //================================================================================================
        TweenMax.fromTo(exportRoot.pageMc.p2.p2i1, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 1,
            rotation: 0,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(exportRoot.pageMc.p2.p2i2, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 1.5,
            rotation: 0,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(exportRoot.pageMc.p2.p2i3, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 2,
            rotation: 0,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });
    }

    function page3() {
        TweenMax.killAll();
        exportRoot.pageMc.p3.p3m1.gotoAndPlay(0);
        exportRoot.pageMc.p3.p3m2.gotoAndPlay(0);
        // Animiation.create(exportRoot.pageMc.p3.p3contentText, Animiation.ADD_TEXT, 1000, 1500);
        TweenMax.fromTo(exportRoot.pageMc.p3.p3t1, 0.8, {scaleX: 0, scaleY: 0, opacity: 0}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 0.5,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });

        exportRoot.pageMc.p3.p3i1.x = -150;
        exportRoot.pageMc.p3.p3i2.x = 750;
        exportRoot.pageMc.p3.p3i3.x = 750;

        //================================================================================================
        TweenMax.fromTo(exportRoot.pageMc.p3.p3i1, 0.5, {alpha: 0}, {
            x: 96,
            opacity: 1,
            delay: 1,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(exportRoot.pageMc.p3.p3i2, 0.5, {alpha: 0}, {
            x: 482.7,
            opacity: 1,
            delay: 1.2,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(exportRoot.pageMc.p3.p3i3, 0.5, {alpha: 0}, {
            x: 291.5,
            opacity: 1,
            delay: 1.4,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });
    }

    function page4() {
        TweenMax.killAll();
        exportRoot.pageMc.p4.p4m1.gotoAndPlay(0);
        TweenMax.fromTo(exportRoot.pageMc.p4.p4t0, 0.8, {scaleX: 0, scaleY: 0, opacity: 0}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 0.5,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(exportRoot.pageMc.p4.p4center, 0.8, {
            scaleX: 0.5,
            scaleY: 0.5,
            opacity: 0,
            rotation: 360,
            alpha: 0
        }, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 0.8,
            rotation: 0,
            alpha: 1
        });
        //================================================================================================
        TweenMax.fromTo(exportRoot.pageMc.p4.p4i1, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360, alpha: 0}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 2,
            rotation: 0,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });
        TweenMax.fromTo(exportRoot.pageMc.p4.p4i2, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360, alpha: 0}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 2.5,
            rotation: 0, alpha: 1,
            ease: Back.easeOut.config(1.7)
        });
        TweenMax.fromTo(exportRoot.pageMc.p4.p4i3, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360, alpha: 0}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 3,
            rotation: 0, alpha: 1,
            ease: Back.easeOut.config(1.7)
        });
        TweenMax.fromTo(exportRoot.pageMc.p4.p4i4, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360, alpha: 0}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 3.5,
            rotation: 0, alpha: 1,
            ease: Back.easeOut.config(1.7)
        });

    }

    function page5() {
        TweenMax.killAll();
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
        TweenMax.killAll();
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
        TweenMax.killAll();
        isAddText = true;
        exportRoot.pageMc.p7.gotoAndStop(0);
        Animiation.create(exportRoot.pageMc.p7.contentText, Animiation.ADD_TEXT, 1000)
        setTimeout(function () {
            isAddText = false;
            exportRoot.pageMc.p7.gotoAndPlay(1);
        }, 1000);
    }

    function page8() {
        TweenMax.killAll();
        Animiation.create(exportRoot.pageMc.p8.contentText, Animiation.ADD_TEXT, 1000);
        TweenMax.fromTo(exportRoot.pageMc.p8.c1, 1.2, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 0,
            rotation: 0,
            ease: Back.easeOut.config(7.7)
        });
        TweenMax.fromTo(exportRoot.pageMc.p8.c2, 1.2, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 0.2,
            rotation: 0,
            ease: Back.easeOut.config(5.7)
        });
        TweenMax.fromTo(exportRoot.pageMc.p8.c3, 1.2, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 0.4,
            rotation: 0,
            ease: Back.easeOut.config(7.7)
        });
        //==================================================================================================
        TweenMax.fromTo(exportRoot.pageMc.p8.i1, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 1.5,
            rotation: 0,
            ease: Back.easeOut.config(1.7)
        });
        TweenMax.fromTo(exportRoot.pageMc.p8.i2, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 2,
            rotation: 0,
            ease: Back.easeOut.config(1.7)
        });
        TweenMax.fromTo(exportRoot.pageMc.p8.i3, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 2.5,
            rotation: 0,
            ease: Back.easeOut.config(1.7)
        });

    }

    function page9() {
        TweenMax.killAll();
        // Animiation.create(exportRoot.pageMc.p9.contentText, Animiation.ADD_TEXT, 1000);

        TweenMax.fromTo(exportRoot.pageMc.p9.p9i1, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 1,
            rotation: 0,
            ease: Back.easeOut.config(1.7)
        });
        TweenMax.fromTo(exportRoot.pageMc.p9.p9i2, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 1.5,
            rotation: 0,
            ease: Back.easeOut.config(1.7)
        });
        TweenMax.fromTo(exportRoot.pageMc.p9.p9i3, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 2,
            rotation: 0,
            ease: Back.easeOut.config(1.7)
        });
        TweenMax.fromTo(exportRoot.pageMc.p9.p9i4, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 2.5,
            rotation: 0,
            ease: Back.easeOut.config(1.7)
        });
    }

    function page10() {
        TweenMax.killAll();
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
                    if (delay) {
                        setTimeout(function () {

                        }, delay)
                    }

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