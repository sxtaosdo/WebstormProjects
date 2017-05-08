let PubSub = require('pubsub-js');

let messages = {
    APP: {
        INIT: 'app.init',
        INITIAL_LOAD_COMPLETE: 'app.initialloadcomplete',
        INIT_LOAD: 'app.initload',
        LOAD_PROGRESS: 'app.loadprogress',
        NAVIGATE: 'app.navigate',
        SHOW_NEXT_BUTTON: 'app.showNextButton',
        ENABLE_NAV_TOGGLE_BUTTON: 'app.enableNavToggleButton',
        DISABLE_NAV_TOGGLE_BUTTON: 'app.disableNavToggleButton',
    },
    DEVICE: {
        ORIENTATION_CHANGE: 'device.orientationChange',
        ORIENTATION: 'device.orientation',
        SHAKE: 'device.shake',
        RESIZE: 'device.resize'
    },
    SEQUENCE: {
        EXIT_ANIMATION_COMPLETE: 'sequence.exitComplete',
        UNBOX: {
            ENTER: 'sequence.unbox.enter',
            EXIT: 'sequence.unbox.exit',
            SHAKE_DONE: 'sequence.unbox.shakeDone',
            INTERACTION_STARTED: 'sequence.unbox.interactionStarted',
            INTERACTION_ENDED: 'sequence.unbox.interactionEnded'
        },
        INFINITY_DISPLAY: {
            ENTER: 'sequence.infinityDisplay.enter',
            EXIT: 'sequence.infinityDisplay.exit'
        },
        // BIXBY_VISION: {
        //     ENTER: 'sequence.bixbyVision.enter',
        //     EXIT: 'sequence.bixbyVision.exit'
        // },
        WATER_RESISTANT: {
            ENTER: 'sequence.waterResistant.enter',
            EXIT: 'sequence.waterResistant.exit'
        },
        LOW_LIGHT_CAMERA: {
            ENTER: 'sequence.lowLightCamera.enter',
            EXIT: 'sequence.lowLightCamera.exit'
        },
        IRIS_SCAN: {
            ENTER: 'sequence.irisScan.enter',
            EXIT: 'sequence.irisScan.exit'
        },
        PRE_ORDER: {
            ENTER: 'sequence.preOrder.enter',
            EXIT: 'sequence.preOrder.exit'
        }
    }
};

export default PubSub;
export { messages };
