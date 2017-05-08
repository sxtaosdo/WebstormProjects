// polyfill for promises
require('es6-promise').polyfill();
window.Clipboard = require('clipboard');

// Feature Detection
// --------------------------------------------------------------------

export const isDeviceOrientationSupported = !!(window.DeviceOrientationEvent);

export const isDeviceMotionSupported = (window.hasOwnProperty('ondevicemotion'));

// taken from https://github.com/mrdoob/three.js/blob/master/examples/js/Detector.js
export const isWebglSupported = ( function () {
    try {
        var canvas = document.createElement( 'canvas' );
        return !! ( window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) );

    } catch (e) {
        return false;
    }
} )();

export const isClipboardSupported = window.Clipboard.isSupported();

export function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Math
// --------------------------------------------------------------------

const random = Math.random;
const floor = Math.floor;
const atan2 = Math.atan2;
const PI = Math.PI;
const degreesPI = (180 / PI);

/**
 * Maps a given number from an input range to it's equivalent in an output range.
 * ex:
 *   map(0.75, 0, 1, 0, 100) => 75
 *   map(50, 0, 100, -50, 50) => 0
 *   map(0.5, 0, 1, -50, 50) => 0
 */
export function map(value, imin, imax, omin, omax) {
    return omin + (omax - omin) * ((value - imin) / (imax - imin));
}
export function randomBetween(min, max, precision) {
    const output = min + (random() * (max - min));
    return ( precision !== undefined ? (output.toFixed(precision)/1) : output );
}

export function floorRandomBetween(min, max) {
    return floor( randomBetween(min, max) );
}

export function degreesBetween(p1, p2) {
  return ( atan2(p2.y - p1.y, p2.x - p1.x) * degreesPI );
}

export function limit(value, min, max) {
  if ( value <= min ) {
      return min;
  }

  if ( value >= max ) {
      return max;
  }

  return value;
}

export function injectOpacity(rgba, opacity) {
    return rgba.slice(0, -2).concat(opacity + ')');
}

// DOM
// --------------------------------------------------------------------

export function addEventListenerToNodeList(nodeList, event, handler) {
    for (var i = 0, len = nodeList.length; i < len; i++) {
        nodeList[i].addEventListener(event, handler, false);
    }
}

// Note:: these functions are "dumb", they just determine which side is longer
export function isPortrait() {
    return (window.innerHeight > window.innerWidth);
}

export function isLandscape() {
    return !isPortrait();
}


// look CSS stylesheets for keyframe runle
function findKeyframesRule(rule) {
    // gather all stylesheets into an array
    let stylesheets = document.styleSheets;

    // loop through the stylesheets
    for (let i = 0; i < stylesheets.length; ++i) {

        // loop through all the rules
        for (let j = 0; j < stylesheets[i].cssRules.length; ++j) {
            // find the -webkit-keyframe rule whose name matches our passed over parameter and return that rule
            if (stylesheets[i].cssRules[j].type == (CSSRule.WEBKIT_KEYFRAMES_RULE || CSSRule.KEYFRAMES_RULE) && stylesheets[i].cssRules[j].name == rule)
                return stylesheets[i].cssRules[j];
        }
    }

    // rule not found
    return null;
}

// shooting star generator
class ShootingStar {
    constructor(domEl, config) {
        this.el = document.createElement('div');
        this.el.classList.add('shooting-star');

        this.animateConfig = Object.assign(
            {
                keyframeId: 'star1',
                duration: 1,
                startX: 0,
                startY: 0,
                scale: 1,
                delay: 0,
                endX: 0,
                endY: 0
            },
            config
        );

        this.keyframe = findKeyframesRule(this.animateConfig.keyframeId);

        domEl.appendChild(this.el);
    }

    animate(params) {
        this.el.style.animationName = this.el.style.webkitAnimationName =  'none';

        setTimeout(() => {
            let values = Object.assign(
                this.animateConfig,
                params
            );

            let rule, distX, distY,
                angle = degreesBetween({x: values.startX, y: values.startY}, {x: values.endX, y: values.endY}) + 'deg';

            this.keyframe.deleteRule('0%');
            this.keyframe.deleteRule('50%');
            this.keyframe.deleteRule('90%');
            this.keyframe.deleteRule('100%');

            rule = 'translate(' + values.startX + 'px, ' + values.startY + 'px) scale(0) rotateZ(' + angle +');';
            if (this.keyframe.appendRule) {
                this.keyframe.appendRule('0% { -webkit-transform: ' + rule + ' transform: ' + rule + ' opacity: 0;}');
            } else {
                this.keyframe.insertRule('0% { -webkit-transform: ' + rule + ' transform: ' + rule + ' opacity: 0;}');
            }

            distX = values.startX + (values.endX - values.startX) * 0.5;
            distY = values.startY + (values.endY - values.startY) * 0.5;

            rule = 'translate(' + distX + 'px, ' + distY + 'px) scale(' + values.scale + ') rotateZ(' + angle +');';
            if (this.keyframe.appendRule) {
                this.keyframe.appendRule('50% { -webkit-transform: ' + rule + ' transform: ' + rule + ' opacity: 1;}');
            } else {
                this.keyframe.insertRule('50% { -webkit-transform: ' + rule + ' transform: ' + rule + ' opacity: 1;}');
            }

            distX = values.startX + (values.endX - values.startX) * 0.9;
            distY = values.startY + (values.endY - values.startY) * 0.9;
            rule = 'translate(' + distX + 'px, ' + distY + 'px) scale(' + values.scale + ') rotateZ(' + angle +');';
            if (this.keyframe.appendRule) {
                this.keyframe.appendRule('90% { -webkit-transform: ' + rule + ' transform: ' + rule + ' opacity: 1;}');
            } else {
                this.keyframe.insertRule('90% { -webkit-transform: ' + rule + ' transform: ' + rule + ' opacity: 1;}');
            }

            rule = 'translate(' + values.endX + 'px, ' + values.endY + 'px) scale(' + values.scale + ') rotateZ(' + angle +');';
            if (this.keyframe.appendRule) {
                this.keyframe.appendRule('100% { -webkit-transform: ' + rule + ' transform: ' + rule + ' opacity: 0;}');
            } else {
                this.keyframe.insertRule('100% { -webkit-transform: ' + rule + ' transform: ' + rule + ' opacity: 0;}');
            }

            this.el.style.animationDuration = this.el.style.webkitAnimationDuration = values.duration + 's';
            this.el.style.animationDelay = this.el.style.webkitAnimationDelay = values.delay + 's';
            this.el.style.animationName = this.el.style.webkitAnimationName = this.animateConfig.keyframeId;
        }, 0);
    }
}

export {ShootingStar};

// helper function to properly dispose THREE.js OBJs from memory
// http://stackoverflow.com/questions/31087551/load-obj-and-mtl-file-by-three-js-objmtlloader-js-causes-memory-leak-after-multi
// usage disposeAll(obj, disposeNode)
export function disposeAll(node, fn) {
    let i, child;

    for (i = node.children.length - 1; i >= 0; i--) {
        child = node.children[i];

        disposeAll(child, fn);
        fn(child);
    }
}

export function disposeNode(node) {
    if (node instanceof THREE.Camera) {
        node = undefined;

    } else if (node instanceof THREE.Light) {
        node = undefined;

    } else if (node instanceof THREE.Mesh) {
        if (node.geometry) {
            node.geometry.dispose();
            node.geometry = undefined;
        }

        if (node.material) {
            if (node.material instanceof THREE.MeshFaceMaterial) {
                node.material.materials.forEach(function(mtrl) {
                    if (mtrl.map)           mtrl.map.dispose();
                    if (mtrl.lightMap)      mtrl.lightMap.dispose();
                    if (mtrl.bumpMap)       mtrl.bumpMap.dispose();
                    if (mtrl.normalMap)     mtrl.normalMap.dispose();
                    if (mtrl.specularMap)   mtrl.specularMap.dispose();
                    if (mtrl.envMap)        mtrl.envMap.dispose();

                    mtrl.dispose ();    // disposes any programs associated with the material
                    mtrl = undefined;
                });

            } else {
                if (node.material.map)          node.material.map.dispose ();
                if (node.material.lightMap)     node.material.lightMap.dispose ();
                if (node.material.bumpMap)      node.material.bumpMap.dispose ();
                if (node.material.normalMap)    node.material.normalMap.dispose ();
                if (node.material.specularMap)  node.material.specularMap.dispose ();
                if (node.material.envMap)       node.material.envMap.dispose ();

                node.material.dispose ();   // disposes any programs associated with the material
                node.material = undefined;
            }
        }

        node = undefined;

    } else if (node instanceof THREE.Object3D) {
        node = undefined;
    }
}
