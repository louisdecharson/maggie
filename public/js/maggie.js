$(document).ready(function(){
    var wd = $(window).width();
    if (wd < 800) {
        var fontsize = 200*wd/800;
        $('#tudobem-title').css({'font-size':fontsize.toString()+"px"});
        $('#tudobem-menu').css({'font-size':wd/800*100+"%"});
        $('#tudobem-dates').css({'font-size':wd/600*15+"px"});
        $('#tudobem-about').css({'font-size':wd/600*15+"px"});
        $('#tudobem-title').width(0.95*wd);
    }
    
    var sum=0;
    $('#tudobem-menu li').each( function(){ sum += $(this).width(); });
    $('#tudobem-menu').width(sum);
    $('.tudobem-center').each(function(index) {
        var w = -$(this).outerWidth(true)/2;
        $(this).css({'margin-left': w });
    });

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



