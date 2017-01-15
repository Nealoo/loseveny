// @Author Neal  loseveny@gmail.com
// @Date 2017-01-12
// For Cucumber Test

$(function(){
	
	/* Global vars
	 * 
	 */
	// transfer data to a object with id index
	var g_data = {};
	
	preprocessData();
	
	/* function preprocessData()
	 * params null
	 * 
	 * transfer data to other form
	 */
	function preprocessData(){
		
		//get data from data.js//
		
		data.forEach(function(v, i, a){
			
			// add flag for handlebars about picture's position
			i == 0? v.start = true:v.start = false;
			i == 5? v.ln    = true:v.ln    = false;
			i >  9? v.ten   = true:v.ten   = false;
			
			g_data[v.id] = v;
			
		});
		
		initDom();
		
	}
	
	/* function initDom()
	 * params null
	 * 
	 * initial the basic dom construction in web page
	 * get tpl from js files in file protocol
	 */
	function initDom(){

		// get menu from data.js then generate menu
		appendTpl($('#tpl-menu'), {'data': g_data }, $('.tpl-menu'));
		// get menu from data.js then generate picture zone
		appendTpl($('#tpl-thumbnail'), {'data': g_data }, $('.tpl-thumbnail'));
		
		// initial the page  show the info of the first picture
		var pid = $('.menu-container').find('.menu-item:eq(0)').addClass('current').data('id');
		$('.pics-current').data('id', pid);
		$('.pics-current').attr('src',g_data[pid].picture);
		
		// generate the info area
		appendTpl($('#tpl-info'), {
				'firstName': g_data[pid].firstName,
				'lastName' : g_data[pid].lastName,
				'info'     : g_data[pid].bio
			}, $('.tpl-info'));
		//add animation for info area's title
		setTimeout(function(){
			$('.ctext-title-init').removeClass('ctext-title-init');
			$('.ctext-content-init').removeClass('ctext-content-init');
		},100);
		
		bindEvents();
		
		// TODO change it to ajax method on server
//		tplAjax('tpls/thumbnail-tpl.html', function(html){
//			var source = html;
//			var template = Handlebars.compile(source);
//			var htmls = template(json);
//			container.prepend(htmls);
//		});
	}
	
	/* function appendTpl
	 * params:
	 * 	tpl:   (jquery object)    template
	 *  data:  (object)           data for template
	 *  target:(jquery object)    where template will insert
	 * 
	 * temp function    get tpl from index.html then append it to target position
	 */
	function appendTpl(tpl, data, target){
		var source   = tpl.html();
		var template = Handlebars.compile(source);
		var html     = template(data);
		target.html(html);
	}
	
	/* function bindEvents()
	 * params null
	 * 
	 * bind animation to picture area
	 * bind interaction effects to menu
	 */
	function bindEvents(){
		//EVENT1 when click the vertical pictures
		$('.pics-inner').click(function(){
			
			//TODO ban picture move in the same time  need a better solution
			if( $('.moving').length > 0 ){
				return false;
			}
			
			//TODO click current picture need a better interaction
			if( $(this).data('id') == $('.pics-current').data('id')){
				// zoom the current pic
				$(this).addClass('active-current');
				setTimeout(function(){$('.active-current').removeClass('active-current')},300);
				
				// interaction in menu
				$('.menu-item.current').addClass('click');
				setTimeout(function(){$('.menu-item.current').removeClass('click')},200);
				return false;
			}
			
			// interaction with menu
			var pid = $(this).data('id');
			$('.menu-id-' + pid).addClass('current').addClass('click')
			.siblings().removeClass('current');
			setTimeout(function(){$('.menu-id-' + pid).removeClass('click')},300);
			
			// the default delay should be 0, because the animation of class .active should be finished now
			// but still set 500ms in case of a bug might caused by extremely quick mouse moving operation
			var movingDelayTime = 500;
			
			// css class .active can extend the picture
			if( !$(this).hasClass('active') ){
				$(this).addClass('active');
				// if didn't extend the picture then wait it extend
				movingDelayTime = 1500;
			}
			
			// set class moving as a flag to show which pic is moving now
			$(this).addClass('moving');
			
			// change the info area
			var pid = $('.pics-inner.moving').data('id');
			appendTpl($('#tpl-info'), {
				'firstName': g_data[pid].firstName,
				'lastName' : g_data[pid].lastName,
				'info'     : g_data[pid].bio
			}, $('.tpl-info'));
			//add animation for info area's title
			setTimeout(function(){$('.ctext-title-init').removeClass('ctext-title-init');},100);
			
			// get the length needed to move
			// class .pics.moving sometimes will change position(offset.left != left 0) so get its parent
			var leftMove = $('.pics-current').offset().left - $('.pics-inner.moving').parent().offset().left;
			
	//		$('.moving').removeClass('moving');
			
			// wait the first animation: .active
			setTimeout(function(){
				$('.pics-inner.active').addClass('active2').css('left',leftMove);
				
				var delayTime = window.innerWidth > 768 ? 1000 : 360;
				
				// wait animation then change the main picture
				setTimeout(function(){
					var innerHtml = $('.pics-inner.active');
					$('.pics-current').parent().html(innerHtml.html())
					.find('.pics-img').addClass('pics-current').removeClass('pics-img');
					
				},delayTime);
				
				// wait the animation then restore it
				setTimeout(function(){
					
					// move back the picture
					$('.pics-inner.active').removeClass('pics-inner active moving active2')
					.removeAttr('style').addClass('pics-inner');
					
				},2000);
				
				setTimeout(function(){$('.ctext-content-init').removeClass('ctext-content-init');},100);
					
			},movingDelayTime);
			
			
			
		});
		
		//EVENT2 when hover more than 3s on a vertical picture
		$('.pics-inner').hover(function(){
	
			var hoverItem = $(this);
			
		    hoverTimer = setTimeout(function(){
		    	
		    	if( !$('.hoverItem').hasClass('moving') ){
		    		hoverItem.addClass('active');
		    		$('.p-first').html(g_data[hoverItem.data('id')].firstName);
		    		$('.p-last').html(g_data[hoverItem.data('id')].lastName);
		    		$('.pics-name').addClass('active');
		    	}
		        
		    },3000);
		},function(){
			
			$('.pics-inner.active:not(.moving)').addClass('active-back');
			$('.pics-name').removeClass('active');
		    clearTimeout(hoverTimer);
		    setTimeout(function(){
		    	$('.pics-inner.active:not(.moving)').removeClass('active active-back');
		    },1500);
		});
		
		//EVENT3 when click the menu
		$('.menu-item').click(function(){
			
			if( $('.menu-top .glyphicon').hasClass('back') ){
				console.log('has');
				$('.menu-xs .menu-top').click();
			}
			
			// interaction with pic area
			var pid = $(this).data('id');
			$('.pics-id-' + pid).click();
//			if( $('.pics-id-' + pid).length > 0 ){
//				$('.pics-id-' + pid).click();
//			}else{
//				console.log('todo more then 10 items');
//			}
		});
		
		// EVENT4 When the > button of Mobile menu clicked
		$('.menu-xs .menu-top').click(function(){
			if( $('.menu-top .glyphicon').hasClass('back') ){
				$('.menu-xs .menu-container').removeClass('open2');
				$('.menu-top .glyphicon').removeClass('back');
				setTimeout(function(){$('.menu-xs .menu-container').removeClass('open1');},1000);
			}else{
				$('.menu-xs .menu-container').addClass('open1 open2');
				$('.menu-top .glyphicon').addClass('back');
			}
		});
	}
	
	/* TODO use it in initDom
	 * function tplAjax
	 * params:
	 * 	tpl:    (type:string)      address of tpl
	 *  callback:(type:function)   callback function
	 * 
	 * Get tpl from interface
	 * can't work in file file protocol
	 */
	function tplAjax(tpl, callback){
		$.ajax({
	 		url: tpl,
	 		type: 'POST',
	 		dataType: 'html',
	 		cache:false,
	 		success: function(html){
	 			callback(html);
	 		},
	 		error: function(){
	 			alert("can read tpl files!");
	 		}
	 	});
	}
	
});