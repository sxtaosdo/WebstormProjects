/**
 * Created by cheilchina on 2016/12/8.
 */
var canvas, stage, exportRoot;
var _isloaded = false;
var currentPage = 0;

function load(index, _callback) {

    canvas = document.getElementById("canvas");
    images = images || {};

    createjs.MotionGuidePlugin.install();

    var main_load = new PxLoader();
    main_load.addProgressListener(loading);
    main_load.addCompletionListener(handleComplete);

    var list = assetsList0;
    if (index == 0 || index == 1) {
        list = list.concat(assetsList1);
    } else {
        if (this["assetsList" + index]) {
            list = list.concat(this["assetsList" + index]);
        }
    }
    console.log(list);
    main_load.addImgArray(list);
    main_load.start();

    function loading(evt) {
        var _t = ((evt.completedCount / evt.totalCount) * 100 >> 0) + "%";
        //var _t = (evt.loaded*100>>0)+"%";
        console.log(_t);
        $(".perTxt").html(_t);
        images[evt.resource.id] = evt.resource.img;
    }

    function handleComplete(evt) {
        //++++++++++++++++++++++
        $(".loadBox").addClass("hidden");
        //+++++++++++++++++++++++
        exportRoot = new lib.ssd();
        stage = new createjs.Stage(canvas);
        stage.addEventListener("added", onAdded);
        stage.addChild(exportRoot);
        createjs.Touch.enable(stage);
        stage.update();
        //exportRoot.main.stop();
        createjs.Ticker.setFPS(lib.properties.fps);
        createjs.Ticker.addEventListener("tick", stage);

        _callback();

        NetData.initBasePic();
        NetData.initUserinfoUi();
    }
}
function initMain(_pam1, _pam2) {
    load(_pam1, function () {
        initMain2(_pam1, _pam2);
    })
}

function initMain2(page, step) {
    currentPage = page;
    console.log(currentPage)
    if (step == 1) {
        exportRoot.main.gotoAndStop(page);
        var mc = exportRoot.main["page" + page];
        mc.gotoAndStop(mc.timeline.duration - 1);
        if (mc.btn1) {
            mc.btn1.addEventListener("click", function () {
                if (page == 1) {
                    exportRoot.main.page1.completeMc.gotoAndStop(1);
                } else {
                    window.location.href = "./index.html";
                }
            })
        }
    } else {
        this["step" + page]();
    }
    exportRoot.main.fmMc.btn.addEventListener("click", function () {
        NetData.showRule()
    })
    exportRoot.main.voideBtn.addEventListener("click", function () {
        NetData.playVideo();//视频播放
        try {
            LinkClick('cn:ssd960pro_20161208_521:click_guankanfashe', 'o')
        } catch (e) {
        }
    });
}

function onResize() {
    $('.canvasBox').css({"height": $(window).height()});
    if (exportRoot.main["page" + currentPage].mz) {
        exportRoot.main["page" + currentPage].mz.y = $(window).height() - 50;
    }
    exportRoot.main.fmMc.y = $(window).height() - 320;

}

function onAdded() {
    $(window).on("resize", onResize).resize();
}

function step0() {
    exportRoot.main.page0.btn1.addEventListener("click", showRule);
    exportRoot.main.page0.btn2.addEventListener("click", step1);
    exportRoot.main.fmMc.btnText.visible = false;
}

function showRule() {
    try {
        LinkClick('cn:ssd960pro_20161208_521:click_guize', 'o');
    } catch (e) {
    }
    NetData.showRule();
}

function step1() {
    exportRoot.main.fmMc.btnText.visible = true;
    console.log("step1");
    exportRoot.main.gotoAndStop(1);
    exportRoot.main.page1.btn.addEventListener("click", step1_play);
    try {
        LinkClick('cn:ssd960pro_20161208_521:click_lijicanyu', 'o')
    } catch (e) {
    }
}

function step1_play() {
    exportRoot.main.page1.btn.removeEventListener("click", step1_play);
    exportRoot.main.page1.gotoAndPlay(1);
    exportRoot.main.page1.shareBtn.addEventListener("click", onStepCompleteClick)
    NetData.getHelp(function (e) {
    });
    try {
        LinkClick('cn:ssd960pro_20161208_521:click_start', 'o')
    } catch (e) {
    }
    function onStepCompleteClick(evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        exportRoot.main.page1.shareBtn.removeEventListener("click", onStepCompleteClick)
        exportRoot.main.page1.completeMc.gotoAndStop(1);
        try {
            LinkClick('cn:ssd960pro_20161208_521:click_lijiyaoqing', 'o');
        } catch (e) {
        }
    }
}

function step2() {
    exportRoot.main.gotoAndStop(2);
    exportRoot.main.page2.gotoAndStop(0);
    exportRoot.main.page2.btn.addEventListener("click", step2_1)
}

function step2_1(evt) {
    evt.stopImmediatePropagation();
    evt.stopPropagation();

    console.log("in step2_1")
    exportRoot.main.page2.gotoAndStop(1);
    $(window).swipe({
        swipeUp: function (event, direction, distance, duration, fingerCount) {
            $(window).swipe({
                swipeUp: null
            });
            NetData.helpFriend(function (e) {
            });
            step2_2();
        },
    });
    // exportRoot.main.page2.addEventListener("pressup", onClick)
    // function onClick() {
    //     exportRoot.main.page2.removeEventListener("pressup", onClick)
    //     NetData.helpFriend(function (e) {
    //     });
    //     step2_2();
    //     try {
    //         LinkClick('cn:ssd960pro_20161208_521:click_bangbangTA', 'o')
    //     } catch (e) {
    //     }
    // }
}

function step2_2(evt) {
    exportRoot.main.page2.gotoAndPlay(2);
    step2_3();
}

function step2_3() {
    exportRoot.main.page2.btn1.addEventListener("click", function () {
        window.location.href = "./index.html";
        try {
            LinkClick('cn:ssd960pro_20161208_521:click_kaiqitansuozhilv', 'o')
        } catch (e) {

        }
    });
}

function step3() {
    exportRoot.main.gotoAndStop(3);
    exportRoot.main.page3.gotoAndStop(0);
    exportRoot.main.page3.btn.addEventListener("click", step3_1)
}

function step3_1(evt) {
    evt.stopImmediatePropagation();
    evt.stopPropagation();
    createjs.Touch.enable(stage);
    exportRoot.main.page3.gotoAndStop(1);
    $(window).swipe({
        swipeUp: function (event, direction, distance, duration, fingerCount) {
            $(window).swipe({
                swipeUp: null
            });
            NetData.helpFriend(function (e) {
            });
            step3_2();
        },
    });
    // exportRoot.main.page3.addEventListener("pressup", onClick)
    //
    // function onClick() {
    //     exportRoot.main.page3.removeEventListener("pressup", onClick)
    //     NetData.helpFriend(function (e) {
    //     });
    //     step3_2();
    // }
}

function step3_2() {
    exportRoot.main.page3.gotoAndPlay(2)
    step3_3();
}

function step3_3() {
    exportRoot.main.page3.btn1.addEventListener("click", function () {
        window.location.href = "./index.html";
    });
}

function step4() {
    exportRoot.main.gotoAndStop(4);
    exportRoot.main.page4.gotoAndStop(0);
    exportRoot.main.page4.btn.addEventListener("click", step4_1)
}

function step4_1(evt) {
    exportRoot.main.page4.gotoAndStop(1);
    $(window).swipe({
        swipeStatus: function (event, phase, direction, distance, duration, fingers, fingerData, currentDirection) {
            var str = "<h4>Swipe Phase : " + phase + "<br/>";
            str += "Current direction: " + currentDirection + "<br/>";
            str += "Direction from inital touch: " + direction + "<br/>";
            str += "Distance from inital touch: " + distance + "<br/>";
            str += "Duration of swipe: " + duration + "<br/>";
            str += "Fingers used: " + fingers + "<br/></h4>";
            if (fingers == 2) {
                NetData.helpFriend(function (e) {
                });
                step4_2();
            }

        },
        threshold: 100,
        maxTimeThreshold: 2500,
        fingers: 'all'
    });

}

function step4_2() {
    exportRoot.main.page4.gotoAndPlay(2)
    step4_3();
}

function step4_3() {
    exportRoot.main.page4.btn1.addEventListener("click", function () {
        window.location.href = "./index.html";
    });
}


function step5() {
    exportRoot.main.gotoAndStop(5);
    exportRoot.main.page5.gotoAndStop(0);

    exportRoot.main.page5.btn1.addEventListener("click", function () {
        // showAward(2);
        try {
            LinkClick('cn:ssd960pro_20161208_521:click_dianjichoujiang', 'o');
        } catch (e) {
        }
        NetData.startlottery(function () {
        });
    })
}

function step6() {
    exportRoot.main.gotoAndStop(6);
    exportRoot.main.fmMc.btnText.visible = false;
    if (currentPage == 1) {
        exportRoot.main.page6.gotoAndStop(0)
    } else {
        exportRoot.main.page6.gotoAndStop(1)
    }
    exportRoot.main.page6.btn.addEventListener("click", function () {
        exportRoot.main.fmMc.btnText.visible = true;
        initMain2(currentPage);
    })
}

function onDown() {
    exportRoot.main.page6.descPage.addEventListener("stagemousemove", onMove)
    console.log("onDown")
}

function onUp() {
    exportRoot.main.page6.descPage.removeEventListener("stagemousemove", onMove)
    console.log("onUp")
}

function onMove(evt) {
    exportRoot.main.page6.descPage.y = evt.localY;
    console.log("onMove")
}

function step7() {
    exportRoot.main.page7.shareMc.visible = false;

    exportRoot.main.gotoAndStop(7);
    if (userInfo.supporterNum == 1) {
        exportRoot.main.page7.gotoAndStop(0)
    } else {
        exportRoot.main.page7.gotoAndStop(1);
    }
    exportRoot.main.page7.shareMc.visible = false;
    exportRoot.main.page7.btn.addEventListener("click", function () {
        exportRoot.main.page7.shareMc.visible = true;
    })
}

function showAward(key) {//2 or 3
    exportRoot.main.page5.gotoAndStop(key - 1);
    exportRoot.main.page5["btn" + key].addEventListener("click", function (evt) {
        var index = exportRoot.main.page5.currentFrame + 1;
        switch (index) {
            case 1:

                break;
            case 2:

                break;
            case 3:
                break;
            case 4:
                window.location.href = "./index.html";
                break;
        }
        console.log(index);
    })
}
