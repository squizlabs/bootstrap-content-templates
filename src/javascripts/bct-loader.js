//bct plugin vars
var bctCssBootstrap =               'https://cdn.jsdelivr.net/gh/squizlabs/bootstrap-content-templates@master/src/stylesheets/matrix-bootstrap.min.css';
var bctCssFontawesome =             'https://use.fontawesome.com/releases/v5.5.0/css/all.css';
var bctCssFontawesomeIconPicker =   'https://cdn.jsdelivr.net/gh/squizlabs/bootstrap-content-templates@master/src/stylesheets/fontawesome-iconpicker.css';
var bctCssMain =                    'https://matrix.squiz.net/__data/assets/css_file/0015/25341/bct.css?v='+Math.random();
var bctJsBootstrap =                'https://cdn.jsdelivr.net/gh/squizlabs/bootstrap-content-templates@latest/src/javascripts/matrix-bootstrap.min.js';
var bctJsFontawesomeIconPicker =    'https://cdn.jsdelivr.net/gh/squizlabs/bootstrap-content-templates@latest/src/javascripts/fontawesome-iconpicker.js';
var bctJsMain =                     'https://matrix.squiz.net/__data/assets/js_file/0016/25360/bct.js?v='+Math.random();

//function for initialising the bct plugin
function iniBctWrappers(){
    //find all bct wrappers on the screen and initialise them with the bct plugin
    $('.bct-wrapper').not('.initialised').each(function(){
        bctInit(this);
    });
    //add class to the body to indicate that we have initialised the bct plugin
    $('body').addClass('bct');
}

//load the required CSS and JS into the head if we haven't done it yet
if(!$('body').hasClass('bct-files-loaded')){

    //load the CSS files
    document.head.insertAdjacentHTML('beforeend', '\
        <link rel="stylesheet" href="'+ bctCssBootstrap +'">\
        <link rel="stylesheet" href="'+ bctCssFontawesome +'" id="fa_stylesheet">\
        <link rel="stylesheet" href="'+ bctCssFontawesomeIconPicker +'">\
        <link rel="stylesheet" href="'+ bctCssMain +'">\
    ');

    //load the JS files
    $.getScript(bctJsBootstrap);
    $.getScript(bctJsFontawesomeIconPicker);
    $.getScript(bctJsMain)
        .done(function() {
            setTimeout(function(){
                iniBctWrappers();
            }, 100);
        }
    );

    //add class to body to indicate that we've loaded all the files
    $('body').addClass('bct-files-loaded');

}else{
    //we've already loaded the files, so we just need to initialise the plugin

    if(window.location.href.indexOf('_admin') > -1) {
        //if we are in admin mode, we need to reload some of the scripts
        if(!$('#main_form').hasClass('bct-admin-loaded')){
            //in admin we need to reload this CSS file into the body tag because of a weird bug
            document.body.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="'+ bctCssMain +'?v='+Math.random()+'+">');
            //reload the JS files using a promise, when all are completed, we can call the bct ini function again
            $.when(
                $.getScript(bctJsBootstrap),
                $.getScript(bctJsFontawesomeIconPicker),
                $.Deferred(function( deferred ){
                    $( deferred.resolve );
                }),
                //add class to the main admin form tag to indicate we've reloaded the scripts in admin
                $('#main_form').addClass('bct-admin-loaded')
            ).done(function(){
                iniBctWrappers();
            });
        }
    }else{
        //if we're in Edit+, we can just call the ini function again
        setTimeout(function(){
            if($('body').hasClass('bct')){
                iniBctWrappers();
            }
        }, 100);
    }
}


