const nav = (function() {

    const elements = {};
    let isShown = false;
    let fillPillToken;

    function init() {
        SSG.PubSub.unsubscribe(nav.init);

        getElements();

        // Listen for global navigation changes
        SSG.PubSub.subscribe(SSG.messages.APP.NAVIGATE, handleNavigate);
    }

    function getElements() {
        elements.container = document.getElementById('navPills');
        elements.navPills = document.querySelectorAll('.nav-pills__link');

        Array.prototype.slice.call(elements.navPills).forEach( (navPill, index) => {
            navPill.setAttribute('data-nav-index', index);
        });
    }

    function handleNavigate(topic, navId) {
        if ( !isShown ) {
            showPills();
        }

        setActiveNavPill(navId);
    }

    function getNavId(element) {
        return element.getAttribute('data-nav-id');
    }

    function clearActiveNavPill() {
        const pill = getActiveNavPill();
        const pillFill = getActiveNavPillFill();

        if (pill) {
            pill.classList.remove('is-active');
            TweenLite.killTweensOf(pillFill);
            TweenLite.set(pillFill, {clearProps: 'width'});
            // TweenLite.to(pillFill, 0.333, {
            //     opacity: 0,
            //     onComplete: () => {
            //         TweenLite.set(pillFill, { opacity: 1, width: 0 });
            //     }
            // });
        }
    }

    function clearFullNavPills() {
        const fullNavPills = Array.prototype.slice.call(document.querySelectorAll('.nav-pills__link.is-full'));

        for (let i = 0; i < fullNavPills.length; i++) {
            fullNavPills[i].classList.remove('is-full');
        }
    }

    function setActiveNavPill(navId) {
        clearActiveNavPill();
        clearFullNavPills();

        const pill = getNavPillById(navId);
        const pillFill = getNavPillFillById(navId);

        if (pill) {
            const navIndex = parseInt(pill.getAttribute('data-nav-index'), 10);
            console.info('[ nav ] setActiveNavLink() ::: navIndex: ', navIndex);

            for (let i = 0; i < navIndex; i++) {
                const previousNavLink = getNavPillByIndex(i);
                console.log('previousNavLink: ', previousNavLink);
                previousNavLink.classList.add('is-full');
            }

            pill.classList.add('is-active');
            // TweenLite.to(pillFill, 10, { width: '100%' });
        } else {
            console.warn(`[ navPills ] getElementByNavId: Could not find element with navId "${navId}", querySelector: '#navPills a[data-nav-id="${navId}"]'`);
        }
    }

    function fillActivePill(percentage, time, onFillComplete) {
        let pillFill = getActiveNavPillFill();

        if ( pillFill ) {
            TweenLite.killTweensOf(pillFill);
            TweenLite.to(pillFill, time || 0.75, {
                width: percentage + '%'
            });

            // Callback
            if ( onFillComplete ) {
                TweenLite.delayedCall((time || 0.75) + 0.01, onFillComplete);
            }
        }
    }

    function getNavPillById(navId) {
        return document.querySelector(`#navPills a[data-nav-id="${navId}"]`);
    }

    function getNavPillByIndex(index) {
        return document.querySelector(`#navPills a[data-nav-index="${index}"]`);
    }

    function getNavPillFillById(navId) {
        return document.querySelector(`#navPills a[data-nav-id="${navId}"] .nav-pills__link__inner__fill`);
    }

    function getActiveNavPill() {
        return document.querySelector('#navPills .is-active');
    }

    function getActiveNavPillFill() {
        return document.querySelector('#navPills .is-active .nav-pills__link__inner__fill');
    }

    function showPills() {
        elements.container.classList.add('show');
    }

    function hidePills() {
        elements.container.classList.remove('show');
    }

    // Public API
    return {
        init,
        fillActivePill,
        showPills,
        hidePills,
    };
})();

SSG.PubSub.subscribe(SSG.messages.APP.INIT, nav.init);

export default nav;
