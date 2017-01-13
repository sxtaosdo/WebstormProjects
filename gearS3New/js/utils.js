/**
 * Created by lg on 15/5/15.
 */

var GTracer = (function(option){
    var toDirString = function(option) {
        var output = [];
        for(var key in option) {
            if(option.hasOwnProperty(key)) {
                var value = option[key];
                if(Array.isArray(value)) {
                    value = "Array("+ value.length +"):"+ value;
                } else if(value instanceof HTMLElement) {
                    value = value +" ("+ value.outerHTML.substring(0, 50) +"...)";
                }
                output.push(key +": "+ value);
            }
        }
        return output.join("\n")
    };
    var trace = function(option){
        return toDirString(option);
    }
    return {trace:trace};
})();

var GCanvasVideo = function(){
    var _stateFunc,__loadingFunc,__loadComFunc,__initFunc;
    var _targetMc,_liblist,_liblistCopy=[],_mclist = [],_mclistLen,_stepNum;
    var _stepArr = [];
    var _loadId,_loadTotal;
    var __loader,_iswaiting = true,_playingId = 0;
    var _this = this,_isInit = false;
    var playVideo = function(){
        if(_targetMc){
            _targetMc.play();
        }
    }
    var stopVideo = function(){
        if(_targetMc){
            //_targetMc.stop();
        }
    }
    var resume = function(){
        if(_targetMc){
            _targetMc.gotoAndStop(0);
        }
    }
    var setStateFunc = function(__func){
        _stateFunc = __func;
    }
    //计算分步加载
    var colaStepFunc = function(){
        _stepArr = GArrayUtil.arrayToNStep(_liblist,_stepNum);
    }
    //配置  目标MC， 在那些帧分段加载，分段加载的图片集合，分段加载完成后重新初始化的
    var setup = function(config){
        if(!config){ alert('配置参数不能为空！') ;return;}

        _targetMc = config.target;
        _liblist = config.liblist || [];
        _mclistLen = config.mclistLen || 0;
        _stepNum = config.stepNum || 1;


        if(_stepNum>=1){
            colaStepFunc();
        }
        //if(_liblist && _liblist.length>0){
        //    _liblistCopy = []
        //    var _imgObj,_imgObj2;
        //    var _fristPic = _liblist[0].src;
        //    for(var j = 0;j<_liblist.length;j++){
        //        _imgObj = _liblist[j];
        //        if(_imgObj.src.indexOf('.mp3')==-1){
        //            _imgObj2 = {'src':_fristPic+"?"+_imgObj.id,'id':_imgObj.id};
        //        }else{
        //            _imgObj2 = {'src':_imgObj.src,'id':_imgObj.id};
        //        }
        //        _liblistCopy.push(_imgObj2);
        //    }
        //    //console.log('_liblistCopy=',_liblistCopy);
        //}

        images = images||{};

        //加载时候的回调函数
        __loadingFunc = config.loadingFunc || null;
        __loadComFunc = config.loadedComFunc || null;
        //__initFunc = config.initFunc || null;

        _loadId = 0,_playingId = 0;
        _loadTotal = _stepArr.length;
       // console.log('_loadTotal :',_stepArr.length,_loadId);
        if(_targetMc){
            _targetMc.stop();
            var _per = _mclistLen/_stepNum >> 0 ;

            if(_stepArr && _stepArr.length>0){
                for(var i = 0;i<_stepArr.length;i++){
                    console.log('addFrameEvent==',_per*(1+i),_stepArr[i].length);
                    GUtil.addFrameEvent(_targetMc,_per*(1+i)-2,frameHandle);
                }
            }
            console.log('_targetMc.totalFrames',_targetMc.totalFrames);
            GUtil.addFrameEvent(_targetMc,_targetMc.totalFrames-1,function(){
                _targetMc.dispatchEvent(new createjs.Event('videoEnd'));
            })
        }

    }
    function frameHandle(){
        if(_playingId<=_loadTotal){
            _playingId++;
        }
        console.log('frameHandle=',_targetMc.currentFrame,_iswaiting,_loadId,_playingId);
        // 加载未完成
        if(_loadId <= _playingId && _loadId != _loadTotal){
            _iswaiting = true;
            _targetMc.stop();
            console.log('== 暂停播放 pause ==');
            _targetMc.dispatchEvent(new createjs.Event('pause'));
        }else{
            //继续播放
            _iswaiting = false;
        }

    }
    var startload = function(){

        if(_loadId>_loadTotal-1){
            console.log('加载完毕');
            return;
        }
        if(__loader){
            __loader.removeEventListener("fileload", fileLoad);
            __loader.removeEventListener("progress", loading);
            __loader.removeEventListener("complete", fileComplete);
            __loader.close();
            __loader = null;
        }
        __loader = new createjs.LoadQueue(false);
        __loader.installPlugin(createjs.Sound);
        __loader.addEventListener("fileload", fileLoad);
        __loader.addEventListener("progress", loading);
        __loader.addEventListener("complete", fileComplete);
        __loader.loadManifest(_stepArr[_loadId]);
        //console.log('==startload==');
    }


    function fileLoad(evt) {
        // console.log('fileLoad==');
        if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
    }
    function loading(evt){
    //  console.log('loading==');
        if(__loadingFunc){
            var tmp = event.loaded*100>>0;
            __loadingFunc(tmp);
        }
    }
    function fileComplete(evt) {
        // console.log('fileComplete==');
        if(__loadComFunc){
            __loadComFunc();
        }
        _loadId++;
        console.log("lib loaded===",_loadId);
       //console.log("lib load===",_loadId,_loadTotal,_iswaiting,_playingId,_targetMc.currentFrame);
        if(_targetMc){
            _targetMc.reset();
            if(_iswaiting){
                _iswaiting = false;
                _targetMc.play();
                //继续播放
                console.log('== 继续播放 goon ==');
                _targetMc.dispatchEvent(new createjs.Event('goon'));

            }

        }


        if(_loadId<=_loadTotal-1){
            startload();
        }

    }
    //重新初始化 画布中的bitmap
    var resetUI = function(){
        if(!_targetMc) return;
        if(_mclist.length<=0){
            var _t,j=0;
            _mclist = [];
            for(j;j<_mclistLen;j++){
                if(j==0){
                    _t = _targetMc['instance'];
                }else{
                    _t = _targetMc['instance_'+j];
                }
                _mclist.push(_t);
            }
        }


        if(_mclist.length>0){
            var tmp,_url;

            for(var i=0;i<_mclist.length;i++){
                tmp = _mclist[i];
                //console.log('images.length================',tmp);
                //if(tmp.image == undefined)
                //{
                if(tmp.image.indexOf("#")){
                    _url = tmp.image.splice("#")[1];
                    tmp.initialize(tmp.image);
                }
                console.log(tmp.image);
                //}


            }
        }
    }
    //停止加载
    var destroy = function(){
        if(__loader){
            __loader.removeEventListener("fileload", fileLoad);
            __loader.removeEventListener("progress", loading);
            __loader.removeEventListener("complete", fileComplete);
            __loader.close();
            __loader = null;
        }
        if(_targetMc){
            _targetMc.stop();
        }
        _iswaiting = false;
        _loadId = 0;
        _playingId = 0;
    }

    var isloading = function(){
        return _iswaiting;
    }

    return {
        setConfig:setup,
        startload:startload,
        isloading:isloading,
        playVideo:playVideo,
        stopVideo:stopVideo,
        stateFunc:setStateFunc,
        destroy:destroy
    }
}

var GUtil = (function(){
    var setButton = function($mc){
        var mc = $mc;
        mc.mouseEnabled = true;
        mc.mouseChildren = false;

        //开启 舞台的鼠标over out 状态
        var _stage = mc.getStage();
        _stage .enableMouseOver(20);
        mc.addEventListener("rollover",rollover);
        //console.log(mc.timeline.duration);
        function rollover(){
            playTo(mc,mc.timeline.duration);
        }
        mc.addEventListener("rollout",function(){
            playTo(mc,1);
        })
    }

    var playTo = function(mc,frame,attribute){
        var _curFrame = mc.currentFrame;
        var fr = -1;
        if(attribute){
            var _onComplete = attribute.onComplete || null;
            var _onUpdate = attribute.onUpdate || null;
        }
        if(typeof frame == "number"){
            fr = frame ;
        }else{
            fr = labelToFrame(mc,frame);
        }
        if(fr >= 0){
            var _t = Math.abs(fr-_curFrame)/30;
            if(_curFrame != fr){
                to(mc,_t,{currentFrame:fr,onUpdate:function(){
                    mc.gotoAndStop(mc.currentFrame);
                    if(_onUpdate){
                        _onUpdate({curFrame:mc.currentFrame,target:mc});
                    }
                },onComplete:function(){
                    if(_onComplete){
                        _onComplete({curFrame:mc.currentFrame,target:mc});
                    }
                }});
            }
        }
    }
    var addFrameEvent = function(mc,frame,handle){
        var fr = -1;
        if(typeof frame == "number"){
            fr = frame ;
        }else{
            fr = labelToFrame(mc,frame);
        }
        if(fr >= 0){
            mc.timeline.addTween(createjs.Tween.get(mc).wait(fr).call(handle));
        }
    }
    var labelToFrame = function(mc,label){
        var labels = mc.timeline.getLabels(label);
        if(labels .length>0){
            var frame = -1;
            var len = labels .length;
            for (var i =0;i<len;i++) {
                if(labels[i].label == label){
                    frame = labels[i].position;
                    //console.log(frame);
                }
            }

        }
        return frame;
    }

    var to = function(target,duration ,attribute) {
        // body...
        var thisTarget = target;
        var delay = attribute.dalay || 0;
        var onCompleteHandle = attribute.onComplete || null;
        var onUpdateHandle = attribute.onUpdate || null;

        createjs.Tween.get(target,{onChange:onChangeHandle,override:true}).wait(delay).to(attribute,duration*1000).call(handleComplete);
        function handleComplete (argument) {
            // body...
            if(onCompleteHandle){
                onCompleteHandle();
            }
        }
        function  onChangeHandle (e) {
            // body...
            if(onUpdateHandle){
                onUpdateHandle(e);
            }

        }
    }
    return {setButton:setButton,
            playTo:playTo,
            to:to,
            labelToFrame:labelToFrame,
            addFrameEvent:addFrameEvent
            }

})(createjs = createjs||{});
var createjs;


var GSystemUtil = (function(){
    var getuaBrowser = function(){
        var ua = navigator.userAgent.toLowerCase();

        // Useragent RegExp
        var rwebkit = /(webkit)[ \/]([\w.]+)/;
        var ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
        var rmsie = /(msie) ([\w.]+)/;
        var rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;

        var match = rwebkit.exec( ua ) ||
            ropera.exec( ua ) ||
            rmsie.exec( ua ) ||
            ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
            [];

        return { browser: match[1] || "", version: match[2] || "0" };
    }

    var getuaPlatform = function(){
        var ua = navigator.userAgent.toLowerCase();

        // Useragent RegExp
        var rplatform = /(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/;
        var rtablet = /(ipad|playbook)/;
        var randroid = /(android)/;
        var rmobile = /(mobile)/;

        var platform = rplatform.exec( ua ) || [];
        var tablet = rtablet.exec( ua ) ||
            !rmobile.exec( ua ) && randroid.exec( ua ) ||
            [];

        if(platform[1]) {
            platform[1] = platform[1].replace(/\s/g, "_"); // Change whitespace to underscore. Enables dot notation.
        }

        return { platform: platform[1] || "", tablet: tablet[1] || "" };
    }
    return {getBrower:getuaBrowser,
            getPlatform:getuaPlatform
            }
})();

var GStringTools = (function(){
    //是否为手机号码
    var isMobile = function(str){
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(myreg.test(str)) { return true;}
        return false;
    }
    //是否为电子邮箱
    var isEmail = function(str){
        var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        if(emailReg.test(str)){return true;}
        return false;
    }
    //是否为电话号码
    var isPhone = function(strPhone) {
        var phoneRegWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/;
        var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/;
        var prompt = "您输入的电话号码不正确!"
        if( strPhone.length > 9 ) {
            if( phoneRegWithArea.test(strPhone) ){
                return true;
            }else{
                //alert( prompt );
                return false;
            }
        }else {
            if (phoneRegNoArea.test(strPhone)) {
                return true;
            } else {
                return false;
            }
        }
    }
    /*
     是否为数字
     */
    var isNumber = function(str){
        var re = new RegExp("^[0-9]+$");
        if (str.search(re) != -1) { return true;}
        return false;
    }
    /*
     str是否为空
     */
    var isNull = function(str){
        var regu = new RegExp("^[ ]+$");
        return regu.test(str);
    }
    /*
     *JavaScript精确获取字符串长度，使用str.match匹配相关正则内容，
     * 字符串区分中英文，一个中文2个字节,英文一个
     */
    var getStrLength = function(str){
        var cArr = str.match(/[^\x00-\xff]/ig);
        return str.length + (cArr == null ? 0 : cArr.length);
    }

    /*
     获取链接的查询字符串，如：var link = "http:baidu.com?id=121&cid=1";
                                     getUrlVars(link).id;
                                     getUrlVars(link).cid;
     *
     * */
    var getUrlVars = function(url) {
        var vars = [],hash;

        var hashes = url.slice(url.indexOf('?') + 1).split('&');
        //var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

     /*
      删除前后空格
     * */

    var trim = function(str){
        return str.replace(/(^\s*)|(\s*$)/g,'');;
    }
    return {isMobile:isMobile,
        isEmail:isEmail,
        isPhone:isPhone,
        isNumber:isNumber,
        isNull:isNull,
        getUrlVars:getUrlVars,
        trim:trim,
        getStrLength:getStrLength
    }


})();

var GArrayUtil = (function(){
    var removeFromArray = function(arr, obj)  {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == obj) {
                arr.splice(i, 1);
                return i;
            }
        }
        return -1;
    }

    var getRandomArr = function (_rang, _max){
        var tempArr = [];
        while (tempArr.length < _rang) {
            var tempNum  = Math.random() * _max;
            if (!arrayContainsValue(tempArr, tempNum)) {
                tempArr.push(tempNum);
            }
        }
        return tempArr;
    }
    var arrayToNStep = function(arr,_step){
        if(_step<=0) return arr;
        var _tmparr = [];
        var _per = Math.floor(arr.length/_step);
        var _a;
        for(var i =0;i<_step;i++){
            if(i<_step-1){
                _a = arr.slice(i*_per,(i+1)*_per);
            }else{
                _a = arr.slice(i*_per,arr.length);
            }
            _tmparr.push(_a);
        }
        return _tmparr;
    }
    var arrayContainsValue = function (arr, value){
        return (arr.indexOf(value) != -1);
    }
    var getIndexFromArr = function(arr, value){
        var _index = -1;
        for(var i=0;i<arr.length;i++){
            if(arr[i]==value){
                _index = i;
            }
        }
        return _index;
    }
    var shuffle = function(inputArray) {
        var cf = function(){
            var r = Math.random() - 0.5;
            if (r < 0) {
                return -1;
            } else {
                return 1;
            }
        };
        var resultArray = cloneArray(inputArray);
        resultArray.sort(cf);

        return resultArray;
    }
    var cloneArray = function(inputArray){
        return inputArray.slice();
    }
    return{
        getIndexFromArr:getIndexFromArr,
        removeFromArray:removeFromArray,
        arrayContainsValue:arrayContainsValue,
        cloneArray:cloneArray,
        shuffle:shuffle,
        arrayToNStep:arrayToNStep,
        getRandomArr:getRandomArr
    }
})();