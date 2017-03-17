/**
 * Created by cheilchina on 2017/3/15.
 */
$(function () {
    $("#test").swipe({
        swipeStatus: function (event, phase, direction, distance, duration, fingerCount) {
            $(this).find('#swipe_text').text("swiped " + distance + ' px');
            if (phase === $.fn.swipe.phases.PHASE_END || phase === $.fn.swipe.phases.PHASE_CANCEL) {
                //The handlers below fire after the status,
                // so we can change the text here, and it will be replaced if the handlers below fire
                $(this).find('#swipe_text').text("No swipe was made");
            }
        },
        pinchStatus: function (event, phase, direction, distance, duration, fingerCount, pinchZoom) {
            $(this).find('#pinch_text').text("pinched " + distance + " px ");
            if (phase === $.fn.swipe.phases.PHASE_END || phase === $.fn.swipe.phases.PHASE_CANCEL) {
                //The handlers below fire after the status,
                // so we can change the text here, and it will be replaced if the handlers below fire
                $(this).find('#pinch_text').text("No pinch was made");
            }
        },
        swipe: function (event, direction, distance, duration, fingerCount) {
            $(this).find('#swipe_text').text("You swiped " + direction + " with " + fingerCount + " fingers");
        },
        pinchIn: function (event, direction, distance, duration, fingerCount, pinchZoom) {
            $(this).find('#pinch_text').text("You pinched " + direction + " by " + distance + "px, zoom scale is " + pinchZoom);
        },
        pinchOut: function (event, direction, distance, duration, fingerCount, pinchZoom) {
            $(this).find('#pinch_text').text("You pinched " + direction + " by " + distance + "px, zoom scale is " + pinchZoom);
        },
        fingers: $.fn.swipe.fingers.ALL
    });
});
