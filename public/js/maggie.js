function fontResize(elem,factor) {
    var fontsize = (parseFloat(elem.css('font-size'))*factor).toString()+'px';
    elem.css('font-size',fontsize);
}

$(document).ready(function(){

    var wd = $(window).width();
    console.log('wd: ',wd);
    if (wd < 800) {
        fontResize($('#tudobem-title'),wd/800);
        fontResize($('#tudobem-menu'),wd/800);
        fontResize($('.paragraph'),wd/800);
    }
    
    var sum=0;
    $('#tudobem-menu li').each( function(){ sum += $(this).outerWidth(true); });
    $('#tudobem-menu').width(sum);
    $('.tudobem-center').each(function(index) {
        var w = -$(this).outerWidth(true)/2;
        console.log('outerWidth: ',$(this).outerWidth(true));
        console.log('width ',$(this).width());
        $(this).css({'margin-left': w });
    });

    $(window).resize(function() {
        var wd = $(window).width();
        console.log(wd);
        if (wd < 800) {
            fontResize($('#tudobem-title'),wd/800);
            fontResize($('#tudobem-menu'),wd/800);
            fontResize($('.paragraph'),wd/800);
        }
        
        var sum=0;
        $('#tudobem-menu li').each( function(){ sum += $(this).outerWidth(true); });
        $('#tudobem-menu').width(sum);
        $('.tudobem-center').each(function(index) {
            var w = -$(this).width()/2;
            $(this).css({'margin-left': w });
        });
    }).resize();

    $('#tudobem-click-about').click(function(){
        if ($(this).hasClass('hidden')) {
            $('#tudobem-about').show();
            $('#tudobem-dates').hide();
            $('#tudobem-about').width(sum);
            $('#tudobem-about').css({'margin-left': -sum/2 });
            $(this).removeClass('hidden');
            $(this).addClass('shown');
            $('#tudobem-click-dates').addClass('hidden');
            $('#tudobem-click-dates').removeClass('shown');
        } else {
            $('#tudobem-about').hide();
            $(this).removeClass('shown');
            $(this).addClass('hidden');
        }
    });
    $('#tudobem-click-dates').click(function(){
        if ($(this).hasClass('hidden')) {
            $('#tudobem-dates').show();
            $('#tudobem-about').hide();
            $('#tudobem-dates').width(sum);
            $('#tudobem-dates').css({'margin-left': -sum/2 });
            $(this).removeClass('hidden');
            $(this).addClass('shown');
            $('#tudobem-click-about').addClass('hidden');
            $('#tudobem-click-about').removeClass('shown');
        } else {
            $('#tudobem-dates').hide();
            $(this).removeClass('shown');
            $(this).addClass('hidden');
        }
    });
});



