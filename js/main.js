$(function () {
	'use strict';

	/*------ SAFARI DETECTOR ------*/
   var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
                   navigator.userAgent && !navigator.userAgent.match('CriOS');


	if(isSafari){
		$(".hero").addClass('hidden');
		$("#safariHero").removeClass('hidden');
		$(".grid-item .fa").css('margin-top','115px');
		$(".grid-item.tall .fa").css('margin-top','300px');
	 }



	// PAGE TRANSITIONS
	// ---------------------------------
	$(".animsition").animsition({
		inClass               :   'fade-in',
		outClass              :   'fade-out',
		inDuration            :    800,
		outDuration           :    500,
		// linkElement           :   '.animsition-link',
		linkElement           :   'a:not([target="_blank"]):not([href^=#]):not([class*="popup-"]):not([class*="no-redirect"])',
		loading               :    true,
		loadingParentElement  :   'body', //animsition wrapper element
		loadingClass          :   'animsition-loading',
		unSupportCss          : [ 'animation-duration',
								  '-webkit-animation-duration',
								  '-o-animation-duration'
								],
		overlay               :   false,
		overlayClass          :   'animsition-overlay-slide',
		overlayParentElement  :   'body'
	});



	// IF ELEMENT VISIBLE
	// ---------------------------------
	$.fn.isVisible = function(){
		var st = $(window).scrollTop(),
			wh = $(window).height(),
			tt = $(this).offset().top,
			th = $(this).height(),
			r;
		if(st+wh>=tt && tt+th>=st){r = 1}else{r = 0}
		return r;
	};



	// HEADER
	// ---------------------------------

	// transparent header
	if( $('#navbar.transparent').length ){
		$(window).scroll(function () {
			var wh = $(window).height(),
				st = $(window).scrollTop();
			if( st >= wh/3 ){
				$('#navbar').removeClass('transparent')
			}else{
				$('#navbar').addClass('transparent')
			}
		}).scroll();
	}

	// small header on scroll
	if( !$('#header').hasClass('header-small') ){
		$(window).scroll(function () {
			var wh = $(window).height(),
				st = $(window).scrollTop();
			if( st >= wh/3 ){
				$('#header').addClass('header-small')
			}else{
				$('#header').removeClass('header-small')
			}
		}).scroll();
	}

	// Show on scroll-Up
	$('#navbar.headroom').headroom();

	// dark HEADER
	if( $('.hero.text-dark').length ){
		$('#header').addClass('text-dark');
		$('.overlay-footer').removeClass('text-light').addClass('text-dark');
	}



	// OVERLAY MENU
	// ---------------------------------

	// menu button click
	$('.show-overlay-menu').click(function(){
		$('.overlay-menu').addClass('active');

		var lil = $('.overlay-menu li').length,
			s   = 1;
		setInterval(function () {
			if( s <= lil ){
				$('.overlay-menu li:nth-child('+ s +')').addClass('visible');
				s = s+1;
			}
		}, 70);

		return false;
	});

	// overlay menu close button
	$('.menu-close').click(function(){
		$('.overlay-menu').removeClass('active');
		$('.overlay-menu li').removeClass('visible');
		return false;
	});
	// overlay menu submenu
	$('.overlay-menu .has-submenu a').click(function () {
		if( $(this).parent('.has-submenu').hasClass('opened') ){
			$(this).parent('.has-submenu').removeClass('opened');
			$(this).next('ul').slideUp();
		}else{
			$(this).closest('#nav').find('.has-submenu').removeClass('opened');
			$(this).closest('#nav').find('.has-submenu ul').slideUp();
			$(this).parent('.has-submenu').addClass('opened');
			$(this).next('ul').slideDown();
		}
		return false;
	});



	// SIDEBAR
	// ---------------------------------

	// sidebar menu icon(on small screens)
	$('.sidebar-menu-icon').click(function () {
		$('.sidebar-menu').slideToggle();
		return false;
	});
	// mobile menu for sidebar
	if( $('body.has-sidebar').length ){
		$(window).resize(function () {
			if( window.innerWidth <= 1180 ){
				$('body').addClass('sidebar-hidden');
			}else{
				$('body').removeClass('sidebar-hidden');
			}
		}).resize();
	}
	// submenu
	$('.has-submenu a').click(function () {
		if( $('.sidebar-hidden').length ){
			$(this).parent('.has-submenu').toggleClass('opened');
			$(this).next('ul').toggle();
		}
		return false;
	});



	// HERO SLIDER
	// -----------------------------
	var mySwiper = new Swiper ('.swiper-container', {
		// direction: 'vertical',
		loop: true,
		grabCursor: true,
		speed: 800,
		autoplay: 7000,
		nextButton: '.swiper-next',
		prevButton: '.swiper-prev',
		// mousewheelControl: true,
		parallax: true,
		onSlideChangeEnd: function () {
			if( $('.swiper-slide-active.text-dark').length ){
				$('#header').addClass('text-dark');
				$('.overlay-footer').removeClass('text-light').addClass('text-dark');
			}else{
				$('#header').removeClass('text-dark');
				$('.overlay-footer').removeClass('text-dark').addClass('text-light');
			}
		}
	});



	// HERO SCROLL DOWN ARROW
	$('.scroll-down:not(.sscroll)').click(function () {
		var wh = $(window).height();
		$('html, body').animate({ scrollTop: wh }, 1300, 'easeInOutExpo');
		return false;
	});



	// HERO OVERLAY FOOTER
	$(window).scroll(function () {
		var st = $(window).scrollTop();
		if( st > 0 ){
			$('.overlay-footer').fadeOut();
		}else{
			$('.overlay-footer').fadeIn();
		}
	});



	// OWL CAROUSEL
	$('.owl-slider').each(function () {
		var $this = $(this),
			items = $this.data('items'),
			itemsTablet = $this.data('items-tablet'),
			itemsMobile = $this.data('items-mobile'),
			speed = $this.data('speed'),
			margin = $this.data('margin'),
			loop  = $this.data('loop'),
			loop  = loop != undefined ? loop : true,
			dots  = $this.data('dots'),
			dots  = dots != undefined ? dots : true,
			nav   = $this.data('nav'),
			nav   = nav != undefined ? nav : true,
			autoplay = $this.data('autoplay'),
			autoplay = autoplay != undefined ? autoplay : true,
			mousewheel = $this.data('mousewheel'),
			mousewheel = mousewheel != undefined ? mousewheel : false;
		$this.imagesLoaded(function () {
			$this.owlCarousel({
				dots: dots,
				nav: nav,
				loop: loop,
				autoplay: autoplay,
				smartSpeed: speed || 1000,
				dotsSpeed: 1000,
				navSpeed: 1000,
				autoHeight : true,
				responsive: {
					0:   { items: itemsMobile || itemsTablet || items || 1 },
					768: { items: itemsTablet || items || 1 },
					992: { items: items || 1 }
				},
				margin: margin || 0
			});
		});
		// refresh height on resize
		$this.on('resized.owl.carousel', function(event) {
			$this.find('.owl-height').css('height', $this.find('.owl-item.active').height() );
		});

		if( mousewheel ){
			$this.mousewheel(function(e){
				if( e.deltaY < 0 ){
					$this.trigger('next.owl.carousel');
				}else{
					$this.trigger('prev.owl.carousel');
				}
			});
		}

	});



	// BACKGROUNDS
	$('[data-background]').each(function(){
		var bg = $(this).attr('data-background');
		if( bg.match('^rgb') || bg.match('^#') ){
			$(this).css('background-color', bg);
		}else{
			$(this).css('background-image', 'url('+bg+')');
		}
	});



	// POSITIONS
	$('[data-positionX]').each(function(){
		var x = $(this).attr('data-positionX');
		$(this).css('left', x+'px');
	});
	$('[data-positionY]').each(function(){
		var y = $(this).attr('data-positionY');
		$(this).css('top', y+'px');
	});



	// PARALLAX BACKGROUNDS
	// ---------------------------------
	$.stellar({
		horizontalScrolling: false
	});
	// stellar fix - bg position on load
	if( $('[data-stellar-background-ratio]').length > 0 ){
		setTimeout(function () {
			var st = $(window).scrollTop();
			$(window).scrollTop(st+1);
			setTimeout(function(){
				$(window).scrollTop(st)
			}, 200)
		}, 200);
	};



	// SMOOTH SCROLL
	// ---------------------------------
	$('.sscroll').click(function () {
		var ti = $(this).attr('href'),
			tt = $(ti).offset().top-100;
		$('html, body').animate({ scrollTop: tt }, 1000, 'easeInOutExpo');
		return false;
	});



	// ITEM APPEAR ANIMATION
	// ---------------------------------
	new WOW().init();



	// YT Background
	// ---------------------------------
	$('.ytbg').YTPlayer({
		mute: true,
		showControls: false,
		showYTLogo: false,
		containment: 'self'
	});



	// EQUAL-HEIGHT COLUMNS
	$('.equal-height-cols').each(function () {
		var el = $(this).find('[class*="col-"]');
		el.matchHeight({
			byRow: false
		});
	});



	// RESPONSIVE VIDEOS
	// ---------------------------------
	$('.video-container').fitVids();



	// GRID
	// --------------------------------
	$('.grid').each(function(){
		var $grid = $(this),
			$item = $grid.children('.grid-item'),
			$itemWide = $grid.children('.grid-item.wide'),
			$itemTall = $grid.children('.grid-item.tall'),
			$cols = $grid.data('columns'),
			$cols = $cols != undefined ? $cols : 3,
			$gutter = $grid.data('gutter'),
			$gutter = $gutter != undefined ? $gutter / 2 : 0;

		// spaces between items
		$grid.wrap("<div class='grid-wrapper' />");
		$grid.css({
			'margin-left': -$gutter+'px',
			'margin-right': -$gutter+'px'
		});
		$item.wrapInner("<div class='grid-item-inner' />");
		$grid.find('.grid-item-inner').css({
			'position': 'absolute',
			'top': $gutter,
			'bottom': $gutter,
			'left': $gutter,
			'right': $gutter,
		});

		function itemSizes(){
			$item.width( $grid.width() / $cols );
			$item.height( $item.width() * 4/5 );
			$itemTall.height( $item.width() * 8/5 );
			$itemWide.width( $grid.width() / $cols * 2);
		}
		itemSizes();

		$grid.isotope({
			itemSelector: '.grid-item',
			masonry: { columnWidth: $grid.width() / $cols }
		});

		// Update Grid On Resize
		$(window).resize(function(){
			itemSizes();
			$grid.isotope({
				masonry: { columnWidth: $grid.width() / $cols }
			})
		}).resize();

	});



	// FILTER
	$('.filter ul li').click(function () {
		var filter = $(this).attr('data-filter');
		$('.portfolio').isotope({ filter: filter });
		$('.filter ul li').removeClass('active');
		$(this).addClass('active');
	});



	// PORTFOLIO ITEM APPEAR ANIMATION
	if( $('.portfolio.item-animation').length ){
		$(window).scroll(function () {
			$('.portfolio.item-animation .grid-item:not(.visible)').each(function () {
				if( $(this).isVisible() ){
					$(this).addClass('visible')
				}
			});
		});
	};



	// MASONRY
	// ---------------------------------
	$(window).load(function(){
		$('.masonry').each(function () {
			var $this = $(this);
			$this.imagesLoaded(function () {
				$this.isotope({
					itemSelector: '.masonry-item'
				});
			});
		});
	});



	// MOUSE PARALLAX
	$('.no-touch .mouse-parallax').each(function(){
		var mouseX;
		var mouseY;
		var $this = $(this);
		var $speed = $this.attr('data-speed'),
			$speed = $speed != undefined && $speed != '' ? $speed : 0.05;

		$(window).mousemove(function(e){
			if( window.innerWidth >= 993 ){
				mouseX = e.pageX;
				mouseY = e.pageY;
				var st = $(window).scrollTop();
				var iw = $this.width();
				var ih = $this.height();
				var it = $this.offset().top;
				var il = $this.offset().left;
				var centerX = il + iw/2;
				var centerY = it - st + ih/2;
				var leftPos = -(mouseX - centerX) * $speed;
				var topPos = -(mouseY - centerY) * $speed;
				$this.css({
					'-webkit-transform': 'translate3d('+leftPos+'px, '+topPos+'px, 0)',
					'-ms-transform': 'translate3d('+leftPos+'px, '+topPos+'px, 0)',
					'transform': 'translate3d('+leftPos+'px, '+topPos+'px, 0)'
				});
			}
		});

	});



	// SCROLL TO TOP
	// ---------------------------------
	$(window).scroll(function () {
		var wh = $(window).height(),
			st = $(window).scrollTop();
		if( st >= wh*1.2 ){ $('.to-top').addClass('visible'); }else{ $('.to-top').removeClass('visible') }
	});
	$('.to-top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 600);
		return false;
	});


	$(window).load(function () {

		// SKILLS
		// ---------------------------------
		if( $('.skill').length ){
			$(window).scroll(function () {
				$('.skill').each(function () {
					if( $(this).isVisible() && !$(this).hasClass('animated') ){
						var p = $(this).find('.skill-bar').data('perc');
						$(this).find('.skill-bar').delay(200).animate({ width: p+'%' });
						$(this).find('.skill-bar span').delay(2000).fadeIn('slow');
						$(this).addClass('animated');
					}
				});
			});
		}

		// COUNTERS
		// ---------------------------------
		if( $('.counter-num').length ){
			$(window).scroll(function () {
				$('.counter-num').each(function () {
					if( $(this).isVisible() && $(this).html() == '' ){
						$(this).countTo({ speed: 2500 });
					}
				});
			});
		}

	});



	// TABS
	// ---------------------------------
	$('.tab-nav li').click(function () {

		if( !$(this).hasClass('active') ){
			var p = $(this).data('tabpanel');
			$(this).parents('.tabs').find('.tab-nav li').removeClass('active');
			$(this).addClass('active');
			$(this).parents('.tabs').find('.tab-panels > div').fadeOut(0).removeClass('active');
			$(this).parents('.tabs').find(p).fadeIn().addClass('active');
		}

	});



	// TOGGLES
	// ---------------------------------
	$('.toggle .toggle-title').click(function () {
		if( $(this).parent('.toggle').hasClass('active') ){
			$(this).next('.toggle-content').slideToggle(200);
			$(this).parent('.toggle').toggleClass('active');
		}else{
			$(this).closest('.toggles').find('.toggle.active .toggle-content').slideToggle(200);
			$(this).closest('.toggles').find('.toggle.active').toggleClass('active');

			$(this).next('.toggle-content').slideToggle(200);
			$(this).parent('.toggle').toggleClass('active');
		}
		return false;
	});



	// IMAGE POPUP
	// ---------------------------------
	// single
	$('.popup-image').magnificPopup({
		type: 'image',
		mainClass: 'mfp-fade',
		removalDelay: 300,
		closeOnContentClick: true,
		fixedContentPos: false,
		fixedBgPos: false
	});
	// gallery mode
	$('.popup-gallery-link').magnificPopup({
		gallery: {
			enabled: true
		},
		mainClass: 'mfp-fade',
		fixedContentPos: false,
		type: 'image'
	});


	// YOUTUBE, VIMEO, GOOGLE MAPS POPUP
	// ---------------------------------
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		disableOn: 0,
		preloader: false,
		removalDelay: 300,
		fixedContentPos: false
	});

	// GALLERY POPUP (wrapper)
	// ---------------------------------
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		gallery: {
			enabled: true
		},
		mainClass: 'mfp-fade',
		fixedContentPos: false,
		type: 'image'
	});
	// SINGLE GALLERY
	$('.popup-single-gallery').each(function () {
		$(this).magnificPopup({
			delegate: 'a',
			mainClass: 'mfp-fade',
			gallery: {
				enabled: true
			},
			fixedContentPos: false,
			type: 'image'
		});
	});



	// AJAX CONTACT FORM
	// ---------------------------------
	$('#contact form').submit(function () {
		var url = $(this).attr('action');
		// get information from contact form
		var name = $('[name=name]').val();
		var email = $('[name=email]').val();
		var message = $('[name=message]').val();

		// send information to contact.php
		$.ajax({
			type: "POST",
			url: url,
			data: { name: name, email: email, message: message },
			success: function (response) {
				// response from contact.php
				$('.contact-message').html(response).slideDown(500);
			},
			error: function () {
				// error message
				$('.contact-message').html('<p class="error">Something went wrong, try again!</p>').slideDown('slow');
			}
		});

		return false;
	});



	// GOOGLE MAP
	// ----------------------------------
	//set your google maps parameters
	$(window).load(function () {

		if( $('#google-map').length > 0 ){

			var latitude = -34.7134414,
				longitude = -58.2684395,
				map_zoom = 14;

			//google map custom marker icon
			var marker_url = 'img/map-markerChevere.png';

			//we define here the style of the map
			var style= [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}];

			//set google map options
			var map_options = {
				center: new google.maps.LatLng(latitude, longitude),
				zoom: map_zoom,
				panControl: false,
				zoomControl: true,
				mapTypeControl: false,
				streetViewControl: false,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scrollwheel: false,
				styles: style,
			};
			//inizialize the map
			var map = new google.maps.Map(document.getElementById('google-map'), map_options);
			//add a custom marker to the map
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(latitude, longitude),
				map: map,
				visible: true,
				icon: marker_url,
			});
		}
	});

	// jQuery for navbar page scrolling feature - requires jQuery Easing plugin
		$(function() {
		   $('a.page-scroll').bind('click', function(event) {
		      var $anchor = $(this);
		      $('html, body').stop().animate({
		         scrollTop: $($anchor.attr('href')).offset().top
		      }, 1500, 'easeInOutExpo');
		      event.preventDefault();
		   });
		});

		// Highlight the top nav as scrolling occurs
		$('body').scrollspy({
		   target: '.navbar-fixed-top'
		});

		// Closes the Responsive Menu on Menu Item Click
		$('.navbar-collapse ul li a').click(function() {
		   $('.navbar-toggle:visible').click();
		});




});
