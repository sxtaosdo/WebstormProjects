/**
 * ssg.js
 *
 * This will handle asset loading and app initialization as well as feature detection
 */
 require('npm-zepto');

require('./common/polyfills');
import PubSub, {messages} from './common/PubSub';
import FeatureDetection from './common/FeatureDetection';
import ExperienceType from './common/ExperienceType';
import assets from './common/assets';

// Core dependencies for the initial state of the app.
// Only import what is absolutely necessary for the intro/loading sequence.
import './modules/global/progressBar';

// set ssg namespace in window to set references to shared modules
// this avoids the need to import in the main app.js and repackage duplicate code in the build
window.SSG = {
    PubSub: PubSub,
    messages: messages,
    assets: assets,
    FeatureDetection: FeatureDetection,
    enableNavToggleButton: () => {
        SSG.PubSub.publish(SSG.messages.APP.ENABLE_NAV_TOGGLE_BUTTON);
    },
    disableNavToggleButton: () => {
        SSG.PubSub.publish(SSG.messages.APP.DISABLE_NAV_TOGGLE_BUTTON);
    },
};

// NOTE :: PreOrder needs imported *after* window.SSG is defined
require('./modules/preOrder');

// Some browser/devices don't like later logic checks that happen against window['performance'] if we
// don't set even an undefined initial value here
window.performance = undefined;

document.addEventListener('DOMContentLoaded', () => {
    // The primary asset bundle array we'll load
    let bundle;
    const experienceType = FeatureDetection.getExperienceType();
    const phone = FeatureDetection.getPhoneInfo();

    // Fix for SMSNGDREAM-67
    switch ( phone.browser.social ) {
        case FeatureDetection.SOCIAL.FACEBOOK:
        case FeatureDetection.SOCIAL.FACEBOOK_MESSENGER:
        case FeatureDetection.SOCIAL.INSTAGRAM:
            // Prevents overscrolling above/below the page on mobile
            document.addEventListener('touchmove', event => event.preventDefault(), false);
            break;
    }

    if ( experienceType === ExperienceType.LOW ) {
        // ::: Load full quality experience
        console.debug('~~~ Loading Preorder-Only Experience (LOW) ~~~');
        bundle = ['globalAssets'];
    } else {
        // ::: Load simple/fallback experience
        console.debug('~~~ Loading Full Experience (HIGH) ~~~');
        // assigning "unboxing" class to body because it will be the first one to show
        document.body.classList.add('unboxing');
        document.querySelector('.progressBar').style.display = "block";
    }

    // ::: Start the loading process
    PubSub.publish(messages.APP.INIT_LOAD);

    console.debug('>>> APP INIT LOAD ***%c ssg loaded: ' + (new Date().getTime() - startTime) , 'font-weight: bolder; color: #C00;');

    assets.init().then(() => {
        document.body.classList.add(assets.webpSupport ? 'webp' : 'no-webp');

        assets.load(bundle).then((loadingTime) => {
            console.debug('>>> APP LOAD ***%c bundle loaded: ' + (new Date().getTime() - startTime) , 'font-weight: bolder; color: #C00;');

            setTimeout(() => {
                PubSub.publish(messages.APP.INITIAL_LOAD_COMPLETE, experienceType);

            }, (experienceType === ExperienceType.LOW ? 0 : 2500 - loadingTime) );
        });
    });
});

// async load all the sharing libs here instead of the index
window.fbAsyncInit = function() {
    FB.init({
      appId      : '403492300017395',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
        t._e.push(f);
    };
    return t;
}(document, "script", "twitter-wjs"));
