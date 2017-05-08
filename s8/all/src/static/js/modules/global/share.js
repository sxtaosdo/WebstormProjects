import {isClipboardSupported} from '../../common/utils';

function Share(selector) {
    console.log('new Share() ********* selector: ', selector);

    // ::: Get elements
    const $container = $(selector);
    this.container = $container.get(0);

    this.toggle = $container.find('.share__toggle').get(0);
    //this.buttons = $container.find('.share__buttons').get(0);
    this.buttonsContainer = $container.find('.share__buttons').get(0);
    this.buttons = $container.find('.share__button').get();
    this.shareButtons = document.querySelectorAll('.share__elem');
    this.preorderButtons = document.querySelectorAll('.preorder__elem');
    this.navShareButtons = $('.nav-modal nav__link').get();
    // console.log(this.buttons);
    this.toggleTimeline = new TimelineLite();

    const $clipboardButton = $container.find('.share__button[data-shareid="clipboard"]');
    const $clipboardSuccessMessage = $container.find('.share__clipboard-success');

    this.setupToggleTimeline = this.setupToggleTimeline.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleShareLinkSuccess = this.handleShareLinkSuccess.bind(this);

    this.setupToggleTimeline();
    this.toggle.addEventListener('click', this.handleToggleClick, false);

    // Add analytics listeners
    for (let i = 0; i < this.shareButtons.length; i++) {
        let button = this.shareButtons[i];
        if (button.dataset.shareid === 'facebook') {
            button.addEventListener('click', this.handleFacebookClick, false);
        } else if (button.dataset.shareid === 'twitter') {
            button.addEventListener('click', this.handleTwitterClick, false);
        }
    }

    for (let i = 0; i < this.preorderButtons.length; i++) {
        let button = this.preorderButtons[i];
        button.addEventListener('click', this.handlePreOrderClick, false);
    }

    // ::: Add event listeners

    // ::: Clipboard setup
    if ( isClipboardSupported ) {
        this.clipboardButton = $clipboardButton.get(0);
        this.clipboardSuccessMessage = $clipboardSuccessMessage.get(0);
        this.clipboard = new Clipboard(this.clipboardButton);

        this.shareLinkSuccessTimeline.bind(this);
        this.shareLinkSuccessTimeline();

        this.clipboard.on('success', this.handleShareLinkSuccess, false);
    } else {
        $clipboardButton.remove();
        $clipboardSuccessMessage.remove();
    }
}

Share.prototype = {
    setupToggleTimeline: function() {
        this.toggleTimeline.stop();

        // Hide toggle
        this.toggleTimeline.to(this.toggle, 0.205, {
            ease: Sine.easeOut,
            // right: '6px',
            autoAlpha: 0,
        });

        // Show buttons container
        this.toggleTimeline.from(this.buttonsContainer, 0.333, {
            ease: Sine.easeOut,
            autoAlpha: 0,
        }, 0);

        // Show individual buttons
        this.toggleTimeline.staggerFrom(this.buttons, 0.167, {
            ease: Sine.easeInOut,
            left: '22px',
            scale: 0.8,
            autoAlpha: 0
        }, 0.083, 0, () => {
            // this.toggleTimeline.reverse();
            TweenLite.delayedCall(2, this.toggleTimeline.reverse, [], this.toggleTimeline);
        });
    },
    shareLinkSuccessTimeline: function() {
        this.shareLinkSuccessTimeline = new TimelineLite();
        this.shareLinkSuccessTimeline.stop();

        // Hide buttons
        this.shareLinkSuccessTimeline.to(this.buttonsContainer, 0.333, {
            ease: Sine.easeOut,
            autoAlpha: 0,
        });

        // Show success message
        this.shareLinkSuccessTimeline.from(this.clipboardSuccessMessage, 0.5, {
            ease: Sine.easeInOut,
            autoAlpha: 0,
        }, 0);

        // Hide message
        this.shareLinkSuccessTimeline.to(this.clipboardSuccessMessage, 0.333, {
            ease: Sine.easeInOut,
            autoAlpha: 0,
        }, '+=1.5');

        // Fade toggle button back in
        this.shareLinkSuccessTimeline.to(this.toggle, 0.5, {
            ease: Sine.easeInOut,
            autoAlpha: 1,
        });
    },
    handleToggleClick: function(event) {
        // console.debug('[ nav ] handleToggleClick() ');

        this.toggleTimeline.restart();
        if ( isClipboardSupported ) {
            this.shareLinkSuccessTimeline.pause(0);
        }
        //Analytics
        console.log('Track: share toggled');
        dataLayer.push({
            'event':'PreOrderShare',
            'label':'Share'
        });
    },
    handleShareLinkSuccess: function() {
        console.debug('[ nav ] handleShareLinkSuccess() ');
        //Analytics
        console.log('Track: clipboard copy');
        dataLayer.push({
            'event':'PreOrderShare',
            'label':'Copy Clipboard Share'
        });
        TweenLite.killDelayedCallsTo(this.toggleTimeline.reverse);
        this.shareLinkSuccessTimeline.restart();
    },
    handleFacebookClick: function(event) {
        let source = event.target.dataset.origin;
        console.log('source: '+source);
        console.log(event.target);
        console.debug('[ nav ] handleFacebookClick() ');
        if (source === 'nav') {
            console.log('Track NAV: facebook click');
            dataLayer.push({
                'event':'menuItem',
                'label':'FB Share'
            });
        } else {
            console.log('Track PREORDER: facebook click');
            dataLayer.push({
                'event':'PreOrderShare',
                'label':'FB Share'
            });    
        }
        
        FB.ui({
            method: 'share',
            mobile_iframe: true,
            href: 'http://explorethenextgalaxy.com/',
        }, function(response){});
    },
    handleTwitterClick: function(event) {
        let source = event.target.dataset.origin;
        console.debug('[ nav ] handleTwitterClick() ');
        if (source === 'nav') {
            console.log('Track NAV: twitter click');
            dataLayer.push({
                'event':'menuItem',
                'label':'TW Share'
            });
        } else {
            console.log('Track PREORDER: twitter click');
            dataLayer.push({
                'event':'PreOrderShare',
                'label':'TW Share'
            });
        }
    },
    handlePreOrderClick: function(event) {
        let cc = event.target.dataset.cc;
        let url = event.target.href;
        let source = event.target.dataset.origin;
        if (source === 'nav') {
            console.log('Track: NAV preorder click: '+cc+', '+url);
            dataLayer.push({
                'event':'menuItem',
                'label':'Pre-Order Click',
                'country':cc,
                'clickthru_url':url
            });
        } else {
            console.log('Track: PREORDER preorder click: '+cc+', '+url);
            dataLayer.push({
                'event':'PreOrderShare',
                'label':'Pre-Order Click',
                'country':cc,
                'clickthru_url':url
            });
        }
    }
};

export default Share;
