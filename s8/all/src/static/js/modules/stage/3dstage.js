import {getUrlParameter} from '../../common/utils';

window.THREE = require('three');
require('../../lib/objloader');
require('../../modules/features/waterResistant/stats.min');

let stage = (function(window) {
    const transitionInit = {
        X: 0,
        Y: 0,
        Z: 1000
    };

    let _canvasEl,
    _phoneObj,
    _renderer,
    _scene,
    _pointLight,
    _camera,
    _animationFrameId;


    let stats = { update: function() {} };

    if ( getUrlParameter('fps') ) {
        stats = new Stats();
        document.body.appendChild( stats.dom );
    }

    let _render = function() {
        //_renderer.clear();

        stats.update();
        if (stage.renderFn) {
            try {
                stage.renderFn(_renderer);
            } catch (e) {
                console.error(e);
            }
        } else if (_renderer) {
            _renderer.render(_scene, _camera);
        } else {
            console.warn('No renderer');
        }
    };

    TweenLite.ticker.addEventListener("tick", _render);

    function getEl() {
        return _canvasEl;
    }

    function handleResize() {
        _renderer.setSize(window.innerWidth, window.innerHeight);
        _camera.aspect = window.innerWidth / window.innerHeight;
        _camera.updateProjectionMatrix();
    }

    return {
        init: function() {
            // init phones
            SSG.phones.init();

            // perf detection
            stage.modelDetail = 'dreamPhone';

            _renderer = new THREE.WebGLRenderer({
                // antialias: true,
                alpha: true
            });
            window._renderer = _renderer;

            // adjust pixel ratio for perfomance?
            _renderer.setPixelRatio(window.devicePixelRatio);
            _renderer.shadowMap.enabled = true;

            _renderer.setSize(window.innerWidth, window.innerHeight);
            _renderer.setClearColor(0x000000, 0);

            //_renderer.autoClear = false;
            _renderer.domElement.id = 'renderer';

            _canvasEl = _renderer.domElement;
            document.getElementById('stage').appendChild(_canvasEl);

            _scene = new THREE.Scene();
            _camera = new THREE.PerspectiveCamera( 22, window.innerWidth / window.innerHeight, 0.1, 1000);
            _camera.rotation.y = Math.PI;

            // add lights
            let aLight_1 = new THREE.AmbientLight( 0x111111, 0.5 );
            _pointLight = new THREE.PointLight( 0xffffff, 0.2 );

            // window.dLight_1 = new THREE.DirectionalLight( 0xffffff, 1 );
            // window.dLight_2 = new THREE.DirectionalLight( 0xffffff, 1 );
            // window.dLight_3 = new THREE.DirectionalLight( 0xffffff, 0.3 );
            // window.dLight_4 = new THREE.DirectionalLight( 0xffffff, 0.3 );

            _pointLight.position.set( 40, 60, 0 ); //key top

            // window.dLight_1.position.set( 1, 0, -.2 ).normalize(); //side rim
            // window.dLight_2.position.set( -1, 0, -.2 ).normalize(); //side rim
            // window.dLight_3.position.set( 0, .1, 0 ).normalize(); //fill top
            // window.dLight_4.position.set( 0, -.1, 0 ).normalize(); //fill low

            // _scene.add( aLight_1 );
            // _scene.add( _pointLight );
            // _scene.add( dLight_1 );
            // _scene.add( dLight_2 );
            // _scene.add( dLight_3 );
            // _scene.add( dLight_4 );

            // add phone to scene
            // TODO swap phone logic
            SSG.phones[stage.modelDetail](function(obj) {
                _phoneObj = obj;
                _scene.add(_phoneObj);

                _phoneObj.position.x = 0;
                _phoneObj.position.y = 0;
                _phoneObj.position.z = 50;
                // _phoneObj.rotation.y = Math.PI;
            });

            _render();

            SSG.PubSub.subscribe(SSG.messages.DEVICE.RESIZE, handleResize);
        },

        setRenderFn: function(fn) {
            this.renderFn = fn;

            // if (!_animationFrameId) {
            //     _render();
            // }
        },

        renderScene: function() {
            // _renderer.render( _scene, _camera);
        },

        getCamera : function() {
            return _camera;
        },

        getScene: function() {
            return _scene;
        },

        getPhoneObj: function() {
            return _phoneObj;
        },

        getEl,

        getRenderer: function() {
            return _renderer;
        },

        getLight: function() {
            return _pointLight;
        },
        disablePhoneScreen: function() {
            _phoneObj.disableScreen();
            window.phone = _phoneObj;
        },
        show: function() {
            return TweenLite.to(getEl(), 0.5, { autoAlpha: 1 });
        },
        hide: function() {
            return TweenLite.to(getEl(), 0.5, { autoAlpha: 0 });
        }
    };
})(window);

SSG.PubSub.subscribe(SSG.messages.APP.INITIAL_LOAD_COMPLETE, stage.init);

export default stage;
