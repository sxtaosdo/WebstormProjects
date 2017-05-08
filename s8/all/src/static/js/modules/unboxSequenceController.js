import stage from './stage/3dstage';
import unboxSequence from './unboxSequence';

const IDLE_TIME = 2000;

const TOUCH_MOVE = 'touchMove';
const TOUCH_ZOOM = 'touchZoom';
const ROTATION_MIN_SPEED = 0.5;
const ROTATION_MAX_SPEED = 0.7;
const ROTATION_SPEED = 0.02;
const MIN_ZOOM_DISTANCE = -20;
const MAX_ZOOM_DISTANCE = 30;
const ZOOM_SPEED = 0.0025;
const ZOOM_STEP = 0.1;

let animationTimeline;

let shakeToken;

let touchInteraction,
    deltaX,
    deltaY,
    prevX,
    prevY,
    initX,
    initY,
    rotationMultiplier = ROTATION_MAX_SPEED;

// helper objects to detect obj and camera collision
let collisionBox,
    phoneBox,
    planeBox,
    collisionPlane;

let resetTimeline,
    resetting = false,
    isReseted = true,
    resetTimeout;
    // shakePlayed = false;
    // interactionStarted = false;

let raycaster = new THREE.Raycaster(),
    pinchCenterPosition,
    currentPinchLength,
    previousPinchLength,
    intersect,
    initCameraPosition;

function shakePhoneAnimation() {
    let phoneObj = stage.getPhoneObj(),
        animationIterations = 0;

    // animationTimeline = new TimelineLite({
    //     onComplete: function() {
    //         animationIterations++;

    //         if (animationIterations < 3) {
    //             this.restart();

    //         } else {
    //             shakePlayed = true;
    //             animationTimeline.kill();
    //             SSG.PubSub.publish(SSG.messages.SEQUENCE.UNBOX.SHAKE_DONE);
    //             SSG.PubSub.publish(SSG.messages.APP.SHOW_NEXT_BUTTON);

    //             bindInteractionEvents();
    //         }
    //     }
    // });

    // animationTimeline.to(phoneObj.position, 0.1, {y: 1});
    // animationTimeline.to(phoneObj.rotation, 0.1, {z: -0.5}, '-=0.1');
    // animationTimeline.to(phoneObj.position, 0.1, {y: 0});
    // animationTimeline.to(phoneObj.rotation, 0.1, {z: 0.5}, '-=0.1');
    // animationTimeline.to(phoneObj.position, 0.1, {y: 1}, '-=0.1');
    // animationTimeline.to(phoneObj.rotation, 0.1, {z: 0});
    // animationTimeline.to(phoneObj.position, 0.1, {y: 0}, '-=0.1');

    // unboxSequence.playShake();

    // SSG.PubSub.unsubscribe(SSG.messages.DEVICE.SHAKE, shakePhoneAnimation);
}

function bindInteractionEvents() {
    let stageEl = stage.getEl();

    window.addEventListener('deviceorientation', handleOrientation, false);
    stageEl.addEventListener( 'touchstart', handleTouchStart, false );
    stageEl.addEventListener( 'touchmove', handleMove, false );
    stageEl.addEventListener( 'touchend', handleTouchEnd, false );
}

function handleOrientation(event) {
    SSG.PubSub.publish(SSG.messages.DEVICE.ORIENTATION, event);
}

function resetPhone(msg, time) {
    resetTimeout = setTimeout(() =>  {
        if (resetting || isReseted) {
            return;
        }

        resetting = true;

        SSG.PubSub.unsubscribe(shakeToken);

        resetTimeline = new TimelineLite({
            onComplete: function() {
                let cameraPos = stage.getCamera().position;

                // rotationMultiplier = cameraPos.z > -MIN_ZOOM_DISTANCE ? 1 : (1 - ((cameraPos.z - initCameraPosition.z) / cameraPos.z)) * 0.2;
                rotationMultiplier = ROTATION_MAX_SPEED;
                resetTimeline.kill();
                resetTimeline = null;

                resetting = false;
                isReseted = true;

                collisionPlane.position.z = -MIN_ZOOM_DISTANCE * 0.5;
                planeBox.setFromObject(collisionPlane);

                SSG.PubSub.publish(SSG.messages.SEQUENCE.UNBOX.INTERACTION_ENDED);
            }
        });
        resetTimeline.to(stage.getPhoneObj().rotation, 0.75, {x: 0, y: 0, z: 0, ease: Sine.easeOut});
        resetTimeline.to(phoneBox.rotation, 0.75, {x: 0, y: 0, z: 0, ease: Sine.easeOut}, 0);
        resetTimeline.to(stage.getCamera().position, 0.9, {x: 0, y:0, z: 0, ease: Sine.easeOut}, 0);
        resetTimeline.to(document.getElementById('unbox'), 0.9, {left: 0, top: 0, ease: Sine.easeOut}, 0);
    }, time || 500);
}

function handleTouchStart(event) {
    let targetTouches = event.targetTouches,
        cameraPos = stage.getCamera().position;

    event.preventDefault();

    if (!targetTouches || !targetTouches.length) {
        return;
    }

    isReseted = false;

    clearTimeout(resetTimeout);

    if (resetTimeline && resetTimeline.isActive()) {
        return;
        // resetTimeline.kill();
        // resetTimeline = null;
    }

    shakeToken = SSG.PubSub.subscribe(SSG.messages.DEVICE.SHAKE, resetPhone);

    // if (!interactionStarted) {
        // interactionStarted = true;
        SSG.PubSub.publish(SSG.messages.SEQUENCE.UNBOX.INTERACTION_STARTED);
    // }

    if (targetTouches.length === 1) {
        touchInteraction = TOUCH_MOVE;

        prevX = event.targetTouches[0].clientX;
        prevY = event.targetTouches[0].clientY;
        initX = prevX;
        initY = prevY;

    } else if (targetTouches.length === 2) {
        previousPinchLength = getPinchLength(targetTouches);
        initCameraPosition = stage.getCamera().position.clone();
        touchInteraction = TOUCH_ZOOM;

        // get center of pinching
        setCenterPosition(targetTouches);

        raycaster.setFromCamera(normalizePoint(pinchCenterPosition), stage.getCamera());
        intersect = raycaster.intersectObject(stage.getPhoneObj(), true);

        if (!intersect.length) {
            raycaster.setFromCamera(
                normalizePoint({
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                }),
                stage.getCamera()
            );
            intersect = raycaster.intersectObject(stage.getPhoneObj(), true);
        }

        event.preventDefault();
    }

}

function handleMove(event) {
    let targetTouches = event.targetTouches,
        allowRotation = true,
        phoneObj,
        objQuaternion,
        prevRotation,
        zoomDestination,
        zoomMultiplier;
        // threshold;

    event.preventDefault();

    if (!targetTouches || !targetTouches.length) {
        return;
    }

    phoneObj = stage.getPhoneObj();

    if (touchInteraction === TOUCH_MOVE) {
        // threshold = 360 * rotationMultiplier;

        deltaX = (targetTouches[0].clientX - prevX) * rotationMultiplier;
        deltaY = (targetTouches[0].clientY - prevY) * rotationMultiplier;

        prevRotation = phoneObj.rotation.clone();

        objQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                THREE.Math.degToRad(-deltaY),
                THREE.Math.degToRad(deltaX),
                0,
                'XYZ'
            ));

        phoneObj.quaternion.multiplyQuaternions(objQuaternion, phoneObj.quaternion);

        phoneBox.quaternion.multiplyQuaternions(objQuaternion, phoneObj.quaternion);

        collisionBox.setFromObject(phoneBox);

        // check if there's any collision
        if (collisionBox.intersectsBox(planeBox)) {
            phoneObj.rotation.x = prevRotation.x;
            phoneObj.rotation.y = prevRotation.y;
            phoneObj.rotation.z = prevRotation.z;

            phoneBox.rotation.x = prevRotation.x;
            phoneBox.rotation.y = prevRotation.y;
            phoneBox.rotation.z = prevRotation.z;
        }
        prevX = targetTouches[0].clientX;
        prevY = targetTouches[0].clientY;




    } else if (touchInteraction === TOUCH_ZOOM) {
        currentPinchLength = getPinchLength(targetTouches);

        if (currentPinchLength < previousPinchLength) {
            zoomMultiplier = -1;
            zoomDestination = {
                point: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            };
            zoomTo(zoomDestination, zoomMultiplier);
        } else {

            if (intersect.length) {
                zoomMultiplier = 1;
                zoomDestination = intersect[0];

                zoomTo(zoomDestination, zoomMultiplier);
            }
        }
    }
}

function handleTouchEnd(event) {
    let targetTouches = event.targetTouches;

    event.preventDefault();

    if (!targetTouches || !targetTouches.length) {
        touchInteraction = '';

        if (!isReseted) {
            resetPhone(null, IDLE_TIME);
        }

        pinchCenterPosition = null;

    } else if (targetTouches.length === 1) {
        rotationMultiplier = ROTATION_MAX_SPEED - stage.getCamera().position.z * ROTATION_SPEED;

        if (rotationMultiplier < ROTATION_MIN_SPEED) {
          rotationMultiplier = ROTATION_MIN_SPEED;
        }
        touchInteraction = TOUCH_MOVE;

        prevX = targetTouches[0].clientX;
        prevY = targetTouches[0].clientY;

        initX = prevX;
        initY = prevY;

        pinchCenterPosition = null;
    }
}

function setCenterPosition(touches) {
    let touch1 = touches[0],
        touch2 = touches[1];

    pinchCenterPosition = new THREE.Vector2();
    pinchCenterPosition.x = (touch1.clientX + touch2.clientX) / 2;
    pinchCenterPosition.y = (touch1.clientY + touch2.clientY) / 2;
}

function normalizePoint(point) {
    return {
        x: (point.x / window.innerWidth) * 2 - 1,
        y: - (point.y / window.innerHeight) * 2 + 1
    };
}

function getPinchLength(touches) {
    let touch1 = touches[0],
        touch2 = touches[1];


    return Math.sqrt((touch1.clientX - touch2.clientX) * (touch1.clientX - touch2.clientX) + (touch1.clientY - touch2.clientY) * (touch1.clientY - touch2.clientY));
}

function zoomTo(intersection, multiplier) {
    let cameraPos = stage.getCamera().position,
        point = intersection.point,
        speedMultiplier,// = multiplier === 1 ? cameraPos.z / point.z : (intersection.distance - MIN_ZOOM_DISTANCE + cameraPos.z) / (intersection.distance - MIN_ZOOM_DISTANCE),
        // scaleMultiplier,
        scaleMultiplier,// = Math.abs((currentPinchLength - previousPinchLength) * (ZOOM_SPEED + (ZOOM_SPEED * speedMultiplier))),
        prevPosition,
        dx,
        dy,
        dz;

    if (multiplier === 1) {
        speedMultiplier = cameraPos.z / point.z;

        dx = point.x - initCameraPosition.x;
        dy = point.y - initCameraPosition.y;
        dz = point.z + MIN_ZOOM_DISTANCE - initCameraPosition.z;

    } else {
        if (cameraPos.z === 0) {
            return;
        }

        if (initCameraPosition.z - cameraPos.z > 0) {
            speedMultiplier = 0;
        } else {
            speedMultiplier = (initCameraPosition.z - cameraPos.z) / initCameraPosition.z;
        }

        dx = initCameraPosition.x;
        dy = initCameraPosition.y;
        dz = initCameraPosition.z;
    }

    scaleMultiplier = Math.abs((currentPinchLength - previousPinchLength) * (ZOOM_SPEED + (ZOOM_SPEED * speedMultiplier)));

    if (scaleMultiplier > 1) {
        scaleMultiplier = 1;
    }

    prevPosition = cameraPos.clone();

    cameraPos.x = initCameraPosition.x + (dx * scaleMultiplier * multiplier);
    cameraPos.y = initCameraPosition.y + (dy * scaleMultiplier * multiplier);
    cameraPos.z = initCameraPosition.z + (dz * scaleMultiplier * multiplier);

    collisionPlane.position.z = cameraPos.z - MIN_ZOOM_DISTANCE * 0.5;
    planeBox.setFromObject(collisionPlane);

    if (collisionBox.intersectsBox(planeBox)) {
        cameraPos.x = prevPosition.x;
        cameraPos.y = prevPosition.y;
        cameraPos.z = prevPosition.z;

        collisionPlane.position.z = cameraPos.z - MIN_ZOOM_DISTANCE * 0.5;
        planeBox.setFromObject(collisionPlane);
    }

    rotationMultiplier = ROTATION_MAX_SPEED + cameraPos.z * ROTATION_SPEED;

    if (rotationMultiplier < ROTATION_MIN_SPEED) {
      rotationMultiplier = ROTATION_MIN_SPEED;
    }
}

const controller = {
	init: function() {
        let phonePos = stage.getPhoneObj().position;

        deltaX = 0;
        deltaY = 0;
        prevX = 0;
        prevY = 0;
        initX = 0;
        initY = 0;

        isReseted = true;
        resetting = false;

        // create bounding box and intersection plane
        // maybe create / destroy on enter / exit?
        if (!collisionBox) {
            collisionBox = new THREE.Box3();
            collisionBox.setFromObject(stage.getPhoneObj());

            collisionPlane = new THREE.Mesh(
                new THREE.PlaneGeometry(1000, 1000),
                new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    transparent: true,
                    opacity: 0,
                    depthWrite: false
                })
            );
            collisionPlane.rotation.z = THREE.Math.degToRad(90);

            planeBox = new THREE.Box3();
            planeBox.setFromObject(collisionPlane);

            phoneBox = new THREE.Mesh(
                new THREE.BoxGeometry(collisionBox.max.x - collisionBox.min.x, collisionBox.max.y - collisionBox.min.y, collisionBox.max.z - collisionBox.min.z),
                new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    opacity: 1,
                    depthWrite: false
                })
            );
            phoneBox.visible = false;
        }

        stage.getScene().add(collisionPlane);
        collisionPlane.position.z = -MIN_ZOOM_DISTANCE * 0.5;
        stage.getScene().add(phoneBox);
        phoneBox.position.x = phonePos.x;
        phoneBox.position.y = phonePos.y;
        phoneBox.position.z = phonePos.z;

        bindInteractionEvents();

        // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', 'unbox controller init');
	},

	stop: function() {
        let scene = stage.getScene(),
            stageEl = stage.getEl();

        // stage.getPhoneObj().remove(phoneBox);

        // scene.remove(collisionBox);
        scene.remove(collisionPlane);
        scene.remove(phoneBox);

        clearTimeout(resetTimeout);

        isReseted = true;
        resetting = false;

        stageEl.removeEventListener( 'touchmove', handleMove );
        stageEl.removeEventListener( 'touchstart', handleTouchStart );
        stageEl.removeEventListener( 'touchend', handleTouchEnd );
        window.removeEventListener('deviceorientation', handleOrientation);

        SSG.PubSub.unsubscribe(shakeToken);

        // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', 'unbox controller STOP');
	}
};


export default controller;
