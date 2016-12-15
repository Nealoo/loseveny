// Neal 2016-12-11
// Temporary js file before using angularjs

$(function(){
	
	function setSection1Height(){
		var h = $(window).innerHeight();
		$('.section-1').css('height', h>1200?1200:h + 'px');
	}
	
	(function initPage(){
		setSection1Height();
		
		$(window).resize(function(){
			setSection1Height();
		});
		
	})();

	// animation for go to hash position
	$(".navbar a, footer a").on('click', function(event) {
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

	//control pictures' slidein
	$(window).scroll(function() {
		$(".slideanim").each(function(){
			var pos = $(this).offset().top;

			var winTop = $(window).scrollTop();
			if (pos < winTop + 800) {
				$(this).addClass("slide");
			}

			if($(this).hasClass('slide') && pos > winTop + 800){
				$(this).removeClass('slide');
			}
		});
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