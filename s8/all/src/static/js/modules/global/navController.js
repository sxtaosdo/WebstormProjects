const navController = (function() {

    // A reference to the currently displayed feature element
    let activeNavId = 'UNBOX';

    function init() {
        SSG.PubSub.unsubscribe(navController.init);

        SSG.PubSub.subscribe(SSG.messages.APP.NAVIGATE, handleNavigate);
    }

    function handleNavigate(topic, navId) {
        let exitSubToken;

        console.debug('%c[ navController ] *** handleNavigate()%c navId: %c' + navId,
            'padding: 2px 4px; background: #1428A0; color: white;',
            'color: #1428A0',
            'font-family: "SamsungSharpSans-Bold"; font-size: 16px;'
        );
        //Start analytics
       if (navId === 'UNBOX') {
            dataLayer.push({
                'event':'VirtualPageView',
                'virtualPageURL':'/explore',
                'virtualPageTitle':'Explore Demo'
            });
            console.log('Track: VirtualPageView explore');
        } else if (navId === 'INFINITY_DISPLAY') {
            dataLayer.push({
                'event':'VirtualPageView',
                'virtualPageURL':'/display',
                'virtualPageTitle':'Display Demo'
            });
            console.log('Track: VirtualPageView display');
        } else if (navId === 'BIXBY_VISION') {
            dataLayer.push({
                'event':'VirtualPageView',
                'virtualPageURL':'/bixby',
                'virtualPageTitle':'Bixby Demo'
            });
            console.log('Track: VirtualPageView bixby');
        } else if (navId === 'WATER_RESISTANT') {
            dataLayer.push({
                'event':'VirtualPageView',
                'virtualPageURL':'/waterresistance',
                'virtualPageTitle':'Water Resistance Demo'
            });
            console.log('Track: VirtualPageView water resistance');
        } else if (navId === 'LOW_LIGHT_CAMERA') {
            dataLayer.push({
                'event':'VirtualPageView',
                'virtualPageURL':'/camera',
                'virtualPageTitle':'Camera Demo'
            });
            console.log('Track: VirtualPageView camera');
        } else if (navId === 'IRIS_SCAN') {
            dataLayer.push({
                'event':'VirtualPageView',
                'virtualPageURL':'/iris',
                'virtualPageTitle':'Iris Demo'
            });
            console.log('Track: VirtualPageView iris');
        } else if (navId === 'PRE_ORDER') {
            dataLayer.push({
                'event':'VirtualPageView',
                'virtualPageURL':'/PreOrderAndShare',
                'virtualPageTitle':'Pre-Order and Share Page'
            });
            console.log('Track: VirtualPageView preorder');
        }

        //End analytics

        // If we have a new section to navigate to...
        if ( navId ) {
            sequenceExit(activeNavId, navId);

            exitSubToken = SSG.PubSub.subscribe(SSG.messages.SEQUENCE.EXIT_ANIMATION_COMPLETE, () => {
                console.log('%c=== EXIT ANIMATION COMPLETE ===', 'font-weight: bold; letter-spacing: 7px; color: #888;');
                sequenceEnter(navId);
                SSG.PubSub.unsubscribe(exitSubToken);
            });
        }

    }

    function sequenceEnter(navId) {
        activeNavId = navId;
        SSG.PubSub.publish(getSequenceMessages(navId, 'ENTER'));

        if ( navId !== 'PRE_ORDER' && navId !== 'UNBOX' ) {
            console.log(`[ navController.sequenceEnter(${navId}) ] :: publishing SHOW_NEXT_BUTTON...`);
            SSG.PubSub.publish(SSG.messages.APP.SHOW_NEXT_BUTTON);
        }
    }

    function sequenceExit(navId, nextNavId) {
        SSG.PubSub.publish(getSequenceMessages(navId, 'EXIT'), nextNavId);
    }

    function getSequenceMessages(navId, key) {
        if (!SSG.messages.SEQUENCE[navId]) {
            console.error(`[nav] Error: could not getSequenceMessages for navId "${navId}"`);
            return;
        }

        // Return either the sequence object or a specific key of the object
        const sequence = SSG.messages.SEQUENCE[navId];
        return ( !!key ? sequence[key] : sequence );
    }

    return {
        init
    };
})();

SSG.PubSub.subscribe(SSG.messages.APP.INIT, navController.init);

export default navController;
