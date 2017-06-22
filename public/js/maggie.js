$(document).ready(function(){ 
    $(window).resize(function() {
        $('.tudobem-center').each(function(index) {
            var w = -$(this).width()/2;;
            $(this).css({'margin-left': w });
        });
    }).resize();

    $('#tudobem-click-about').click(function(){
        if ($(this).hasClass('hidden')) {
            $('#tudobem-about').show();
            $('#tudobem-dates').hide();
            var widthTitle = $('#tudobem-title').width();
            $('#tudobem-about').width(widthTitle);
            $('#tudobem-about').css({'margin-left': -(widthTitle)/2 });
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
            var widthTitle = $('#tudobem-title').width();
            $('#tudobem-dates').width(widthTitle);
            console.log(widthTitle);
            $('#tudobem-dates').css({'margin-left': -widthTitle/2 });
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



