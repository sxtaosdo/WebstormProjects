$(document).ready(function () {

    var menuItemNum = $(".menu-item").length;
    var angle = 120;
    var distance = 100;
    var startingAngle = 180 + (-angle / 2);
    var slice = angle / (menuItemNum - 1);

    TweenMax.globalTimeScale(0.8);
    $(".menu-item").each(function (i) {
        var angle = startingAngle + (slice * i);
        $(this).css({
            transform: "rotate(" + (angle) + "deg)"
        })
        $(this).find(".menu-item-icon").css({
            transform: "rotate(" + (-angle) + "deg)"
        })
    })
    var on = false;

    $(".menu-toggle-button").mousedown(function () {
        TweenMax.to($(".menu-toggle-icon"), 0.1, {
            scale: 0.65
        })
    })

    //hammer code
    var el = document.getElementById("clock");
    var START_X = Math.round((window.innerWidth - el.offsetWidth) / 2);
    var START_Y = Math.round((window.innerHeight - el.offsetHeight) / 2);
    var mc = new Hammer.Manager(el);
    mc.add(new Hammer.Pan({threshold: 0, pointers: 0}));
    mc.add(new Hammer.Rotate({threshold: 0})).recognizeWith(mc.get('pan'));
    mc.on("rotatestart rotatemove", onRotate);
    var initAngle = 0;
    resetElement();

    function onRotate(ev) {
        if (ev.type == 'rotatestart') {
            initAngle = transform.angle || 0;
        }

        el.className = '';
        transform.rz = 1;
        transform.angle = initAngle + ev.rotation;
        $(el).css({
            "-webkit-transform": "rotate(" + transform.angle + "deg)",
            "transform": "rotate(" + transform.angle + "deg)",
            "-webkit-transform-origin": "center center",
            "transform-origin": "center center",
            "left": "50%",
            "top": "50%",
            "position": "absolute"
        })
    }

    function resetElement() {
        // el.className = 'animate';
        transform = {
            translate: {x: START_X, y: START_Y},
            scale: 1,
            angle: 0,
            rx: 0,
            ry: 0,
            rz: 0
        };
    }


    $(document).mouseup(function (evt) {
        var num = $(".menu-item").length;
        var ang = num * 60 + angle;

        var str = '<li class=\"menu-item\" style=\"transform: rotate(' + ang + 'deg);\">' +
            "<button class=\"menu-item-button\" style=\"transform: translate3d(0px, 0px, 0px);\">" +
            "<i class=\"menu-item-icon icon icon-trash\" style=\"transform: rotate(" + (-ang) + "deg);\"></i>" +
            "</button>" +
            "<div class=\"menu-item-bounce\" style=\"transform: translate3d(0px, 0px, 0px); transform-origin: 50% 50% 0px;\"></div></li>";

        // $(".menu-items").append(str);

        // console.log(evt.target);
        // console.log(evt.target.name);
        document.getElementById("labText").innerHTML = evt.target.name;
    });

    $(document).on("touchend", function () {
        $(document).trigger("mouseup")
    })
    $(".menu-toggle-button").on("mousedown", pressHandler);
    $(".menu-toggle-button").on("touchstart", function (event) {
        $(this).trigger("mousedown");
        event.preventDefault();
        event.stopPropagation();
    });

    $(".testBtnCls").on("mousedown", onTestBtnHandler);

    var tl = new TimelineMax();

    function onTestBtnHandler(evt) {
        if (intKey) {
            window.clearInterval(intKey);
            intKey = 0;
            newClose();
        } else {
            // var arr = [];
            for (var i = 0; i < 3; i++) {
                var x = Math.random() * 150 + 99;
                var y = Math.random() * 150 + 99;
                var roation = Math.atan((0 - y) / (0 - x))
                roation = 180 / Math.PI * roation;

                var str = "<li class=\"menu-item\" style=\"transform: rotate(" + roation + "deg);\">" +
                    "<button class=\"menu-item-button\" style=\"transform: translate3d(" + x + "px, " + y + "px, 0px);\">" +
                    "<i class=\"menu-item-icon icon icon-trash\" style=\"transform: rotate(" + -roation + "deg);\"></i>" +
                    "</button>" +
                    "<div class=\"menu-item-bounce\" style=\"transform: translate3d(0px, 0px, 0px); transform-origin: 50% 50% 0px;\"></div></li>";
                // arr.push("menu-item" + i);
                $(".menu-items").append(str);
            }
            intKey = window.setInterval(onEnterfram, 0.05);
        }
    }

    var intKey;

    function newClose() {

    }

    function onEnterfram(e) {
        transform.angle = initAngle + 0.5;
        $(el).css({
            "-webkit-transform": "rotate(" + transform.angle + "deg)",
            "transform": "rotate(" + transform.angle + "deg)",
            "-webkit-transform-origin": "center center",
            "transform-origin": "center center",
            "left": "50%",
            "top": "50%",
            "position": "absolute"
        })
        initAngle = transform.angle;
        if (transform.angle % 360 == 0) {
            console.log(transform.angle);
            document.getElementById("labText").innerHTML = transform.angle;
            onTestBtnHandler();
        }
    }

    function pressHandler(event) {
        on = !on;

        TweenMax.to($(this).children('.menu-toggle-icon'), 0.4, {
            rotation: on ? 45 : 0,
            ease: Quint.easeInOut,
            force3D: true
        });

        on ? openMenu() : closeMenu();

    }

    function openMenu() {
        $(".menu-item").each(function (i) {
            var delay = i * 0.08;

            var $bounce = $(this).children(".menu-item-bounce");

            TweenMax.fromTo($bounce, 0.2, {
                transformOrigin: "50% 50%"
            }, {
                delay: delay,
                scaleX: 0.8,
                scaleY: 1.2,
                force3D: true,
                ease: Quad.easeInOut,
                onComplete: function () {
                    TweenMax.to($bounce, 0.15, {
                        // scaleX:1.2,
                        scaleY: 0.7,
                        force3D: true,
                        ease: Quad.easeInOut,
                        onComplete: function () {
                            TweenMax.to($bounce, 3, {
                                // scaleX:1,
                                scaleY: 0.8,
                                force3D: true,
                                ease: Elastic.easeOut,
                                easeParams: [1.1, 0.12]
                            })
                        }
                    })
                }
            });

            TweenMax.to($(this).children(".menu-item-button"), 0.9, {
                delay: delay,
                y: distance,
                force3D: true,
                ease: Quint.easeInOut
            });
        })
        
    }

    function closeMenu() {
        $(".menu-item").each(function (i) {
            var delay = i * 0.08;

            var $bounce = $(this).children(".menu-item-bounce");

            TweenMax.fromTo($bounce, 0.5, {
                transformOrigin: "50% 50%"
            }, {
                delay: delay,
                scaleX: 1,
                scaleY: 0.8,
                force3D: true,
                ease: Quad.easeInOut,
                onComplete: function () {
                    TweenMax.to($bounce, 0.15, {
                        // scaleX:1.2,
                        scaleY: 1.2,
                        force3D: true,
                        ease: Quad.easeInOut,
                        onComplete: function () {
                            TweenMax.to($bounce, 3, {
                                // scaleX:1,
                                scaleY: 1,
                                force3D: true,
                                ease: Elastic.easeOut,
                                easeParams: [1.1, 0.12]
                            })
                        }
                    })
                }
            });


            TweenMax.to($(this).children(".menu-item-button"), 0.8, {
                delay: delay,
                y: 0,
                force3D: true,
                ease: Quint.easeIn
            });
        })
    }
})