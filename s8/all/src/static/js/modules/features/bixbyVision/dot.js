import {randomBetween, floorRandomBetween} from '../../../common/utils';

function Dot(size) {
    // console.debug('*** new Dot() size: ', size);
    this.active = false;
    this.color = 'rgba(1, 188, 169, 1)';

    this.radius = Math.floor(size);
    this.scale = 0;

    this.jumpRadius = floorRandomBetween(10, 90); // Pixels
    this.numJumps = -1;
    this.maxJumps = floorRandomBetween(1, 3);

    this.activate = this.activate.bind(this);
    this.appearAt = this.appearAt.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.jump = this.jump.bind(this);
}

Dot.prototype = {
    activate: function(position, objectPosition) {
        this.objectPosition = objectPosition;
        // Reset first
        this.numJumps = -1;

        setTimeout( () => {
            this.appearAt(position, true);
        }, floorRandomBetween(0, 500) );
    },
    appearAt: function(position, startJumping = false) {
        // console.log('[ Dot ] appearAt :: ', position);
        TweenLite.killTweensOf(this);
        TweenLite.set(this, {
            opacity: 0,
            scale: 0,
            colorProps: { color: 'rgba(255, 255, 255, 1)' },
            x: position.x,
            y: position.y,
        });

        // console.log('\t --> starting color: ' + this.color);

        // Appear
        TweenLite.to(this, 0.667, {
            ease: Back.easeOut,
            scale: 1,
            colorProps: { color: 'rgba(1, 188, 169, 1)' },
        });
        // Opacity Wiggle
        TweenLite.to(this, 0.167, {
            ease: Sine.easeOut,
            opacity: 1,
            delay: 0.167,
        });
        TweenLite.to(this, 0.167, {
            ease: Sine.easeOut,
            opacity: 0.3,
            delay: 0.33,
            colorProps: { color: 'rgba(255, 255, 255, 1)' },
        });
        TweenLite.to(this, 0.167, {
            ease: Sine.easeOut,
            opacity: 1,
            delay: 0.5,
            colorProps: { color: 'rgba(1, 188, 169, 1)' },
        });

        // Behavior
        if ( startJumping ) {
            this.jump();
        }
    },
    disappear: function(appearAtObjectPositionAfter = false) {
        TweenLite.killTweensOf(this);
        TweenLite.set(this, {
            colorProps: { color: 'rgba(255, 255, 255, 1)' }
        });
        TweenLite.to(this, 0.5, {
            ease: Sine.easeInOut,
            opacity: 0,
            scale: 0,
            // colorProps: { color: 'rgba(255, 255, 255, 1)' },
            onComplete: () => {
                if (appearAtObjectPositionAfter) {
                    TweenLite.to(this, 0, {
                        delay: randomBetween(0, 0.167),
                        onComplete: () => {
                            this.appearAt(this.objectPosition);
                        }
                    });
                }
            }
        });
    },
    jump: function() {
        this.numJumps++;

        TweenLite.to(this, 0, {
            delay: randomBetween(0.083, 0.667),
            x: ( (Math.round(Math.random()) ? '-=' : '+=') + this.jumpRadius),
            y: ( (Math.round(Math.random()) ? '-=' : '+=') + this.jumpRadius),
            onComplete: () => {
                if (this.numJumps < this.maxJumps) {
                    this.jump();
                } else {
                    this.disappear(true);
                }
            },
        });
    },
    deactivate: function() {
        this.disappear();
    }
};

window.Dot = Dot;
