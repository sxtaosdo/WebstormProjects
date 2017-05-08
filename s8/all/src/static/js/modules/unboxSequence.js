import stage from './stage/3dstage';
import features from './allFeatures';
import controller from './unboxSequenceController';
import {floorRandomBetween, randomBetween, ShootingStar, disposeNode, disposeAll} from '../common/utils';
let throttle = require('lodash.throttle');
let phoneController = require('./features/waterResistant/phone-controller.js');

const SHAKE_TIME = 0.75;
const unboxSequence = (function() {
    const findChild = (selector) => document.querySelector(selector);
    const elements = {};

    let enterTimeline = new TimelineLite(),
        hideS8CopyTimeline;

    let animationTimeline,
        shakeToken,
        calibrationTimeout,
        touchTimeout,
        teaseInterval,
        teasing = false,
        phoneAnimation,
        stars = [],
        starsTimeout,
        starsDelay,
        throttleToken,
        throttledFn,
        calibration = {},
        previousAngle = {},
        prevAngleX,
        prevAngleY,
        isShaking = false,
        runningTime = 0,
        firstRun = true,
        shakeStarted = false,
        animationBoxContainer,
        runAnimation = false;


    // background scene stuff
    let backgroundMesh,
        backgroundMask;

    function init() {
        console.debug('[ unboxSequence ] ***%c init()', 'font-weight: bold; color: #00A;');
        SSG.PubSub.unsubscribe(unboxSequence.init);

        getElements();
        setupTimelines();

        SSG.PubSub.subscribe(SSG.messages.SEQUENCE.UNBOX.ENTER, enter);
        SSG.PubSub.subscribe(SSG.messages.SEQUENCE.UNBOX.EXIT, exit);

        setupUnboxingPhones();
        setupBackgroundScene();
        resizeBackground();

        stars.push(new ShootingStar(document.querySelector('#unbox .unbox__bg'), {
            keyframeId: 'star1',
            duration: randomBetween(3, 4.5, 2),
            startX: window.innerHeight * 1.5 / 2 + 250,
            startY: window.innerHeight * 1.5 / 2 + 150,
            scale: randomBetween(0.1, 0.2, 2),
            endX: 200,
            endY: window.innerHeight * 1.5 / 2 - 150,
            decay: randomBetween(0.333, 1, 2),
            delay: 0.5
        }));
        stars.push(new ShootingStar(document.querySelector('#unbox .unbox__bg'), {keyframeId: 'star2'}));
        // stars.push(new ShootingStar(document.querySelector('#unbox .unbox__bg'), {keyframeId: 'star3'}));
        // stars.push(new ShootingStar(document.querySelector('#unbox .unbox__stars-container')));
        // stars.push(new ShootingStar(document.querySelector('#unbox .unbox__stars-container')));

        SSG.PubSub.subscribe(SSG.messages.DEVICE.RESIZE, resizeBackground);

        // SSG.assets.setBundleDomSrc('globalAssets', elements.name, false);

        let phone = SSG.FeatureDetection.getPhoneInfo();
        if ( phone.device.series === '6+ or 7+' || (phone.os.name === 'Android' && phone.browser.name.toLowerCase() === 'chrome') ) {
            document.body.classList.add('unbox-medium');
        } else if (phone.browser.social) {
            document.body.classList.add('unbox-social');
        }
    }

    function fakeShake(event) {
        // Don't fake shake if you click to dismiss the cookie banner
        if ( !(event.target.classList.contains('banner__dismiss') || event.target.classList.contains('banner__link')) ) {
            document.body.removeEventListener('touchend', fakeShake);
            shakeIt();
        } else if (event.target.classList.contains('banner__link')) {
            window.open(event.target.href);
        }
    }

    function enter() {
        // update stage camera FOV to match unboxing animation
        let stageCamera = stage.getCamera();

        document.body.classList.add('unboxing');

        stage.getRenderer().autoClear = false;

        // stageCamera.fov = 22;
        stageCamera.updateProjectionMatrix();
        // stage.getPhoneObj().position.z = 50;
        // stage.getLight().position.set(-40, -60, -30);
        stage.getPhoneObj().scale.set(1.0235, 1.0235, 1);

        console.debug('[ unboxSequence ] ***%c enter()', 'font-weight: bold; color: #0A0;');
        stage.getPhoneObj().disableScreen();
        enterTimeline.restart();

        if (firstRun) {
            setTimeout(() => {
                elements.container.classList.add('first');
                elements.container.classList.add('play');
                stars[0].animate();
            }, 1500);

            setTimeout(() => {
                // DEV code - remove with fakeShake
                document.body.addEventListener('touchend', fakeShake, false);
                // end DEV code

                phoneController.addShakeListener();

                shakeToken = SSG.PubSub.subscribe(SSG.messages.DEVICE.SHAKE, shakeIt);

                throttledFn = throttle(handleOrientation, 50, {trailing: true});
                throttleToken = SSG.PubSub.subscribe(SSG.messages.DEVICE.ORIENTATION, throttledFn);

                SSG.PubSub.subscribe(SSG.messages.SEQUENCE.UNBOX.SHAKE_DONE, () => {
                    // phoneController.removeShakeListener();

                    disableBrowserZoomH();
                    controller.init();

                    SSG.PubSub.subscribe(SSG.messages.SEQUENCE.UNBOX.INTERACTION_STARTED, function() {
                        clearTimeout(calibrationTimeout);
                        throttledFn.cancel();
                        SSG.PubSub.unsubscribe(SSG.messages.DEVICE.ORIENTATION);
                        calibration.gamma = null;
                    });
                    SSG.PubSub.subscribe(SSG.messages.SEQUENCE.UNBOX.INTERACTION_ENDED, function() {
                        throttledFn = throttle(handleOrientation, 50, {trailing: true});
                        throttleToken = SSG.PubSub.subscribe(SSG.messages.DEVICE.ORIENTATION, throttledFn);
                    });
                });

                setTimeout(animateStars, 6000);

            }, 3000);
        } else {
            elements.container.classList.add('play');
        }
    }

    function exit(msg, nextFeature) {
        console.debug('[ unboxSequence ] ***%c exit()', 'font-weight: bold; color: #A00;');

        document.body.classList.remove('unboxing');
        document.querySelector('.nav__toggleButton').classList.remove('is-hidden');

        enterTimeline.stop();

        SSG.PubSub.unsubscribe(SSG.messages.SEQUENCE.UNBOX.INTERACTION_ENDED);
        clearTimeout(calibrationTimeout);

        controller.stop();
        enableBrowserZoomH();

        throttledFn.cancel();
        SSG.PubSub.unsubscribe(SSG.messages.DEVICE.ORIENTATION);
        TweenLite.killTweensOf(elements.container);
        TweenLite.to(elements.container, 0.5, {
            left: 0,
            top: 0
        });
        calibration.gamma = null;
        clearTimeout(starsTimeout);

        // change enterTimeline to just show container and stage
        if (firstRun) {
            firstRun = false;
            // enterTimeline.kill();
            enterTimeline.clear();

            // enterTimeline = new TimelineLite();
            enterTimeline.to(elements.container, 0.5, { ease: Sine.easeInOut, autoAlpha: 1 })
                .add(stage.show(), 0)
                .add(SSG.enableNavToggleButton, 0)
                .eventCallback('onComplete', function() {
                    disableBrowserZoomH();
                    controller.init();

                    animateStars();
                    throttledFn = throttle(handleOrientation, 50, {trailing: true});
                    throttleToken = SSG.PubSub.subscribe(SSG.messages.DEVICE.ORIENTATION, throttledFn);

                    SSG.PubSub.subscribe(SSG.messages.SEQUENCE.UNBOX.INTERACTION_ENDED, function() {
                        throttledFn = throttle(handleOrientation, 50, {trailing: true});
                        throttleToken = SSG.PubSub.subscribe(SSG.messages.DEVICE.ORIENTATION, throttledFn);
                    });

                    SSG.PubSub.publish(SSG.messages.APP.SHOW_NEXT_BUTTON, 2);
                });
        }

        // use animationTimeline to setup a tween for the exit anim
        animationTimeline = new TimelineLite({
            onComplete: function() {
                elements.container.style.visibility = 'hidden';
                let stageCamera = stage.getCamera();

                // reset phone position
                stage.getPhoneObj().rotation.x = 0;
                stage.getPhoneObj().rotation.y = 0;
                stage.getPhoneObj().rotation.z = 0;
                // stage.getPhoneObj().position.z = 15;

                stage.getScene().remove(backgroundMesh);
                stage.getScene().remove(backgroundMask);

                // stageCamera.fov = 75;
                stageCamera.updateProjectionMatrix();

                stageCamera.position.set(0, 0, 0);


                animationTimeline.kill();
                animationTimeline = null;

                stage.getRenderer().autoClear = true;
                SSG.PubSub.publish(SSG.messages.SEQUENCE.EXIT_ANIMATION_COMPLETE);

                elements.container.classList.remove('play');
                elements.container.classList.remove('first');
            }
        });

        // TODO check if next feature bundle is loaded, if not run a loading loop animation
        let phoneObj = stage.getPhoneObj();
        animationTimeline.to(elements.container, 0.5, { ease: Sine.easeInOut, autoAlpha: 0 });
        animationTimeline.add(stage.hide(), 0);

        stage.renderFn = undefined;

        // clean tweens
        TweenLite.killTweensOf(elements.touch);
    }

    function getElements() {
        elements.container = document.getElementById('unbox');

        elements.titleUnbox = findChild('.overlay__unbox-title');
        elements.introducing = findChild('.overlay__unbox-introducing');
        elements.name = findChild('.overlay__unbox-name');
        elements.shake = findChild('.overlay__unbox-shake');
        elements.touch = findChild('.overlay__unbox-touch');
        elements.bg = findChild('.unbox__bg');
        // elements.bg2 = findChild('.unbox__bg2');
        // elements.bg3 = findChild('.unbox__bg3');
        // elements.bg4 = findChild('.unbox__bg4');
    }

    function setupTimelines() {
        let interationStarted = false;

        enterTimeline.stop();

        // Enter
        enterTimeline.timeScale(1);
        enterTimeline.to(elements.container, 0.25, { autoAlpha: 1 }, 0);
        // enterTimeline.to(elements.titleUnbox, 1, {autoAlpha: 1, ease: Power1.easeIn}, 0.5);
        enterTimeline.to(elements.titleUnbox, 0.75, {autoAlpha: 0, ease: Power1.easeIn}, 0.5);
        enterTimeline.to(stage.getEl(), 1, {opacity: 1, ease: Power1.easeIn}, 0.7);
        enterTimeline.to(elements.bg, 0.9, {autoAlpha: 1, ease: Power1.easeIn}, 1);
        // enterTimeline.to(elements.starsContainer, 0.9, {opacity: 1, ease: Power1.easeIn}, 3.5);
        // enterTimeline.to(elements.bg, 5, {rotationX: 0, ease: Power2.easeIn})
        //     .from(elements.bg, 0, {rotationX: 40}, 3.5)
        // enterTimeline.to(elements.bg, 6, {scale: 1, ease: Power1.easeOut}, 3.5);

        enterTimeline.to(elements.shake, 0.5, {autoAlpha: 1, ease: Power1.easeIn}, 2.5);

        enterTimeline.eventCallback('onComplete', function() {
            teaseInterval = setInterval(function() {
                shakeIt(null, true);
            }, 5000);

            let hideToken = SSG.PubSub.subscribe(
                SSG.messages.SEQUENCE.UNBOX.INTERACTION_STARTED,
                () => {
                    SSG.PubSub.unsubscribe(hideToken);

                    if ( !hideS8Copy() ) {
                        if (touchTimeout) {
                            clearTimeout(touchTimeout);
                            touchTimeout = undefined;

                            TweenLite.to(elements.touch, 1, {autoAlpha: 0, ease: Power3.easeInOut, delay: 2});
                            SSG.PubSub.publish(SSG.messages.APP.SHOW_NEXT_BUTTON, 2.5);
                        }

                    } else {
                        interationStarted = true;
                    }
                }
            );
        });

        hideS8CopyTimeline = new TimelineLite({
            tweens: [
                TweenLite.to(elements.introducing, 1, {autoAlpha: 0, ease: Power1.easeIn}),
                TweenLite.to(elements.name, 1, {autoAlpha: 0, ease: Power1.easeIn, delay: 0.1})
            ],
            paused: true,
            onComplete: function() {
                hideS8CopyTimeline.kill();
                hideS8CopyTimeline = null;

                TweenLite.to(elements.touch, 1, {autoAlpha: 1, ease: Power3.easeInOut});

                if (interationStarted) {
                    TweenLite.to(elements.touch, 1, {autoAlpha: 0, ease: Power3.easeInOut, delay: 2});
                    SSG.PubSub.publish(SSG.messages.APP.SHOW_NEXT_BUTTON, 2.5);

                } else {
                    touchTimeout = setTimeout(() => {
                        TweenLite.to(elements.touch, 1, {autoAlpha: 0, ease: Power3.easeInOut});
                        SSG.PubSub.publish(SSG.messages.APP.SHOW_NEXT_BUTTON, 0.5);

                        touchTimeout = undefined;
                    }, 9000);
                }
            }
        });
    }

    function hideS8Copy() {
        if (hideS8CopyTimeline) {
            if (!hideS8CopyTimeline.isActive()) {
                hideS8CopyTimeline.play();
            }

            return true;
        }
    }

    function handleOrientation(msg, orientation) {
        let phoneObj = stage.getPhoneObj(),
            tweenObj = {},
            multX, multY,
            angleX, angleY;

        if (!calibration.gamma) {
            calibration.gamma = orientation.gamma;
            calibration.beta = orientation.beta;
            previousAngle.gamma = orientation.gamma;
            previousAngle.beta = orientation.beta;
        }

        // if (Math.abs(orientation.gamma - previousAngle.gamma) > 20) {
        //     // calibration.gamma = orientation.gamma - angleX;
        //     // calibration.beta = orientation.beta - angleY;

        //     return;
        // }

        if ( Math.abs(orientation.gamma - previousAngle.gamma) < 20 ) {
            multX = (orientation.gamma - calibration.gamma) < 0 ? -1 : 1;
            angleX = Math.min(Math.max(0, Math.abs(orientation.gamma - calibration.gamma)), 15);

            previousAngle.gamma = orientation.gamma;
            tweenObj.left = angleX * multX * 1.2;
        }

        if ( Math.abs(orientation.beta - previousAngle.beta) < 20 ) {
            multY = (orientation.beta - calibration.beta) < 0 ? 1 : -1;
            angleY = Math.min(Math.max(0, Math.abs(orientation.beta - calibration.beta)), 30);

            previousAngle.beta = orientation.beta;
            tweenObj.top = angleY * multY * 1.25;
        }

        if (!angleX && !angleY) {
            return;
        }

        if ( (!angleX || prevAngleX && (Math.abs(angleX - prevAngleX) < 1)) &&
            (!angleY || prevAngleY && (Math.abs(angleY - prevAngleY) < 0.75)) ) {
            return;
        }

        prevAngleX = angleX;
        prevAngleY = angleY;

        if (angleX) {
            phoneObj.rotation.y = THREE.Math.degToRad(angleX * multX * 0.9);
        }

        if (angleY) {
            phoneObj.rotation.x = THREE.Math.degToRad(angleY * multY * 0.8);
        }

        TweenLite.killTweensOf(elements.container);
        TweenLite.to(elements.container, 0.5, tweenObj);

        clearTimeout(calibrationTimeout);

        calibrationTimeout = setTimeout(function() {
            let calibrationTimeline = new TimelineLite({
                onComplete: function() {
                    calibrationTimeline.kill();
                    calibrationTimeline = null;

                    throttledFn = throttle(handleOrientation, 50, {trailing: true});
                    throttleToken = SSG.PubSub.subscribe(SSG.messages.DEVICE.ORIENTATION, throttledFn);
                }
            });

            calibrationTimeline.to(stage.getPhoneObj().rotation, 0.75, {x: 0, y: 0, z: 0, ease: Sine.easeOut}, 0);
            calibrationTimeline.to(elements.container, 0.9, {left: 0, top: 0, ease: Sine.easeOut}, 0);

            calibration.gamma = null;
            prevAngleY = null;
            prevAngleX = null;
            throttledFn.cancel();
            SSG.PubSub.unsubscribe(SSG.messages.DEVICE.ORIENTATION);
        }, 2000);
        // previousAngle.gamma = orientation.gamma;
        // previousAngle.beta = orientation.beta;
    }

    function setupUnboxingPhones() {
        let scene = stage.getScene();

        unboxSequence.phones = {};
        SSG.phones.phoneBreakAnim(setupBreakScene);
    }

    function setupBackgroundScene() {
        let maskCanvas = document.createElement('canvas'),
            maskCtx = maskCanvas.getContext('2d');

        maskCanvas.height = 128;
        maskCanvas.width = 128;

        let gradient = maskCtx.createRadialGradient(64, 64, 10, 64, 64, 80);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, 'black');

        maskCtx.arc(64, 64, 65, 0, 2 * Math.PI);
        maskCtx.fillStyle = gradient;
        maskCtx.fill();

        let maskTexture = new THREE.Texture(maskCanvas);
        maskTexture.needsUpdate = true;

        backgroundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 0),
            new THREE.MeshBasicMaterial({
                color: 0x000000,
                side: THREE.BackSide,
                opacity: 0.9
            })
        );

        backgroundMask = new THREE.Mesh(
            new THREE.CircleGeometry(10, 200),
            new THREE.MeshBasicMaterial({
                map: maskTexture,
                side: THREE.BackSide,
                opacity: 0.9
            })
        );

        stage.getScene().add(backgroundMesh);
        stage.getScene().add(backgroundMask);

        backgroundMesh.position.z = 250;
        backgroundMask.position.z = 249;
        backgroundMask.position.x = 0;
    }

    function resizeBackground() {
        let backgroundSize = window.innerHeight * 1.5;

        elements.bg.style.height = backgroundSize + 'px';
        elements.bg.style.width = backgroundSize + 'px';
        elements.bg.style.top = (window.innerHeight - backgroundSize) / 2 + 'px';
        elements.bg.style.left = (window.innerWidth - backgroundSize) / 2 + 'px';
        elements.bg.style.transformOrigin = backgroundSize / 2 + 'px ' + backgroundSize * 0.54 + 'px';

        // elements.starsContainer.style.height = backgroundSize + 'px';
        // elements.starsContainer.style.width = backgroundSize + 'px';
        // elements.starsContainer.style.top = (window.innerHeight - backgroundSize) / 2 + 'px';
        // elements.starsContainer.style.left = (window.innerWidth - backgroundSize) / 2 + 'px';
    }

    function setupBreakScene(breakScene) {
        let clock = new THREE.Clock(),
            renderer = stage.getRenderer(),
            camera = new THREE.PerspectiveCamera( 22, window.innerWidth / window.innerHeight, 0.1, 1000),
            animation = breakScene.animations[0],
            mixer = new THREE.AnimationMixer(breakScene),
            scaleTween,
            backgroundTween;

        var aLight_1 = new THREE.AmbientLight( 0xffffff, 1 );

        breakScene.add(aLight_1);
        camera.position.set(0, 0, 50);

        unboxSequence.breakScene = breakScene;
        breakScene.add(camera);

        let breakResizeToken = SSG.PubSub.subscribe(SSG.messages.DEVICE.RESIZE, function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });

        // add note phone
        SSG.phones.oldPhone(function(obj) {
            animationBoxContainer = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    opacity: 0
                })
            );

            breakScene.add(animationBoxContainer);

            breakScene.getObjectByName('TOP').material.opacity = 0;
            breakScene.getObjectByName('TOP').rotation.y = Math.PI;
            breakScene.getObjectByName('TOP').material.transparent = true;
            breakScene.getObjectByName('TOP')
                .add(obj.getObjectByName('top_grill'))
                .add(obj.getObjectByName('top_headphone'))
                .add(obj.getObjectByName('top_cam'))
                .add(obj.getObjectByName('top_cam2'))
                .add(obj.getObjectByName('top_shell'))
                .add(obj.getObjectByName('top_panel1'))
                .add(obj.getObjectByName('top_panel2'));

            breakScene.getObjectByName('CENTER').material.opacity = 0;
            breakScene.getObjectByName('CENTER').visible = false;
            breakScene.getObjectByName('CENTER')
                .add(obj.getObjectByName('center_screen'))
                .add(obj.getObjectByName('center_panel2'));

            breakScene.getObjectByName('LEFT').material.opacity = 0;
            breakScene.getObjectByName('LEFT').rotation.y = Math.PI;
            breakScene.getObjectByName('LEFT').material.transparent = true;
            breakScene.getObjectByName('LEFT')
                .add(obj.getObjectByName('left_shell'))
                .add(obj.getObjectByName('left_band'))
                .add(obj.getObjectByName('left_panel1'))
                .add(obj.getObjectByName('left_panel2'))
                .add(obj.getObjectByName('left_button1'));

            breakScene.getObjectByName('RIGHT').material.opacity = 0;
            breakScene.getObjectByName('RIGHT').rotation.y = Math.PI;
            breakScene.getObjectByName('RIGHT').material.transparent = true;
            breakScene.getObjectByName('RIGHT')
                .add(obj.getObjectByName('right_shell'))
                .add(obj.getObjectByName('right_band'))
                .add(obj.getObjectByName('right_panel1'))
                .add(obj.getObjectByName('right_panel2'))
                .add(obj.getObjectByName('right_button1'))
                .add(obj.getObjectByName('right_button2'));

            breakScene.getObjectByName('BOTTOM').material.opacity = 0;
            breakScene.getObjectByName('BOTTOM').rotation.y = Math.PI;
            breakScene.getObjectByName('BOTTOM').material.transparent = true;
            breakScene.getObjectByName('BOTTOM')
                .add(obj.getObjectByName('bottom_shell'))
                .add(obj.getObjectByName('bottom_panel1'))
                .add(obj.getObjectByName('bottom_panel2'))
                .add(obj.getObjectByName('bottom_button1'))
                .add(obj.getObjectByName('bottom_button2'));

            animationBoxContainer.add(breakScene.getObjectByName('TOP'));
            animationBoxContainer.add(breakScene.getObjectByName('CENTER'));
            animationBoxContainer.add(breakScene.getObjectByName('LEFT'));
            animationBoxContainer.add(breakScene.getObjectByName('RIGHT'));
            animationBoxContainer.add(breakScene.getObjectByName('BOTTOM'));

            animationBoxContainer.rotation.y = Math.PI;
        });

        phoneAnimation = mixer.clipAction(animation)
            .setLoop(THREE.LoopOnce, 1);

        stage.setRenderFn(function(renderer) {
            let delta = (teasing ? 2.5 : 2) * clock.getDelta(),
                phoneObj = stage.getPhoneObj(),
                clipDuration = phoneAnimation.getClip().duration;


            function updatePhone(phoneObj) {
                let centerObjRotation = breakScene.getObjectByName('CENTER').rotation;

                animationBoxContainer.rotation.z = centerObjRotation.z * 0.005;
                // animationBoxContainer.rotation.y = Math.PI;
                breakScene.getObjectByName('TOP').rotation.y = Math.PI;
                breakScene.getObjectByName('CENTER').rotation.y = Math.PI;
                breakScene.getObjectByName('LEFT').rotation.y = Math.PI;
                breakScene.getObjectByName('RIGHT').rotation.y = Math.PI;
                breakScene.getObjectByName('BOTTOM').rotation.y = Math.PI;

                phoneObj.rotation.z = centerObjRotation.z;
                phoneObj.rotation.y = centerObjRotation.y;
                phoneObj.rotation.x = centerObjRotation.x;
            }

            // renderer.clearDepth();
            camera.lookAt(breakScene.position);

            if (!runAnimation) {
                if (isShaking) {
                    runningTime += delta;
                    mixer.update(delta);

                    updatePhone(phoneObj);

                    if (runningTime >= SHAKE_TIME) {
                        if (phoneAnimation.timeScale < 0) {
                            phoneAnimation.reset();

                            if (!teasing) {
                                phoneAnimation.play();
                            } else {
                                isShaking = false;
                                shakeStarted = false;
                                phoneAnimation.stop();
                                phoneObj.rotation.z = 0;
                                phoneObj.rotation.y = 0;
                                phoneObj.rotation.x = 0;
                                animationBoxContainer.rotation.z = 0;
                            }

                        } else if (!teasing) {
                            isShaking = false;
                        }

                        // isShaking = phoneAnimation.timeScale < 0;
                        phoneAnimation.timeScale = phoneAnimation.timeScale * -1;
                        runningTime = 0;
                    }

                } else if (phoneAnimation.timeScale === -1) {
                    runningTime += delta;
                    mixer.update(delta);

                    updatePhone(phoneObj);
                    if (runningTime >= SHAKE_TIME) {
                        phoneAnimation.reset();
                        phoneAnimation.play();

                        runAnimation = true;
                        phoneAnimation.timeScale = 1;
                        runningTime = 0;

                        SSG.PubSub.unsubscribe(shakeToken);
                    }
                }

            } else {
                if (!animationTimeline) {
                    animationTimeline = new TimelineLite({
                        onComplete: function() {
                            animationTimeline.kill();
                            animationTimeline = null;
                        }
                    });

                    animationTimeline.to(elements.shake, 0.5, {opacity: 0, ease: Power1.easeIn});
                }

                mixer.update(delta);
                runningTime += delta;

                updatePhone(phoneObj);

                if (runningTime >= (clipDuration * 0.2) && !scaleTween) {
                    scaleTween = new TimelineLite({
                        onComplete: function() {
                            scaleTween.kill();
                        }
                    });
                    scaleTween.to(phoneObj.scale, 0.5, {x: 1, y: 1, z: 1}, 0);
                }

                if (runningTime >= (clipDuration * 0.23) && !backgroundTween) {
                    backgroundTween = new TimelineLite({
                        onComplete: function() {
                            backgroundTween.kill();
                            backgroundTween = null;
                        }
                    });

                    backgroundTween.to(backgroundMask.scale, 4.5, {x: 150, y: 100, ease: Circ.easeIn});
                    backgroundTween.to(elements.introducing, 1.75, {opacity: 1, scale: 1, ease: Circ.easeOut}, 2.25);
                    backgroundTween.to(elements.name, 1.75, {opacity: 1, scale: 1, ease: Circ.easeOut}, 3.5);
                    //Analytics
                    console.log('Tracking: Shake to start');
                    dataLayer.push({
                        'event':'ShakeIt',
                        'label':'Shake It to Start'
                    });
                    setTimeout(function() {
                        SSG.PubSub.publish(SSG.messages.SEQUENCE.UNBOX.SHAKE_DONE);
                        console.log('Tracking: VirtualPageView Explore');
                        dataLayer.push({
                            'event':'VirtualPageView',
                            'virtualPageURL':'/explore',
                            'virtualPageTitle':'Explore Demo'
                        });
                    }, clipDuration * 0.23 * 1000 + 4000 );
                }

                if (runningTime >= (clipDuration * 0.9)) {
                    phoneObj.rotation.z = 0;
                    phoneObj.rotation.y = 0;
                    phoneObj.rotation.x = 0;

                    stage.setRenderFn(null);

                    SSG.PubSub.unsubscribe(breakResizeToken);

                    // dispose breakScene from memory
                    disposeAll(breakScene, disposeNode);
                    breakScene.children.slice().forEach(obj => breakScene.remove(obj));

                    setTimeout(hideS8Copy, 6000);
                }
            }

            renderer.render(stage.getScene(), stage.getCamera());
            renderer.render(breakScene, camera);
        });
    }

    function animateStars() {
        let dir = 1,
            center = window.innerHeight * 1.5 / 2,
            duration;

        starsDelay = 0;

        stars.forEach(function(star) {
            let startX = center - ( randomBetween(center * 0.3, center * 0.75, 2) * (Math.round(Math.random()) * 2 -1) ),
                startY = center - ( randomBetween(center * 0.3, center * 0.75, 2) * (Math.round(Math.random()) * 2 -1) ),
                endX = startX + randomBetween(center * 1.1, center * 1.5) * (startX > center ? -1: 1),
                endY = startY + randomBetween(center * 1.1, center * 1.5) * (startY > center ? -1 : 1),
                animStartX,
                animStartY,
                animEndX,
                animEndY;

            dir = dir * -1;

            duration = randomBetween(3.25, 4.25, 2);

            animStartX = dir === 1 ? startX : endX;
            animStartY = dir === 1 ? startY : endY;
            animEndX = dir === 1 ? endX : startX;
            animEndY = dir === 1 ? endY : startY;

            let invert = randomBetween(-1, 1, 1) > 1 ? true : false;

            star.animate({
                startX: invert ? animStartY : animStartX,
                startY: invert ? animStartX : animStartY,
                scale: randomBetween(0.09, 0.12, 2),
                endX: invert ? animEndY : animEndX,
                endY: invert ? animEndX : animEndY,
                duration: duration,
                delay: starsDelay
            });

            starsDelay = starsDelay + randomBetween(duration * 0.5, duration * 0.8, 2);
        });

        starsTimeout = setTimeout(animateStars, (starsDelay + duration) * 1000);
    }

    function shakeIt(msg, tease) {
        teasing = !!tease;
        isShaking = true;

        if (!teasing) {
            clearInterval(teaseInterval);
        }

        if (!shakeStarted) {
            phoneAnimation.play();
            runningTime = 0;
            shakeStarted = true;
        }
    }

    function setupEventListeners() {
        SSG.PubSub.publish(SSG.messages.APP.NAVIGATE, 'INFINITY_DISPLAY');
    }

    function destroy() {
        console.debug('[ unboxSequence ] ***%c destroy()', 'font-weight: bold; color: #F00;');
    }

    // External API
    return {
        init,
        enter,
        exit,
        destroy
    };
})();

SSG.PubSub.subscribe(SSG.messages.APP.INIT, unboxSequence.init);


export default unboxSequence;
