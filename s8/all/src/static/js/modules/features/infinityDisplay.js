import stage from '../stage/3dstage';
import features from '../allFeatures';
import { map, limit, degreesBetween } from '../../common/utils.js';
import navPills from '../global/navPills';

var phoneController = require('../features/waterResistant/phone-controller.js');

const infinityDisplay = (function() {
    const INTRO_DURATION = 4500;

    const elements = {};
    const enterTimeline = new TimelineLite();

    // let sceneSize = { width: 5120, height: 2560 }; // LARGE
    const sceneSize = { width: 2150, height: 1075 }; // MEDIUM
    sceneSize.halfWidth = sceneSize.width * 0.5;
    sceneSize.halfHeight = sceneSize.height * 0.5;
    sceneSize.halfWidthPanScaled = sceneSize.halfWidth * -10;
    sceneSize.halfHeightPanScaled = sceneSize.halfHeight * -10;

    const pi = Math.PI;
    const doublePi = pi * 2;
    const nf = 0.3;
    const sin = Math.sin;

    let skyPosition = {
        x: 0
    };

    let gliderPosition = {};
    let glider2Position = {};

    const cameraLimits = {
        x: {
            min: 290,
            max: 1800,
        },
        y: {
            min: -180,
            max: 80,
        }
    };
    const cameraPosition = {
        x: cameraLimits.x.min,
        y: cameraLimits.y.min,
    };
    const cameraTargetPosition = { x: cameraPosition.x, y: cameraPosition.y };

    let exitTimeline;

    // Phone Controls
    let phoneObj;
    let panEnabled = false;

    let scene, camera;


    function init() {
        console.debug('[ infinityDisplay ] ***%c init()', 'font-weight: bold; color: #00A;');
        SSG.PubSub.unsubscribe(infinityDisplay.init);

        getElements();
        resetGliders();
        setupTimelines();

        // ------------------------------

        SSG.PubSub.subscribe(SSG.messages.SEQUENCE.INFINITY_DISPLAY.ENTER, enter);
        SSG.PubSub.subscribe(SSG.messages.SEQUENCE.INFINITY_DISPLAY.EXIT, exit);

        phoneObj = stage.getPhoneObj();

        updateScene();
    }

    function getElements() {
        const findChild = (selector) => document.querySelector('#infinityDisplay ' + selector);
        const findChildren = (selector) => document.querySelectorAll('#infinityDisplay ' + selector);

        elements.container = document.getElementById('infinityDisplay');
        elements.intro = findChild('.intro');
        elements.introChildren = findChildren('.intro > *');

        const disclaimer = document.querySelector('#infinityDisplay .intro__disclaimer');
        if ( disclaimer.innerHTML.length > 170 ) {
            disclaimer.classList.add('is-long');
        }

        elements.layers = Array.prototype.slice.call(document.querySelectorAll('#infinityDisplay .layer:not(.sky-night)'));

        elements.sky = findChild('.sky');
        elements.glider = findChild('.glider');
        elements.glider2 = findChild('.glider2');

        scene = stage.getScene();
        camera = stage.getCamera();
    }

    function setupTimelines() {
        enterTimeline.stop();

        // --- Enter
        // enterTimeline.timeScale(0.25);
        TweenLite.set(elements.layers, { force3D: true }); // This only needs to happen once

        // --- Intro
        enterTimeline.addLabel('intro', 0);
        enterTimeline.add(SSG.disableNavToggleButton, 'intro');
        enterTimeline.set([cameraPosition, cameraTargetPosition], {
            x: cameraLimits.x.min,
            y: cameraLimits.y.min - 180,
        }, 'intro');
        enterTimeline.set(elements.intro, { autoAlpha: 1 });
        enterTimeline.to(elements.container, 0.5, { ease: Sine.easeInOut, autoAlpha: 1 }, 'intro');
        enterTimeline.staggerFrom(elements.introChildren, 0.667, { ease: Sine.easeInOut, autoAlpha: 0}, 0.333);
        enterTimeline.addPause('intro+=3');
        enterTimeline.addLabel('post-intro', 'intro+=3');
        enterTimeline.staggerTo(elements.introChildren, 0.667, { ease: Sine.easeInOut, autoAlpha: 0 }, -0.167, 'intro+=3');
        enterTimeline.to(elements.intro, 0.667, { ease: Sine.easeInOut, autoAlpha: 0 }, 'intro+=3.5');
        enterTimeline.add(SSG.enableNavToggleButton, 'intro+=3');

        // --- Main
        enterTimeline.addLabel('main');
        enterTimeline.add(stage.show(), 'main-=0.25');

        enterTimeline.to(cameraPosition, 2, {
            y: 0,
            ease: Sine.easeOut,
        }, 'main');

        enterTimeline.to(cameraPosition, 4, {
            x: sceneSize.halfWidth,
            ease: Sine.easeInOut,
            onUpdate: updateScene,
            onComplete: () => {
                panEnabled = true;
                phoneController.enable();
            }
        }, 'main');

        enterTimeline.to(gliderPosition, 80, {
            ease: Sine.easeInOut,
            x: -130,
        }, 'main');

        enterTimeline.to(glider2Position, 88, {
            ease: Sine.easeInOut,
            x: -130,
        }, 'main');

        // enterTimeline.to(skyPosition, 280, {
        //     x: -1000
        // }, 'main+=4');

    }

    function render(renderer) {
        if (phoneController) {
            phoneController.update();
        }
        renderer.render(scene, camera);
    }


    function handleOrientationChange(rotation, source) {
        if (panEnabled) {
            if ( source === 'initialized') {
                cameraTargetPosition.x = sceneSize.halfWidth + (sceneSize.halfWidthPanScaled * rotation.y / pi) * 0.5; // (window.x || nf);
                cameraTargetPosition.y = -(sceneSize.halfHeightPanScaled * rotation.x / pi) * (window.y || nf);

            } else if (source === 'reset') {
                cameraTargetPosition.x = sceneSize.halfWidth;
                cameraTargetPosition.y = 0;
            }

            updateScene();
        }
    }

    function enter() {
        let enterTime = new Date().getTime(),
            loadProgressToken;

        resetGliders();
        enterTimeline.restart();

        loadProgressToken = SSG.PubSub.subscribe(SSG.messages.APP.LOAD_PROGRESS, (msg, data) => {
            if (data.bundles === 'infinityDisplay') {
                navPills.fillActivePill(data.percentage * 100);
            }
        });

        // only enter after the bundle is loaded
        SSG.assets.load(['infinityDisplay']).then(() => {
            let enterDelta = new Date().getTime() - enterTime;

            SSG.PubSub.unsubscribe(loadProgressToken);

            SSG.assets.setBundleDomSrc('infinityDisplay', elements.container, false, true);
            console.debug('[ infinityDisplay ] ***%c enter()', 'font-weight: bold; color: #0A0;');

            panEnabled = false;
            phoneController.setupReferenceObject();
            phoneController.setPhone(phoneObj);
            phoneController.disable();
            phoneController.onOrientationChange(handleOrientationChange);
            // phoneController.enable();
            stage.disablePhoneScreen();

            if ( enterDelta < INTRO_DURATION ) {
                enterDelta = INTRO_DURATION - enterDelta;
                navPills.fillActivePill(100, enterDelta / 1000);

            } else {
                enterDelta = 0;
            }

            setTimeout(() => {
                TweenLite.set([cameraPosition, cameraTargetPosition], {
                    x: cameraLimits.x.min,
                    y: cameraLimits.y.min - 180,
                });
                updateScene();

                disableBrowserZoomH();
                enterTimeline.play('post-intro');
                stage.renderFn = render.bind(this);
            }, enterDelta);
        });
    }

    function resetGliders() {
        gliderPosition.x = sceneSize.width * 0.63;
        gliderPosition.y = -sceneSize.halfHeight * 0.8;
        gliderPosition.z = -100;

        gliderPosition.previous = {};
        gliderPosition.sineRateY = doublePi / 1100;
        gliderPosition.sineAmpY = 70;
        gliderPosition.sineCounterY = 0;

        gliderPosition.sineRateZ = doublePi / 10000;
        gliderPosition.sineAmpZ = 50;
        gliderPosition.sineCounterZ = 0;

        gliderPosition.rotateCounter = 0;
        gliderPosition.rotateFramerate = 10;

        // ---

        glider2Position.x = sceneSize.width * 0.67;
        glider2Position.y = -sceneSize.halfHeight * 0.7;
        glider2Position.z = -120;

        glider2Position.previous = {};
        glider2Position.sineRateY = doublePi / 850;
        glider2Position.sineAmpY = 50;
        glider2Position.sineCounterY = 0;

        glider2Position.sineRateZ = doublePi / 1000;
        glider2Position.sineAmpZ = 80;
        glider2Position.sineCounterZ = 59;

        glider2Position.rotateCounter = 0;
        glider2Position.rotateFramerate = 10;
    }

    function updateScene() {
        // console.log(`(( updateScene )) :: ${cameraPosition.x} x ${cameraPosition.y}`);

        if ( panEnabled ) {
            cameraTargetPosition.x = limit(cameraTargetPosition.x, cameraLimits.x.min, cameraLimits.x.max);
            cameraTargetPosition.y = limit(cameraTargetPosition.y, cameraLimits.y.min, cameraLimits.y.max);

            cameraPosition.x = (cameraPosition.x + (cameraTargetPosition.x - cameraPosition.x) * 0.05);
            cameraPosition.y = (cameraPosition.y + (cameraTargetPosition.y - cameraPosition.y) * 0.05);
        }

        let layer, layerX, layerY;
        let offsetX, offsetY;
        let values;
        for ( let i = 0; i < elements.layers.length; i++ ) {
            values = {};
            layer = elements.layers[i];
            offsetX = 0;
            offsetY = 0;

            layerX = 0;
            layerY = (parseInt(layer.getAttribute('data-layer-y'), 10) || 0);

            if ( layer === elements.glider ) {
                offsetX = gliderPosition.x;
                offsetY = gliderPosition.y + ( ((sin(gliderPosition.sineCounterY) * 0.5) + 0.5) * gliderPosition.sineAmpY );
                values.z = ( gliderPosition.z + (((sin(gliderPosition.sineCounterZ) * 0.5) + 0.5) * gliderPosition.sineAmpZ) ).toFixed(2) + 'px';

                // gliderPosition.sineCounterX += gliderPosition.sineRateX;
                gliderPosition.sineCounterY += gliderPosition.sineRateY;
                gliderPosition.sineCounterZ += gliderPosition.sineRateZ;

                if ( gliderPosition.rotateCounter === gliderPosition.rotateFramerate ) {
                    values.rotation = degreesBetween({ x: offsetX, y: offsetY }, gliderPosition.previous) * 0.5;
                    gliderPosition.rotateCounter = 0;
                }

                gliderPosition.previous.x = offsetX;
                gliderPosition.previous.y = offsetY;

                gliderPosition.rotateCounter++;
            }

            if ( layer === elements.glider2 ) {
                offsetX = glider2Position.x;
                offsetY = glider2Position.y + ( ((sin(glider2Position.sineCounterY) * 0.5) + 0.5) * glider2Position.sineAmpY );
                values.z = ( glider2Position.z + (((sin(glider2Position.sineCounterZ) * 0.5) + 0.5) * glider2Position.sineAmpZ) ).toFixed(2) + 'px';

                glider2Position.sineCounterY += glider2Position.sineRateY;
                glider2Position.sineCounterZ += glider2Position.sineRateZ;

                if ( glider2Position.rotateCounter === glider2Position.rotateFramerate ) {
                    values.rotation = degreesBetween({ x: offsetX, y: offsetY }, glider2Position.previous) * 0.7;
                    glider2Position.rotateCounter = 0;
                }

                glider2Position.previous.x = offsetX;
                glider2Position.previous.y = offsetY;

                glider2Position.rotateCounter++;
            }

            // if ( layer === elements.sky ) {
            //     offsetX = skyPosition.x;
            // }

            values.x = (-(cameraPosition.x - layerX - offsetX).toFixed(2) + 'px');
            values.y = (-(cameraPosition.y - layerY - offsetY).toFixed(2) + 'px');

            TweenLite.set(elements.layers[i], values);
        }
    }

    function exit(msg, nextFeature) {
        console.debug('[ infinityDisplay ] ***%c exit()', 'font-weight: bold; color: #A00;');

        phoneController.onOrientationChange(undefined);
        enterTimeline.stop();
        // enterTimeline.kill();
        phoneController.disable();

        enableBrowserZoomH();

        // use exitTimeline to setup a tween for the exit anim
        exitTimeline = new TimelineLite({
            onComplete: function() {
                exitTimeline.kill();
                exitTimeline = undefined;
                SSG.PubSub.publish(SSG.messages.SEQUENCE.EXIT_ANIMATION_COMPLETE);
            }
        });

        exitTimeline.to(elements.container, 0.5, { ease: Sine.easeInOut, autoAlpha: 0 });
        exitTimeline.add(stage.hide(), 0);

        stage.renderFn = undefined;
    }

    return {
        init
    };
})();

SSG.PubSub.subscribe(SSG.messages.APP.INIT, infinityDisplay.init);

export default infinityDisplay;
