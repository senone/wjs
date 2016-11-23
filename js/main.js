/*
 * @Author: senon
 * @Date:   2016-10-10 15:29:37
 * @Last Modified by:   senon
 * @Last Modified time: 2016-10-14 09:46:18
 */

'use strict';
$(function() {
	function resize() {
		var wscreen = $(window).width();
		var isSmallScreen = wscreen < 768;
		$('#main_ad > .carousel-inner > .item').each(function(index, item) {
			var $item = $(item);
			var imgSrc = isSmallScreen ? $item.data('img-sm') : $item.data('img-lg');
			$item.css('backgroundImage', 'url("' + imgSrc + '")');
			if (isSmallScreen) {
				$item.html('<img src="' + imgSrc + '" alt="" />');
			} else {
				$item.empty();
			}

			var ulcontainer = $('.nav-tabs');
			var width = 50;
			ulcontainer.children().each(function(index, ele) {
				// console.log(ele.clientWidth);
				width += ele.clientWidth;
				// console.log(width);
			});
			if (width > $(window).width()) {
				ulcontainer.css('width', width);
				ulcontainer.parent().css('overflow-x','scroll');
			}
			else{
				ulcontainer.css('width','auto');
				ulcontainer.parent().css('overflow-x','hidden');
			}
		});
	}
	$(window).on('resize', resize).trigger('resize');
	$('[data-toggle="tooltip"]').tooltip();


	$('#news .nav-pills a').on('click',function(){
		var $this = $(this);
		$('.news-title').text($this.data('title'));
	});

	var $carousel = $('.carousel');
	var startX,endX;
	var offset = 50;
	$carousel.on("touchstart",function(e){
		startX = e.originalEvent.touches[0].clientX;
	});
	$carousel.on("touchmove",function(e){
		endX = e.originalEvent.touches[0].clientX;
	});
	$carousel.on('touchend',function(){
		var distance = Math.abs(startX-endX);
		if(distance > offset){
			$(this).carousel(startX > endX ? 'next' : 'prev');
		}
	});
});