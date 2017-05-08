const Shake = require('shake.js');
import {isDeviceOrientationSupported, isPortrait} from '../../common/utils';
const throttle = require('lodash.throttle');

/**

Quick docs on this controller
===========================================

This module will listen to orientation change and update events.

An ORIENTATION_CHANGE event is landscape => portrait or vice versa.
An ORIENTATION event is a tilt/accelerometer update.
A SHAKE event is a shake event.

Modules can subscribe to these events like this:

// --- Landscape/Portrait Change

    SSG.PubSub.subscribe(SSG.messages.DEVICE.ORIENTATION_CHANGE, handleOrientationChange);

    function handleOrientationChange(isPortrait) {
        console.log('isPortrait: ', isPortrait);
    }

// --- Accelerometer / Orientation

    SSG.PubSub.subscribe(SSG.messages.DEVICE.ORIENTATION, handleOrientation);

    function handleOrientation(orientation) {
        console.group('*** handleOrientation');
        console.log('alpha: ', orientation.alpha);
        console.log('beta: ', orientation.beta);
        console.log('gamma: ', orientation.gamma);
        console.groupEnd();
    }

    ..... OR .....

    import deviceController from '../global/deviceController';
    let latestOrientation = deviceController.getOrientation();

// --- Shake

    SSG.PubSub.subscribe(SSG.messages.DEVICE.SHAKE, handleShake);

    function handleShake() {
        console.log('*** handleShake');
    }

*/


const deviceController = (function() {
  return {
    init: function () {
    }
  };

   //  const orientationConfig = {
   //      // How many miliseconds delay/throttle rate to apply to accelerometer events
   //      // @see https://lodash.com/docs/4.17.4#throttle
   //      throttleRate: 75
   //  };

   //  const orientation = {
   //      alpha: undefined,
   //      beta: undefined,
   //      gamma: undefined
   //  };

   //  const calibration = {
   //      alpha: undefined,
   //      beta: undefined,
   //      gamma: undefined
   //  };

   //  const normal = {
   //      x: undefined,
   //      y: undefined,
   //      z: undefined,
   //  };

   //  let shakeInstance;
   //  const shakeConfig = {
   //      threshold: 2, // optional shake strength threshold
   //      timeout: 500 // optional, determines the frequency of event generation
   //  };

   //  function init() {
   //      // console.log('*** deviceController.init() isDeviceOrientationSupported: ', isDeviceOrientationSupported);
   //      SSG.PubSub.unsubscribe(deviceController.init);

   //      shakeInstance = new Shake(shakeConfig);
   //      shakeInstance.start();

   //      addEventListeners();
   //      handleOrientationChange();
   //  }

   //  function addEventListeners() {
   //      window.addEventListener('deviceorientation', throttle(handleOrientationEvent, orientationConfig.throttleRate, { trailing: true }), false);
   //      window.addEventListener('orientationchange', handleOrientationChange, false);
   //      window.addEventListener('shake', handleShake, false);
   //  }

   //  function handleOrientationEvent(event) {

   //      // gamma is the left-to-right tilt in degrees, where right is positive
   //      // beta is the front-to-back tilt in degrees, where front is positive
   //      // alpha is the compass direction the device is facing in degrees
   //      orientation.alpha = event.alpha;
   //      orientation.beta = event.beta;
   //      orientation.gamma = event.gamma;
   //      // console.debug('[ deviceController ] *** handleOrientationEvent() orientation: ', orientation);

   //      updateNormal(orientation);

   //      SSG.PubSub.publish(SSG.messages.DEVICE.ORIENTATION, getOrientation());
   //  }

   //  function updateNormal({ alpha, beta, gamma }) {
   //      // normal.x = whatever
   //  }

   //  function handleOrientationChange(event) {
   //      console.warn('Orientation changed! isPortrait => ', isPortrait() );

   //      // Very slight delay to allow window dimensions to respond/DOM to finish propagating
   //      // the landscape / portrait change event
   //      setTimeout( () => {
   //          SSG.PubSub.publish(SSG.messages.DEVICE.ORIENTATION_CHANGE, isPortrait());
   //      }, 10);
   //  }

   //  function handleShake() {
   //      SSG.PubSub.publish(SSG.messages.DEVICE.SHAKE);
   //  }

   //  function getOrientation() {
   //      return Object.assign({}, orientation);
   //  }

   //  function getNormal() {
   //      return Object.assign({}, normal);
   //  }

   //  return {
   //      init,
   //      getOrientation
   //      //getNormal,
   //      //calibrate
   //  };
})();

SSG.PubSub.subscribe(SSG.messages.APP.INIT, deviceController.init);

export default deviceController;
