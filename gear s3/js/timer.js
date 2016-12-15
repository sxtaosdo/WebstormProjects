/**
 * Created by lg on 16/12/15.
 */
var downtimeControl = (function(){
    var __mc,__callback,__totalTime=0,__curtime=0;
    var _m=0,_s=0,_ms=0;
    var _set;
    var start = function(_mc,_endback,_totalTime){
        reset();
        __mc = _mc;
        __callback = _endback;
        __curtime = __totalTime = _totalTime * 1000;
        console.log('__totalTime-->',__totalTime,_totalTime);
        if(!__mc) {alert('mc 不存在！'); return}
        _set = setInterval(loop,42);
    }
    var reset = function() {
        if(__mc){
            _m=0;_s=0;_ms=0;
            _set = null;
            __curtime = 0;
            __totalTime = 0;
            __callback = null;
            __mc.n5.gotoAndStop(0);
            __mc.n4.gotoAndStop(0);
            __mc.n3.gotoAndStop(0);
            __mc.n2.gotoAndStop(0);
            __mc.n1.gotoAndStop(0);
            __mc.n0.gotoAndStop(0);
            __mc=null;
        }
    }
    var loop = function() {
        __curtime = __curtime-42;
        if(__curtime <= 42) {
            __mc.n5.gotoAndStop(0);
            __mc.n4.gotoAndStop(0);
            __mc.n3.gotoAndStop(0);
            __mc.n2.gotoAndStop(0);
            __mc.n1.gotoAndStop(0);
            __mc.n0.gotoAndStop(0);

            __callback();
            clearInterval(_set);
            return;
        }
        _m = __curtime/1000/60>>0;
        _s = (__curtime- _m*60*1000)/1000>>0;
        _ms = (__curtime- _m*60*1000 - _s*1000)/10>>0;
        // console.log(_m,_s,_ms);
        update();
    }
    var update = function(){
        //if(_m>=10){
        __mc.n5.gotoAndStop(_m/10>>0);
        __mc.n4.gotoAndStop(_m%10);
        // }else{
        //     __mc.n5.gotoAndStop(0);
        //     __mc.n4.gotoAndStop(_m);
        // }
        //if(_s>=10){
        __mc.n3.gotoAndStop(_s/10>>0);
        __mc.n2.gotoAndStop(_s%10);
        // }else{
        //     __mc.n3.gotoAndStop(0);
        //     __mc.n2.gotoAndStop(_s);
        // }
        // if(_ms>=10){
        __mc.n1.gotoAndStop(_ms/10>>0);
        __mc.n0.gotoAndStop(_ms%10);
        // }else{
        //     __mc.n1.gotoAndStop(0);
        //     __mc.n0.gotoAndStop(_ms);
        // }
    }

    var stop = function(_callback) {
        //callback返回的是游戏用时
        _callback(__totalTime-__curtime);
        clearInterval(_set);
    }

    var formatTime = function(_n) {
        var a = [];
        var __m = _n/1000/60>>0;
        var __s = (_n- __m*60*1000)/1000>>0;
        var __ms = (_n- __m*60*1000 - __s*1000)/10>>0;

        a.push(__m/10>>0);
        a.push(__m%10);
        a.push(__s/10>>0);
        a.push(__s%10);
        a.push(__ms/10>>0);
        a.push(__ms%10);

        return a;
    }


    return {
        start:start,
        stop:stop,
        formatTime:formatTime
    }
})()