$(document).ready(function(){
	page = 0;
	numPages = $(".page").length;
	w = $(window).width();
	h = $(window).height();
	prevScroll = 0;
	scrolling = false;

	pages = $('.page');

	$('#pg1').append('<span class="keyboard_nav">Try using your arrow keys!</span>');
	keyboard_nav_up = true;

	for (var i=0;i<pages.length;i++) {
		$('#page_markers').append('<li></li>');
	}
	page_markers = $('#page_markers>li');
	page_markers.first().addClass('selected');

	$(window).resize(function() {
		w = $(window).width();
		h = $(window).height();
	});
	$(window).keydown(function(e) {
		if (e.keyCode == 38) {
			changePage("up");
			e.preventDefault();
		} else if (e.keyCode == 40) {
			changePage("down");
			e.preventDefault();
		}
	});
	function remove_keyboard_nav() {
		if (keyboard_nav_up) {
			$('.keyboard_nav').fadeOut(500);
			keyboard_nav_up = false;
		}
	}
	function changePage(pg) {
		remove_keyboard_nav();
		if (pg == "up") {
			console.log("trying to page up");
			if (page > 0) {
				page -= 1;
				update_sidebar_page(page);
			} else {
				if (scrolling == false) {
					if (on_page(page) == true) {
						console.log("bouncing");
						scrolling = true;
						//$('html,body').stop().animate({scrollTop: 0}, 200, "easeOutSine").animate({scrollTop: h*0.05}, 200, "easeInSine", function() {scrolling = false;});
						pages.stop(false,true).animate({'margin-top': '5%'}, 200, "easeOutSine").animate({'margin-top': 0}, 200, "easeInSine", function() {scrolling = false;});
					} else {
						console.log("not on page!");
					}
				} else {
					return;
				}
			}
		} else if (pg == "down") {
			console.log("trying to page down");
			if (page < numPages-1) {
				page += 1;
				update_sidebar_page(page);
			} else {
				if (scrolling == false) {
					if (on_page(page) == true) {
						console.log("bouncing");
						scrolling = true;
						pages.last().after('<div class="bouncer bottom"></div>');
						//$('html,body').stop().animate({scrollTop: (numPages-1)*h+h*0.1}, 200, "easeOutSine").animate({scrollTop: (numPages-1)*h+h*0.05}, 200, "easeInSine", function() {scrolling = false;});
						pages.stop(false,true).animate({'margin-top': '-50px'}, 200, "easeOutSine").animate({'margin-top': 0}, 200, "easeInSine", function() {scrolling = false;$('.bottom').remove();});
					} else {
						console.log("not on page!");
					}
				} else {
					return;
				}
			}
		} else if (pg >= 0 && pg <= numPages-1) {
			console.log("jumping to page "+pg);
			page = pg;
			update_sidebar_page(page);
		}
		st = pages.eq(page).offset().top;//page*h+h*0.05;
		scrollWin(st);
	}
	function scrollWin(st){
		scrolling = true;
		$('html,body').stop(true,false).animate({
		scrollTop: st
		}, 1000, "easeOutCubic", function() {
			scrolling = false;
		});
	}
	function update_sidebar_page(pg) {
		page_markers.filter('.selected').removeClass('selected');
		page_markers.eq(pg).addClass('selected');
	}
	function on_page(pg) {
		v = Math.abs(($(window).scrollTop()-pages.eq(pg).offset().top)/h);
		return (v<0.01); //if < 1% away from perfect, consider "on the page"
	}
	$(window).scroll(function(e) {
		if (scrolling == false) {
			pg = parseInt($(window).scrollTop()/h+0.5);
			if (pg != page) {
				page = pg;
				remove_keyboard_nav();
				update_sidebar_page(page);
			}
		} else {
			e.preventDefault();
		}
		/*
		newScroll = $(window).scrollTop();
		if (scrolling == false) {
			if (newScroll > prevScroll) { //down
				changePage("down");
			} else { //up
				changePage("up");
			}
		}
		prevScroll = newScroll;
		e.preventDefault();
		*/
	});
});