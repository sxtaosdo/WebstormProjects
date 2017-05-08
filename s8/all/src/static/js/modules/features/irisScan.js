import stage from '../stage/3dstage';
import features from '../allFeatures';
import navPills from '../global/navPills';
import {limit, injectOpacity} from '../../common/utils';
var phoneController = require('./waterResistant/phone-controller.js');

const irisScan = (function() {
    const findChild = (selector) => document.querySelector(selector);
    const INTRO_DURATION = 4500;
    const TWO_PI = 2*Math.PI;
    const PI = Math.PI;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const elements = {};
    const enterTimeline = new TimelineLite();
    const scanTimeline = new TimelineLite();
    let exitTimeline;

    let phoneObj;
    let css_texture, css_material;
    let ctx;

    let drawPhoneScreenEnabled = false;

    const images = {};

    const canvasSize = {
        width: 512,
        height: 1024,
    };
    //circles on scan screen
    let scanCircles = { 
        display: false, 
        enable: false, 
        highlight: false, 
        color: 'rgba(255,255,255, %)',
        opacity: 0.2,
        highlightOpacity: 0.8
    };
    //html canvas line to indicate progress on progress screen
    let progressLine = { 
        display: false, 
        value: 0, 
        color: 'rgba(78,189,228, %)',
        opacity: 1
    };
    //grey bar to show the menu is clicked
    let clickedBar = { 
        display: false, 
        color: 'rgba(0,0,0, %)',
        opacity: 0.0
    };
    //position of area where users can scan eyes
    const scanArea = {
        x: 0,
        y: 0,
        width: 512,
        height: 277
    };
    //info about orientation
    //original, translation: for changing position of background image
    //maxBg: max range background images can move
    //maxFace: max range face can move
    let orientation = {
        original_x: - (1.1 * window.innerHeight - window.innerWidth) * 0.5,
        original_y: - 0.05 * window.innerHeight, 
        translation_x: 0, 
        translation_y: 0,
        maxBgX: ( 1.1 * window.innerHeight - window.innerWidth ) * 0.5, 
        maxBgY: 0.05 * window.innerHeight,
        maxFaceX: 0,
        maxFaceY: 0
    };

    let firstTime = true;


    // -------------------------------------------------------------------------------------------
    function init() {
        console.debug('[ irisScan ] ***%c init()', 'font-weight: bold; color: #00A;');
        SSG.PubSub.unsubscribe(irisScan.init);

        getElements();
        setupEnterTimeline(true);

        //document.addEventListener("DOMContentLoaded", getElements, false);
        SSG.PubSub.subscribe(SSG.messages.SEQUENCE.IRIS_SCAN.ENTER, enter);
        SSG.PubSub.subscribe(SSG.messages.SEQUENCE.IRIS_SCAN.EXIT, exit);
    }

    function nextPowerOf2(x) {
        return Math.pow(2, Math.ceil(Math.log(x) / Math.log(2)));
    }

    function getElements() {
        elements.container = document.getElementById('irisScan');
        elements.intro = document.querySelector('#irisScan .intro');
        elements.introChildren = document.querySelectorAll('#irisScan .intro > *');
        elements.background = findChild('#irisScan .background');
        setupCanvas();
        setupPhone();
        resizeBackground();
    }

    function resizeBackground() {
        elements.background.style.height = 1.1 * height + 'px';
        elements.background.style.width = 1.1 * height + 'px';
        elements.background.style.transform = "translate(" + orientation.original_x + "px, " + orientation.original_y + "px)";
    }

    function setupCanvas() {
        elements.canvas = document.createElement('canvas');
        elements.canvas.width = canvasSize.width;
        elements.canvas.height = canvasSize.height;
        ctx = elements.canvas.getContext('2d');
    }

    function setupImages() {
        let bundleAssets = SSG.assets.getBundle('irisScan');

        //image loading and initialization for animation sequence
        function initImage(name, src, 
            { x = 0, y = 0, u = 0, v = 0, 
            width = canvasSize.width, height = canvasSize.height, 
            scale = 1, srcScale = 1, 
            display = false, opacity = 1, 
            srcOffsetX = 0, srcOffsetY = 0, offsetX = 0, offsetY = 0 
            } = {}) {
            images[name] = {
                src: bundleAssets['/assets/images/irisScan/' + src], 
                x, y, u, v, 
                width, height, scale, srcScale, 
                display, opacity, 
                offsetX, offsetY, srcOffsetX, srcOffsetY
            };
        }

        initImage('camera', 'spritesheet1.jpg', { display: true });
        initImage('button_tk', 'spritesheet1.jpg', { y: 734, v: 734, u: canvasSize.width, height: 290});
        initImage('camera_tk', 'spritesheet1.jpg', { u: canvasSize.width, height: 734, opacity: 0.75});
        initImage('progress', 'spritesheet1.jpg', { u: canvasSize.width*2 });
        initImage('photo', 'spritesheet1.jpg', { u: canvasSize.width*4, offsetX: canvasSize.width });
        initImage('success_bar', 'spritesheet2.png', { 
            x: 0,
            y: 700,
            u: canvasSize.width,
            v: 700,
            height: 324
        });

        initImage('menu', 'spritesheet2.png', {
            x: canvasSize.width * 0.15,
            u: canvasSize.width,
            height: 560,
            scale: 0.85,
            opacity: 0
        });
        initImage('scan_bg', 'spritesheet1.jpg', { u: canvasSize.width*3, opacity: 0 });
        initImage('scan_pt', 'spritesheet2.png', { opacity: 0 });

        const scaleAmount = 0.8;
        orientation.maxFaceX = scanArea.width * (1-scaleAmount) / 2;
        orientation.maxFaceY = (scanArea.width - scanArea.height * scaleAmount) / 2;
        initImage('face', 'face.jpg', {
            x: 0,
            y: 0,
            u: orientation.maxFaceX - 30,
            v: orientation.maxFaceY + 5,
            height: 277,
            srcScale: 0.6,
            opacity: 0
        });

        for (let imageName in images) {
            let image = images[imageName];
            image.element = new Image();
            image.element.src = image.src;
        }
    }

    //phone setup and add canvas as phone texture
    function setupPhone() {
        elements.phoneObj = stage.getPhoneObj();
        css_texture = new THREE.Texture( undefined );
        css_texture.image = elements.canvas;
        css_texture.magFilter = THREE.LinearFilter;
        css_texture.minFilter = THREE.LinearMipMapLinearFilter;
        css_material = new THREE.MeshBasicMaterial({
            map: css_texture,
            depthWrite: true
        });
    }

    let imageWidth, imageHeight;

    function animate(renderer){
        if (phoneController) {
            phoneController.update();
        }
        drawPhoneScreen();
        renderer.render(stage.getScene(), stage.getCamera());
    }

    function drawPhoneScreen() {
        if(!drawPhoneScreenEnabled)
            return;

        let image;
        for (let imageName in images) {
            image = images[imageName];
            if ( image.display !== false ) {
                ctx.globalAlpha = image.opacity;
                ctx.drawImage(
                    image.element, 
                    image.u + image.srcOffsetX, image.v + image.srcOffsetY, 
                    image.width * image.srcScale, image.height * image.srcScale,
                    image.x + image.offsetX, image.y + image.offsetY, 
                    image.width * image.scale, image.height * image.scale
                );
            }
        }
        if( clickedBar.display === true)
            drawClickedBar();

        if( progressLine.display === true)
        {
            ctx.globalAlpha = progressLine.opacity;
            drawLine(progressLine.value);
        }
        
        if( scanCircles.display === true){
            drawCircle(148, scanCircles.highlight);
            drawCircle(365, scanCircles.highlight);
        }

        if (scanCircles.enable === true) {
            if (images.face.srcOffsetX < 30 && images.face.srcOffsetX < 40) {
                scanTriggered();
                scanCircles.enable = false;
            }
        }

        css_texture.needsUpdate = true;
    }

    function enableDrawPhoneScreen() {
        drawPhoneScreenEnabled = true;
    }

    function disableDrawPhoneScreen() {
        drawPhoneScreenEnabled = false;
    }

    function getX(imageWidth){
        return (canvasSize.width - imageWidth)*0.5;
    }

    function getY(imageHeight){
        return (canvasSize.height - imageHeight)*0.5;
    }

    function drawCircle(x, highlight){
        ctx.strokeStyle = injectOpacity(scanCircles.color, scanCircles.opacity);
        if(highlight)
            ctx.strokeStyle = injectOpacity(scanCircles.color, scanCircles.highlightOpacity);
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(x,135,84,0,TWO_PI);
        ctx.stroke();
        ctx.closePath();
    }

    function drawLine(x){
        ctx.strokeStyle = injectOpacity(progressLine.color, progressLine.opacity);
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(72,506);
        let lineX = 367 * x + 72;
        ctx.lineTo(lineX,506);
        ctx.stroke();
        ctx.closePath();
    }

    function drawClickedBar() {
        ctx.fillStyle = injectOpacity(clickedBar.color, clickedBar.opacity);
        ctx.fillRect(129, 211, 367, 65);
    }

    function setupEnterTimeline(setupIntro) {
        if (setupIntro) {
            enterTimeline.stop();
            enterTimeline.timeScale(1);

            enterTimeline.addLabel('intro', 0);

            // --- Intro
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
            enterTimeline.addLabel('main');
            enterTimeline.add(stage.show(), 'main-=0.25');
            enterTimeline.add(enableDrawPhoneScreen, 'main-=0.25');
            //take photo
            enterTimeline.set( images.button_tk, { display: true  }, '+=2');
            enterTimeline.set( images.camera_tk, { display: true  }, '+=1');
            enterTimeline.set( images.button_tk, { display: false }, '+=0.1' );
            enterTimeline.set( images.camera_tk, { display: false }, '+=0.1' );
            //review photo
            enterTimeline.set( images.photo,     { display: true  });
            enterTimeline.to( images.photo,      0.4, { offsetX: 0}, '+=0.5' );
            enterTimeline.set( images.camera,    { display: false, opacity: 0 });
            //click menu
            enterTimeline.set( images.menu,      { display: true  }, '+=2' );
            enterTimeline.to( images.menu,       0.4, { x: 0, scale: 1, opacity: 1, ease: Back.easeOut.config(1)});
            enterTimeline.set( clickedBar,   { display: true  }, '+=1' );
            enterTimeline.to( clickedBar,    0.3, { ease: Sine.easeInOut, opacity: 0.08});
            enterTimeline.to( clickedBar,    0.2,{ display: 0, opacity: 0 }, '+=1' );
            enterTimeline.to( images.menu,       0.2,  { display: 0, opacity: 0 });
            enterTimeline.set( images.menu,      { display: false });
            enterTimeline.set( clickedBar,   { display: false });
            //scan interface shows up
            enterTimeline.addLabel( 'clickScan','+=0.2' );
            enterTimeline.set( images.scan_bg,   { display: true }, 'clickScan' );
            enterTimeline.set( images.scan_pt,   { display: true }, 'clickScan' );
            enterTimeline.to( images.scan_bg,  0.5, { opacity: 1 }, 'clickScan' );
            enterTimeline.to( images.scan_pt,  0.5, { opacity: 1 }, 'clickScan+=0.7' );
            enterTimeline.set( scanCircles,      { display: true },  'clickScan+=1.5' );
            enterTimeline.set( images.face,      { display: true }, 'clickScan+=1.5' );
            enterTimeline.to( images.face,     0.5, { opacity: 1  }, 'clickScan+=1.5' );
            const scaleAmount = 0.75;
            enterTimeline.to( images.face,     1.5, { 
                ease: Power1.easeOut,
                u: orientation.maxFaceX + 55,
                v: orientation.maxFaceY,
                srcScale: 0.65
            },'clickScan+=1.5');
            enterTimeline.to( images.face,     3, { 
                ease: Back.easeOut.config(1),
                u: scanArea.width * (1-scaleAmount) / 2,
                v: (scanArea.width - scanArea.height * scaleAmount) / 2 + 5,
                srcScale: scaleAmount
            },'clickScan+=3');
            enterTimeline.set( images.photo, { display: false },'clickScan+=1.5');
            enterTimeline.set( scanCircles,  { enable: true },'clickScan+=5');
        }
    }

    function scanTriggered() {
        scanTimeline.restart();
    }

    function setupScanTimeline() {
        scanTimeline.stop();

        //scan circles blink
        scanTimeline.set( scanCircles,  { highlight: true }, '+=0.1' );
        scanTimeline.set( scanCircles,  { highlight: false }, '+=0.1');
        scanTimeline.set( scanCircles,  { highlight: true }, '+=0.1' );
        scanTimeline.set( scanCircles,  { highlight: false }, '+=0.1');
        scanTimeline.set( scanCircles,  { display: false });
        // //iris scan to home screen
        scanTimeline.addLabel( 'reveal' );
        scanTimeline.to( images.scan_pt,       1,      { opacity: 0 }, 'reveal');
        scanTimeline.to( images.scan_bg,       1,      { opacity: 0 }, 'reveal');
        scanTimeline.set( images.scan_pt, { display: false });
        scanTimeline.set( images.scan_bg, { display: false });
        scanTimeline.set( images.face,   { display: false, opacity: 0 }, 'reveal');
        scanTimeline.set( images.progress, { display: true }, 'reveal');
        scanTimeline.set( progressLine,    { display: true }, 'reveal');
        scanTimeline.to( images.progress,      1,   { opacity: 1 }, 'reveal');
        scanTimeline.to( progressLine,        1,   { value: 1 }, 'reveal+=0.5');
        scanTimeline.addLabel('finish');
        scanTimeline.set( images.photo,        { display: true}, 'finish');
        scanTimeline.set( images.success_bar,  { display: true}, 'finish');
        scanTimeline.to( images.photo,         0.5,      { opacity: 1 }, 'finish');
        scanTimeline.to( images.success_bar,   0.5,      { opacity: 1 }, 'finish');
        scanTimeline.to( progressLine,        0.5,      { opacity: 0 }, 'finish');
        scanTimeline.set( images.progress,     { display: false});
        scanTimeline.set( progressLine,     { display: false });
        scanTimeline.add( disableDrawPhoneScreen );
    }

    function enter() {
        let enterTime = new Date().getTime(),
            loadProgressToken;

        scanTimeline.pause(0);
        enterTimeline.restart();

        loadProgressToken = SSG.PubSub.subscribe(SSG.messages.APP.LOAD_PROGRESS, (msg, data) => {
            if (data.bundles === 'irisScan') {
                navPills.fillActivePill(data.percentage * 100);
            }
        });

        // only enter after the bundle is loaded
        SSG.assets.load(['irisScan']).then(() => {
            let enterDelta = new Date().getTime() - enterTime;

            SSG.PubSub.unsubscribe(loadProgressToken);

            console.debug('[ irisScan ] ***%c enter()', 'font-weight: bold; color: #0A0;');

            if (firstTime) {
                firstTime = false;

                setupImages();
                SSG.assets.setBundleDomSrc('irisScan', elements.container, false, true);

                setupEnterTimeline();
                setupScanTimeline();
            }

            if ( enterDelta < INTRO_DURATION ) {
                enterDelta = INTRO_DURATION - enterDelta;
                navPills.fillActivePill(100, enterDelta / 1000);

            } else {
                enterDelta = 0;
            }

            setTimeout(() => {
                phoneController.setupReferenceObject();
                phoneController.setPhone(elements.phoneObj);
                phoneController.enable();
                phoneController.onOrientationChange(handleOrientationChange);
                elements.phoneObj.setScreenMaterial(css_material);
                stage.renderFn = animate;
                disableBrowserZoomH();

                enterTimeline.play('post-intro');
            }, enterDelta);
        });
    }

    function handleOrientationChange(rotation) {
        if ( images.face.display === true ) {
            images.face.srcOffsetX = limit(-1000 * rotation.y / PI, -orientation.maxFaceX, orientation.maxFaceX);
            images.face.srcOffsetY = limit(-1000 * rotation.x / PI, -orientation.maxFaceY,  orientation.maxFaceY);
        }
        orientation.translation_x =   orientation.original_x + limit(50 * rotation.y, -orientation.maxBgX, orientation.maxBgX);
        orientation.translation_y =   orientation.original_y - limit(50 * rotation.x, -orientation.maxBgY, orientation.maxBgY);
        elements.background.style.transform = 'translate('+ orientation.translation_x +'px, ' + orientation.translation_y + 'px)';
        if(window.fn) {
          fn(elements, rotation.x, rotation.y);
        }
    }

    function exit(msg, nextFeature) {
        console.debug('[ irisScan ] ***%c exit()', 'font-weight: bold; color: #A00;');

        enterTimeline.stop();
        phoneController.disable();
        enableBrowserZoomH();

        phoneController.onOrientationChange(undefined);
        stage.renderFn = undefined;
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

    // -------------------------------------------------------------------------------------------

    return {
        init
    };
})();

SSG.PubSub.subscribe(SSG.messages.APP.INIT, irisScan.init);

export default irisScan;
