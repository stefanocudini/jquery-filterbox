/*!
 * jQuery FilterBox Plugin 1.0.0
 * https://github.com/stefanocudini/jquery-filterbox
 *
 * Copyright 2013, Stefano Cudini - stefano.cudini@gmail.com
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

(function($) {
    $.fn.extend({
        filterbox: function(options) {	//plugin name
 
            var defaults = {
            	container: '.filterbox-container',			//element/selector within which to seek
            	child: '.filterbox-box',			//element searched
            	childExclude: '.filterbox-exc',		//ever excluded elements
            	childKey: '.filterbox-key',			//element for key search into element searched
            	counter: '.counter',
            	initial: true,						//search initial text or inside text
                searchText: 'Search...',			//text into search box
                hideClass: 'filterbox-hide',		//class applied to non matched elements
                //TODO if not specified using .hide()
                timeReset: 400						//resetting time after filterbox input blur
            };
            var options = $.extend(defaults, options);
         
            return this.each(function() {
            
                var targetFind$ = $(options.container),
                	tf;//timer

				$(this)
				.on('keyup', function(e) {
				
					if(e.keyCode==27)//esc
						$(this).blur();

					var t = $(this).val();

					if(t.length<1)
						targetFind$.find(options.child+'.'+options.hideClass).removeClass(options.hideClass);
						//$(this).trigger('blur');
					else
					{
						var regFilter = new RegExp("^[.]$|[|]",'g'),//remove | 
							t = t.replace(regFilter,' '),	//sanitize t value
							I = options.initial ? '^' : '',
							reg = new RegExp(I + t,'i');
						
						targetFind$.find(options.childKey).map(function() {

							return reg.test( $(this).text() ) ? false : this;

						})
						.parents(options.child).addClass(options.hideClass);

						targetFind$.find(options.childExclude).not(options.hideClass).addClass(options.hideClass).hide();
					}
					$(this).siblings(options.counter).text( targetFind$.find(options.child).not('.'+options.hideClass).length );
				})
				.on('blur', function() {
					var that = this;
					tf = setTimeout(function() {
						
						targetFind$.find(options.child+'.'+options.hideClass).removeClass(options.hideClass);
						
						$(that).siblings(options.counter).text( targetFind$.find(options.child).length );
						
					}, options.timeReset);
					
					$(this).val(options.searchText);
				})
				.on('click',function() {
				
					$(this).val('').focus();
				})
				.val(options.searchText);
				//TODO USE ATTRIBUTE PLACEHOLDER OF HTML5
            });
        }
    });
})(jQuery);

