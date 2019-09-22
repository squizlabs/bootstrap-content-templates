function iniCtWrappers(){
    $('.sq-ct-wrapper').not('.initialised').each(function(){
        iniCt(this);
    });
}

//load the required CSS and JS into the head
if(document.getElementById('sq-ct-js') == undefined){
    //add the JS to the head
    var s = document.createElement('script');
    s.id = 'sq-ct-js';
    s.src = 'https://matrix.squiz.net/__data/assets/js_file/0016/25315/matrix-bootstrap.min.js'; // bootstrap.js
    document.head.appendChild(s);
    
    var s2 = document.createElement('script');
    s2.src = 'https://matrix.squiz.net/__data/assets/js_file/0020/26066/fontawesome-iconpicker.js?v='+Math.random(); // fontawesome-iconpicker.js
    document.head.appendChild(s2);
    
    var s3 = document.createElement('script');
    s3onload = 'iniCtWrappers();';
    s3.src = 'https://matrix.squiz.net/__data/assets/js_file/0016/25360/sq-ct.js?v='+Math.random(); // sq-ct.js
    document.head.appendChild(s3);
    
    //add the CSS to the head
    var c = document.createElement('link');
    c.rel = 'stylesheet';
    c.href = 'https://matrix.squiz.net/__data/assets/css_file/0022/25285/matrix-bootstrap.min.css'; // bootstrap.css
    document.head.appendChild(c);
    
    var c2 = document.createElement('link');
    c2.rel = 'stylesheet';
    c2.id = 'fa_stylesheet';
    c2.href = 'https://use.fontawesome.com/releases/v5.5.0/css/all.css'; // fontawesome.css
    document.head.appendChild(c2);
    
    var c3 = document.createElement('link');
    c3.rel = 'stylesheet';
    c3.href = 'https://matrix.squiz.net/__data/assets/css_file/0019/26065/fontawesome-iconpicker.css?v='+Math.random(); // fontawesome-iconpicker.css
    document.head.appendChild(c3);
    
    var c4 = document.createElement('link');
    c4.rel = 'stylesheet';
    c4.href = 'https://matrix.squiz.net/__data/assets/css_file/0015/25341/sq-ct.css?v='+Math.random(); // sq-ct.css
    document.head.appendChild(c4);
    
    $('body').addClass('sq-ct');
}

setTimeout(function(){
    iniCtWrappers();
}, 100);
