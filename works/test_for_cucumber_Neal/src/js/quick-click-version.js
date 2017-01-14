// @Author Neal  loseveny@gmail.com
// @Date 2017-01-12
// For Cucumber Test

$(function(){
	
	/* Global vars
	 * 
	 */
	// transfer data to a object with id index
	var g_data = {};
	// store a list of data's index
	var g_data_keys = [];
	
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
			
			g_data[v.id] = v;
			g_data_keys.push(v.id);
			
		});
		
		initDom();
		
		//g_data_keys = Object.keys(g_data); 
		
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
			
			// the default delay should be 0, because the animation of class .active should be finished now
			// but still set 500ms in case of a bug might caused by extremely quick mouse moving operation
			var movingDelayTime = 500;
			
			// css class .active can extend the picture
			if( !$(this).hasClass('active') ){
				$(this).addClass('active');
				// if didn't extend the picture then wait it extend
				movingDelayTime = 1500;
			}
			
			//if($(this))
			// set class moving as a flag to show which pic is moving now
			$(this).addClass('moving');
			
			// get the length needed to move
			// class .pics.moving sometimes will change position(offset.left != left 0) so get its parent
			var leftMove = $('.pics-current').offset().left - $('.pics-inner.moving').parent().offset().left;
			
	//		$('.moving').removeClass('moving');
			
			setTimeout(function(){
				$('.pics-inner.active').addClass('active2').css('left',leftMove);
				
				// change the main picture
				setTimeout(function(){
					var innerHtml = $('.pics-inner.active');
					$('.pics-current').parent().html(innerHtml.html())
					.find('.pics-img').addClass('pics-current').removeClass('pics-img');
				},1000);
				
				// wait the animation then remove it
				setTimeout(function(){
					
					$('.pics-inner.active').removeClass('pics-inner active moving active2')
					.removeAttr('style').addClass('pics-inner');
					
				},2000);
			},movingDelayTime);
			
			
			
		});
		
		//EVENT2 when hover more than 2s on a vertical picture
		$('.pics-inner').hover(function(){
	
			var hoverItem = $(this);
			
		    hoverTimer = setTimeout(function(){
		    	
		    	if( !$('.hoverItem').hasClass('moving') ){
		    		hoverItem.addClass('active');
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