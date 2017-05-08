SSG.phones = SSG.phones || {};

SSG.phones.phoneBreakAnim = function(fn) {
    let assets = SSG.assets.getBundle('phoneBreakAnim');

    new THREE.ObjectLoader()
        .load(assets['/assets/model/break_anim.json'], function(breakScene) {
            fn(breakScene);
        });
};
