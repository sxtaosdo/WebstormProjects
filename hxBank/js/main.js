/**
 * Created by cheilchina on 2017/2/28.
 */
var Main = function () {
    var CHANGE_PAGE_ANIMATION_TIME = 500;//切页动画时间
    var startIndex = 0;
    var currentPageIndex = 0 + startIndex;
    var currentPage;
    var oldPage;
    var newPage;
    var maxPageNum = 10;
    var isMoving = false;
    var pageHeight = 1334;
    var pageFun = [];
    var isAddText = false;

    function struct() {
        pageFun = [page1, page2, page3, page4, page5, page6, page7, page8, page9, page10];
        currentPage = newPage = new lib.pageClass1();
        exportRoot.addChild(currentPage);
        page1();
        $(window).swipe({
            swipeUp: function (event, direction, distance, duration, fingerCount) {
                if (isCanChange()) {
                    currentPageIndex += 1;
                    if (currentPageIndex >= maxPageNum) {
                        currentPageIndex = maxPageNum - 1;
                        return;
                    }
                    changePageAnimation(currentPage, currentPageIndex, direction);
                    checkPage();
                }
            },
        });
        $(window).swipe({
            swipeDown: function (event, direction, distance, duration, fingerCount) {
                if (isCanChange()) {
                    currentPageIndex -= 1;
                    if (currentPageIndex < 0) {
                        currentPageIndex = 0;
                        return;
                    }
                    changePageAnimation(currentPage, currentPageIndex, direction);
                    checkPage();
                }
            },
        });
    }

    function checkPage() {
        if (pageFun[currentPageIndex]) {
            pageFun[currentPageIndex]();
        }
    }

    function changePageAnimation(oldPage, newPageIndex, dic) {
        isMoving = true;
        newPage = new lib["pageClass" + (newPageIndex + 1)]();
        exportRoot.addChild(newPage);
        if (dic == "down") {//向下滑
            newPage.y = -pageHeight;
            createjs.Tween.get(oldPage).to({y: pageHeight}, CHANGE_PAGE_ANIMATION_TIME);
            createjs.Tween.get(newPage).to({y: 0}, CHANGE_PAGE_ANIMATION_TIME);
        } else {//向上滑
            newPage.y = pageHeight;
            createjs.Tween.get(oldPage).to({y: -pageHeight}, CHANGE_PAGE_ANIMATION_TIME);
            createjs.Tween.get(newPage).to({y: 0}, CHANGE_PAGE_ANIMATION_TIME);
        }
        setTimeout(function () {
            clearnOldAnimation();
            currentPage = newPage;
            isMoving = false;
        }, CHANGE_PAGE_ANIMATION_TIME);
    }

    function clearnOldAnimation() {
        currentPage.stop();
        if (currentPage.parent) {
            currentPage.parent.removeChild(currentPage);
        }
        currentPage = null;
    }

    function page1() {
        newPage.p1.gotoAndPlay(0);
        TweenMax.killAll();
        for (var i = 1; i < 7; i++) {
            newPage.p1["text" + i].alpha = 0;
            console.log("i:" + i + "\t" + newPage.p1["text" + i]);
            TweenMax.fromTo(newPage.p1["text" + i], 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
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
        TweenMax.fromTo(newPage.p2t1, 0.8, {scaleX: 0, scaleY: 0, opacity: 0}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 0.5,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });
        //================================================================================================
        TweenMax.fromTo(newPage.p2i1, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 1,
            rotation: 0,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(newPage.p2i2, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 1.5,
            rotation: 0,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(newPage.p2i3, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
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
        newPage.p3m1.gotoAndPlay(0);
        newPage.p3m2.gotoAndPlay(0);
        // Animiation.create(newPage.p3contentText, Animiation.ADD_TEXT, 1000, 1500);
        TweenMax.fromTo(newPage.p3t1, 0.8, {scaleX: 0, scaleY: 0, opacity: 0}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 0.5,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });

        newPage.p3i1.x = -150;
        newPage.p3i2.x = 750;
        newPage.p3i3.x = 750;

        //================================================================================================
        TweenMax.fromTo(newPage.p3i1, 0.5, {alpha: 0}, {
            x: 96,
            opacity: 1,
            delay: 1,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(newPage.p3i2, 0.5, {alpha: 0}, {
            x: 482.7,
            opacity: 1,
            delay: 1.2,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(newPage.p3i3, 0.5, {alpha: 0}, {
            x: 291.5,
            opacity: 1,
            delay: 1.4,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });
    }

    function page4() {
        TweenMax.killAll();
        newPage.p4m1.gotoAndPlay(0);
        TweenMax.fromTo(newPage.p4t0, 0.8, {scaleX: 0, scaleY: 0, opacity: 0}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 0.5,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(newPage.p4center, 0.8, {
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
        TweenMax.fromTo(newPage.p4i1, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360, alpha: 0}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 2,
            rotation: 0,
            alpha: 1,
            ease: Back.easeOut.config(1.7)
        });
        TweenMax.fromTo(newPage.p4i2, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360, alpha: 0}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 2.5,
            rotation: 0, alpha: 1,
            ease: Back.easeOut.config(1.7)
        });
        TweenMax.fromTo(newPage.p4i3, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360, alpha: 0}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 3,
            rotation: 0, alpha: 1,
            ease: Back.easeOut.config(1.7)
        });
        TweenMax.fromTo(newPage.p4i4, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360, alpha: 0}, {
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
        Animiation.create(newPage.contentText, Animiation.ADD_TEXT, 1000);
        TweenMax.fromTo(newPage.centerMc, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
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
        Animiation.create(newPage.text1, Animiation.UP_FADE_IN, 0.5, 1.5);
        Animiation.create(newPage.text2, Animiation.UP_FADE_IN, 0.5, 2);
        Animiation.create(newPage.text3, Animiation.RIGHT_FADE_IN, 0.5, 2.5);
        Animiation.create(newPage.text4, Animiation.RIGHT_FADE_IN, 0.5, 3);

    }

    function page6() {
        TweenMax.killAll();
        isAddText = true;

        newPage.gotoAndStop(0);

        TweenMax.fromTo(newPage.centerIcon, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 1,
            rotation: 0,
            ease: Back.easeOut.config(1.7)
        });

        Animiation.create(newPage.contentText, Animiation.ADD_TEXT, 1000);

        setTimeout(function () {
            isAddText = false;
        }, 1000);

        //arrow============================================================================
        TweenMax.fromTo(newPage.arrow1, 0.8, {
            x: newPage.arrow1.x + 10,
            y: newPage.arrow1.y + 10,
            alpha: 0
        }, {
            y: newPage.arrow1.y - 10,
            x: newPage.arrow1.x - 10,
            alpha: 1,
            delay: 1.5,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(newPage.arrow2, 0.8, {
            x: newPage.arrow2.x - 10,
            y: newPage.arrow2.y + 10,
            alpha: 0
        }, {
            y: newPage.arrow2.y - 10,
            x: newPage.arrow2.x + 10,
            alpha: 1,
            delay: 2.5,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(newPage.arrow3, 0.8, {
            // x: newPage.arrow3.x - 10,
            y: newPage.arrow3.y - 10,
            alpha: 0
        }, {
            y: newPage.arrow3.y + 10,
            // x: newPage.arrow3.x + 10,
            alpha: 1,
            delay: 3.5,
            ease: Back.easeOut.config(1.7)
        });

        //icon============================================================================
        TweenMax.fromTo(newPage.icon1, 0.8, {
            x: newPage.icon1.x + 10,
            y: newPage.icon1.y + 10,
            alpha: 0
        }, {
            y: newPage.icon1.y - 10,
            x: newPage.icon1.x - 10,
            alpha: 1,
            delay: 1.9,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(newPage.icon2, 0.8, {
            x: newPage.icon2.x - 10,
            y: newPage.icon2.y + 10,
            alpha: 0
        }, {
            y: newPage.icon2.y - 10,
            x: newPage.icon2.x + 10,
            alpha: 1,
            delay: 2.9,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(newPage.icon3, 0.8, {
            // x: newPage.arrow3.x - 10,
            y: newPage.icon3.y - 10,
            alpha: 0
        }, {
            y: newPage.icon3.y + 10,
            // x: newPage.arrow3.x + 10,
            alpha: 1,
            delay: 3.9,
            ease: Back.easeOut.config(1.7)
        });

        //text============================================================================
        TweenMax.fromTo(newPage.text1, 0.8, {
            // x: newPage.text1.x + 10,
            y: newPage.text1.y + 10,
            alpha: 0
        }, {
            y: newPage.text1.y - 10,
            // x: newPage.text1.x - 10,
            alpha: 1,
            delay: 2.3,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(newPage.text2, 0.8, {
            // x: newPage.text2.x - 10,
            y: newPage.text2.y + 10,
            alpha: 0
        }, {
            y: newPage.text2.y - 10,
            // x: newPage.text2.x + 10,
            alpha: 1,
            delay: 3.3,
            ease: Back.easeOut.config(1.7)
        });

        TweenMax.fromTo(newPage.text3, 0.8, {
            // x: newPage.arrow3.x - 10,
            y: newPage.text3.y - 10,
            alpha: 0
        }, {
            y: newPage.text3.y + 10,
            // x: newPage.arrow3.x + 10,
            alpha: 1,
            delay: 4.3,
            ease: Back.easeOut.config(1.7)
        });

    }

    function page7() {
        TweenMax.killAll();
        isAddText = true;
        newPage.gotoAndStop(0);
        Animiation.create(newPage.contentText, Animiation.ADD_TEXT, 1000)
        setTimeout(function () {
            isAddText = false;
            newPage.gotoAndPlay(1);
        }, 1000);
    }

    function page8() {
        TweenMax.killAll();
        Animiation.create(newPage.contentText, Animiation.ADD_TEXT, 1000);
        TweenMax.fromTo(newPage.c1, 1.2, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 0,
            rotation: 0,
            ease: Back.easeOut.config(7.7)
        });
        TweenMax.fromTo(newPage.c2, 1.2, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 0.2,
            rotation: 0,
            ease: Back.easeOut.config(5.7)
        });
        TweenMax.fromTo(newPage.c3, 1.2, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 0.4,
            rotation: 0,
            ease: Back.easeOut.config(7.7)
        });
        //==================================================================================================
        TweenMax.fromTo(newPage.i1, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 1.5,
            rotation: 0,
            ease: Back.easeOut.config(1.7)
        });
        TweenMax.fromTo(newPage.i2, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 2,
            rotation: 0,
            ease: Back.easeOut.config(1.7)
        });
        TweenMax.fromTo(newPage.i3, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
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
        // Animiation.create(newPage.contentText, Animiation.ADD_TEXT, 1000);

        TweenMax.fromTo(newPage.p9i1, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 1,
            rotation: 0,
            ease: Back.easeOut.config(1.7)
        });
        TweenMax.fromTo(newPage.p9i2, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 1.5,
            rotation: 0,
            ease: Back.easeOut.config(1.7)
        });
        TweenMax.fromTo(newPage.p9i3, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            delay: 2,
            rotation: 0,
            ease: Back.easeOut.config(1.7)
        });
        TweenMax.fromTo(newPage.p9i4, 0.8, {scaleX: 0, scaleY: 0, opacity: 0, rotation: -360}, {
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