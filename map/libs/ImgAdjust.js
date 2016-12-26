/**
 * Created by lg on 16/9/29.
 * 图片调整
 */
var ImgAdjust = function(){
    var hammer,hitDiv,targetMc ;
    var _initialPos = {};

    var setup =  function(_config){
        hitDiv = _config.hitDiv || document.getElementsByClassName('body')[0];
        targetMc = _config.targetMc;

        console.log('setup-->',hitDiv,targetMc);
        if(!hitDiv || !targetMc){
            alert('hitDiv 或者 targetMc 不存在！');
            return;
        }
        hammer = new Hammer.Manager(hitDiv);
        hammer.add(new Hammer.Pan({threshold: 0,
            pointers: 0}));
        hammer.add(new Hammer.Rotate({threshold:0})).recognizeWith(hammer.get('pan'));
        hammer.add(new Hammer.Pinch({threshold:0})).recognizeWith([hammer.get('pan'),hammer.get('rotate')]);

        hammer.on('panstart panmove',onPan);
        hammer.on('rotatestart rotatemove',onRotate);
        hammer.on('pinchstart pinchmove',onPinch);
    }
    function onPan(ev){
        console.log("onPan");
        if(ev.type == 'panstart'){
            _initialPos.x = targetMc.x;
            _initialPos.y = targetMc.y;
        }else {
            targetMc.x = _initialPos.x + ev.deltaX;
            targetMc.y = _initialPos.y + ev.deltaY;
        }
    }
    function onRotate(ev){
        if(ev.type=="rotatestart"){
            _initialPos.initialRota = targetMc.rotation;
            _initialPos.initAngle = ev.rotation;
        }
        targetMc.rotation = _initialPos.initialRota+(ev.rotation-_initialPos.initAngle);
    }
    function onPinch(ev){
        if(ev.type=='pinchstart'){
            _initialPos.initScale = targetMc.scaleX || 1;
            _initialPos.offScale = ev.scale;
        }
        targetMc.scaleX = targetMc.scaleY = _initialPos.initScale + ev.scale-_initialPos.offScale;
    }
    //是否禁用hammer
    var disable = function(b){
        if(!hammer) return;
        if(b){
            hammer.get('pan').set({enable:false});
            hammer.get('rotate').set({enable:false});
            hammer.get('pinch').set({enable:false});
        }else{
            hammer.get('pan').set({enable:true});
            hammer.get('rotate').set({enable:true});
            hammer.get('pinch').set({enable:true});
        }
    }
    return {
        setup:setup,
        disable:disable
    }
}