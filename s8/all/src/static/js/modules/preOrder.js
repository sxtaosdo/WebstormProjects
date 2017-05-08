import {floorRandomBetween, randomBetween, ShootingStar} from '../common/utils';
import ExperienceType from '../common/ExperienceType';
import navPills from './global/navPills';

import Share from './global/share';

const preOrder = (function() {

    const elements = {};
    const enterTimeline = new TimelineLite();
    let exitTimeline;

    let share;

    let stars = [];

    let firstRun = true;
    // -------------------------------------------------------------------------------------------

    function init(topic, experienceType) {
        console.debug('[ preOrder ] ***%c init(), experienceType: ' + experienceType, 'font-weight: bold; color: #00A;');
        SSG.PubSub.unsubscribe(preOrder.init);

        getElements();
        addEventListeners();

        // document.getElementById('screenSize_window').innerHTML = `${window.innerWidth} x ${window.innerHeight}`;
        // document.getElementById('screenSize_screen').innerHTML = `${screen.width} x ${screen.height}`;

        // create stars
        stars.push(new ShootingStar(document.querySelector('#preOrder .background'), {
            keyframeId: 'star1',
            duration: randomBetween(2, 5, 2),
            startX: -40,
            startY: floorRandomBetween(30, window.innerHeight * 0.6),
            scale: randomBetween(0.05, 0.1, 2),
            endX: floorRandomBetween(window.innerWidth * 0.7, window.innerWidth * 1.2),
            endY: floorRandomBetween(0, window.innerHeight * 0.4),
            delay: randomBetween(1, 2.667, 2)
        }));
        stars.push(new ShootingStar(document.querySelector('#preOrder'), {
            keyframeId: 'star2',
            duration: randomBetween(2, 5, 2),
            startX: window.innerWidth + 200,
            startY: floorRandomBetween(30, window.innerHeight * 0.6),
            scale: randomBetween(0.05, 0.1, 2),
            endX: floorRandomBetween(-40, window.innerWidth * 0.3),
            endY: floorRandomBetween(-80, window.innerHeight * 0.4),
            delay: randomBetween(0.5, 1.3, 2)
        }));

        if ( experienceType === ExperienceType.LOW ) {
            enter();
        } else {
            SSG.PubSub.subscribe(SSG.messages.SEQUENCE.PRE_ORDER.ENTER, enter);
            SSG.PubSub.subscribe(SSG.messages.SEQUENCE.PRE_ORDER.EXIT, exit);
        }
    }

    function getElements() {
        elements.container = document.getElementById('preOrder');
        elements.background = document.querySelector('#preOrder .background');
        elements.phone = document.querySelector('#preOrder .phone');
        elements.lockup = document.querySelector('#preOrder .lockup');
        // elements.lockup = document.querySelector('#preOrder .phone-lockup');
        elements.cta = document.querySelector('#preOrder .cta');
        elements.share = document.querySelector('#preOrder .share');

        const backgroundImage = document.querySelector('#preOrder .backgroundImage');
        console.log('backgroundImage size: ', backgroundImage.offsetWidth + ', ' + backgroundImage.offsetHeight);
        console.log('window size: ', window.innerWidth + ', ' + window.innerHeight);

        // Simulate "background-size: cover" scaling functionality
        if ( backgroundImage.offsetWidth < window.innerWidth ) {
            const bgScale = (window.innerWidth / backgroundImage.offsetWidth);
            backgroundImage.style.width = window.innerWidth + 'px';
            backgroundImage.style.height = Math.round(backgroundImage.offsetHeight * bgScale) + 'px';
        }

        share = new Share('#preOrder .share');
    }

    function setupEnterTimeline() {
        enterTimeline.stop();

        enterTimeline.to(elements.container, 1, { autoAlpha: 1 });
        enterTimeline.from(elements.background, 1.6, {
            ease: Sine.easeInOut,
            scale: 1.04
        }, 0);
        enterTimeline.staggerFrom([
            elements.phone,
            elements.lockup,
            elements.cta,
            elements.share
        ], 1, {
            ease: Sine.easeInOut,
            autoAlpha: 0,
        }, 0.205, 0);
    }

    function addEventListeners() {
        elements.cta.addEventListener('click', handlePreorderButtonClick, false);
    }

    function handlePreorderButtonClick(event) {
        // event.preventDefault();

        const tapX = event.offsetX + 'px';
        const tapY = event.offsetY +'px';

        createButtonTapRipple(event.target, tapX, tapY, () => {
            // Open link to preorder site
            // TODO Analytics!
        });
    }

    // :: BUTTON Tap ripples
    function createButtonTapRipple(container, x, y, completeCallback) {
        // Create ripple element
        let tapRipple = document.createElement('div');
        tapRipple.classList.add('tap-ripple');
        container.appendChild(tapRipple);

        // animate
        const timeScale = 1;
        const fillTime = 0.333 * timeScale;
        const fadeTime = 0.205 * timeScale;

        TweenLite.killTweensOf(container);
        TweenLite.set(container, { clearProps: 'backgroundColor' });

        tapRipple.style.left = x;
        tapRipple.style.top = y;
        tapRipple.style.opacity = 0.2;
        tapRipple.style.width = Math.floor(container.offsetWidth * 0.3) + 'px';
        tapRipple.style.height = Math.floor(container.offsetHeight * 0.3) + 'px';

        // TweenLite.set(tapRipple, {
        //     left: x,
        //     top: y,
        //     opacity: 0.2,
        //     width: Math.floor(container.offsetWidth * 0.3) + 'px',
        //     height: Math.floor(container.offsetHeight * 0.3) + 'px',
        // });
        TweenLite.to(tapRipple, fillTime, {
            ease: Power2.easeInOut,
            opacity: 0.4,
            width: '400px',
            height: '400px',
            onComplete: () => {
                TweenLite.to(tapRipple, fadeTime, {
                    ease: Sine.easeOut,
                    opacity: 0,
                    onComplete: () => {
                        container.removeChild(tapRipple);
                        TweenLite.killTweensOf(tapRipple);
                        tapRipple = null;
                        completeCallback();
                    }
                });
            }
        });
        // TweenLite.from(container, fillTime, {
        //     ease: Sine.easeOut,
        //     backgroundColor: '#444'
        // });
    }

    function enter() {
        navPills.fillActivePill(100, 2, hideNavPills);

        SSG.assets.load(['globalAssets']).then(() => {
            SSG.assets.setBundleDomSrc('globalAssets', elements.container, false, true);

            if (firstRun) {
                firstRun = false;
                setupEnterTimeline();
            }

            console.debug('[ preOrder ] ***%c enter()', 'font-weight: bold; color: #0A0;');

            disableBrowserZoomH();
            enterTimeline.restart();

            // animateStars();
        });
    }

    function hideNavPills() {
        TweenLite.delayedCall(1, navPills.hidePills);
    }

    function animateStars() {
        stars.forEach(function(star) {
            star.animate();
        });
    }

    function exit(msg, nextFeature) {
        console.debug('[ preOrder ] ***%c exit()', 'font-weight: bold; color: #A00;');
        enterTimeline.stop();

        enableBrowserZoomH();
        // use exitTimeline to setup a tween for the exit anim
        exitTimeline = new TimelineLite({
            onComplete: function() {
                exitTimeline.kill();
                exitTimeline = undefined;
                SSG.PubSub.publish(SSG.messages.SEQUENCE.EXIT_ANIMATION_COMPLETE);
                navPills.showPills();
            }
        });

        exitTimeline.to(elements.container, 0.5, { autoAlpha: 0 });
    }

    // -------------------------------------------------------------------------------------------

    return {
        init
    };
})();

// ::: Pre-Order module is unique in that it can be either loaded as part of the full experience, or
//     loaded independently on it's own — as such, we need to respond to two init pubsub messages
SSG.PubSub.subscribe(SSG.messages.APP.INIT, preOrder.init);
SSG.PubSub.subscribe(SSG.messages.APP.INITIAL_LOAD_COMPLETE, preOrder.init);

export default preOrder;
