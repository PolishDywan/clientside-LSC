$(()=>{
    if ('alt' in window) {
        alt.on('progressWeb:Start', (text, time, options)=>{
            startBar(text, time * 1000, options);
        });
    }
    function startBar(text, time, options) {
        $('#text').html(text);
        $('#wrapper').fadeIn(300);
        $('.bar').removeAttr('style');
        if (options) {
            if (options.color) $('.bar').css('background-color', options.color);
            if (options.customCSS) $('.bar').css(options.customCSS);
        }
        $('.bar').stop().css({
            width: '0px'
        }).animate({
            width: '98%'
        }, time, 'linear', function() {
            $('#wrapper').fadeOut(600);
        });
    }
});
