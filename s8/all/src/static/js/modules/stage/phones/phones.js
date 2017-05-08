SSG.phones = SSG.phones || {};

SSG.phones.init = function() {
    let assets = SSG.assets.getBundle('phoneAssets');

    // load textures
    let mapGraphics = new THREE.TextureLoader()
        .load( assets['/assets/model/graphics_d512.png'] );

    let mapGraphicsAlpha = new THREE.TextureLoader()
        .load( assets['/assets/model/graphics_a512.png'] );

    // release graphics from memory
    SSG.assets.dispose('/assets/model/graphics_d512.png');
    SSG.assets.dispose('/assets/model/graphics_a512.png');

    // let mapScreen = new THREE.TextureLoader()
    //     .load( assets['/assets/images/stars.jpg'] );

    let mapCube = new THREE.CubeTextureLoader()
        .load([
            assets['/assets/model/env/pos-x.jpg'],
            assets['/assets/model/env/neg-x.jpg'],
            assets['/assets/model/env/pos-y.jpg'],
            assets['/assets/model/env/neg-y.jpg'],
            assets['/assets/model/env/pos-z.jpg'],
            assets['/assets/model/env/neg-z.jpg']
        ]);

    // Define Materials
    let mtl_transparent = new THREE.MeshLambertMaterial({
        color: 0x000000,
        opacity: 0
    });

    let mtl_glossyBlack = new THREE.MeshPhongMaterial({
        color: 0x010101,
        reflectivity: .7,
        combine: THREE.AddOperation,
        specular: 0xffffff,
        shininess: 10,
        envMap: mapCube
    });

    let mtl_matteGray = new THREE.MeshPhongMaterial({
        color: 0xebebeb,
        combine: THREE.AddOperation,
        reflectivity: .2,
        specular: 0xffffff,
        shininess: 4,
        envMap: mapCube
    });

    let mtl_silver = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        reflectivity: .7,
        specular: 0xffffff,
        combine: THREE.MixOperation,
        emissive: 0xffffff,
        envMap: mapCube
    });

    let mtl_gold = new THREE.MeshPhongMaterial({
        color: 0x775c0c,
        reflectivity: .9,
        specular: 0xffc619,
        emissive: 0x775c0c,
        reflectivity: .4,
        combine: THREE.MixOperation,
        envMap: mapCube
    });

    let mtl_graphics = new THREE.MeshBasicMaterial({
        map: mapGraphics,
        alphaMap: mapGraphicsAlpha,
        transparent: true
    });

    let mtl_glass = new THREE.MeshPhongMaterial({
        color: 0x000000,
        opacity: .2,
        reflectivity: 1,
        specular: 0xffffff,
        combine: THREE.MixOperation,
        transparent: true,
        envMap: mapCube,
        depthWrite: false
    });

    let mtl_screen = new THREE.MeshBasicMaterial({
        color: 0x000000,
        depthWrite: false
    });

    let mtl_metal = new THREE.MeshPhongMaterial({
        color: 0x353535,
        emissive: 0x505060,
        alphaMap: mapGraphicsAlpha,
        combine: THREE.AddOperation,
        reflectivity: .8,
        envMap: mapCube,
        transparent: true,
        depthWrite: false
    });

    let mtl_block = new THREE.MeshBasicMaterial({
        color: 0x000000
    });

    let mtl_grill = new THREE.MeshPhongMaterial({
        color: 0x333333,
        reflectivity: .3,
        // specular: 0xffffff,
        combine: THREE.MixOperation,
        map: mapGraphics,
        // emissive: 0xffffff,
        // emissiveMap: mapGraphics,
        envMap: mapCube
    });

    SSG.phones.dreamPhone = function(fn) {
        new THREE.OBJLoader()
            .load(assets['/assets/model/dream/dream.obj'], function(obj) {
                obj.children[0].material = mtl_glossyBlack;
                obj.children[1].material = mtl_glossyBlack;
                obj.children[2].material = mtl_matteGray;

                obj.children[3].material = mtl_matteGray;
                obj.children[4].material = mtl_gold;
                obj.children[5].material = mtl_silver;

                obj.children[6].material = mtl_glass; //front glass
                obj.children[7].material = mtl_glass;
                obj.children[8].material = mtl_glass;

                obj.children[9].material  = mtl_glossyBlack; // panels
                obj.children[10].material = mtl_glossyBlack; // panels

                obj.children[11].material = mtl_silver;
                obj.children[12].material = mtl_silver;
                obj.children[13].material = mtl_glossyBlack;
                obj.children[14].material = mtl_silver;
                obj.children[15].material = mtl_silver;

                obj.children[16].material = mtl_screen; //mtl_seeThrough;

                obj.children[17].material = mtl_grill; //grill

                obj.children[18].material = mtl_block;

                obj.children[19].material = mtl_graphics;
                obj.children[20].material = mtl_graphics;
                obj.children[21].material = mtl_glossyBlack;
                obj.children[22].material = mtl_graphics;
                obj.children[23].material = mtl_graphics;
                obj.children[24].material = mtl_graphics;
                obj.children[25].material = mtl_graphics;
                obj.children[26].material = mtl_graphics;
                obj.children[27].material = mtl_graphics;
                obj.children[28].material = mtl_graphics;

                obj.children[29].material = mtl_metal;

                // add some methods to the obj
                obj.disableScreen = function() {
                    obj.children[16].material = mtl_transparent;
                };

                obj.setScreenMaterial = function(material) {
                    obj.children[16].material = material;
                };

                fn(obj);
            });
    };

    SSG.phones.oldPhone = function(fn) {
        new THREE.OBJLoader()
            .load(assets['/assets/model/old/phone.obj'], function(obj) {
                obj.children[0].material = mtl_grill;
                obj.children[1].material = mtl_glossyBlack;
                obj.children[2].material = mtl_silver;
                obj.children[3].material = mtl_silver;
                obj.children[4].material = mtl_glossyBlack;
                obj.children[5].material = mtl_glossyBlack;
                obj.children[6].material = mtl_glossyBlack;
                obj.children[7].material = mtl_glossyBlack;
                obj.children[8].material = mtl_silver;
                obj.children[9].material  = mtl_glossyBlack;
                obj.children[10].material = mtl_glossyBlack;
                obj.children[11].material = mtl_glossyBlack;
                obj.children[12].material = mtl_glossyBlack;
                obj.children[13].material = mtl_glossyBlack;
                obj.children[14].material = mtl_glossyBlack;
                obj.children[15].material = mtl_glossyBlack;
                obj.children[16].material = mtl_glossyBlack;
                obj.children[17].material = mtl_silver;
                obj.children[18].material = mtl_glossyBlack;
                obj.children[19].material = mtl_glossyBlack;
                obj.children[20].material = mtl_glossyBlack;
                obj.children[21].material = mtl_silver;
                obj.children[22].material = mtl_glossyBlack;
                obj.children[23].material = mtl_screen;
                obj.children[24].material = mtl_glossyBlack;

                fn(obj);
            });
        };
};
