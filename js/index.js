

/* PARALLAX*/
$(window).stellar({
	 horizontalScrolling: false,
});

/* FADE*/
$(document).ready(function(){
		var $window = $(window);
	var $transbg = $('.intro_wrapper'); 	
		$(window).scroll(function() {
		var transPos = $window.scrollTop() / 900; 
		var trans = 1 - transPos;
		var bylineTrans = 1 - transPos/0.90;
		$transbg.css("opacity",trans);
		$('.content').not('.navbar').css("opacity",bylineTrans);
		$('.snow').css("opacity",bylineTrans);
		});
	});

/* PINNING NAV*/
$(window).scroll(function(){
	$window = $(window);
	$offset = $('.navbar').offset();
	if ($window.scrollTop() > 550){
		$('.nav_fixed').slideDown('fast');
		$('.navbar').fadeOut();
	}
	else{
		$(".nav_fixed").slideUp('fast');
		$('.navbar').fadeIn();
	}
});

/* SNOWFLAKES */
$(window).scroll(function(){
	if ($window.scrollTop() > 350){
		$('.snow').hide();
	}
});

/* LAZY LOADING*/
$(function() {
    $('img').not('intro_background').lazyload({
	    effect : "fadeIn"
    });
    
});