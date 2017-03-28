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
    var headr = 200;
    //图片最大宽度
    var maxw = 640;
    //图片最小宽度；
    var minw = 400;
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

    function struct() {
        exportRoot.btn.addEventListener("click", function () {
            selectHead();
        });

        //手指动作缩放位移头像
        var pinch = document.getElementById("canvas");
        hammertime = new Hammer(pinch);
        hammertime.add(new Hammer.Pinch());
        hammertime.on('panmove', function (ev) {
            if(PixelYDimension < PixelXDimension){
            bmph = PixelXDimension * bmp.scaleX / 2;
            bmpw = PixelYDimension * bmp.scaleY / 2;
            if (ev.type == "panmove") {
                if (bmp.x + ev.velocityX * MOVE_SPEED + bmpw <= maskright) {
                    bmp.x = maskright - bmpw;
                } else if (bmp.x + ev.velocityX * MOVE_SPEED - bmpw >= maskleft) {
                    bmp.x = maskleft + bmpw;
                } else {
                    bmp.x = ev.velocityX * MOVE_SPEED + bmp.x;
                }
                if (bmp.y + ev.velocityY * MOVE_SPEED + bmph <= maskbottom) {
                    bmp.y = maskbottom - bmph;
                } else if (bmp.y + ev.velocityY * MOVE_SPEED - bmph >= masktop) {
                    bmp.y = masktop + bmph;
                } else {
                    bmp.y = ev.velocityY * MOVE_SPEED + bmp.y;
                }
            }
            }else {
                bmpw = PixelXDimension * bmp.scaleX / 2;
                bmph = PixelYDimension * bmp.scaleY / 2;
                if (ev.type == "panmove") {
                    if (bmp.x + ev.velocityX * MOVE_SPEED + bmpw <= maskright) {
                        bmp.x = maskright - bmpw;
                    } else if (bmp.x + ev.velocityX * MOVE_SPEED - bmpw >= maskleft) {
                        bmp.x = maskleft + bmpw;
                    } else {
                        bmp.x = ev.velocityX * MOVE_SPEED + bmp.x;
                    }
                    if (bmp.y + ev.velocityY * MOVE_SPEED + bmph <= maskbottom) {
                        bmp.y = maskbottom - bmph;
                    } else if (bmp.y + ev.velocityY * MOVE_SPEED - bmph >= masktop) {
                        bmp.y = masktop + bmph;
                    } else {
                        bmp.y = ev.velocityY * MOVE_SPEED + bmp.y;
                    }
                }
            }

        });
        hammertime.on("pinchin", function (e) {
            bmph = PixelXDimension * bmp.scaleX / 2;
            bmpw = PixelYDimension * bmp.scaleY / 2;

            if (PixelYDimension < PixelXDimension) {
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
            if (PixelXDimension < PixelYDimension) {
                if (bmp.scaleX * PixelXDimension >= minw) {
                    setHeadScale(e);
                } else {
                    bmp.scaleX = bmp.scaleY = minw / PixelXDimension;
                }
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
    function selectHead() {
        var abc = document.getElementById("inputs");
        abc.onchange = function () {
            var temp = document.getElementById("inputs").files[0];
            EXIF.getData(temp, function () {
                EXIF.getAllTags(temp);
                EXIF.getTag(temp, 'Orientation');
                EXIF.getTag(temp, 'PixelXDimension');
                EXIF.getTag(temp, 'PixelYDimension');
                PixelXDimension = EXIF.getTag(temp, 'PixelXDimension');
                PixelYDimension = EXIF.getTag(temp, 'PixelYDimension');
                Orientation = EXIF.getTag(temp, 'Orientation');
            });
            var reader = new FileReader();
            reader.readAsDataURL(temp);
            reader.onload = function () {
                onHead(reader.result);
            };
        }
        abc.click();
    }

    function onHead(imageData) {
        window.onmousewheel = document.onmousewheel = pcTest;
        //		图形遮罩
        headMask = new createjs.Shape();
        headMask.graphics.beginFill("#ff0000").drawCircle(640 >> 1, document.body.clientHeight >> 1, headr);
        //		生成遮罩头像
        if (!imageData) {
            console.log('imageData err-->');
            return;
        }
        clearnHead();
        bmp = new createjs.Bitmap(imageData);
        bmp.mask = headMask;
        bmp.regX = PixelXDimension / 2;
        bmp.regY = PixelYDimension / 2;
        bmp.x = document.body.clientWidth >> 1;
        bmp.y = document.body.clientHeight >> 1;
        maskbottom = bmp.y + headr;
        masktop = bmp.y - headr;
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
        exportRoot.stage.addChild(bmp);
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

