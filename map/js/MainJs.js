/**
 * Created by cheilchina on 2016/12/23.
 */
var MainJs = function () {

    var imgClip;
    var adjust;
    var map;

    function init() {
        map = new BMap.Map("container");          // 创建地图实例
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


        imgClip = new ImgClipUpload();
        imgClip.setConfig({getBitmap: getBitmapFunc, width: 120, height: 120});
        imgClip.init();

        adjust = new ImgAdjust();
        // var myPushpin = new BMap.PushpinTool(map)
        exportRoot.btn.addEventListener("click", showChooseImage);
        exportRoot.dingwei.addEventListener("click", showLocation);
    }

    function showLocation() {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);

                var geoc = new BMap.Geocoder();
                geoc.getLocation(r.point, function (rs) {
                    var data = rs.addressComponents;
                    alert("城市：" + data.city)
                })
                // alert('您的位置：' + r.point.lng + ',' + r.point.lat+"\t 城市:"+);
            }
            else {
                alert('failed' + this.getStatus());
            }
        }, {enableHighAccuracy: true})
    }

    function getBitmapFunc(imgInfo) {
        console.log('loadImgInfo-->', imgInfo);
        adjust.setup({'hitDiv': document.getElementById('canvas'), 'targetMc': exportRoot.content});
        exportRoot.content.addChild(imgInfo.bitmap);
    }

    function resize() {
        // $(#document).
    }

    function showChooseImage(data) {
        imgClip.browse();
    }

    function handleFiles(data) {
        console.log(data);
    }

    return {
        init: init,
        handleFiles: handleFiles
    }
}()