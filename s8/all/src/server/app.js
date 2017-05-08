'use strict';

var express = require('express'),
    compression = require('compression'),
    app = express(),
    http = require('http'),
    hbs = require('express-hbs'),
    appPackage = require(__dirname + '/../../package'),
    auth = require('express-basic-auth'),
    localizationData = require('./js/localization'),
    request = require('request'),
    server;

app.engine('hbs', hbs.express4({
    partialsDir: [
        __dirname + '/views/partials',
        __dirname + '/views/partials/features/',
        __dirname + '/views/partials/global/'
    ]
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(compression({
    threshold: 1,
    filter: function (req, res) {
        return /json|text|javascript|dart|image\/webp|image\/svg\+xml|application\/x-font-ttf|application\/vnd\.ms-opentype|application\/vnd\.ms-fontobject|application\/x-tgif/.test(res.getHeader('Content-Type'));
    }
}));

app.get('/status', (req, res) => {
    res.json({
        BUILD_VERSION: process.env.BUILD_VERSION,
        BUILD_DATE: process.env.BUILD_DATE,
        ENVIRONMENT: process.env.NODE_ENV,
        REGION: process.env.BUILD_REGION,
        status: 'ok'
    });
});

//adding basic auth
function getUnauthorizedResponse(req) {
    return req.auth ?
        ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected') :
        'No credentials provided'
}


// if (process.env.NODE_ENV !== 'local' && process.env.AUTH_ENABLED == 'true') {
//     //hack for stage password
//     if (process.env.NODE_ENV == 'dev') {
//         app.use(auth({
//             users: { 'rga': 'twilight_wisp' },
//             challenge: true,
//             realm: 'rgadev',
//             unauthorizedResponse: getUnauthorizedResponse
//         }));
//     }
//     else {
//         app.use(auth({
//             users: { 'samsung': 'oTRCxZb4LXemGicRA_ewVJv' },
//             challenge: true,
//             realm: 'rgadev',
//             unauthorizedResponse: getUnauthorizedResponse
//         }));
//     }
// }

var localDatas;

app.get('/headers', (req, res) => {
    res.json(req.headers);
});

// app.get('/geo', (req, res) => {
//     var locale = "US";
//     var source = "default"
//     if (req.headers["cloudfront-viewer-country"]) {
//         locale = req.headers["cloudfront-viewer-country"];
//         source = "cloudfront"
//         localDatas = locale;
//     }
//     res.json({
//         locale: locale,
//         source: source,
//         status: "ok"
//     });
// });


//console.log(locale);

//console.log('Language: '+curLocalizationData.preOrderLink);

// var preOrderLink = localizationData['US'].link;
// var screenDisclaimer = localizationData['US'].disclaimer;

app.use(express.static(__dirname + '/../../build'));

console.log('> starting server: ', process.env.NODE_ENV);


// serve index.hbs
// TODO refactor paths and move to a different file if there will be more than /
app.get('/', (req, res) => {
    var cc = 'us';
    var expString = 'd';
    if (req.headers["cloudfront-viewer-country"]) {
        cc = req.headers["cloudfront-viewer-country"];
    }
    if (req.headers["cloudfront-is-mobile-viewer"] === 'true' || req.headers["cloudfront-is-mobile-viewer"] === true) {
        expString = 'm';
    }
    if ((process.env.NODE_ENV === 'local' || process.env.NODE_ENV == 'dev') && /mobile/i.test(req.headers['user-agent'])) {
        expString = 'm';
    }
    cc = cc.toLowerCase();
    res.redirect('/' + expString + '/us/');
});

app.get('/:exp/:language', (req, res) => {

    let expCheck = '';
    let ccCheck = '';

    //Define URL check vars
    if (req.headers["cloudfront-is-mobile-viewer"] === 'true' || req.headers["cloudfront-is-mobile-viewer"] === true) {
        expCheck = 'm';
    } else if ((process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'stg') && /mobile/i.test(req.headers['user-agent'])) {
        expCheck = 'm';
    } else {
        expCheck = 'd';
    }

    if (req.headers["cloudfront-viewer-country"]) {
        ccCheck = req.headers["cloudfront-viewer-country"].toLowerCase();
    } else {
        ccCheck = 'us';
    }


    if (req.params.language) {
        var cc = req.params.language;
    } else {
        var cc = 'us';
    }
    if (req.params.exp) {
        var exp = req.params.exp;
    } else {
        var exp = 'd';
    }

    //Logic here to ensure user ends up at correct experience even if they use the wrong link
    if (expCheck !== exp || ccCheck !== cc) {
        exp = expCheck.toLowerCase();
        cc = ccCheck.toLowerCase();
        res.redirect('/' + exp + '/' + cc + '/');
        return false;
    }

    var screenDisclaimer = localizationData['us'].disclaimer;
    var linkText = localizationData['us'].linkText;
    var link = localizationData['us'].link;
    var homeLink = localizationData['us'].homeLink;
    if (exp === 'm') {
        res.render('index', {
            cc: 'us',
            linkText: linkText,
            link: link,
            homeLink, homeLink,
            screenDisclaimer: screenDisclaimer
        });
    } else {
        res.render('desktop', {
            cc: 'us',
            linkText: linkText,
            link: link,
            homeLink, homeLink,
            screenDisclaimer: screenDisclaimer
        });
    }
})


// app.get('/nauman-analytics-and-social-testing-page', (req, res) => {
//     let cc = 'us'
//     if (req.headers["cloudfront-viewer-country"]) {
//         cc = req.headers["cloudfront-viewer-country"].toLowerCase();
//     } 

//     var screenDisclaimer = localizationData[cc].disclaimer;
//     var linkText = localizationData[cc].linkText;
//     var link = localizationData[cc].link;
//     var homeLink = localizationData[cc].homeLink;

//     res.render('landing', {
//         cc: cc,
//         linkText: linkText,
//         link: link,
//         homeLink, homeLink,
//         screenDisclaimer: screenDisclaimer
//     });
// })

server = http.createServer(app);
server.listen(8081);
server.on('listening', function () {
    console.log('> server listening on port: ', this.address().port);
});