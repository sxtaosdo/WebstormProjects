import PubSub, {messages} from '../../common/PubSub';

function ProgressBar() {
    this.init();

    this.loadProgressSubscription = PubSub.subscribe(messages.APP.LOAD_PROGRESS, this.setProgress.bind(this));
}

ProgressBar.prototype = {
    init: function() {
        // console.debug('*** new ProgressBar()');

        this.element = document.querySelector('.progressBar');
        // this.element.style.display = "block";
        this.fillElement = document.querySelector('.progressBar__fill');
    },
    setProgress: function(topic, data) {
        // console.log('\t[ progressBar ] setProgress() topic: ', topic, 'data: ', data);
        this.fillElement.style.width = (data.percentage * 100) + '%';

        if (data.percentage >= 1) {
            this.element.classList.add('is-complete');
            this.destroy();
        }
    },
    destroy: function() {
        // console.debug('[ progressBar ] destroy()');
        PubSub.unsubscribe(this.loadProgressSubscription);
    }
};

function initProgressBar() {
    new ProgressBar();

    // Cleanup initialization sub
    PubSub.unsubscribe(initSubscription);
}

let initSubscription = PubSub.subscribe(messages.APP.INIT_LOAD, initProgressBar);

export default ProgressBar;
