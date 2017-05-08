window.Clipboard = require('clipboard');

const desktop = (function() {

    const elements = {};
    const enterTimeline = new TimelineLite();
    const shareTimeline = new TimelineLite({ onComplete: handleShareTimelineComplete });

    const isClipboardSupported = Clipboard.isSupported();
    let shareLinkClipboard;

    function init() {
        getElements();
        setupTimelines();
        addEventListeners();

        enterTimeline.play();
    }

    function getElements() {
        elements.logo = document.getElementById('logo');
        elements.share = document.getElementById('share');
        elements.preorder = document.getElementById('preorder');
        elements.phone = document.getElementById('phone');
        elements.phoneDarken = document.getElementById('phoneDarken');
        elements.shareSuccess = document.getElementById('shareSuccess');
        elements.introducing = document.getElementById('introducing');
        elements.galaxys8 = document.getElementById('galaxys8');
        elements.instructions = document.getElementById('instructions');
    }

    function setupTimelines() {
        // --- Enter
        enterTimeline.stop();

        enterTimeline.timeScale(1.5);
        enterTimeline.from(elements.phone, 1.5, { ease: Sine.easeInOut, opacity: 0 }, 0);
        enterTimeline.from(elements.phoneDarken, 2, { ease: Sine.easeInOut, opacity: 0 });

        enterTimeline.from(elements.introducing, 1.5, { ease: Sine.easeInOut, opacity: 0 }, '-=1.5');
        enterTimeline.from(elements.galaxys8, 1.5, { ease: Sine.easeInOut, opacity: 0 }, '-=0.25');
        enterTimeline.from(elements.logo, 1.5, { ease: Sine.easeInOut, opacity: 0 }, '-=1.4');
        enterTimeline.from(elements.instructions, 1.5, { ease: Sine.easeInOut, opacity: 0 }, '-=0.75');
        //
        enterTimeline.from(elements.preorder, 2, { ease: Sine.easeInOut, autoAlpha: 0 }, '-=1.5');
        enterTimeline.from(elements.share, 2, { ease: Sine.easeInOut, autoAlpha: 0 }, '-=1.5');

        // --- Share Success
        shareTimeline.stop();
        shareTimeline.to(elements.share, 0.25, { ease: Sine.easeOut, autoAlpha: 0 });
        shareTimeline.from(elements.shareSuccess, 0.5, { ease: Sine.easeIn, opacity: 0 }, 0);
        shareTimeline.to(elements.shareSuccess, 0.25, { ease: Sine.easeIn, opacity: 0 }, 2);
        shareTimeline.to(elements.share, 1, { ease: Sine.easeOut, autoAlpha: 1 }, 2);
    }

    function addEventListeners() {
        // elements.share.addEventListener('click', handleShareClick, false);
        elements.preorder.addEventListener('click', handlePreorderClick, false);

        if ( isClipboardSupported ) {
            shareLinkClipboard = new Clipboard(elements.share);
            //elements.share.setAttribute('data-clipboard-text', 'SET TEXT @ ' + (new Date()).toLocaleTimeString() );
            shareLinkClipboard.on('success', handleShareLinkSuccess, false);
        }
    }

    function handleShareLinkSuccess(event) {
        console.log('Track desktop share');
        dataLayer.push({
            'event':'Desktop Default Page',
            'label':'Copy Clipboard Share'
        });

        elements.share.disabled = true;
        shareTimeline.restart();
    }

    function handleShareTimelineComplete() {
        elements.share.disabled = false;
    }

    function handlePreorderClick(event) {
        let cc = event.target.dataset.cc;
        let url = event.target.href;
        console.log('Track desktop preorder '+cc+', '+url);
        dataLayer.push({
            'event':'Desktop Default Page',
            'label':'Pre-Order Click',
            'country': cc,
            'clickthru_url': url
        });

        //event.preventDefault();

        const tapX = event.offsetX + 'px';
        const tapY = event.offsetY + 'px';

        // console.log('tap: ', tapX, tapY, event);

        createButtonTapRipple(event.target, tapX, tapY);
    }

    // :: BUTTON Tap ripples
    function createButtonTapRipple(container, x, y, completeCallback) {
        // Create ripple element
        const tapRipple = document.createElement('div');
        tapRipple.classList.add('tap-ripple');
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
            opacity: 0.2,
            scale: 0.2,
        });
        TweenLite.to(tapRipple, fillTime, {
            ease: Power2.easeInOut,
            opacity: 0.4,
            scale: 1
        });
        TweenLite.from(container, fillTime, {
            ease: Sine.easeOut,
            backgroundColor: '#888'
        });
        TweenLite.to(tapRipple, fadeTime, {
            delay: fillTime,
            ease: Sine.easeOut,
            opacity: 0,
            onComplete: () => {
                container.removeChild(tapRipple);
                TweenLite.killTweensOf(tapRipple);

                if ( completeCallback ) {
                    completeCallback();
                }
            }
        });
    }

    return {
        init
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    desktop.init();
});
