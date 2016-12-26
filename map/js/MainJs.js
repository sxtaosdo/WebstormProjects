/**
 * Created by cheilchina on 2016/12/23.
 */
var MainJs = function () {

    var imgClip;
    var adjust;

    function init() {
        var map = new BMap.Map("container");          // 创建地图实例
        var point = new BMap.Point(116.404, 39.915);  // 创建点坐标
        map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
        map.addControl(new BMap.GeolocationControl());

        map.addEventListener("click", function (e) {
            alert(e.point.lng + ", " + e.point.lat);
        });

        map.addEventListener("dragend", function () {
            var center = map.getCenter();
            alert("地图中心点变更为：" + center.lng + ", " + center.lat);
        });


        // var myPushpin = new BMap.PushpinTool(map)
        exportRoot.btn.addEventListener("click", showChooseImage)

        // imgClip = new ImgClipUpload();
        // imgClip.setConfig({getBitmap:getBitmapFunc,width:120,height:120});
        // imgClip.init();
        //
        // adjust = new ImgAdjust();
        // function getBitmapFunc(imgInfo){
        //     console.log('loadImgInfo-->',imgInfo);
        //     adjust.setup({'hitDiv':document.getElementById('canvas'),'targetMc':updateMc.headUI.headMc});
        // }

    }

    function resize() {
        // $(#document).
    }

    function showChooseImage(data) {
        // var image = document.getElementById("imageInput");t
        // image.click()
        // console.log("showChooseImage");
        ImgClipUpload.browse();
    }

    function handleFiles(data) {
        console.log(data);
        // EXIF.getData(document.getElementById("imageInput"), showChooseImage);
    }

    return {
        init: init,
        handleFiles: handleFiles
    }
}()