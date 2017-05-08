// Modules
import navController from './modules/global/navController';
import deviceController from './modules/global/deviceController';
import nav from './modules/global/nav';
import navPills from './modules/global/navPills';
import messages from './modules/global/messages';
import unboxSequence from './modules/unboxSequence';
import './modules/stage/3dstage';

import './modules/allFeatures';

let throttle = require('lodash.throttle');

// alert(`${window.innerWidth} x ${window.innerHeight}`);

const App = (function() {

    function init() {
        SSG.PubSub.publish(SSG.messages.APP.INIT);

        // force a canvas resize
        SSG.PubSub.publish(SSG.messages.DEVICE.RESIZE);

        console.log('APP INITIALIZED');

        setTimeout(() => {
            // show unboxing first
            SSG.PubSub.publish(SSG.messages.SEQUENCE.UNBOX.ENTER);
            //
            // SSG.PubSub.publish(SSG.messages.SEQUENCE.INFINITY_DISPLAY.ENTER);
            // SSG.PubSub.publish(SSG.messages.SEQUENCE.IRIS_SCAN.ENTER);
            // SSG.PubSub.publish(SSG.messages.SEQUENCE.BIXBY_VISION.ENTER);
            // SSG.PubSub.publish(SSG.messages.SEQUENCE.LOW_LIGHT_CAMERA.ENTER);
            // SSG.PubSub.publish(SSG.messages.SEQUENCE.WATER_RESISTANT.ENTER);
            // SSG.PubSub.publish(SSG.messages.APP.NAVIGATE, 'INFINITY_DISPLAY');

            // SSG.PubSub.publish(SSG.messages.APP.NAVIGATE, 'WATER_RESISTANT');
        }, 10);

        // Show the cookie warning message after a certain amount of time
        // TODO :: This can be localized by a locale specific flag

        const doShowCookieMessage = true;

        if ( doShowCookieMessage ) {
            setTimeout(() => {
                messages.showCookieMessage();
            }, 1000);
        }

        SSG.assets.asyncLoadAllBundles();
    }

    return {
        init
    };
})();

SSG.PubSub.subscribe(SSG.messages.APP.INITIAL_LOAD_COMPLETE, () => {
    let throttledFn = throttle(
        () => {
            SSG.PubSub.publish(SSG.messages.DEVICE.RESIZE);
        },
        100,
        {trailing: true}
    );

    window.addEventListener('resize', throttledFn);
    App.init();
});
