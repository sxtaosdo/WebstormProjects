/**
 * Created by cheilchina on 2016/12/23.
 */
var MainJs = function () {

    function init() {
        var map = new BMap.Map("container");          // 创建地图实例
        var point = new BMap.Point(116.404, 39.915);  // 创建点坐标
        map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
        map.addControl(new BMap.GeolocationControl());

        map.addEventListener("click", function(e){
            alert(e.point.lng + ", " + e.point.lat);
        });

        map.addEventListener("dragend", function(){
            var center = map.getCenter();
            alert("地图中心点变更为：" + center.lng + ", " + center.lat);
        });


        var myPushpin = new BMap.PushpinTool(map)
    }

    function resize(){
        $(#document).
    }


    return {
        init: init
    }
}()