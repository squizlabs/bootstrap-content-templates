
// function for initialising any bct's found on the current screen
function iniBctWrappers() {
    // find all bct wrappers on the screen and initialise them with the bct plugin
    $('.bct-wrapper').not('.initialised').each(function () {
        iniBct(this);
    });
    // add class to the body to indicate that we have initialised the bct plugin
    $('body').addClass('bct');
}

// load the required CSS and JS into the head if we haven't done it yet
if (document.getElementById('bct-js') == undefined) {
    // load the CSS files in the <head>
    document.head.insertAdjacentHTML('beforeend', '\
        <link rel="stylesheet" href="https://matrix.squiz.net/__data/assets/css_file/0022/25285/matrix-bootstrap.min.css">\
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" id="fa_stylesheet">\
        <link rel="stylesheet" href="https://matrix.squiz.net/__data/assets/css_file/0019/26065/fontawesome-iconpicker.css">\
        <link rel="stylesheet" href="https://matrix.squiz.net/__data/assets/css_file/0015/25341/bct.css?v=${Math.random()}+">\
    ');

    // load the JS files in the <head>
    const s = document.createElement('script');
    s.src = `https://matrix.squiz.net/__data/assets/js_file/0016/25315/matrix-bootstrap.min.js?v=${Math.random()}`;
    s.id = 'bct-js';
    document.head.appendChild(s);

    const s2 = document.createElement('script');
    s2.src = 'https://matrix.squiz.net/__data/assets/js_file/0020/26066/fontawesome-iconpicker.js';
    document.head.appendChild(s2);

    const s3 = document.createElement('script');
    s3.onload = function () {
    setTimeout(() => {
        iniBctWrappers();
    }, 50);
    };
    s3.src = `https://matrix.squiz.net/__data/assets/js_file/0016/25360/bct.js?v=${Math.random()}`; // sq-ct.js
    document.head.appendChild(s3);
} else {
    // CSS and JS is already loaded, so we just need to initialise the containers
    setTimeout(() => {
    if ($('body').hasClass('bct')) {
        iniBctWrappers();
    }
    }, 50);
}
