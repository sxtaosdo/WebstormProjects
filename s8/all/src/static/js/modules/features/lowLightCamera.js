import stage from '../stage/3dstage';
import features from '../allFeatures';
import navPills from '../global/navPills';
import {limit, floorRandomBetween} from '../../common/utils';
let phoneController = require('./waterResistant/phone-controller.js');

const lowLightCamera = (function() {
    const findChild = (selector) => document.querySelector(selector);
    const INTRO_DURATION = 4500;

    const elements = {};
    const round = Math.round;
    const abs = Math.abs;
    const PI = Math.PI;
    const TWO_PI = 2*Math.PI;
    const min = Math.min;
    const max = Math.max;


    const enterTimeline = new TimelineLite();
    let exitTimeline;

    let drawPhoneScreenEnabled = false;
    let width = window.innerWidth;
    let height = window.innerHeight;

    let phoneObj;
    let css_texture, css_material;
    let ctx;
    const canvasSize = {
        width: 256,
        height: 512
    };

    let curImageNum; //number for displaying image sequences
    let prevImageNum;

    const images = {};
    const circles = {};
    let circlesOffset = {
        x: 0,
        y: 0
    };
    let original_x, translation_x;

    let firstRun = true;

    let mediumExp = false;


    // -------------------------------------------------------------------------------------------

    function init() {
        console.debug('[ lowLightCamera ] ***%c init()', 'font-weight: bold; color: #00A;');
        SSG.PubSub.unsubscribe(lowLightCamera.init);

        getElements();
        setupEnterTimeline(true);

        SSG.PubSub.subscribe(SSG.messages.SEQUENCE.LOW_LIGHT_CAMERA.ENTER, enter);
        SSG.PubSub.subscribe(SSG.messages.SEQUENCE.LOW_LIGHT_CAMERA.EXIT, exit);

        let phone = SSG.FeatureDetection.getPhoneInfo();

        if ( (phone.os.name === 'Android' && phone.browser.name.toLowerCase() === 'chrome') || phone.browser.social) {
            mediumExp = true;
        }
    }

    function getElements() {
        elements.container = document.getElementById('lowLightCamera');
        elements.intro = document.querySelector('#lowLightCamera .intro');
        elements.introChildren = document.querySelectorAll('#lowLightCamera .intro > *');
        elements.background = findChild('#lowLightCamera .content .background');
        curImageNum = { value: 0 };
        setupCanvas();
        setupCircles();
        setupPhone();
        resizeBackground();

        phoneController.setupReferenceObject();
        phoneController.setPhone(phoneObj);
    }


    function setupEnterTimeline(setupIntro) {
        if (setupIntro) {
            enterTimeline.stop();
            enterTimeline.timeScale(1);

            // --- Intro
            enterTimeline.addLabel('intro', 0);
            enterTimeline.add(SSG.disableNavToggleButton, 'intro');
            enterTimeline.set(elements.intro, { autoAlpha: 1 });
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
            enterTimeline.add(resetScene, 'main-=0.5');
            enterTimeline.add(enableDrawPhoneScreen, 'main-=0.5');

            enterTimeline.addLabel('start');
            enterTimeline.set(circles.bottomLeft, {display:true}, 'start+=1.2');
            enterTimeline.set(circles.bottomRight, {display:true}, 'start+=1.3');
            enterTimeline.set(circles.topLeft, {display:true}, 'start+=1.5');
            enterTimeline.set(circles.topRight, {display:true}, 'start+=1.7');
            enterTimeline.to(curImageNum, 2, { value:19, ease: Linear.easeNone  }, 'start');
            enterTimeline.set(curImageNum, { value:0 });
            enterTimeline.to(curImageNum, 2, { value:19, ease: Linear.easeNone });
            enterTimeline.set(curImageNum, { value:0 });
            enterTimeline.to(curImageNum, 2, { value:19, ease: Linear.easeNone });

            enterTimeline.addLabel('photoTaken');
            enterTimeline.set(images.imageSequence, { display: false },'photoTaken');
            enterTimeline.set(images.camInterface,   { display: false },'photoTaken');
            enterTimeline.set(images.photo, { display: true },'photoTaken');
            enterTimeline.set(images.camTaken,   { display: true },'photoTaken');
            enterTimeline.set(images.camTaken,   { display: false }, "photoTaken+=0.1" );
            enterTimeline.set(images.camInterface,   { display: true },'photoTaken');

            enterTimeline.addLabel('preview', '+=1');
            enterTimeline.set(images.photoPreview, { display: true }, 'preview' );
            enterTimeline.set(images.previewInterface, { display: true }, 'preview' );
            enterTimeline.to(images.photoPreview, 0.4, { offsetX: 0 }, 'preview+=0.1' );
            enterTimeline.to(images.previewInterface, 0.4, { offsetX: 0 }, 'preview+=0.1' );
            enterTimeline.set(images.photo, { display: false });
            enterTimeline.set(images.camInterface,   { display: false });

            enterTimeline.addLabel('fadeOut', '+=3');
            enterTimeline.to(images.previewInterface, 1, { opacity: 0 }, 'fadeOut' );
            enterTimeline.set(images.blackInterface, { display: true }, 'fadeOut' );
            enterTimeline.add(disableDrawPhoneScreen);
        }
    }

    function resizeBackground() {
        elements.background.style.height = height + 'px';
        elements.background.style.width = height + 'px';
        elements.background.style.transform = "translate(-" + (height - width) / 2 + "px, 0)";
    }

    function setupImages() {
        let bundleAssets = SSG.assets.getBundle('lowLightCamera');


        function initImage(name, src, { x = 0, y = 0, u = 0, v = 0, width = canvasSize.width, height = canvasSize.height, display = false, opacity = 1, offsetX = 0, offsetY = 0 } = {}) {
            images[name] = {
                src: bundleAssets['/assets/images/lowLightCamera/' + src], x, y, u, v, width, height, display, opacity, offsetX, offsetY
            };
        }

        initImage('imageSequence', 'foreground.jpg',{ width: 12800, height: 1110, u: canvasSize.width * 2, v: canvasSize.height * 2, display: true });
        initImage('photo', 'photo.jpg', {width: canvasSize.width * 2, height: canvasSize.height * 2});
        initImage('camInterface', 'interface.png',  { u: canvasSize.width * 2, width: canvasSize.width * 2, height: canvasSize.height * 2, display: true});
        initImage('camTaken', 'interface.png', { width: canvasSize.width * 2, height: canvasSize.height * 2});
        initImage('photoPreview', 'photo.jpg', {width: canvasSize.width * 2, height: canvasSize.height * 2, offsetX: canvasSize.width});
        initImage('blackInterface', 'interface.png',    { u: canvasSize.width * 4, width: canvasSize.width * 2, height: canvasSize.height * 2});
        initImage('previewInterface', 'interface.png',  { u: canvasSize.width * 6, width: canvasSize.width * 2, height: canvasSize.height * 2});

        for (let imageName in images) {
            let image = images[imageName];
            image.element = new Image();
            image.element.src = image.src;
        }
    }

    function setupCircles(){
        function initCircle(name, { iniX = 0, iniY = 0, x = 0, y = 0, r = 0, offsetX = 0, offsetY = 0, display = false} = {}) {
            circles[name] = {
                iniX, iniY, x, y, r, offsetX, offsetY, display
            };

            circles[name].update = function(offsetXpos, offsetYpos){
                this.x = limit(this.iniX + offsetXpos + floorRandomBetween(-offsetX,offsetX), 0, canvasSize.width);
                this.y = limit(this.iniY + offsetYpos+ floorRandomBetween(-offsetY,offsetY), 33, canvasSize.height - 33);
            };

            circles[name].getRadium = function(){
                let radium = min(this.x, abs(this.y-33), canvasSize.width-this.x, canvasSize.height-33-this.y);
                if(radium < this.r)
                    return abs(radium);
                return this.r;
            };
        }
        initCircle("topLeft", { iniX: 63, iniY: 80, r: 50, offsetX: 1, offsetY: 1});
        initCircle("topRight", { iniX: 201, iniY: 88, r: 52, offsetX: 0, offsetY: 1});
        initCircle("bottomLeft", { iniX: 77, iniY: 233, r: 76, offsetX: 2, offsetY: 1});
        initCircle("bottomRight", { iniX: 170, iniY: 285, r: 82, offsetX: 2, offsetY: 2});
    }


    function setupPhone() {
        //phone setup and add canvas as phone texture
        elements.phoneObj = stage.getPhoneObj();
        css_texture = new THREE.Texture( undefined );
        css_texture.image = elements.canvas;
        css_texture.magFilter = THREE.LinearFilter;
        css_texture.minFilter = THREE.LinearMipMapLinearFilter;
        css_material = new THREE.MeshBasicMaterial({
            map: css_texture
        });
        //rotation control
    }

    function setupCanvas(){
        elements.canvas = document.createElement('canvas');
        elements.canvas.width = canvasSize.width;
        elements.canvas.height = canvasSize.height;
        ctx = elements.canvas.getContext('2d');
    }

    function enableDrawPhoneScreen() {
        drawPhoneScreenEnabled = true;
    }

    function disableDrawPhoneScreen() {
        drawPhoneScreenEnabled = false;
    }

    function drawPhoneScreen() {
        if(!drawPhoneScreenEnabled)
            return;

        let image;
        let canvasChanged = false;

        if(images.imageSequence.display === true){
            curImageNum.value = round(curImageNum.value);
            if(prevImageNum !== curImageNum.value) {
                image = images.imageSequence;
                ctx.globalAlpha = image.opacity;
                ctx.drawImage(image.element, curImageNum.value * image.u, 0, image.u, image.v, -32+image.offsetX, -21+image.offsetY, image.width/20/2, image.height/2);
                image = images.camInterface;
                ctx.drawImage(image.element, image.u, image.v, image.width, image.height, 0, 0, canvasSize.width, canvasSize.height);

                let circle;
                ctx.strokeStyle="#f4cf03";
                ctx.lineWidth = 1.5;
                for (let circleName in circles) {
                    circle = circles[circleName];
                    if ( circle.display !== false){
                        circle.update(circlesOffset.x, circlesOffset.y);
                        ctx.beginPath();
                        ctx.arc(circle.x, circle.y, circle.getRadium(), 0, TWO_PI);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
                prevImageNum = curImageNum.value;
                canvasChanged = true;
            }
        }
        else {
            for (let imageName in images) {
                if(imageName === 'imageSequence')
                    continue;
                image = images[imageName];
                if ( image.display !== false) {
                    ctx.globalAlpha = image.opacity;
                    ctx.drawImage(
                        image.element, 
                        image.u, image.v,
                        image.width, image.height,
                        image.x + image.offsetX, image.y + image.offsetY, 
                        canvasSize.width, canvasSize.height
                    );
                    canvasChanged = true;
                }
            }
        }

        if(canvasChanged===true){
            css_texture.needsUpdate = true;
        }
    }

    function animate(renderer){
        if(phoneController){
            phoneController.update();
        }
        drawPhoneScreen();
        renderer.render(stage.getScene(), stage.getCamera());
    }

    function resetScene(){
        curImageNum.value = 0;
        prevImageNum = -1;
    }

    function enter() {
        let enterTime = new Date().getTime(),
            loadProgressToken;

        enterTimeline.restart();

        loadProgressToken = SSG.PubSub.subscribe(SSG.messages.APP.LOAD_PROGRESS, (msg, data) => {
            if (data.bundles === 'lowLightCamera') {
                navPills.fillActivePill(data.percentage * 100);
            }
        });

        SSG.assets.load(['lowLightCamera']).then(() => {
            let enterDelta = new Date().getTime() - enterTime;

            SSG.PubSub.unsubscribe(loadProgressToken);
            console.debug('[ lowLightCamera ] ***%c enter()', 'font-weight: bold; color: #0A0;');

            if (firstRun) {
                SSG.assets.setBundleDomSrc('lowLightCamera', elements.container, false);
                setupImages();
                setupEnterTimeline();
                firstRun = false;
                SSG.assets.disposeBundle('lowLightCamera');
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
        if ( images.imageSequence.display === true ) {
            images.imageSequence.offsetX = limit(-1000 * rotation.y / PI, -32, 32);
            images.imageSequence.offsetY = limit(-500 * rotation.x / PI, -21, 21);
            circlesOffset.x = images.imageSequence.offsetX;
            circlesOffset.y = images.imageSequence.offsetY;
        }
        original_x = -(height - width) / 2;
        translation_x =  original_x + limit(100 * rotation.y, original_x, -original_x);

        if (!mediumExp) {
            elements.background.style.transform = 'translate('+ translation_x +'px, 0)';
        }

        if(window.fn) {
          fn(elements, rotation.x, rotation.y);
        }
    }

    function exit(msg, nextFeature) {
        phoneController.disable();

        console.debug('[ lowLightCamera ] ***%c exit()', 'font-weight: bold; color: #A00;');
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

SSG.PubSub.subscribe(SSG.messages.APP.INIT, lowLightCamera.init);

export default lowLightCamera;
