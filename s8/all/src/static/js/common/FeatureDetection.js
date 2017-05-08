import {isWebglSupported, getUrlParameter} from './utils';
import ExperienceType, {ExperienceTypeKeys} from './ExperienceType';
const UAParser = require('ua-parser-js');

const FeatureDetection = (function() {

    const OS = {
        ANDROID: 'Android',
        IOS: 'iOS',
    };

    const DEVICE = {
        IPHONE: 'iPhone',
    };

    const BROWSER = {
        CHROME_WEBVIEW: 'Chrome WebView',
    };

    const SOCIAL = {
        FACEBOOK: 'Facebook',
        FACEBOOK_MESSENGER: 'Facebook Messenger',
        INSTAGRAM: 'Instagram',
        SNAPCHAT: 'Snapchat',
        OTHER: 'Other',
    };

    const seriesPatterns = {
        'Galaxy S7': /^SM-G930/i,
        'Galaxy S7 Edge': /^(SM-G935|SC-02H)/i,
        'Galaxy S6': /^SM-G920/i,
        'Galaxy S6 Edge': /^SM-G925/i,
        'Galaxy S6 Edge+': /^SM-G928/i,
        'Galaxy Note 5': /^SM-N920/i,
        'Galaxy Note 4': /^(SM-N910|SCL24|SC-01G)/i,
    };

    const highExperienceSeries = [
        'Galaxy S7',
        'Galaxy S7 Edge',
        '6 or 7',
        '6+ or 7+'
    ];

    const mediumExperienceSeries = [
        'Galaxy S6',
        'Galaxy S6 Edge',
        'Galaxy S6 Edge+',
        'Galaxy Note 5',
        '5'
    ];

    const overridenProps = [];

    const uaParser = new UAParser();
    const phone = determinePhoneInfo();
    let experienceType, experienceTypeKey;

    init();

    function init() {
        determineExperienceType(phone);

        console.log('%c📱 Phone Info', 'background: #000; color: #FFF; font-size: 16px; font-weight: bold; padding: 2px 8px; border-radius: 16px;');
        console.info(phone);
        console.log('%cExperience Type%c' + experienceType,
            'background: #000; color: #FFF; font-size: 16px; font-weight: bold; padding: 2px 8px; border-radius: 16px 0 0 16px;',
            'background: #1428A0; color: #FFF; font-size: 16px; font-weight: bold; padding: 2px 8px; border-radius: 0 16px 16px 0;'
        );

        // TODO Remove this
        // debugDeviceInfo();
    }

    // -----------------------------

    function determinePhoneInfo() {
        const info = uaParser.getResult();

        // TODO :: Remove this query string override!
        // --- 8< -----------------------------------------
        // let override = getUrlParameter('os').toUpperCase();
        // if ( override && OS[override]) {
        //     console.warn('[ FeatureDetection.determinePhoneInfo ] Overriding Phone OS');
        //     overridenProps.push('os.name');
        //     info.os.name = OS[override];
        // }
        // --- >8 -----------------------------------------

        info.os.major = getOsMajorVersion(info.os);
        info.device.series = getDeviceSeries(info.device);

        info.browser.social = getBrowserSocial(info);

        return info;
    }

    function getOsMajorVersion(os) {

        // TODO :: Remove this query string override!
        // --- 8< -----------------------------------------
        // let override = parseInt(getUrlParameter('osv'), 10);
        // if ( !Number.isNaN(override) ) {
        //     console.warn('[ FeatureDetection.getOsMajorVersion ] Overriding Phone OS major version');
        //     overridenProps.push('os.major');
        //     return override;
        // }
        // --- >8 -----------------------------------------

        if ( os.name === OS.ANDROID || os.name === OS.IOS ) {
            const matches = os.version.match(/^(\d+)/g);

            if ( Array.isArray(matches) && matches.length === 1 ) {
                return parseInt(matches[0], 10);
            }
        }

        // Couldn't determine the major OS version
        return undefined;
    }

    /**
     * Given a phone's device info, attempts to determine the device "series".
     * This function is necessary because there are a variety of device models for the same
     * end "series" of phone — i.e. "iPhone", "Samsung Galaxy 5", "Samsung Note 3", etc.
     */
    function getDeviceSeries(device) {

        // ::: iPhone model detection from => http://stackoverflow.com/a/39367680/5861852
        if ( device.model === DEVICE.IPHONE ) {
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;

            if (screenHeight <= 480) {
                return '< 3';
            } else if (screenWidth === 320 && screenHeight === 480) {
                return '4';
            } else if (screenWidth === 320 && screenHeight === 568) {
                return '5';
            } else if (screenWidth === 375 && screenHeight === 667) {
                return '6 or 7';
            } else if (screenWidth === 414 && screenHeight === 736) {
                return '6+ or 7+';
            } else {
                // An unknown flavor of iPhone
                return undefined;
            }
        }

        // ::: Samsung Series
        for ( let series in seriesPatterns ) {
            if ( seriesPatterns[series].test(device.model) ) {
                return series;
            }
        }

        // An unknown device series
        return undefined;
    }

    function getBrowserSocial(info) {
        // TODO :: Remove this query string override!
        // --- 8< -----------------------------------------
        // let override = getUrlParameter('social').toLowerCase();
        // if ( override ) {
        //     let overrideReturnValue = false;
        //
        //     if ( override === 'fb' || override === 'facebook' ) {
        //         overrideReturnValue = SOCIAL.FACEBOOK;
        //     }
        //
        //     if ( override === 'fbm' || override === 'messenger' ) {
        //         overrideReturnValue = SOCIAL.FACEBOOK_MESSENGER;
        //     }
        //
        //     if ( override === 'ig' || override === 'instagram' ) {
        //         overrideReturnValue = SOCIAL.INSTAGRAM;
        //     }
        //
        //     if ( override === 'sc' || override === 'snapchat' || override === 'snap' ) {
        //         overrideReturnValue = SOCIAL.OTHER;
        //     }
        //
        //     if ( overrideReturnValue ) {
        //         console.warn('[ FeatureDetection.getBrowserSocial ] Overriding Phone Browser Social source');
        //         overridenProps.push('browser.social');
        //         return overrideReturnValue;
        //     }
        // }
        // --- >8 -----------------------------------------

        if ( info.browser.name === BROWSER.CHROME_WEBVIEW ) {
            // :: Instagram
            if ( (/instagram/gi).test(info.ua) ) {
                return SOCIAL.INSTAGRAM;
            }

            // :: Facebook
            if ( (/(fbav|fb_iab)/gi).test(info.ua) ) {
                if ( (/messenger/gi).test(info.ua) ) {
                    return SOCIAL.FACEBOOK_MESSENGER;
                } else {
                    return SOCIAL.FACEBOOK;
                }
            }

            return SOCIAL.OTHER;
        }
    }

    /**
     * This function determines what experience type to provide, based off given phone info.
     * Phone info includes device model, browser, operating system, etc.
     * @param phone {object} An object describing the phone info. @see determinePhoneInfo()
     * @returns undefined — return statements are used to break out of the function, not to return a value
     */
    function determineExperienceType(phone) {

        // TODO :: Remove this query string override! Don't forget to remove `getUrlParameter` method too!
        // --- 8< -----------------------------------------
        // let override = getUrlParameter('exp').toUpperCase();
        // if ( override ) {
        //     for ( let key in ExperienceType ) {
        //         if ( override === key || override.substr(0, 1) === key.substr(0, 1) ) {
        //             console.warn('[ FeatureDetection.determineExperienceType ] Overriding Experience Type');
        //             overridenProps.push('experienceType');
        //             return setExperienceType( ExperienceType[key] );
        //         }
        //     }
        // }
        // --- >8 -----------------------------------------

        // If we're an unknown social webview, i.e. Snapchat...
        if ( phone.browser.social === SOCIAL.OTHER ) {
            return setExperienceType(ExperienceType.LOW);
        }

        // --- Android
        if ( phone.os.name === OS.ANDROID ) {
            if ( phone.os.major >= 5 ) {
                if ( mediumExperienceSeries.indexOf(phone.device.series) > -1 ) {
                    return setExperienceType(ExperienceType.MEDIUM);
                } else {
                    return setExperienceType(ExperienceType.HIGH);
                }
                return setExperienceType(ExperienceType.HIGH);
            } else {
                return setExperienceType(ExperienceType.LOW);
            }
        }

        // --- iOS
        if ( phone.os.name === OS.IOS ) {
            if ( phone.os.major >= 10 ) {
                if ( mediumExperienceSeries.indexOf(phone.device.series) > -1 ) {
                    return setExperienceType(ExperienceType.MEDIUM);
                } else {
                    return setExperienceType(ExperienceType.HIGH);
                }
            } else {
                return setExperienceType(ExperienceType.LOW);
            }
        }

        // Worse case scenario, we couldn't properly determine what experience to use...
        // Let's fall back on the static/simple/minimal one
        return setExperienceType(ExperienceType.LOW);
    }

    function setExperienceType(newExperienceType) {
        experienceType = newExperienceType;
        experienceTypeKey = ExperienceTypeKeys[experienceType];

        // clear old experience type body class
        for (let expType in ExperienceType) {
            document.body.classList.remove( expType.toLowerCase() );
        }

        // add new experience type body class
        document.body.classList.add( experienceTypeKey.toLowerCase() );
    }

    function getPhoneInfo() {
        return phone;
    }

    function getExperienceType() {
        return experienceType;
    }

    function getExperienceTypeKey() {
        return experienceTypeKey;
    }


    // --- >8 -----------------------------------------
    // function debugDeviceInfo() {
    //     if ( getUrlParameter('debugDevice') || getUrlParameter('dd') ) {
    //         const debugDeviceElement = document.createElement('div');
    //         debugDeviceElement.id = 'debugDevice';
    //
    //         const getOverrideClass = (key) => (overridenProps.indexOf(key) > -1 ? 'override' : '');
    //         debugDeviceElement.innerHTML = `<ul>
    //             <li>
    //                 <span class="key">Experience Type</span>
    //                 <span class="value experienceType ${experienceTypeKey} ${getOverrideClass('experienceType')}">${experienceTypeKey}</span>
    //             </li>
    //             <li>
    //                 <span class="key">device</span>
    //                 <span class="value">${phone.device.type}</span>
    //                 <ul>
    //                     <li>
    //                         <span class="key">vendor</span>
    //                         <span class="value">${phone.device.vendor}</span>
    //                     </li>
    //                     <li>
    //                         <span class="key">series</span>
    //                         <span class="value">${phone.device.series}</span>
    //                     </li>
    //                     <li>
    //                         <span class="key">model</span>
    //                         <span class="value">${phone.device.model}</span>
    //                     </li>
    //                 </ul>
    //             </li>
    //             <li>
    //                 <span class="key">browser</span>
    //                 <ul>
    //                     <li>
    //                         <span class="key">name</span>
    //                         <span class="value">${phone.browser.name}</span>
    //                     </li>
    //                     <li>
    //                         <span class="key">version</span>
    //                         <span class="value">${phone.browser.major}</span>
    //                         <span class="value secondary">${phone.browser.version}</span>
    //                     </li>
    //                     <li>
    //                         <span class="key">social</span>
    //                         <span class="value ${getOverrideClass('browser.social')}">${phone.browser.social}</span>
    //                     </li>
    //                 </ul>
    //             </li>
    //             <li>
    //                 <span class="key">os</span>
    //                 <ul>
    //                     <li>
    //                         <span class="key">name</span>
    //                         <span class="value ${getOverrideClass('os.name')}">${phone.os.name}</span>
    //                     </li>
    //                     <li>
    //                         <span class="key">version</span>
    //                         <span class="value ${getOverrideClass('os.major')}">${phone.os.major}</span>
    //                         <span class="value secondary">${phone.os.version}</span>
    //                     </li>
    //                 </ul>
    //             </li>
    //             <li>
    //                 <span class="key">display</span>
    //                 <ul>
    //                     <li>
    //                         <span class="key">screen</span>
    //                         <span class="value">${window.screen.width} x ${window.screen.height}</span>
    //                     </li>
    //                     <li>
    //                         <span class="key">inner</span>
    //                         <span class="value">${window.innerWidth} x ${window.innerHeight}</span>
    //                     </li>
    //                 </ul>
    //             </li>
    //             <li>
    //                 <span class="key">user-agent</span>
    //                 <br/>
    //                 <span class="value" style="display: block; font-size: 12px;">${phone.ua}</span>
    //             </li>
    //         </ul>`;
    //
    //         document.body.appendChild(debugDeviceElement);
    //     }
    // }
    // --- >8 -----------------------------------------

    return {
        getPhoneInfo,
        getExperienceType,
        getExperienceTypeKey,
        OS,
        DEVICE,
        BROWSER,
        SOCIAL,
    };
})();

export default FeatureDetection;
