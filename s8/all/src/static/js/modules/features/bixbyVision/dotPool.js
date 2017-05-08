import {floorRandomBetween, injectOpacity} from '../../../common/utils';

const doublePi = 2 * Math.PI;

function DotPool({ctx, totalDots, sizes, largePercentage, mediumPercentage, objectPoints, canvasWidth, canvasHeight, collapsePoint}) {
    this.ctx = ctx;
    this.totalDots = totalDots;
    this.objectPoints = objectPoints;
    this.objectPointsLength = objectPoints.length();
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.collapsePoint = collapsePoint;
    this.dots = [];

    this.stopped = true;

    const getDotSize = (i) => {
        let percent = ( i / totalDots );

        if ( percent >= largePercentage ) {
            return sizes.large;
        }

        if ( percent >= mediumPercentage ) {
            return sizes.medium;
        }

        return sizes.small;
    };

    // Create Dots
    let dot, dotSize;
    for (let i = 0; i < this.totalDots; i++) {
        dotSize = getDotSize(i);
        dot = new Dot( dotSize, dotSize === sizes.large );
        this.dots.push(dot);
    }

    this.restart = this.restart.bind(this);
    this.stop = this.stop.bind(this);
    this.collapse = this.collapse.bind(this);
    this.getRandomPointOnObjectPath = this.getRandomPointOnObjectPath.bind(this);
}

DotPool.prototype = {
    restart: function() {
        console.log('DotPool.restart()');
        this.stopped = false;

        // enterTimeline.to(dot, 0.333, {
        //     ease: Sine.easeInOut,
        //     attr: {
        //         cx: dotTarget[0] - 240,
        //         cy: dotTarget[1]
        //     },
        // }, 1.967 + dotDelay);

        const minDotY = this.canvasHeight * 0.3;
        const maxDotY = this.canvasHeight * 0.9;

        this.dots.forEach( (dot, index) => {
            dot.activate({
               x: floorRandomBetween(0, this.canvasWidth),
               y: floorRandomBetween(minDotY, maxDotY)
           }, this.getRandomPointOnObjectPath());
       });
    },
    drawDots: function() {
        if ( this.stopped ) {
            return;
        }

        let dot;
        for (let i = 0; i < this.totalDots; i++) {
            dot = this.dots[i];

            this.ctx.beginPath();
            this.ctx.fillStyle = injectOpacity(dot.color, dot.opacity);
            // console.log('fill :: ' + this.ctx.fillStyle);
            this.ctx.arc(dot.x, dot.y, dot.radius * dot.scale, 0, doublePi, false);
            this.ctx.fill();
        }
    },
    collapse: function() {
        TweenLite.killTweensOf(this.dots);

        let dot;
        for (let i = 0; i < this.totalDots; i++) {
            dot = this.dots[i];
            TweenLite.fromTo(this.dots[i], 0.2, {
                opacity: 1,
                // scale: 1,
                colorProps: { color: 'rgba(1, 188, 169, 1)' },
            }, {
                ease: Sine.easeIn,
                x: this.collapsePoint.x + floorRandomBetween(-10, 10),
                y: this.collapsePoint.y + floorRandomBetween(-10, 10),
                scale: 0,
                opacity: 0,
                colorProps: { color: 'rgba(255, 255, 255, 1)' },
                // colorProps: { color: '#FFFFFF' },
                // opacity: 0,
            });

            setTimeout(this.stop, 500);
        }
    },
    stop: function() {
        TweenLite.killTweensOf(this.dots);
        this.stopped = true;
    },
    getRandomPointOnObjectPath() {
        const [x, y] = this.objectPoints.at( Math.random() * this.objectPointsLength );
        return {x, y};
    }
};

window.DotPool = DotPool;
