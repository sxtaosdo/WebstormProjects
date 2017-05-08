let bundles = {
    core: [
        '/js/app.js',
        '/css/dream.css'
        // '/assets/movie.mp4'
    ],
    globalAssets: [
        '/assets/images/preorder-lockup.png'
    ],
    infinityDisplay: [
        '/assets/images/infinityDisplay/sky.jpg',
        '/assets/images/infinityDisplay/mountains.png',
        '/assets/images/infinityDisplay/trees.png',
        '/assets/images/infinityDisplay/glider.png',
        '/assets/images/infinityDisplay/glider2.png',
        '/assets/images/infinityDisplay/grass4.png',
        '/assets/images/infinityDisplay/grass3.png',
        '/assets/images/infinityDisplay/grass2.png',
        '/assets/images/infinityDisplay/grass1.png'
    ],
    irisScan: [
        '/assets/images/irisScan/background.jpg',
        '/assets/images/irisScan/face.jpg',
        '/assets/images/irisScan/spritesheet1.jpg',
        '/assets/images/irisScan/spritesheet2.png'
    ],
    bixbyVision: [
        '/assets/images/bixby/bixby-bg.jpg',
        '/assets/images/bixby/bixby-spritesheet.png'
    ],
    lowLightCamera:[
        '/assets/images/lowLightCamera/foreground.jpg',
        '/assets/images/lowLightCamera/interface.png',
        '/assets/images/lowLightCamera/photo.jpg'
    ],
    waterResistant: [
        '/assets/images/waterResistant/arrow.png',
        '/assets/images/waterResistant/water_background.jpg',
        '/assets/images/waterResistant/gradience.jpg',
        '/assets/images/waterResistant/spritesheet.png'
    ],
    phoneAssets: [
        '/assets/model/env/neg-x.jpg',
        '/assets/model/env/pos-x.jpg',
        '/assets/model/env/neg-y.jpg',
        '/assets/model/env/pos-y.jpg',
        '/assets/model/env/neg-z.jpg',
        '/assets/model/env/pos-z.jpg',
        '/assets/model/graphics_a512.png',
        '/assets/model/graphics_d512.png',
        '/assets/model/old/phone.obj',
        '/assets/model/dream/dream.obj',
        '/js/phones.js'
    ],
    phoneBreakAnim: [
        '/assets/model/break_anim.json',
        '/js/phoneBreakAnim.js'
    ]
};

let loadScript = (asset, cb) => {
    let script = document.createElement('script');

    script.src = asset;
    script.onload = () => {
        cb(asset, script);
    };
    script.onerror = () => {
        cb(asset, script);
    };
    document.head.appendChild(script);
};

let loadCss = (asset, cb) => {
    let stylesheet = document.createElement('link');

    stylesheet.rel = "styleSheet";
    stylesheet.href = asset;

    stylesheet.onload = () => {
        cb(asset, stylesheet);
    };
    stylesheet.onerror = () => {
        cb(asset, stylesheet);
    };

    document.head.appendChild(stylesheet);
};

/*
download video file and store in a blob
let loadVideo = (asset, cb, progressFn) => {
    let xhr = new XMLHttpRequest();

    xhr.open('get', asset);
    xhr.responseType = 'blob';
    xhr.addEventListener('progress', function(e) {
        progressFn(e.loaded / e.total);
    });
    xhr.onload = function() {
        let video = document.createElement('video'),
            data = (window.webkitURL ? webkitURL : URL).createObjectURL(this.response);

        video.src = data;
        cb(asset, video);
    };

    // TODO :: Error handling
    xhr.send();
};
*/

// load json data and store as data URI
let loadData = (responseType, uriData, asset, cb, progressFn, encode64, requestWebp) => {
    let xhr = new XMLHttpRequest(),
        assetUrl;

    if (requestWebp) {
        assetUrl = asset.split('.').slice(0, -1);
        assetUrl.push('webp');
        assetUrl = assetUrl.join('.');
        // assetUrl = asset.split('.').splice(-1, 1, "webp").join('.');
    } else {
        assetUrl = asset;
    }

    xhr.open('get', assetUrl);
    xhr.responseType = !encode64 ? responseType : 'arraybuffer';
    xhr.addEventListener('progress', function(e) {
        if (e.total) {
            progressFn(asset, e.loaded / e.total);
        }
    });
    xhr.onload = function() {
        let modelData = 'data:' + uriData + ',';

        if (!encode64) {
            modelData += encodeURIComponent(this.response);
        } else {
            let arr = new Uint8Array(this.response);

            // let raw = String.fromCharCode.apply(null, arr);
            let raw = '';

            let subarr;

            for (let i = 0, j = arr.length; i < j; i += 500) {
                subarr = arr.subarray(i, i + 500);
                raw += String.fromCharCode.apply(null, subarr);
            }

            modelData += window.btoa(raw);
        }

        cb(asset, modelData);
    };

    xhr.send();
};

let loadingResolves = {};

let assets = {
    loadedAssets: {},

    init() {
        let initPromise = new Promise((resolve, reject) => {
            let img = new Image();

            img.onload = function() {
                let result = (img.width > 0) && (img.height > 0);

                assets.webpSupport = result;
                resolve();
            };

            img.onerror = function() {
                assets.webpSupport = false;
                resolve();
            };

            img.src = "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==";
        });

        return initPromise;
    },

    load(bundleIds = ['core', 'globalAssets', 'phoneAssets', 'phoneBreakAnim']) {
        let startLoadTime;

        // first check if all requested bundles are already loaded, remove from requested array those that are
        bundleIds = bundleIds.filter(id => {
            return !bundles[id].loaded;
        });

        let loadingBundleIds = bundleIds.filter(id => {
            return bundles[id].loading;
        });

        console.debug('>>> LOADING bundles: %c ' + bundleIds.join(','), 'font-weight: bolder; color: #3D3;');

        if (loadingBundleIds.length) {
            console.debug('>>> Bundles already loading: %c ' + loadingBundleIds.join(','), 'font-weight: bolder; color: #C00;');

            let loadingPromise = new Promise((resolve, reject) => {
                loadingResolves[loadingBundleIds.join(',')] = resolve;
            });

            return loadingPromise;
        }

        bundleIds = bundleIds.filter(id => {
            return !bundles[id].loading;
        });

        bundleIds.forEach(id => {
            bundles[id].loading = true;
        });

        let totalAssets = bundleIds.reduce((a, b) => {
            return a.concat(bundles[b]);
        }, []);

        let assetsPercentages   = new Array(totalAssets.length),
            totalAssetsCount    = totalAssets.length,
            loadedAssetsCount   = 0,
            loadedPercentage    = 0;

        let loadPromise = new Promise((resolve, reject) => {
            // all already loaded, resolve
            if (!totalAssetsCount) {
                resolve();
                return;
            }

            startLoadTime = new Date().getTime();

            function getTotalPercentage() {
                let total = 0;

                assetsPercentages.forEach(perc => {
                    total += perc;
                });

                return total / totalAssets.length;
            }

            let loadedFn = (asset, el) => {
                this.loadedAssets[asset] = el;

                loadedAssetsCount++;

                assetsPercentages[totalAssets.indexOf(asset)] = 1;

                if (loadedAssetsCount == totalAssetsCount) {
                    // loadedPercentage = 1;

                    // mark all requested bundles as loaded
                    bundleIds.forEach(id => {
                        bundles[id].loaded = true;
                        bundles[id].loading = false;
                    });

                    let loadingBundles;
                    // check if there are any stacked loadingResolves pending
                    for (let key in loadingResolves) {
                        /*jshint loopfunc: true */
                        loadingBundles = key.split(',');
                        loadingBundles = loadingBundles.filter(id => {
                            return bundles[id].loading;
                        });

                        if (!loadingBundles.length) {
                            loadingResolves[key](new Date().getTime() - startLoadTime);
                            delete loadingResolves[key];
                        }
                    }

                    console.debug('>>> Bundles loaded: %c ' + bundleIds.join(','), 'font-weight: bolder; color: #3F3;');

                    resolve(new Date().getTime() - startLoadTime);
                }

                SSG.PubSub.publish(SSG.messages.APP.LOAD_PROGRESS, {
                    percentage: getTotalPercentage(),
                    bundles: bundleIds.join(',')
                });
            };

            let partialLoadFn = (asset, percentage) => {
                let rel100 = 1 / totalAssetsCount;

                assetsPercentages[totalAssets.indexOf(asset)] = percentage;

                SSG.PubSub.publish(SSG.messages.APP.LOAD_PROGRESS, {
                    percentage: getTotalPercentage(),
                    bundles: bundleIds.join(',')
                });
            };

            totalAssets.forEach(asset => {
                let assetType = asset.split('.').pop();

                switch (assetType) {
                    case 'js':
                        loadScript(asset, loadedFn);
                        break;

                    case'css':
                        loadCss(asset, loadedFn);
                        break;

                    // case 'mp4':
                    //     loadVideo(asset, loadedFn, partialLoadFn);
                    //     break;

                    // three.js json model data
                    case 'json':
                        loadData("text/html", "application/json;charset=utf-8", asset, loadedFn, partialLoadFn);
                        break;

                    case 'obj':
                        loadData("text/plain", "text/plain;base64", asset, loadedFn, partialLoadFn, true);
                        break;

                    case 'svg':
                        assetType = "svg+xml";
                        loadData("image/" + assetType, "image/" + assetType + ";base64", asset, loadedFn, partialLoadFn, true);
                        break;

                    case 'jpg':
                    case 'png':
                        if (this.webpSupport) {
                            assetType = "webp";
                        }

                        loadData("image/" + assetType, "image/" + assetType + ";base64", asset, loadedFn, partialLoadFn, true, this.webpSupport);
                        break;

                    default:
                        break;
                }
            });
        });

        return loadPromise;
    },

    asyncLoadAllBundles() {
        let nextBundleId;

        for (let key in bundles) {
            if (!bundles[key].loading && !bundles[key].loaded) {
                nextBundleId = key;
                break;
            }
        }

        if (nextBundleId) {
            assets.load([nextBundleId]).then(assets.asyncLoadAllBundles);
        }
    },

    getBundle(bundleId) {
        let bundleHash = {};

        bundles[bundleId].forEach(asset => {
            bundleHash[asset] = this.loadedAssets[asset];
        });

        return bundleHash;
    },

    dispose(assetId) {
        this.loadedAssets[assetId] = undefined;
    },

    disposeBundle(bundleId) {
        let bundleAssets = this.getBundle(bundleId);

        for (let asset in bundleAssets) {
            this.dispose(asset);
        }
    },

    setBundleDomSrc(bundleId, domEl, force, dispose) {
        let assetEls = domEl.querySelectorAll('[asset-src], [asset-src-background]');

        Array.prototype.slice.call(assetEls).forEach(el => {
            if (el.hasAttribute('asset-src') && (!el.hasAttribute('asset-src-set') || force)) {
                el.src = this.loadedAssets[el.getAttribute('asset-src')];
                el.setAttribute('asset-src-set', true);
            }

            if (el.hasAttribute('asset-src-background') && (!el.hasAttribute('asset-background-set') || force)) {
                el.style.backgroundImage = 'url(' + this.loadedAssets[el.getAttribute('asset-src-background')] + ')';
                el.setAttribute('asset-background-set', true);
            }

            if (dispose) {
                this.dispose[el.getAttribute('asset-src') || el.getAttribute('asset-src-background')]; // jshint ignore:line
            }
        });
    }
};

export default assets;
