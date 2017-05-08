/* @flow  */

import stage from '../stage/3dstage';
import features from '../allFeatures';
import ExperienceType from '../../common/ExperienceType';
import navPills from '../global/navPills';

import {map, injectOpacity} from '../../common/utils';
const OIMO = require('./waterResistant/oimo');
const phoneController = require('./waterResistant/phone-controller.js');


const waterResistant = (function() {
    const INTRO_DURATION = 4500;

    // Math constants
    const sin = Math.sin;
    const cos = Math.cos;
    const pow = Math.pow;
    const round = Math.round;
    const random = Math.random;
    const degToRad = THREE.Math.degToRad;
    const abs = Math.abs;
    const PI = Math.PI;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const elements = {};

    const enterTimeline = new TimelineLite();
    enterTimeline.stop();

    let exitTimeline;


    const gradienceMovement = new TimelineLite({
        onComplete:function() {
            gradienceMovement.restart();
        }
    });

    //basic components
    let waterResistantContainer;
    let container;
    let camera, scene, renderer;
    let preRender = true;
    let backgroundScene;    //background objects, including background sea, background bubbles
    let objectsScene;       //front objects, including phone, bubble particles
    //objects in scenes
    let plane_bg; //background images
    let plane_bg_pos = {
        x: 0,
        y: 0.1
    }; 
    let texture_bg;
    //phone
    let phone;
    let phone_width;
    let phone_height;
    let phone_depth;
    //light
    let ambientLight;
    let dirLight;
    let pointLight;
    let spotLight;
    //interaction physics
    let world;
    let bodys = [];
    let meshs = [];
    let bodys_drop = [];
    let meshs_drop = [];
    let phone_phys_body;
    let phone_phys_mesh; //box containing phone
    let dropBubbleScene = true;
    let dirts = [];
    let bubble_basic;
    //canvas
    let drawPhoneScreenEnabled = false;
    let css_texture, css_material;
    let images = {};
    let ctx;
    const canvasSize = {
        width: 512,
        height: 1024,
        scale: 0.5,
        color: 'rgba(0,0,0, %)',
        opacity: 1
    };
    let gradiencePosition = {
        x: -1191*canvasSize.scale,
        y: 0,
        finalX: 0,
        finalY: -2002*canvasSize.scale,
        preX: -1191*canvasSize.scale,
        preY: 0
    };
    //shader effects
    let uniforms_caustic;
    //device rotation
    let controlEnabled; 

    //API
    let number_drop = 100;
    let bubbleEnabled = true;
    let dirtEnabled = true;
    let shaderEnabled = true;
    let backgroundScale = 2;

    let firstRun = true;
    const experienceType = SSG.FeatureDetection.getExperienceType();

    //********************************************************
    //********             Initialization             ********
    //********************************************************

    function init() {
        SSG.PubSub.unsubscribe(init);
        SSG.PubSub.subscribe(SSG.messages.SEQUENCE.WATER_RESISTANT.ENTER, enter);
        SSG.PubSub.subscribe(SSG.messages.SEQUENCE.WATER_RESISTANT.EXIT, exit);

        if ( experienceType === ExperienceType.MEDIUM ) {
            shaderEnabled = false;
        }

        //scene
        objectsScene = new THREE.Scene();        //front objects
        
        //camera
        camera = new THREE.PerspectiveCamera( 70, width / height, 1, 1000 );
        camera.position.z = 400;
        camera.position.y = 0;
        camera.position.x = 0;

        //render
        renderer =  stage.getRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( width, height );

        //container
        waterResistantContainer = document.getElementById( 'waterResistant' );
        container = document.getElementById( 'waterResistantScene' );
        elements.intro = document.querySelector('#waterResistant .intro');
        elements.introChildren = document.querySelectorAll('#waterResistant .intro > *');
        setupCanvas();
        
        //light
        setupLight(objectsScene);

        //time line
        setupTimelines(true);

        SSG.PubSub.subscribe(SSG.messages.DEVICE.RESIZE, function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();    
        });
    }

    //********************************************************
    //********            Timelines Setup             ********
    //********************************************************

    function setupTimelines(setupIntro) {
        var rendererElement = document.getElementById('renderer');

        if (setupIntro) {
            enterTimeline.stop();

            // --- Intro
            enterTimeline.addLabel('intro', 0);
            enterTimeline.add(SSG.disableNavToggleButton, 'intro');
            enterTimeline.set(elements.intro, { autoAlpha: 1 });
            enterTimeline.set([container, rendererElement], { autoAlpha: 0 });
            enterTimeline.to(waterResistantContainer, 0.5, { ease: Sine.easeInOut, autoAlpha: 1 }, 'intro');
            enterTimeline.staggerFrom(elements.introChildren, 0.667, { ease: Sine.easeInOut, autoAlpha: 0 }, 0.333);
            enterTimeline.addPause('intro+=3');
            enterTimeline.addLabel('post-intro', 'intro+=3');
            enterTimeline.staggerTo(elements.introChildren, 0.667, { ease: Sine.easeInOut, autoAlpha: 0 }, -0.167, 'intro+=3');
            enterTimeline.to(elements.intro, 0.667, { ease: Sine.easeInOut, autoAlpha: 0 }, 'intro+=3.5');
            enterTimeline.add(SSG.enableNavToggleButton, 'intro+=3');

        } else {
            enterTimeline.addLabel('main');
            enterTimeline.add(stage.show(), 'main-=0.25');
            enterTimeline.to(container, 0.25, { autoAlpha: 1 }, 'main');

            gradienceMovement.stop();
            gradienceMovement.addLabel('beginning');
            gradienceMovement.to( gradiencePosition, 3, {
                ease: Linear.easeNone,
                x: gradiencePosition.finalX,
                y: gradiencePosition.finalY
            }, 'beginning');
            gradienceMovement.to( images.arrowLeft, 0.7, {
                offsetX: '+=' + 21*canvasSize.scale
            }, 'beginning');
            gradienceMovement.to( images.arrowRight, 0.7, {
                offsetX: '-=' + 21*canvasSize.scale
            }, 'beginning');
            gradienceMovement.to( images.arrowLeft, 0.3, {
                opacity: 0,
            }, 'beginning+=0.7');
            gradienceMovement.to( images.arrowRight, 0.3, {
                opacity: 0,
            }, 'beginning+=0.7');
            gradienceMovement.addLabel('secondRound', 'beginning+=1');
            gradienceMovement.set(images.arrowLeft, {
                offsetX: 0,
                opacity: 1
            }, 'secondRound');
            gradienceMovement.set(images.arrowRight, {
                offsetX: 0,
                opacity: 1
            }, 'secondRound');
            gradienceMovement.to( images.arrowLeft, 0.7, {
                offsetX: '+=' + 21*canvasSize.scale
            }, 'secondRound');
            gradienceMovement.to( images.arrowRight, 0.7, {
                offsetX: '-=' + 21*canvasSize.scale
            }, 'secondRound');
            gradienceMovement.to( images.arrowLeft, 0.3, {
                opacity: 0,
            }, 'secondRound+=0.7');
            gradienceMovement.to( images.arrowRight, 0.3, {
                opacity: 0,
            }, 'secondRound+=0.7');
            gradienceMovement.addLabel('thirdRound', 'secondRound+=1');
            gradienceMovement.set(images.arrowLeft, {
                offsetX: 0,
                opacity: 1
            }, 'thirdRound');
            gradienceMovement.set(images.arrowRight, {
                offsetX: 0,
                opacity: 1
            }, 'thirdRound');
            gradienceMovement.to( images.arrowLeft, 0.7, {
                offsetX: '+=' + 21*canvasSize.scale
            }, 'thirdRound');
            gradienceMovement.to( images.arrowRight, 0.7, {
                offsetX: '-=' + 21*canvasSize.scale
            }, 'thirdRound');
            gradienceMovement.to( images.arrowLeft, 0.3, {
                opacity: 0,
            }, 'thirdRound+=0.7');
            gradienceMovement.to( images.arrowRight, 0.3, {
                opacity: 0,
            }, 'thirdRound+=0.7');

            enterTimeline.addLabel('call', '+=5');
            enterTimeline.add(enableDrawPhoneScreen, 'call');
            enterTimeline.set(images.gradience, { display: true }, 'call');
            enterTimeline.set(images.call, { display: true }, 'call');
            enterTimeline.to(images.gradience, 0.5, { opacity: 1 }, 'call');
            enterTimeline.to(images.call, 0.5, { opacity: 1 }, 'call');
            enterTimeline.addLabel('shake', 'call+=0.5');
            enterTimeline.set(images.clock, { display: false }, 'shake');
            enterTimeline.add(phoneVibrate, 'shake');
            enterTimeline.set(images.arrowLeft, { display: true }, 'shake');
            enterTimeline.set(images.arrowRight, { display: true }, 'shake');
        }
    }

    //********************************************************
    //********              Canvas Setup              ********
    //********************************************************
    function setupCanvas(){
        elements.canvas = document.createElement('canvas');
        elements.canvas.width = canvasSize.width*canvasSize.scale;
        elements.canvas.height = canvasSize.height*canvasSize.scale;
        ctx = elements.canvas.getContext('2d');
    }

    function setupImages() {
        let bundleAssets = SSG.assets.getBundle('waterResistant');

        function initImage(
            name, src, 
            { x = 0, y = 0, u = 0, v = 0, 
                srcWidth = canvasSize.width, srcHeight = canvasSize.height, 
                width = canvasSize.width*canvasSize.scale, height = canvasSize.height*canvasSize.scale, 
                display = false, opacity = 1, 
                offsetX = 0, offsetY = 0 
            } = {}) {
            images[name] = {
                src: bundleAssets['/assets/images/waterResistant/' + src], x, y, u, v, 
                srcWidth, srcHeight, width, height, 
                display, opacity, offsetX, offsetY
            };
        }

        initImage('clock', 'spritesheet.png',{ display: true });
        initImage('gradience', 'gradience.jpg', { offsetX: gradiencePosition.x, offsetY: gradiencePosition.y, 
            srcWidth: 1024, srcHeight: 2048,
            width: 1703*canvasSize.scale, height: 3026*canvasSize.scale,
            opacity: 0
        });
        initImage('call',  'spritesheet.png',{ u: canvasSize.width, opacity: 0});
        initImage('arrowLeft',  'arrow.png',{ x: 151*canvasSize.scale, y: 805*canvasSize.scale, u: 151, srcWidth: 50, srcHeight: 50, width:50*canvasSize.scale, height: 50*canvasSize.scale});
        initImage('arrowRight', 'arrow.png',{ x: 310*canvasSize.scale, y: 805*canvasSize.scale, u: 310, srcWidth: 50, srcHeight: 50, width:50*canvasSize.scale, height: 50*canvasSize.scale});

        for (let imageName in images) {
            let image = images[imageName];
            image.element = new Image();
            image.element.src = image.src;
        }
    }

    function enableDrawPhoneScreen() {
        drawPhoneScreenEnabled = true;
    }

    function disableDrawPhoneScreen() {
        drawPhoneScreenEnabled = false;
    }

    function drawPhoneScreen(setupIntro) {
        if(setupIntro){
            //reset phone screen to clock
            //run once to save memory
            drawBlackBackground();
            let image = images.clock;
            ctx.globalAlpha = image.opacity;
            ctx.drawImage(
                image.element, 
                image.u, image.v, 
                image.srcWidth, image.srcHeight,
                image.x + image.offsetX, image.y + image.offsetY, 
                image.width, image.height
            );
            css_texture.needsUpdate = true;
        }
        else {
            if ( !drawPhoneScreenEnabled ) {
                return;
            }

            let image;
            let canvasChanged = false;

            gradiencePosition.x = round(gradiencePosition.x);
            gradiencePosition.y = round(gradiencePosition.y);
            if(abs(gradiencePosition.x - gradiencePosition.preX)>3){
                for (let imageName in images) {
                    image = images[imageName];
                    if ( image.display !== false) {

                        if(imageName === 'clock')
                            drawBlackBackground();
                        if(imageName === 'gradience'){
                            image.offsetX = gradiencePosition.x;
                            image.offsetY = gradiencePosition.y;
                        }

                        ctx.globalAlpha = image.opacity;    
                        ctx.drawImage(image.element, 
                            image.u, image.v, 
                            image.srcWidth, image.srcHeight,
                            image.x + image.offsetX, image.y + image.offsetY, 
                            image.width, image.height
                        );
                        canvasChanged = true;
                    }
                }
                gradiencePosition.preX = gradiencePosition.x;
                gradiencePosition.preY = gradiencePosition.y;
            }
            if(canvasChanged)
                css_texture.needsUpdate = true;
        }
    }

    function drawBlackBackground() {
        ctx.fillStyle = injectOpacity(canvasSize.color, canvasSize.highlightOpacity);
        ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
    }

    //********************************************************
    //********          WebGL Elements Setup          ********
    //********************************************************

    //Background

    function setupBackground(backgroundScene) {
        let bundleAssets = SSG.assets.getBundle('waterResistant');

        //backgroud image
        texture_bg = new THREE.TextureLoader().load( bundleAssets['/assets/images/waterResistant/water_background.jpg'] );
        let material_bg = new THREE.MeshBasicMaterial( { map: texture_bg } );
        plane_bg = new THREE.Mesh(new THREE.PlaneGeometry(750, 1800), material_bg);
        plane_bg.material.side = THREE.FrontSide;

        if(shaderEnabled===false){
            plane_bg.scale.x = plane_bg.scale.y = plane_bg.scale.z = backgroundScale-0.2;
            objectsScene.add(plane_bg);
        }
    }

    function resetBackground(backgroundScene) {
        plane_bg.position.x = 0;
        plane_bg.position.y = (window.innerHeight - 1800)*0.5;
        plane_bg.position.z = -400;
        TweenLite.to( plane_bg.position, 5, {
            delay: 0.5,
            y: '+=' +100,
            ease: Power1.easeOut
        });
        plane_bg_pos.x = 0;
        plane_bg_pos.y = 0.1;
        TweenLite.to( plane_bg_pos, 5, {
            delay: 0.5,
            y: 0,
            ease: Power1.easeOut
        });
    }

    //Shader

    function setupCausticShader(objectsScene) {
        let geometry_caustic_shader = new THREE.PlaneBufferGeometry(width,height);
        uniforms_caustic = {
            u_time: { type: "f", value: 1.0 },
            u_texture: { type: "t", value: texture_bg},
            u_texture_pos: { type: "v2", value: plane_bg_pos }
        };
        let material_caustic_shader = new THREE.ShaderMaterial( {
            uniforms: uniforms_caustic,
            vertexShader: document.getElementById( 'causticVertexShader' ).text,
            fragmentShader: document.getElementById( 'causticFragmentShader' ).text
        } );
        let mesh_caustic_shader = new THREE.Mesh( geometry_caustic_shader, material_caustic_shader );
        mesh_caustic_shader.position.z = -150;
        mesh_caustic_shader.scale.x = mesh_caustic_shader.scale.y = mesh_caustic_shader.scale.z = backgroundScale;
        if(shaderEnabled === true)
            objectsScene.add( mesh_caustic_shader );
    }

    //Phone

    function setupPhone(objectsScene) {
        let phoneInside;
        phoneInside = stage.getPhoneObj().clone();
        phoneInside.scale.x = phoneInside.scale.y = phoneInside.scale.z = 28;

        let box = new THREE.Box3().setFromObject(phoneInside);
        phone_width = box.max.x-box.min.x;
        phone_height = box.max.y-box.min.y;
        phone_depth = box.max.z-box.min.z;

        phoneInside.position.z -= 3*phone_depth;

        //setup canvas as texture
        css_texture = new THREE.Texture( undefined );
        css_texture.image = elements.canvas;
        css_texture.magFilter = THREE.LinearFilter;
        css_texture.minFilter = THREE.LinearMipMapLinearFilter;
        css_material = new THREE.MeshBasicMaterial({
            map: css_texture
        });

        phoneInside.children[16].material = css_material;
        phoneInside.rotation.y = PI;
        phone = new THREE.Object3D();
        phone.add(phoneInside);
        objectsScene.add(phone);

        let material_phone_phys_mesh = new THREE.MeshStandardMaterial( {
            color: 0x000000
        });
        let geometry_phone_phys_mesh = new THREE.BoxGeometry( 1,1,1 );
        phone_phys_mesh = new THREE.Mesh( geometry_phone_phys_mesh, material_phone_phys_mesh );
        //objectsScene.add(phone_phys_mesh);
    }

    //Physics

    function phoneVibrate() {
        if ("vibrate" in navigator) {
            navigator.vibrate([1000, 750, 1000]);
        }
    }

    function setupPhysics() {
        if(!world){
            world = new OIMO.World({
                timestep: 1/80,
                iterations: 6,
                info:false,
                worldscale:100,
                gravity: [0.3,2,0]
            } );
        }
        dropBubbleScene = false;
        clearInterativeMesh();
        world.clear();
        initInteractiveBodies();
        
    }

    function exitPhysics() {
        clearInterativeMesh();
        clearDropBubbles();
        if(world)
            world.clear();
    }

    function clearInterativeMesh() {
        let i = meshs.length;
        while ( i-- )
            objectsScene.remove(meshs[ i ]);
        meshs = [];
        bodys = [];
    }

    //********************************************************
    //********           Enter / Exit / Reset         ********
    //********************************************************
    function enter() {
        let enterTime = new Date().getTime(),
            loadProgressToken;

        enterTimeline.restart();

        loadProgressToken = SSG.PubSub.subscribe(SSG.messages.APP.LOAD_PROGRESS, (msg, data) => {
            if (data.bundles === 'waterResistant') {
                navPills.fillActivePill(data.percentage * 100);
            }
        });

        SSG.assets.load(['waterResistant']).then(() => {
            let enterDelta = new Date().getTime() - enterTime;

            SSG.PubSub.unsubscribe(loadProgressToken);
            console.debug('[ waterResistant ] ***%c enter()', 'font-weight: bold; color: #0A0;');

            if (firstRun) {
                firstRun = false;
                //background scene
                setupBackground(backgroundScene);
                setupCausticShader(objectsScene);
                //phone
                setupPhone(objectsScene);
                setupImages();
                //time line animations
                setupTimelines();
                drawPhoneScreen(true);

                SSG.assets.disposeBundle('waterResistant');
                SSG.assets.disposeBundle('phoneAssets');
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
                phoneController.setPhone(phone, true);
                container.appendChild( renderer.domElement );
                var element = document.getElementById('renderer');
                element.style.opacity = "1";
                preRender = true;
                //disable stage renderer
                //stage.renderFn = undefined;
                //set clock screen
                drawPhoneScreen(true);
                resetScene();
                setTimeout(() => {
                    preRender = false;
                }, 1000);

                disableBrowserZoomH();
                enterTimeline.play('post-intro');
                gradienceMovement.restart();

                //physics for interaction
                if(bubbleEnabled===true)
                    setupPhysics();
            }, enterDelta);
        });
    }

    function exit(msg, nextFeature) {
        console.debug('[ waterResistant ] ***%c exit()', 'font-weight: bold; color: #A00;');
        console.log('---> nextFeature', nextFeature);

        phoneController.disable();
        enableBrowserZoomH();
        gradienceMovement.stop();
        if(bubbleEnabled===true)
            exitPhysics();
        killAnimation();


        // SSG.PubSub.unsubscribe(handleOrientation);

        var element = document.getElementById('renderer');
        var stageel = document.getElementById('stage');
        stageel.appendChild(element);

        enterTimeline.stop();

        // use exitTimeline to setup a tween for the exit anim
        exitTimeline = new TimelineLite({
            onComplete: function() {
                stage.renderFn = undefined;
                exitTimeline.kill();
                exitTimeline = undefined;
                stage.setRenderFn(null);
                SSG.PubSub.publish(SSG.messages.SEQUENCE.EXIT_ANIMATION_COMPLETE);
            }
        });


        exitTimeline.to(waterResistantContainer, 0.5, { ease: Sine.easeInOut, autoAlpha: 0 });
        exitTimeline.add(stage.hide(), 0);

        // exitTimeline.restart();
    }

    function resetScene() {
        uniforms_caustic.u_time.value = 1.0;
        stage.renderFn = animate;
        resetBackground(backgroundScene);
        dropBubbleScene = true;
        controlEnabled = false;
        if(dirtEnabled===true)
            initDirt();
    }

    function killAnimation() {
        TweenLite.killTweensOf(plane_bg);
        TweenLite.killTweensOf(plane_bg_pos);
        let i = dirts.length;
        while ( i-- ) {
            objectsScene.remove(dirts[ i ]);
            TweenLite.killTweensOf(dirts[ i ]);
        }
    }


    //********************************************************
    //********          Renders & Animation           ********
    //********************************************************


    let speed1, speed2, delta;

    function animate() {
        //phone update
        if(!preRender){
            uniforms_caustic.u_time.value += 0.05;
            speed1 = cos(uniforms_caustic.u_time.value*0.5)/pow(uniforms_caustic.u_time.value,1.7)*0.5;
            speed2 = cos(uniforms_caustic.u_time.value/6)/pow(uniforms_caustic.u_time.value,1.5)*0.5;

            if (controlEnabled===false) {
                phone.rotation.z = speed1*2;
                phone.rotation.y = speed1*2;
                phone.rotation.x = -speed2*0.5;
            }
            phone.position.y = speed2*1400;
            if(bubbleEnabled===true)
                updatePhysics();
            drawPhoneScreen();
        }
        render();
    }

    function render() {
        renderer.render( objectsScene, camera);
        if (phoneController && controlEnabled) {
          phoneController.update();
        }
    }

    let resetBubble;
    let mesh, body;
    let finishDrop;
    function updatePhysics() {
        if (!world) {
            return;
        }
        // update world
        world.step();

        phone_phys_body.setPosition(phone.position);
        phone_phys_body.setQuaternion(phone.quaternion);
        phone_phys_mesh.position.copy(phone.position);
        phone_phys_mesh.quaternion.copy(phone.quaternion);

        resetBubble = true;
        let i = bodys.length;
        while (i-- ) {
            body = bodys[i];
            mesh = meshs[i];
            if (!body.sleeping) {
                mesh.position.copy(body.getPosition());
                mesh.quaternion.copy(body.getQuaternion());
            }
            if (mesh.position.y < height*0.5 && mesh.position.x < width*0.5) {
                resetBubble = false;
            }
        }
        if (resetBubble === true) {
            clearInterativeMesh();
            initBubbles();
        }

        if (dropBubbleScene===true) {
            if (phone.position.y < height*0.7) {
                initDropBubbles();
            }
            finishDrop = false;
            let i = bodys_drop.length;
            while (i-- ) {
                body = bodys_drop[i];
                mesh = meshs_drop[i];
                if (!body.sleeping) {
                    mesh.position.copy(body.getPosition());
                    mesh.quaternion.copy(body.getQuaternion());
                }
                if (i == number_drop-1 && mesh.position.y>height*0.5) {
                    finishDrop = true;
                }
            }
            if (finishDrop === true) {
                clearDropBubbles();
                controlEnabled = true;
            }
        }
    }

    function clearDropBubbles() {
        let i = meshs_drop.length;
        while ( i-- )
            objectsScene.remove(meshs_drop[ i ]);
        meshs_drop = [];
        bodys_drop = [];
        dropBubbleScene = false;
    }


    //********************************************************
    //********          Bubbles and Light             ********
    //********************************************************

    function initInteractiveBodies() {
        phone_phys_body = world.add({
            type:'box',
            size:[phone_width, phone_height, phone_depth*2],
            pos:[phone.position.x,phone.position.y,phone.position.z],
            move:true,
            density: 1000,
            friction: 0.2,
            restitution: 0.001,
            world:world
        });

        dropBubbleScene = true;

        let geometry_bubble = new THREE.SphereGeometry( 2, 5, 5 );
        let material_bubble = new THREE.MeshStandardMaterial( {
            opacity: 0.2,
            premultipliedAlpha: true,
            color: 0xffffff,
            transparent: true
        } );
        bubble_basic = new THREE.Mesh( geometry_bubble, material_bubble );
        initBubbles();
    }

    function initBubbles() {
        let k = [-11,11,20];
        let xStart = round(random() * width * 0.7 - width * 0.5);
        let yStart = - height * 0.5 - random() * 300;
        let zStart = k[round(random() * 2)];
        let number = round(15 + random() * 10);
        let bubbleScale = random() + 0.5;

        for ( let i = 0; i < number; i ++ ) {
            meshs[i] = bubble_basic.clone();
            meshs[i].position.x = xStart + random()*30;
            meshs[i].position.y = yStart - random()*150;
            meshs[i].position.z = zStart + random()*5;
            bubbleScale = random() + 0.5;
            meshs[i].scale.x = meshs[i].scale.y = meshs[i].scale.z = bubbleScale;
            objectsScene.add( meshs[i] );
            bodys[i] = world.add({
                type:'sphere',
                size:[5],
                pos:[meshs[i].position.x,meshs[i].position.y,meshs[i].position.z],
                move:true,
                density: 1000,
                friction: 0.2,
                restitution: 0.2,
                world:world
            });
        }
    }

    function initDropBubbles() {
        if (meshs_drop.length >= number_drop)
            return;
        let k = [55,65];
        let m = [0.1, 0.3, 0.8];
        let j = meshs_drop.length;
        let bubbleScale = random() + 0.5;
        for (let i=j; i<j+10; i++) {
            meshs_drop[i] = bubble_basic.clone();
            meshs_drop[i].position.x = phone.position.x - phone_width*0.5 + phone_width*m[round(random()*2)] + random()*30;
            meshs_drop[i].position.y = phone.position.y - phone_height*0.5 - round(random()*70);
            meshs_drop[i].position.z = k[round(random()*1)];
            bubbleScale = random() + 0.5;
            meshs_drop[i].scale.x = meshs_drop[i].scale.y = meshs_drop[i].scale.z = bubbleScale;
            objectsScene.add( meshs_drop[i] );
            bodys_drop[i] = world.add({
                type:'box',
                size:[5,5,5],
                pos:[meshs_drop[i].position.x,meshs_drop[i].position.y,meshs_drop[i].position.z],
                move:true,
                density: 100,
                friction: 0.2,
                restitution: 0.001,
                world:world
            });
        }
    }

    function setupLight(objectsScene) {
        ambientLight =  new THREE.AmbientLight( 0x404040 );
        objectsScene.add(ambientLight);

        pointLight = new THREE.PointLight( 0x99c4c6, 10, 1500 );
        pointLight.position.set( -100, 1000, 100 );
        objectsScene.add( pointLight );

        //high experience
        spotLight = new THREE.SpotLight( 0x999999, 2);
        spotLight.position.set( 300, -500, -10 );
        spotLight.angle = PI / 3;
        spotLight.penumbra = 1.9;
        objectsScene.add( spotLight );
    }

    function initDirt() {
        dirts = [];

        let geometry_dirt = new THREE.SphereGeometry( 2, 5, 5 );
        let material_dirt = new THREE.MeshStandardMaterial( {
            opacity: 1.0,
            premultipliedAlpha: true,
            color: 0xffffff,
            transparent: false
        });

        for ( let i = 0; i < 30; i++ ) {
            dirts[i] = new THREE.Mesh( geometry_dirt, material_dirt );
            initSphereParticle_dirt( dirts[i], round(random()*5));
            objectsScene.add( dirts[i]);
        }
    }

    function initSphereParticle_dirt( particleInput, delay = 0) {
        let particle = this instanceof THREE.Mesh ? this : particleInput;
        let xStart = -1000 + random()*800;
        let yStart = random() * 800 - 600; //800
        let k = [-20,-5,5];
        let zStart = k[round(random()*2)] * 10;
        particle.position.set(
            xStart,
            yStart,
            zStart );
        particle.scale.x = particle.scale.y = random()*0.5;
        TweenLite.to(particle.position, 10, {
            delay,
            x: 800 + random() * 100,
            y: random() * 500 + 300,
            z: zStart,
            onComplete: initSphereParticle_dirt,
            onCompleteParams: [particle],
        });
    }

    // -----------------------------------------------------------------------------
    return {
        init,
        entryStatus: {
            position: {
                x: 0,
                y: 15,
                z: -15
            },
            rotation: {
                x: 0,
                y: THREE.Math.degToRad(360),
                z: 0
            },
            duration: 1
        }
    };
})();


SSG.PubSub.subscribe(SSG.messages.APP.INIT, waterResistant.init);

export default waterResistant;
