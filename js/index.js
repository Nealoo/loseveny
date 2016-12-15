// Neal 2016-12-11
// Temporary js file before using angularjs

$(function(){
	
	//set the first screen's height
	function setSection1Height(){
		var h = $(window).innerHeight();
		$('.section-1').css('height', h>1200?1200:h + 'px');
	}
	
	//bind the events related to the scroll
	function whenScroll(){
		var winTop = $(window).scrollTop();
		
		//move the navbar after scroll
		if(winTop > 10){
			$('.navbar').addClass('move');
			$('.top-arrow').css('opacity','1');
		} else {
			$('.navbar').removeClass('move');
			$('.top-arrow').css('opacity','0');
		}
		
		$(".slideanim").each(function(){
			var pos = $(this).offset().top;

			if (pos < winTop + 800) {
				$(this).addClass("slide");
			}

			if($(this).hasClass('slide') && pos > winTop + 800){
				$(this).removeClass('slide');
			}
		});
	}
	
	(function initPage(){
		setSection1Height();
		
		$(window).resize(function(){
			setSection1Height();
		});
		
		//initial the navbar   in case of the scrollTop != 0
		whenScroll();
				
	})();
	
	//listen scroll
	$(window).scroll(function() {
		whenScroll();
	});

	// animation for go to hash position
	$(".navbar a, footer a, .top-arrow a").on('click', function(event) {
		if (this.hash !== "") {

			event.preventDefault();

			var hash = this.hash;

			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 900, function(){

				window.location.hash = hash;
			});
		} // End if
	});

	// is Detail page is availble go to detail page or go to demo page.
	$('.thumbnail img').click(function(){
		$(this).next().find('.btn').each(function(){
			if( $(this).attr('disabled') ){
				return;
			}else {
				$(this)[0].click();
				// console.log($(this));
				return false;
			}
		});
	});
	
	
});