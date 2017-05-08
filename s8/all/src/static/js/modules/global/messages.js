const messages = (function() {

    const elements = {};

    function init() {
        SSG.PubSub.unsubscribe(messages.init);
        console.debug('[ messages ] *** messages.init()');

        getElements();
    }

    function getElements() {
        elements.cookieMessage = document.getElementById('cookieMessage');
        elements.fatalError = document.getElementById('fatalError');
        elements.browserError = document.getElementById('browserError');
        elements.serverError = document.getElementById('serverError');
        elements.cookieMessageDismissButton = document.querySelector('#cookieMessage .banner__dismiss');
    }

    function showCookieMessage() {
        if (document.cookie.replace(/(?:(?:^|.*;\s*)cookieMessageSeen\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
            elements.cookieMessage.classList.remove('is-hidden');
            elements.cookieMessageDismissButton.addEventListener('touchstart', handleCookieMessageDismiss, false);
        }
    }

    function handleCookieMessageDismiss(event) {
        elements.cookieMessageDismissButton.removeEventListener('touchstart', handleCookieMessageDismiss);
        elements.cookieMessage.classList.add('is-hidden');
        
        document.cookie = "cookieMessageSeen=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    }

    return {
        init,
        showCookieMessage
    };
})();

SSG.PubSub.subscribe(SSG.messages.APP.INIT, messages.init);

export default messages;
