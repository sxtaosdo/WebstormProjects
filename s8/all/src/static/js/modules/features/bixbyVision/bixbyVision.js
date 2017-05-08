const point = require('point-at-length');
const svgpath = require('svgpath');

import stage from '../../stage/3dstage';
import features from '../../allFeatures';
import navPills from '../../global/navPills';

import {randomBetween, floorRandomBetween, injectOpacity, limit} from '../../../common/utils';
const phoneController = require('../../features/waterResistant/phone-controller.js');

import './dot';
import './dotPool';


const bixbyVision = (function() {
    const INTRO_DURATION = 4500;

    const floor = Math.floor;
    const pi = Math.PI;

    const elements = {};

    let drawPhoneScreenEnabled = false;
    let rotatePhoneBackgroundEnabled = false;
    const canvasSize = {
        width: 512,
        height: 1024,
    };
    const bikeArea = {
        x: 325,
        y: 270,
        width: 480,
        height: 800,
    };
    bikeArea.aspectRatio = bikeArea.width / bikeArea.height;
    bikeArea.canvasScale = canvasSize.width / bikeArea.width;

    const dotsCollapsePoint = {
        x: floor(canvasSize.width * 0.5) + 4,
        y: 400,
    };

    let ctx;


    // const scaleValue = (value) => value * spriteSheet.scale;

    // :: Sprites
    // --------------------------------------------------------------
    const spriteSheet = {
        width: 512,
        height: 1068,
    };

    // Scale spritesheet dimensions, contain the horizontal width to the canvas
    spriteSheet.scale = canvasSize.width / spriteSheet.width;

    const sprites = {};

    // Phonebackground will be setup in getElements();
    sprites.phoneBackground = {};

    sprites.topBar = {
        u: 0,
        v: 0,
        width: spriteSheet.width,
        height: 75,
        x: 0,
        y: 0,
        opacity: 1,
    };

    sprites.bottomBar = {
        u: 0,
        v: 80,
        width: spriteSheet.width,
        height: 68,
        x: 0,
        y: canvasSize.height - 68,
        opacity: 1,
    };

    sprites.instructions = {
        u: 0,
        v: 151,
        width: spriteSheet.width,
        height: 155,
        x: 4,
        y: canvasSize.height - sprites.bottomBar.height - 233,
        opacity: 1,
    };

    sprites.searchButtons = {
        u: 150,
        v: 310,
        width: 210,
        height: 110,
        x: 150,
        y: canvasSize.height - sprites.bottomBar.height - 170,
        opacity: 0
    };

    sprites.resultsList = {
        u: 0,
        v: 421,
        width: spriteSheet.width,
        height: 579,
        x: 0,
        y: canvasSize.height - sprites.bottomBar.height - 579,
        opacity: 1,
    };

    sprites.bottomBarWhite = {
        u: 0,
        v: spriteSheet.height - sprites.bottomBar.height,
        width: spriteSheet.width,
        height: sprites.bottomBar.height,
        x: 0,
        y: canvasSize.height - sprites.bottomBar.height,
        opacity: 0,
    };

    // :: Shapes
    // --------------------------------------------------------------

    const shapes = {};

    shapes.bottomBg = {
        x: 0,
        y: sprites.instructions.y,
        width: canvasSize.width,
        height: 233,
        fill: 'rgba(0,0,0, %)',
        opacity: 1,
    };

    shapes.flashlightCover = {
        x: spriteSheet.width * 0.5 - 32,
        y: 0,
        width: 64,
        height: sprites.topBar.height,
        fill: 'rgba(0,0,0, %)',
        opacity: 0,
    };

    shapes.shoppingButtonTap = {
        x: 282,
        y: sprites.searchButtons.y,
        width: 80,
        height: 80,
        fill: 'rgba(0,0,0, %)',
        opacity: 0
    };

    shapes.objectMask = {
        x: 0,
        y: 0,
        width: 512,
        height: 1024,
        fill: 'rgba(37,37,37, %)',
        opacity: 0.3,
    };

    shapes.objectMaskHole = {
        x: dotsCollapsePoint.x,
        y: dotsCollapsePoint.y,
        width: 470,
        height: 340,
        scale: 1,
    };

    shapes.objectMaskHoleOutline = {
        opacity: 0.8,
        color: 'rgba(1,188,169, %)'
    };

    // --------------------------------------------------------------

    const enterTimeline = new TimelineLite();
    let exitTimeline;

    let cssTexture;
    let cssMaterial;

    /** Bike Background **/
    // const background = {
    //     width: 1150,
    //     height: 1183,
    //     scale: 1
    // };

    /** Bike Background - V2 **/
    const background = {
        width: 1150,
        height: 1765,
        scale: 1
    };

    // This is used for translating the bike path svg
    const bike = {
        x: 0.03,
        y: 0.35,
        width: 1,
        height: 1
    };

    let dotPool;

    const bikePath = "M205,2s72.67-1,90.67,9.67c9.58,5.68-3,9.65-11.33,11.33-9.26,1.86-2.74,15.08-4.67,24.33-8,38.33,5.93,85.44,28,105S267.33,73.67,300,73c33.37-.68,68.33,25.67,74.67,51.5,16.08,65.61-20,93.5-60,97.17s-70-37.83-75.67-70.17,21.67-61.67,21.67-61.67,7.83-13,3-28.17c-3-9.26-32.77,31.31-61.33,61.5-17.95,19-55.65,28.41-47.12,37.67a7.49,7.49,0,0,0,7.86,1.87l21.25-7V197.5l-18.33,3s4-19.83,3.33-19.83-30-19.83-34.33-15.33-16,42.33-61.33,43.17c-37,.68-80.33-24.6-70.25-91.5C13.42,50.67,75.33,26.67,112,78.5c5,7.07-6.15,21.81-20,30.83-67.7,44.11,7.8,41,34.33,39.13a11.1,11.1,0,0,0,10.39-10c1.58-19.4-18-51.8-15.38-67.12,5-29.67,22.33,75.67,39.5,63.67,7.67-5.36-27-103.83-40.5-112.5s-17.83-19-17.83-19,66.67-4.33,61.17,10.17c-2.58,6.81-28.33-1.5-26,8.33s-.5,32.5,30.67,32,94.33-1.17,94.33-1.17-2.17-31.83-6.17-35L280,14s-10.15-4.67-48-6.17l14.94,11S211.67,20,205,2Z";
    const bikeSvg = svgpath(bikePath);
    let bikePoints;

    let initialized = false;

    function init() {
        console.debug('[ bixbyVision ] ***%c init()', 'font-weight: bold; color: #00A;');
        SSG.PubSub.unsubscribe(bixbyVision.init);

        getElements();
        setupEnterTimeline(true);
        SSG.PubSub.subscribe(SSG.messages.SEQUENCE.BIXBY_VISION.ENTER, enter);
        SSG.PubSub.subscribe(SSG.messages.SEQUENCE.BIXBY_VISION.EXIT, exit);
    }

    // :: Setup
    // --------------------------------------------------------------

    function getElements() {
        elements.phoneObj = stage.getPhoneObj();

        elements.container = document.getElementById('bixby');
        elements.intro = document.querySelector('#bixby .intro');
        elements.introChildren = document.querySelectorAll('#bixby .intro > *');
        elements.background = document.querySelector('#bixby .background');
        elements.amazonDisclaimer = document.querySelector('#bixby .amazon-disclaimer');

        elements.canvas = document.createElement('canvas');
        elements.canvas.width = canvasSize.width;
        elements.canvas.height = canvasSize.height;
        ctx = elements.canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        scaleElements();

        // Create phone background, which is a smaller "screenshot" of the real background
        // const phoneBackground = document.createElement('canvas');
        // phoneBackground.id = 'phoneBackground';
        // phoneBackground.width = canvasSize.width;
        // phoneBackground.height = canvasSize.height;
        // const bikeScale = canvasSize.width / bikeArea.width;
        // phoneBackground.getContext('2d').drawImage(
        //     elements.background,
        //     bikeArea.x, bikeArea.y,
        //     bikeArea.width, bikeArea.height,
        //     0, 0,
        //     bikeArea.width * bikeScale, bikeArea.height * bikeScale
        // );
        // elements.phoneBackground = phoneBackground;
        // document.body.appendChild(elements.phoneBackground);

        // Setup sprite that the phone background/scene will be drawn into
        sprites.phoneBackground = {
            src: elements.background,
            u: bikeArea.x,
            v: bikeArea.y - 50,
            srcWidth: bikeArea.width,
            srcHeight: bikeArea.height,
            x: 0,
            y: sprites.topBar.height * 0.8, // Slightly above the bottom of the top bar
            width: bikeArea.width * bikeArea.canvasScale,
            height: bikeArea.height * bikeArea.canvasScale,
            opacity: 0.01,
            scale: 1
        };
        // elements.dotsContainer = document.querySelector('#bixbyVision .dotsContainer');

        setupPhone();
    }

    function setupSprite() {
        let bundleAssets = SSG.assets.getBundle('bixbyVision');

        elements.spriteSheet = new Image();
        elements.spriteSheet.src = bundleAssets['/assets/images/bixby/bixby-spritesheet.png'];
    }

    function setupPhone() {
        //phone setup and add canvas as phone texture
        cssTexture = new THREE.Texture( undefined );
        cssTexture.image = elements.canvas;
        cssTexture.magFilter = THREE.LinearFilter;
        cssTexture.minFilter = THREE.LinearMipMapLinearFilter;
        cssMaterial = new THREE.MeshBasicMaterial({
            map: cssTexture,
            depthWrite: true
        });
    }

    function scaleElements() {
        // Manually do the calculations to contain the background to the screen.

        background.scale = ( background.innerWidth / window.innerWidth );
        background.width = window.innerWidth;
        background.height = Math.round( background.height * background.scale );

        elements.background.style.width = background.width * 1.2 + 'px';
        elements.background.style.height = background.height * 1.2 + 'px';

        // Since we scaled the background, we need to scale the bike path + element so we know where it is now.
        bike.xScaled = bike.x * bikeArea.width;
        bike.yScaled = bike.y * bikeArea.height;
        bike.widthScaled = bike.width * bikeArea.width;
        bike.heightScaled = bike.height * bikeArea.height;

        // Apply transformations to the bike path so we can get accurate points
        bikePoints = point(
            bikeSvg
                .scale(1.2)
                .translate(bikeArea.width * bike.x, bikeArea.height * bike.y)
                .toString()
        );
    }

    function createDotPool() {
        dotPool = new DotPool({
            ctx,
            canvasWidth: canvasSize.width,
            canvasHeight: Math.floor(canvasSize.height * 0.618),
            totalDots: 20,
            sizes: {
                // large: 12,
                // medium: 8,
                // small: 5
                large: 16,
                medium: 12,
                small: 8
            },
            largePercentage: 0.9,
            mediumPercentage: 0.617,
            objectPoints: bikePoints,
            collapsePoint: dotsCollapsePoint
        });
    }

    // :: Setup Enter Timeline
    // --------------------------------------------------------------

    function setupEnterTimeline(setupIntro) {
        if (setupIntro) {
            enterTimeline.stop();
            // enterTimeline.timeScale(1);

            // --- Intro
            enterTimeline.addLabel('intro', 0);
            enterTimeline.set(elements.phoneObj.rotation, { x: 0, y: 0, z: 0 });
            enterTimeline.set(elements.intro, { autoAlpha: 1 });
            enterTimeline.add(SSG.disableNavToggleButton, 'intro');
            enterTimeline.to(elements.container, 0.5, { ease: Sine.easeInOut, autoAlpha: 1 }, 'intro');
            enterTimeline.staggerFrom(elements.introChildren, 0.667, { ease: Sine.easeInOut, autoAlpha: 0 }, 0.333);
            enterTimeline.addPause('intro+=3');
            enterTimeline.addLabel('post-intro', 'intro+=3');
            enterTimeline.staggerTo(elements.introChildren, 0.667, { ease: Sine.easeInOut, autoAlpha: 0 }, -0.167, 'intro+=3');
            enterTimeline.to(elements.intro, 0.667, { ease: Sine.easeInOut, autoAlpha: 0 }, 'intro+=3.5');
            enterTimeline.add(SSG.enableNavToggleButton, 'intro+=3');

        } else {
            // --- Main
            enterTimeline.addLabel('main', '-=0.25');

            // TODO More dynamic wiggle/motion for bg?
            enterTimeline.add(stage.show(), 'main+=0.01');
            enterTimeline.set(sprites.phoneBackground, { opacity: 1 }, 'main');
            enterTimeline.add(enableDrawPhoneScreen, 'main');
            enterTimeline.add(enableRotatePhoneBackground, 'main');

            // --- Dots
            enterTimeline.addLabel('dots', 'main+=1.3');
            enterTimeline.add(dotPool.restart, 'dots');

            // --- Object Found
            enterTimeline.addLabel('objectFound', 'dots+=2.5');
            enterTimeline.add(dotPool.collapse, 'objectFound');
            enterTimeline.add(disableRotatePhoneBackground, 'objectFound');
            enterTimeline.from(shapes.objectMaskHole, 0.5, {
                ease: Sine.easeInOut,
                width: 0,
                height: 0
            }, 'objectFound');
            enterTimeline.from(shapes.objectMask, 0.5, { ease: Sine.easeInOut, opacity: 0 }, 'objectFound');
            enterTimeline.from(shapes.objectMaskHoleOutline, 0.5, { ease: Sine.easeInOut, opacity: 0 }, 'objectFound+=0.167');

            // --- Search Buttons
            enterTimeline.addLabel('searchButtons', '+=0.4');
            enterTimeline.to(sprites.instructions, 0.333, { ease: Sine.easeInOut, opacity: 0 }, 'searchButtons');
            enterTimeline.to(sprites.searchButtons, 0.667, { ease: Sine.easeInOut, opacity: 1 }, 'searchButtons');

            // Shopping button tap
            enterTimeline.addLabel('shoppingButtonTap', '+=1.5');
            enterTimeline.to(shapes.shoppingButtonTap, 0.167, { opacity: 0.65 }, 'shoppingButtonTap');
            enterTimeline.to(shapes.shoppingButtonTap, 0.5, { ease: Sine.easeInOut, opacity: 0 });

            // --- Results
            enterTimeline.addLabel('results', '+=0.5');
            enterTimeline.to(sprites.searchButtons, 0.333, { ease: Sine.easeInOut, opacity: 0 }, 'results');
            enterTimeline.to(shapes.flashlightCover, 0.333, { ease: Sine.easeOut, opacity: 1 }, 'results');
            enterTimeline.from(elements.amazonDisclaimer, 0.5, { ease: Sine.easeInOut, autoAlpha: 0 }, 'results');

            // UI Elements
            enterTimeline.to(sprites.bottomBarWhite, 0.167, { opacity: 1 }, 'results');
            enterTimeline.set(sprites.bottomBar, { opacity: 0 });
            enterTimeline.from(sprites.resultsList, 0.667, {
                ease: Power2.easeOut,
                y: canvasSize.height
            }, 'results');
            enterTimeline.set(shapes.bottomBg, { opacity: 0 });

            const phoneBackgroundScaleAmount = 0.618;
            enterTimeline.to(sprites.phoneBackground, 0.5, {
                ease: Sine.easeInOut,
                u: '-=' + (sprites.phoneBackground.srcWidth - (sprites.phoneBackground.srcWidth * phoneBackgroundScaleAmount)) / 2,
                v: '+=' + (sprites.phoneBackground.srcHeight - (sprites.phoneBackground.srcHeight * phoneBackgroundScaleAmount)) / 3.4,
                // srcWidth: '+=' + phoneBackgroundScaleAmount,
                // srcHeight: '+=' + phoneBackgroundScaleAmount * bikeArea.aspectRatio,
                scale: 2 - (phoneBackgroundScaleAmount),
            }, 'results');
            enterTimeline.to(shapes.objectMaskHole, 0.5, {
                ease: Sine.easeInOut,
                // x: '+=15',
                y: 225,
                height: '-=50',
                scale: 1 - (phoneBackgroundScaleAmount / 4)
            }, 'results');
            enterTimeline.to(shapes.objectMaskHoleOutline, 0.667, { ease: Sine.easeIn, opacity: 0 });


            enterTimeline.add(disableDrawPhoneScreen);
            // enterTimeline.to(sprites.topBar, 2, { y: '+=768' }, 'main');
        }
    }

    function animate(renderer) {
        phoneController.update();
        drawPhoneScreen();
        renderer.render(stage.getScene(), stage.getCamera());

        // Drift beahvior for bg sprite
        // TweenLite.set(elements.background, {
        //     x: '+=' + floorRandomBetween(-2, 2),
        //     y: '+=' + floorRandomBetween(-2, 2)
        // });
    }

    function enableDrawPhoneScreen() {
        drawPhoneScreenEnabled = true;
    }

    function disableDrawPhoneScreen() {
        drawPhoneScreenEnabled = false;
    }

    function enableRotatePhoneBackground() {
        rotatePhoneBackgroundEnabled = true;
    }

    function disableRotatePhoneBackground() {
        rotatePhoneBackgroundEnabled = false;

        TweenLite.to(sprites.phoneBackground, 0.333, {
            ease: Sine.easeInOut,
            u: bikeArea.x,
            v: bikeArea.y - 50,
        });
    }


    // :: Drawing
    // --------------------------------------------------------------
    function drawPhoneScreen() {
        if ( !drawPhoneScreenEnabled ) {
            return;
        }

        let sprite;
        for (let spriteName in sprites) {
            sprite = sprites[spriteName];

            if ( sprite.opacity > 0 /* && sprite.redraw */ ) {
                // console.log('drawing sprite: ' + spriteName + '... sprite: ', sprite);

                if ( ctx.globalAlpha !== sprite.opacity ) {
                    ctx.globalAlpha = sprite.opacity;
                }

                ctx.drawImage(
                    sprite.src || elements.spriteSheet,
                    sprite.u, sprite.v,
                    (sprite.srcWidth || sprite.width) * (sprite.scale || 1), (sprite.srcHeight || sprite.height) * (sprite.scale || 1),
                    sprite.x, sprite.y,
                    sprite.width, sprite.height
                );

                ctx.globalAlpha = 1; // Reset for next time

                if ( spriteName === 'phoneBackground' ) {
                    // Hacky, but if we just drew the phoneBackground sprite, draw the dots now...
                    // This is because the dots are weird, they're not technically sprites but they exist in the same canvas.
                    dotPool.drawDots(ctx);
                    drawObjectBox();
                    drawBottomBg();

                } else if ( spriteName === 'topBar' ) {
                    // If we just drew the top bar, we may need to draw the flashlight cover. Again, hacky-ish.
                    drawFlashlightCover();

                } else if ( spriteName === 'searchButtons' ) {
                    drawSearchButtonTap();
                }
            }
        }

        cssTexture.needsUpdate = true;
    }

    function drawObjectBox() {

        // --- Object Mask
        ctx.beginPath();
        ctx.fillStyle = injectOpacity(shapes.objectMask.fill, shapes.objectMask.opacity);

        const top = shapes.objectMask.y;
        const left = shapes.objectMask.x;
        const right = shapes.objectMask.x + shapes.objectMask.width;
        const bottom = shapes.objectMask.y + shapes.objectMask.height;
        ctx.moveTo(left, top);
        ctx.lineTo(left, bottom);
        ctx.lineTo(right, bottom);
        ctx.lineTo(right, top);

        // --- Object Mask Hole
        const objectMaskHoleWidthScaled = shapes.objectMaskHole.width * shapes.objectMaskHole.scale;
        const objectMaskHoleHeightScaled = shapes.objectMaskHole.height * shapes.objectMaskHole.scale;
        const translatedObjectMaskHoleX = shapes.objectMaskHole.x - floor(objectMaskHoleWidthScaled * 0.5);
        const translatedObjectMaskHoleY = shapes.objectMaskHole.y - floor(objectMaskHoleHeightScaled * 0.5);
        ctx.rect(
            translatedObjectMaskHoleX,
            translatedObjectMaskHoleY,
            objectMaskHoleWidthScaled,
            objectMaskHoleHeightScaled
        );
        ctx.fill();

        // --- Object Mask Hole Outline
        ctx.strokeStyle = injectOpacity(shapes.objectMaskHoleOutline.color, shapes.objectMaskHoleOutline.opacity);
        ctx.lineWidth = 5;
        ctx.strokeRect(
            translatedObjectMaskHoleX,
            translatedObjectMaskHoleY,
            objectMaskHoleWidthScaled,
            objectMaskHoleHeightScaled
        );
    }

    function drawBottomBg() {
        if ( shapes.bottomBg.opacity > 0 ) {
            ctx.fillStyle = injectOpacity(shapes.bottomBg.fill, shapes.bottomBg.opacity);
            ctx.fillRect(shapes.bottomBg.x, shapes.bottomBg.y, shapes.bottomBg.width, shapes.bottomBg.height);
        }
    }

    function drawFlashlightCover() {
        if ( shapes.flashlightCover.opacity > 0 ) {
            ctx.fillStyle = injectOpacity(shapes.flashlightCover.fill, shapes.flashlightCover.opacity);
            ctx.fillRect(shapes.flashlightCover.x, shapes.flashlightCover.y, shapes.flashlightCover.width, shapes.flashlightCover.height);
        }
    }

    function drawSearchButtonTap() {
        if ( shapes.shoppingButtonTap.opacity > 0 ) {
            ctx.fillStyle = injectOpacity(shapes.shoppingButtonTap.fill, shapes.shoppingButtonTap.opacity);
            ctx.fillRect(shapes.shoppingButtonTap.x, shapes.shoppingButtonTap.y, shapes.shoppingButtonTap.width, shapes.shoppingButtonTap.height);
        }
    }

    // --------------------------------------------------------------

    function enter() {
        let enterTime = new Date().getTime(),
            loadProgressToken;

        enterTimeline.restart();

        loadProgressToken = SSG.PubSub.subscribe(SSG.messages.APP.LOAD_PROGRESS, (msg, data) => {
            if (data.bundles === 'irisScan') {
                navPills.fillActivePill(data.percentage * 100);
            }
        });

        SSG.assets.load(['bixbyVision']).then(() => {
            let enterDelta = new Date().getTime() - enterTime;

            SSG.PubSub.unsubscribe(loadProgressToken);
            console.debug('[ bixbyVision ] ***%c enter()', 'font-weight: bold; color: #0A0;');

            if ( !initialized ) {
                SSG.assets.setBundleDomSrc('bixbyVision', elements.container, false, true);
                setupSprite();
                createDotPool();
                setupEnterTimeline();

                initialized = true;
            }

            if ( enterDelta < INTRO_DURATION ) {
                enterDelta = INTRO_DURATION - enterDelta;
                navPills.fillActivePill(100, enterDelta / 1000);

            } else {
                enterDelta = 0;
            }

            setTimeout(() => {
                phoneController.enable();
                phoneController.setupReferenceObject();
                elements.phoneObj.setScreenMaterial(cssMaterial);
                // stage.getPhoneObj().position.z = 13;
                phoneController.setPhone(elements.phoneObj);
                stage.renderFn = animate;
                phoneController.onOrientationChange(handleOrientationChange);
                disableBrowserZoomH();

                enterTimeline.play('post-intro');
            }, enterDelta);
        });
    }

    function handleOrientationChange(rotation, source) {

        if ( source === 'initialized') {
            // elements.background.style.top = -10 * 100 * rotation.y / pi;
            // elements.background.style = -5 * 100 * rotation.x / pi;
            const xPi = rotation.y / pi;
            const yPi = rotation.x / pi;

            TweenLite.set(elements.background, {
                x: limit(-50 + (-100 * xPi), -59, -46) + '%',
                y: -50 + (-20 * yPi) + '%',
            });

            // console.log('background x/y: ', limit(-50 + (-100 * xPi), -59, -48) + '%', -50 + (-20 * yPi) + '%');

            if ( rotatePhoneBackgroundEnabled ) {
                TweenLite.set(sprites.phoneBackground, {
                    u: bikeArea.x + (-500 * xPi),
                    v: (bikeArea.y - 50) + (250 * yPi),
                });
            }
        }
    }

    function exit(msg, nextFeature) {
        console.debug('[ bixbyVision ] ***%c exit()', 'font-weight: bold; color: #A00;');
        stage.renderFn = undefined;

        enterTimeline.stop();
        phoneController.disable();
        enableBrowserZoomH();

        phoneController.onOrientationChange(undefined);

        // use exitTimeline to setup a tween for the exit anim
        exitTimeline = new TimelineLite({
            onComplete: function() {
                exitTimeline.kill();
                exitTimeline = undefined;
                SSG.PubSub.publish(SSG.messages.SEQUENCE.EXIT_ANIMATION_COMPLETE);
            }
        });

        exitTimeline.to(elements.container, 0.5, { ease: Sine.easeInOut, autoAlpha: 0 }, 0);
        exitTimeline.add(stage.hide(), 0);
    }

    return {
        init
    };
})();

SSG.PubSub.subscribe(SSG.messages.APP.INIT, bixbyVision.init);

export default bixbyVision;
