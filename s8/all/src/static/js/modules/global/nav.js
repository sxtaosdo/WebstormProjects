import { addEventListenerToNodeList } from '../../common/utils';


const nav = (function() {

    const elements = {};
    const toggleButtonTimeline = new TimelineLite();
    const showModalTimeline = new TimelineLite();
    const hideModalTimeline = new TimelineLite();

    const shakeNextButtonTimeline = new TimelineLite();
    const showNextButtonTimeline = new TimelineLite();

    const shareButtonsTimeline = new TimelineLite();
    const shareLinkTimeline = new TimelineLite();

    let modalIsShown = false;

    const isClipboardSupported = Clipboard.isSupported();
    let shareLinkClipboard;

    // Next Button delay config
    // const showNextButtonDelay = 7;
    const showNextButtonDelay = 10;
    const firstShakeNextButtonDelay = 10;
    const subsequentShakeNextButtonDelay = 8;

    // ----------------------------------------------------------------------------------

    function init() {
        SSG.PubSub.unsubscribe(nav.init);

        getElements();
        setupTimelines();
        addEventListeners();
    }

    function getElements() {
        // Nav Buttons
        elements.toggleButton = document.querySelector('.nav__toggleButton');
        elements.toggleButtonLine1 = document.querySelector('.nav__toggleButton__line1');
        elements.toggleButtonLine2 = document.querySelector('.nav__toggleButton__line2');
        elements.toggleButtonLine3 = document.querySelector('.nav__toggleButton__line3');
        elements.nextButton = document.querySelector('.nav__nextButton');
        elements.nextButtonCircle = document.querySelector('.nav__nextButton-circle');

        // Modal
        elements.modal = document.querySelector('.nav__modal');
        elements.modalBlack = document.querySelector('.nav__modal__black');
        elements.logo = document.querySelector('.nav__modal__logo');

        // Feature links and Preorder
        elements.featureLinks = document.querySelectorAll('.nav__list.is-primary .nav__link');
        elements.preorderLink = document.querySelector('.nav__list-item.is-preorder .nav__link');

        // Lists
        elements.primaryNavList = document.querySelector('.nav__list.is-primary');
        elements.primaryNavListItems = document.querySelectorAll('.nav__list.is-primary .nav__list-item');
        elements.secondaryNavList = document.querySelector('.nav__list.is-secondary');
        elements.secondaryNavListItems = document.querySelectorAll('.nav__list.is-secondary .nav__list-item:not(.is-share-buttons)');

        // Sharing
        elements.shareListItem = document.querySelector('.nav__list-item.is-share');
        elements.shareListItemLink = document.querySelector('.nav__list-item.is-share .nav__link');
        elements.shareButtonsListItem = document.querySelector('.nav__list-item.is-share-buttons');
        elements.shareButtons = Array.prototype.slice.call( document.querySelectorAll('.nav__list-item.is-share-buttons .nav__link') );

        if ( isClipboardSupported ) {
            elements.shareLinkButton = document.querySelector('.nav__list-item.is-share-buttons .share-link');
            elements.shareLinkMessage = document.querySelector('.nav__list-item.is-share-buttons .share-link-message');
        } else {
            $('.nav__list-item .share-link').remove();
            $('.nav__list-item .share-link-message').remove();
        }

        // Add index values to the feature links and preorder button
        Array.prototype.slice.call(elements.featureLinks)
            .concat(elements.preorderLink)
            .forEach( (featureLink, index) => {
                featureLink.setAttribute('data-nav-index', index);
            });
    }

    // ----------------------------------------------------------------------------------

    function setupTimelines() {
        setupToggleButtonTimeline();
        setupShowNextButtonTimeline();
        setupShowModalTimeline();
        setupHideModalTimeline();
        setupShareButtonsTimeline();
        setupShareLinkTimeline();
    }

    // :: Toggle Button
    function setupToggleButtonTimeline() {
        toggleButtonTimeline.stop();

        toggleButtonTimeline.timeScale(1);

        // Collapse
        toggleButtonTimeline.to(elements.toggleButtonLine1, 0.167, {
            y: 4,
            // stroke: '#F00',
        }, 0);
        toggleButtonTimeline.to(elements.toggleButtonLine3, 0.167, {
            y: -4,
            // stroke: '#00F',
        }, 0);
        toggleButtonTimeline.to(elements.toggleButtonLine2, 0, {
            autoAlpha: 0,
            // stroke: '#0F0',
        });

        // Cross
        toggleButtonTimeline.addLabel('cross', '+=0.167');
        toggleButtonTimeline.to(elements.toggleButtonLine1, 0.333, {
            ease: Sine.easeOut,
            rotation: 45,
            stroke: '#000',
            transformOrigin: '50% 50%',
        }, 'cross');
        toggleButtonTimeline.to(elements.toggleButtonLine3, 0.333, {
            ease: Sine.easeOut,
            rotation: -45,
            stroke: '#000',
            transformOrigin: '50% 50%'
        }, 'cross');
    }

    function setupShowNextButtonTimeline() {
        showNextButtonTimeline.stop();

        showNextButtonTimeline.set(elements.nextButtonCircle, { autoAlpha: 1 }, 0);
        showNextButtonTimeline.fromTo(elements.nextButton, 0.667, {
            autoAlpha: 0,
        }, {
            ease: Sine.easeInOut,
            autoAlpha: 1,
            onComplete: () => {
                enableNextButton();

                // console.log('%c[ nav ] %c >>> ... next button now visible/enabled, starting timeout to SHAKE in: ' + firstShakeNextButtonDelay + ' seconds', 'color: orange;', 'background: orange; color: white; padding: 0 4px;');
                TweenLite.delayedCall(firstShakeNextButtonDelay, shakeNextButton);
            }
        }, 0);
    }

    // :: Show Modal
    function setupShowModalTimeline() {
        showModalTimeline.stop();

        // Modals
        showModalTimeline.to(elements.modalBlack, 0.333, {
            ease: Sine.easeOut,
            autoAlpha: 1
        });
        showModalTimeline.to(elements.modal, 0.333, {
            ease: Sine.easeInOut,
            autoAlpha: 1
        }, 0.167);

        showModalTimeline.addLabel('modals-complete', 0.333);
        showModalTimeline.addLabel('secondary-nav', 0.5);

        // Logo
        showModalTimeline.from(elements.logo, 0.667, {
            ease: Sine.easeInOut,
            autoAlpha: 0
        }, 'modals-complete');

        // Primary nav items
        showModalTimeline.from(elements.primaryNavList, 0.333, {
            ease: Sine.easeOut,
            top: '-10px',
            autoAlpha: 0,
        }, 'modals-complete');
        showModalTimeline.staggerFrom(elements.primaryNavListItems, 1, {
            ease: Sine.easeInOut,
            autoAlpha: 0,
        }, 0.083, 'modals-complete');

        // Secondary nav
        showModalTimeline.from(elements.secondaryNavList, 0.333, {
            ease: Sine.easeOut,
            bottom: '-=5px',
        }, 'secondary-nav');
        showModalTimeline.staggerFrom(elements.secondaryNavListItems, 0.667, {
            ease: Sine.easeInOut,
            autoAlpha: 0,
        }, -0.167, 'secondary-nav');
    }

    // :: Hide Modal
    function setupHideModalTimeline() {
        hideModalTimeline.stop();

        // Primary Nav List
        hideModalTimeline.addLabel('modals-start', 0);

        // Modals
        hideModalTimeline.to(elements.modal, 0.333, {
            ease: Sine.easeInOut,
            autoAlpha: 0
        }, 'modals-start');
        hideModalTimeline.to(elements.modalBlack, 1.967, {
            ease: Sine.easeInOut,
            autoAlpha: 0
        }, 'modals-start');
    }

    // ----------------------------------------------------------------------------------

    function addEventListeners() {
        elements.toggleButton.addEventListener('click', handleToggleButtonClick, false);
        elements.nextButton.addEventListener('click', handleNextButtonClick, false);
        addEventListenerToNodeList(elements.featureLinks, 'click', handleNavLinkClick, false);
        elements.preorderLink.addEventListener('click', handlePreorderButtonClick, false);
        elements.shareListItemLink.addEventListener('click', handleShareListItemLinkClick, false);

        if ( isClipboardSupported ) {
            shareLinkClipboard = new Clipboard(elements.shareLinkButton);
            shareLinkClipboard.on('success', handleShareLinkSuccess, false);
        }

        SSG.PubSub.subscribe(SSG.messages.APP.NAVIGATE, handleNavigate);
        SSG.PubSub.subscribe(SSG.messages.APP.SHOW_NEXT_BUTTON, handleShowNextButton);
        SSG.PubSub.subscribe(SSG.messages.APP.ENABLE_NAV_TOGGLE_BUTTON, enableNavToggleButton);
        SSG.PubSub.subscribe(SSG.messages.APP.DISABLE_NAV_TOGGLE_BUTTON, disableNavToggleButton);
    }

    function handleToggleButtonClick(event) {
        console.debug('[ nav ] *** handleToggleButtonClick() ');

        if ( modalIsShown ) {
            hideModal();
            dataLayer.push({
                'event':'menuItem',
                'label':'Menu Close'
            });
        } else {
            showModal();
            dataLayer.push({
                'event':'menuItem',
                'label':'Menu Open'
            });
        }
    }

    function handleNextButtonClick(event) {
        console.log('[ nav ] *** handleNextButtonClick');
        elements.nextButton.disabled = true;
        const tapX = event.offsetX + 'px';
        const tapY = event.offsetY + 'px';

        const onRippleComplete = () => {
            disableNextButton();

            const activeNavLink = getActiveNavLink();
            const activeNavIndex = parseInt(activeNavLink.getAttribute('data-nav-index'), 10);
            console.log('[ nav ] *** handleNextButtonClick() activeNavLink: ', activeNavIndex);

            const nextNavLink = document.querySelector(`.nav__link[data-nav-index="${activeNavIndex + 1}"]`);

            if ( nextNavLink ) {
                // console.log('\t::: Next nextNavLink() ::: ', nextNavLink);
                const nextNavId = nextNavLink.getAttribute('data-nav-id');
                SSG.PubSub.publish(SSG.messages.APP.NAVIGATE, nextNavId);
            }
        };

        createButtonTapRipple(elements.nextButtonCircle, tapX, tapY, onRippleComplete, 'is-gray', false);
    }

    function handlePreorderButtonClick(event) {
        const tapX = event.offsetX + event.target.offsetLeft + 'px';
        const tapY = event.offsetY + event.target.offsetTop + 'px';

        createButtonTapRipple(event.target, tapX, tapY);
    }

    // :: BUTTON Tap ripples
    function createButtonTapRipple(container, x, y, completeCallback, className = '', fillContainer = true) {
        // Create ripple element
        const tapRipple = document.createElement('div');
        tapRipple.classList.add('tap-ripple', className);
        container.appendChild(tapRipple);

        // animate
        const timeScale = 1;
        const fillTime = 0.333 * timeScale;
        const fadeTime = 0.333 * timeScale;

        TweenLite.killTweensOf(container);
        TweenLite.set(container, { clearProps: 'backgroundColor' });

        TweenLite.set(tapRipple, {
            left: x,
            top: y,
            autoAlpha: 0.2,
            width: Math.floor(container.offsetWidth * 0.3) + 'px',
            height: Math.floor(container.offsetHeight * 0.3) + 'px',
        });
        TweenLite.to(tapRipple, fillTime, {
            ease: Power2.easeInOut,
            autoAlpha: 0.4,
            width: '350px',
            height: '350px',
        });

        if ( fillContainer ) {
            TweenLite.from(container, fillTime, {
                ease: Sine.easeOut,
                backgroundColor: '#777'
            });
        }

        TweenLite.to(tapRipple, fadeTime, {
            delay: fillTime,
            ease: Sine.easeOut,
            autoAlpha: 0,
            onComplete: () => {
                container.removeChild(tapRipple);
                TweenLite.killTweensOf(tapRipple);

                if ( completeCallback ) {
                    completeCallback();
                }
            }
        });
    }

    // ----------------------------------------------------------------------------------

    function handleNavLinkClick(event) {
        elements.toggleButton.disabled = true;
        const navId = getNavId(event.target);

        console.debug('[ nav ] *** handleNavLinkClick() navId: ', navId);
        setActiveNavLink(navId);
        elements.primaryNavList.style.pointerEvents = 'none';

        const tapX = event.offsetX + event.target.offsetLeft;
        const tapY = event.offsetY + event.target.offsetTop;

        createTapRipple(event.target.parentNode, tapX, tapY, () => {
            SSG.PubSub.publish(SSG.messages.APP.NAVIGATE, navId);
            hideModal();
        });

        if (navId === 'EXIT_ANIMATION_COMPLETE') {
            //Nothing ATM
        } else if (navId === 'UNBOX') {
            console.log('Track: click explore');
            dataLayer.push({
                'event':'menuItem',
                'label':'Go Explore'
            });

        } else if (navId === 'INFINITY_DISPLAY') {
            console.log('Track: click display');
            dataLayer.push({
                'event':'menuItem',
                'label':'Go Display'
            });

        } else if (navId === 'BIXBY_VISION') {
            console.log('Track: click bixby');
            dataLayer.push({
                'event':'menuItem',
                'label':'Go Bixby'
            });

        } else if (navId === 'WATER_RESISTANT') {
            console.log('Track: click water resistance');
            dataLayer.push({
                'event':'menuItem',
                'label':'Go Water'
            });

        } else if (navId === 'LOW_LIGHT_CAMERA') {
            console.log('Track: click camera');
            dataLayer.push({
                'event':'menuItem',
                'label':'Go Camera'
            });

        } else if (navId === 'IRIS_SCAN') {
            console.log('Track: click iris');
            dataLayer.push({
                'event':'menuItem',
                'label':'Go Iris'
            });

        } else if (navId === 'PRE_ORDER') {
            //
        }
    }

    // :: LINK Tap ripples
    function createTapRipple(container, x, y, completeCallback) {
        // Create ripple element
        const tapRipple = document.createElement('div');
        tapRipple.classList.add('tap-ripple');
        container.appendChild(tapRipple);

        // animate
        const fillTime = 0.333;
        const fadeTime = 0.5;

        TweenLite.set(tapRipple, {
            left: x + 'px',
            top: y + 'px',
        });
        TweenLite.to(tapRipple, fillTime, {
            ease: Power2.easeInOut,
            autoAlpha: 0.8,
            width: '600px',
            height: '370px',
        });
        TweenLite.to(tapRipple, fadeTime, {
            delay: fillTime,
            ease: Sine.easeOut,
            autoAlpha: 0,
            onComplete: () => {
                container.removeChild(tapRipple);
                TweenLite.killTweensOf(tapRipple);
                completeCallback();
            }
        });
    }

    function handleNavigate(topic, navId) {
        setActiveNavLink(navId);
        disableNextButton();
    }

    function getNavId(element) {
        return element.getAttribute('data-nav-id');
    }

    function getNavLinkById(navId) {
        return document.querySelector(`.nav__modal a[data-nav-id="${navId}"]`);
    }

    function getNavLinkByIndex(index) {
        return document.querySelector(`.nav__modal a[data-nav-index="${index}"]`);
    }

    function getActiveNavLink() {
        return document.querySelector('.nav__modal .is-active');
    }

    function clearActiveNavLink() {
        const element = getActiveNavLink();

        if (element) {
            element.classList.remove('is-active');
        }
    }

    function setActiveNavLink(navId) {
        const element = getNavLinkById(navId);
        clearActiveNavLink();

        if ( element && !element.parentNode.classList.contains('is-preorder') ) {
            TweenLite.set(element, { color: '#DDD' });
            element.classList.add('is-active');

            TweenLite.to(element, 0.5, {
                ease: Sine.easeOut,
                color: '#000'
            });

        } else {
            console.warn(`[ nav ] getElementByNavId: Could not find element with navId "${navId}", querySelector: '.nav__modal a[data-nav-id="${navId}"]'`);
        }
    }

    // ----------------------------------------------------------------------------------

    function handleShareListItemLinkClick(event) {
        console.debug('[ nav ] handleShareListItemLinkClick() ');
        //Analytics
        console.log('Track: share toggled');
        dataLayer.push({
            'event':'menuItem',
            'label':'Share'
        });
        shareLinkTimeline.pause(0);
        shareButtonsTimeline.restart();
    }

    function setupShareButtonsTimeline() {
        shareButtonsTimeline.stop();

        shareButtonsTimeline.to(elements.shareListItem, 0.205, {
            ease: Sine.easeOut,
            // paddingLeft: '6px',
            autoAlpha: 0,
        });

        shareButtonsTimeline.to(elements.shareButtonsListItem, 0.333, {
            ease: Sine.easeOut,
            autoAlpha: 1,
        }, 0);

        shareButtonsTimeline.staggerFrom(elements.shareButtons, 0.167, {
            ease: Sine.easeInOut,
            left: '22px',
            scale: 0.8,
        }, 0.083, 0);
    }

    function setupShareLinkTimeline() {

        if ( !isClipboardSupported ) {
            return;
        }

        shareLinkTimeline.stop();

        // Show message
        shareLinkTimeline.to(elements.shareButtons, 0.333, {
            ease: Sine.easeOut,
            autoAlpha: 0,
        });
        shareLinkTimeline.from(elements.shareLinkMessage, 0.5, {
            ease: Sine.easeInOut,
            autoAlpha: 0,
        }, 0);

        // Hide message
        shareLinkTimeline.to(elements.shareButtonsListItem, 0.333, {
            ease: Sine.easeInOut,
            autoAlpha: 0
        }, '+=1.5');

        shareLinkTimeline.to(elements.shareListItem, 0.5, {
            ease: Sine.easeInOut,
            autoAlpha: 1,
        });
    }

    function handleShareLinkSuccess(event) {
        console.debug('[ nav ] handleShareListItemLinkClick() ');
        shareLinkTimeline.restart();
        console.log('Track: Clipboard copy');
        dataLayer.push({
            'event':'menuItem',
            'label':'Copy Clipboard Share'
        });
    }

    // ----------------------------------------------------------------------------------

    function enableNavToggleButton() {
        console.log('[ nav ] *** enableNavToggleButton()');
        elements.toggleButton.disabled = false;
        elements.toggleButton.classList.remove('is-disabled');
    }

    function disableNavToggleButton() {
        console.log('[ nav ] *** disableNavToggleButton()');
        elements.toggleButton.disabled = true;
        elements.toggleButton.classList.add('is-disabled');
    }

    function showModal() {
        modalIsShown = true;
        elements.modal.classList.add('is-shown');
        elements.primaryNavList.style.pointerEvents = 'all';

        toggleButtonTimeline.restart();
        shareButtonsTimeline.pause(0);
        // shareLinkTimeline.pause(0);

        showModalTimeline.restart();
        hideModalTimeline.stop();
    }

    function hideModal() {
        modalIsShown = false;
        elements.modal.classList.remove('is-shown');
        toggleButtonTimeline.reverse();
        shareButtonsTimeline.stop();
        shareLinkTimeline.stop();

        showModalTimeline.stop();
        hideModalTimeline.restart();
    }

    function handleShowNextButton(topic, delay = showNextButtonDelay) {
        console.log('%c[ nav ] %c >>> showNextButton() delay: ' + delay, 'color: orange;', 'background: orange; color: white; padding: 0 4px;');

        TweenLite.killDelayedCallsTo(showNextButton);
        TweenLite.killDelayedCallsTo(shakeNextButton);

        // showNextButtonTimeout = setTimeout(showNextButton, delay * 1000);
        TweenLite.delayedCall(delay, showNextButton);

        // Show the Next Button after X seconds
        // TweenLite.delayedCall(delay, showNextButton);

        // Shake the Next Button after X + Y seconds
        // TweenLite.delayedCall(delay + firstShakeNextButtonDelay, shakeNextButton);
    }

    function showNextButton() {
        showNextButtonTimeline.restart();
    }

    function hideNextButton() {
        showNextButtonTimeline.reverse();
        clearShakeNextButtonAnimationClass();
    }

    function shakeNextButton() {
        console.log('%c[ nav ] %c >>> shakeNextButton()', 'color: orange;', 'font-weight: bold; background: orange; color: white; padding: 0 4px;');
        elements.nextButtonCircle.classList.add('shake');

        TweenLite.delayedCall(1.01, shakeNextButtonAnimationComplete);
    }

    function shakeNextButtonAnimationComplete() {
        // console.log('%c[ nav ] %c ~~~ shake COMPLETE!! Shaking again in ' + subsequentShakeNextButtonDelay + ' seconds...', 'color: orange;', 'background: orange; color: white; padding: 0 4px;');
        clearShakeNextButtonAnimationClass();
        TweenLite.delayedCall(subsequentShakeNextButtonDelay, shakeNextButton);
    }

    function clearShakeNextButtonAnimationClass() {
        elements.nextButtonCircle.classList.remove('shake');
    }

    function enableNextButton() {
        // console.log('[ nav ] >> enableNextButton() Next Button ENABLED +++');
        elements.nextButton.disabled = false;
    }

    function disableNextButton() {
        // console.log('[ nav ] >> disableNextButton() Next Button DISABLED ---');
        // console.log('%c[ nav ] %c >>> XXX resetting timeouts for shake/show next button XXX', 'color: orange;', 'background: orange; color: white; padding: 0 4px;');
        elements.nextButton.disabled = true;

        TweenLite.killDelayedCallsTo(showNextButton);
        TweenLite.killDelayedCallsTo(shakeNextButton);

        hideNextButton();
    }

    // All Social sharing and pre order link handling is done inside of share.js

    // ----------------------------------------------------------------------------------

    // Public API
    return {
        init
    };
})();

SSG.PubSub.subscribe(SSG.messages.APP.INIT, nav.init);

export default nav;
