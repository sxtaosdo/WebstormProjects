const Shake = require('shake.js');
require('./DeviceOrientationControls');

const doublePi = (2 * Math.PI);

function PhoneController(THREE, TweenMax, Hammer, domElement, name){
    var clock = new THREE.Clock(true);

    this.name = name;

    this.onOrientationChange = function (fn) {
      config.reference.oFunction = fn;
    }

    this.onRecalibrationStart = function (fn) {
      config.reference.recalibrationFunction = fn;
    }

    var config = {
        interaction: {
            timeout: 2000,
            lastKnown: undefined,
            currentRotation: undefined,
            limit: {
                x: Math.PI / 6,
                y: Math.PI / 8,
            },
            hammertime: undefined
        },
        phoneSlerpFactor:0.2,
        stability: {
            elapsedTimeBeforeStabilityIsChecked: 1000,
            maxAngle: Math.PI * 3 / 180,
            minimumReadings: 60
        },
        animations: {
            reset: {
                phoneResetDuration: 1
            }
        },
        reference: {
            oCamera: undefined,
            deviceMotion: undefined,
            initialRotation: undefined,
            oFunction: undefined
        }
    };
    window.c = config;

    var phone;
    var circularBuffer = [];
    var circularBufferMaxLength;

    var hammertime;

    let shakeInstance = new Shake({
        threshold: 8,
        timeout: 500
    });

    function triggerShake() {
        SSG.PubSub.publish(SSG.messages.DEVICE.SHAKE);
    }

    this.addShakeListener = function() {
        shakeInstance.start();
        window.addEventListener(
            'shake',
            triggerShake,
            false
        );
    };

    this.removeShakeListener = function() {
        shakeInstance.stop();
        window.removeEventListener('shake', triggerShake);
    }

    this.updateConfig = function(touch, gyro, recalibrationTime) {
        config.interaction.limit.x  = touch || config.interaction.limit.x;
        config.interaction.limit.y  = touch || config.interaction.limit.y;
        config.phoneSlerpFactor = gyro || config.phoneSlerpFactor;
        config.stability.elapsedTimeBeforeStabilityIsChecked = recalibrationTime || config.stability.elapsedTimeBeforeStabilityIsChecked;
    };

    function pan(e) {
        // console.log('panning', currentState);
        if(currentState === 'interaction') {
            var change = {
                deltaX: e.deltaX / window.innerWidth,
                deltaY: e.deltaY / window.innerHeight
            };

            if(change.deltaX > 0 ){
              phone.rotation.y = config.interaction.currentRotation.y + (config.interaction.limit.y - config.interaction.currentRotation.y) * change.deltaX;
            } else {
              phone.rotation.y = config.interaction.currentRotation.y + (-config.interaction.limit.y - config.interaction.currentRotation.y) * -change.deltaX;
            }

            if(change.deltaY > 0 ) {
              phone.rotation.x = config.interaction.currentRotation.x + (-config.interaction.limit.x - config.interaction.currentRotation.x) * change.deltaY;
            } else {
              phone.rotation.x = config.interaction.currentRotation.x + (config.interaction.limit.x - config.interaction.currentRotation.x) * -change.deltaY;
            }
            config.interaction.lastKnown = Date.now();
        }
    }

    function panstart(e) {
        config.interaction.lastKnown = Date.now();
        config.interaction.currentRotation = phone.rotation.clone();
        event('panstart');
    }

    var inverted;
    this.setPhone = function (_phone, _inverted){
        phone = _phone;
        inverted = _inverted || false;
        window.phone = _phone;
        event('phoneAdded');
    };

    this.setupReferenceObject = function () {
      if(!config.reference.oCamera) {
        var mBox = new THREE.MeshBasicMaterial({
          color: 'red'
        });
        var gBox = new THREE.BoxGeometry(1, 1, 1);
        config.reference.oCamera = new THREE.Mesh(mBox, gBox);
        config.reference.deviceMotion = new THREE.DeviceOrientationControls( config.reference.oCamera );
        event('referenceAdded');
      }
    };

    this.getCurrentWorldDirection  = function () {
        var current = new THREE.Quaternion();
        current.setFromEuler(config.reference.oCamera.rotation);
        current.normalize();
        return current;
    };

    this.rotationChangeFromOrigin = function () {
        if(currentState === 'initialized') {
          var current = this.getCurrentWorldDirection();
          return config.reference.initialRotation.clone().inverse().multiply(current);
        } else {
          return new Error('invalid state ' + currentState);
        }
    };

    function scaleQuaterion(quaternion, factor){
        var scaledQuaterion = new THREE.Quaternion();
        var identity = new THREE.Quaternion();
        THREE.Quaternion.slerp( identity, quaternion, scaledQuaterion, factor);
        return scaledQuaterion;
    }

    this.rotatePhone = function () {
        var diff = this.rotationChangeFromOrigin();
        var scaledQuaterion = scaleQuaterion(diff, config.phoneSlerpFactor);
        phone.rotation.setFromQuaternion(scaledQuaterion);
        if(!inverted) {
          phone.rotation.x = -phone.rotation.x;
        }
        phone.rotation.z = 0;
    };

    this.recordQuaternionIntoBuffer = function () {
        var elapsedTime = clock.getElapsedTime();
        var diff = this.rotationChangeFromOrigin();
        var angle = quaternionToAngle(diff);
        circularBuffer.push({
            elapsedTime: elapsedTime,
            diff: diff,
            angle: angle
        });

        if(circularBuffer.length > circularBufferMaxLength) {
            circularBuffer.shift();
        }
    };

    function quaternionToAngle(q){
        return Math.acos(q._w) * 2;
    }


    // function phoneIsStationary(circularBuffer){
    //     var cummulativeAngle = 0;
    //     for(var i = 0; i < circularBuffer.length - 1; i++){
    //         var record = circularBuffer[i];
    //         var next_record = circularBuffer[i+1];
    //         var changeInAngle =
    //             Math.abs(next_record.angle) - Math.abs(record.angle);
    //         cummulativeAngle += changeInAngle;
    //     }
    //     return Math.sqrt(cummulativeAngle / (circularBuffer.length - 1)) < config.stability.maxAngle;
    // }

    function phoneIsStable() {
        var latestCircularBufferEntry = circularBuffer[circularBuffer.length -1];
        var firstCircularBufferEntry = circularBuffer[0];
        var timeDiffInSeconds  = latestCircularBufferEntry.elapsedTime - firstCircularBufferEntry.elapsedTime;
        var timeDiff = timeDiffInSeconds * 1000;

        if(timeDiff > config.stability.elapsedTimeBeforeStabilityIsChecked) {
          // alert(timeDiff + ' ' + circularBuffer.length);
          if(circularBuffer.length > config.stability.minimumReadings) {
            if(phoneIsStationary(circularBuffer, config.stability.minimumReadings)){
              circularBuffer = [];
              return true;
            } else {
              circularBuffer = [];
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
    }

    function phoneIsStationary(circularBuffer, count){
        var cummulativeAngleA = 0;
        var cummulativeAngleB = 0;
        var cummulativeAngle = 0;
        var angles = []
        // var i = (circularBuffer.length + 1) % 2;
        var number_of_values = 31;
        for(var i = circularBuffer.length - number_of_values; i < circularBuffer.length - 1; i++){
            var record = circularBuffer[i];
            var next_record = circularBuffer[i+1];
            var changeInAngle = Math.abs(record.angle);
            if(i > (circularBuffer.length - number_of_values) + number_of_values / 2 - 1){
                cummulativeAngleB += changeInAngle;
            } else {
                cummulativeAngleA += changeInAngle;
            }
            cummulativeAngle += changeInAngle;
        }
        // alert(Math.abs(cummulativeAngleA - cummulativeAngleB));
        return Math.abs(cummulativeAngleA - cummulativeAngleB) < 0.01;
    }

    var animations = {
        tween: undefined
    };

    this.enable = function () {
        event('enable');
    };

    this.disable = function () {
        event('disable');
    };

    this.update = function () {
        if(currentState === 'setupTouch'){
            hammertime = new Hammer(domElement, {});
            hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
            hammertime.on('pan', pan.bind(this));
            hammertime.on('panstart', panstart.bind(this));
            if(config.reference.deviceMotion) {
              config.reference.deviceMotion.connect();
            }
            event('reset');
        } else if(currentState === 'reset'){
            // event('resetPhoneTweenCompleted');
            config.reference.deviceMotion.update();
            circularBufferMaxLength = 300;
            if(!animations.resetTween) {
                phone.rotation.x = phone.rotation.x % doublePi;
                phone.rotation.y = phone.rotation.y % doublePi;
                phone.rotation.z = phone.rotation.z % doublePi;
                animations.resetTween = TweenMax.to(phone.rotation, config.animations.reset.phoneResetDuration, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: Circ.easeInOut,
                    onUpdate: function (x) {
                      if(config.reference.oFunction) {
                        config.reference.oFunction(phone.rotation, currentState);
                      }
                    },
                    onComplete: function () {
                        animations.resetTween.kill();
                        animations.resetTween = undefined;
                        event('resetPhoneTweenCompleted');
                    }
                });
            } else {
            }
        } else if(currentState === 'calibrate') {
            config.reference.deviceMotion.update();
            config.reference.initialRotation = this.getCurrentWorldDirection();
            event('calibrated');
        } else if(currentState === 'initialized'){
            config.reference.deviceMotion.update();
            this.rotatePhone();
            this.recordQuaternionIntoBuffer();
            if(config.reference.oFunction) {
              config.reference.oFunction(phone.rotation, currentState);
            }
            if(phoneIsStable()){
                 circularBuffer = [];
                 event('reset');
            }
        } else if(currentState === 'interaction') {
            if(config.reference.oFunction) {
              config.reference.oFunction(phone.rotation, currentState);
            }
            if(Date.now() - config.interaction.lastKnown > config.interaction.timeout){
                event('reset');
            } else {
            }
        } else if(currentState === 'disabled') {
          if(config.reference.deviceMotion){
            config.reference.deviceMotion.disconnect();
          }
        }
    };

    var currentState = 'uninitialized';
    var possibleStates = [
        'uninitialized',
        'phone',
        'reference',
        'reset',
        'calibrate',
        'initialized',
        'pan',
        'interaction',
        'setupTouch',
        'disabled',
    ];

    var possibleEvents = [
        'phoneAdded',
        'referenceAdded',
        'resetPhoneTweenCompleted',
        'calibrated',
        'reset',
        'panstart',
        'panend',
        'disable',
        'enable'
    ];

    /*
     * unintialized -> phone when "phoneAdded" Add Phone Object
     * phone -> setup-touch when "referenceAdded" Add Reference Object
     *
     * unintialized -> reference when "referenceAdded" Add Reference Object
     * reference -> setup-touch when "phoneAdded Add Phone Object
     *
     * setup-touch -> reset when "reset"
     *
     * reset -> resetPhoneTweenStart when "startTweenCompleted" Move Phone to Origin
     * resetPhoneTweenStart -> restPhoneTweenwhen "startTweenCompleted" Move Phone to Origin
     * resetPhoneTweenStart -> calibrate when "resetPhoneTweenCompleted" Move Phone to Origin
     *
     * calibrate -> initialized when "calibrated"
     * initialized -> reset when "reset"
     *
     * initailized -> interaction_start when "panstart"
     * interaction_start -> interaction_wait when on interaction_next_tick,
     * interaction_wait -> when pan / panstart / panend occurs
     *
     */
    function event(eventName) {
        if (possibleEvents.indexOf(eventName) > -1) {
            var newState;
            if(eventName === 'disable'){
                newState = 'disabled';
            } else if(eventName === 'enable'){
                newState = 'setupTouch';
            } else if(currentState === 'uninitialized' && eventName === 'referenceAdded') {
                newState = 'reference';
                clock.start();
            } else if(currentState === 'uninitialized' && eventName === 'phoneAdded') {
                newState = 'phone';
                clock.start();
            } else if(currentState === 'phone' && eventName === 'referenceAdded') {
                newState = 'setupTouch';
            } else if(currentState === 'reference' && eventName === 'phoneAdded') {
                newState = 'setupTouch';
            } else if(currentState === 'setupTouch' && eventName === 'reset') {
                newState = 'reset';
            } else if(currentState === 'reset' && eventName === 'resetPhoneTweenCompleted') {
                newState = 'calibrate';
            } else if(currentState === 'calibrate' && eventName === 'calibrated') {
                newState = 'initialized';
            } else if(currentState === 'initialized' && eventName === 'reset') {
                newState = 'reset';
            } else if(currentState === 'initialized' && eventName === 'panstart') {
                newState = 'interaction';
            } else if(currentState === 'interaction' && eventName === 'reset') {
                newState = 'reset';
            } else {
                console.log(
                    'Invalid State Transition from ' +
                    currentState +
                    ' with event ' +
                    eventName
                );
                return;
            }

            if (possibleStates.indexOf(newState) === -1) {
                throw new Error('Invalid newState ' + newState);
            }

          if(newState === 'disabled'){
            if(config.reference.deviceMotion){
              config.reference.deviceMotion.disconnect();
              phone.rotation.setFromQuaternion(new THREE.Quaternion());
            }
            circularBuffer = [];
          }

          if(newState === 'reset' && config.reference.recalibrationFunction){
            config.reference.recalibrationFunction(phone.rotation);
          }
            currentState = newState;
            window.currentState = currentState;
        } else {
            throw new Error('Invalid event ' + eventName);
        }
    }

    this.status = function () {
      return currentState;
    }
}

var phoneController = new PhoneController(
  THREE, TweenLite, Hammer, document.body, 'global'
);
module.exports = phoneController;
