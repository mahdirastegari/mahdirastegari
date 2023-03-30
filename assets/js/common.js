$(document).ready(function() {

    'use strict';

    /*-----------------------------------------------------------------
      Detect device mobile
    -------------------------------------------------------------------*/
	
    var isMobile = false; 
    if( /Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('html').addClass('touch');
        isMobile = true;
    }
    else {
        $('html').addClass('no-touch');
        isMobile = false;
    }
	
	
    /*-----------------------------------------------------------------
      Loaded
    -------------------------------------------------------------------*/

    anime({
        targets: 'body',
        opacity: 1,
        delay: 400,
        complete: function(anim) {
            progressBar(); //Init progress bar
        }
    });
    
    $('body, .js-img-load').imagesLoaded({ background: !0 }).always( function( instance ) {
	    preloader(); //Init preloader
    });

    function preloader() {
        var tl = anime.timeline({}); 
        tl
        .add({
            targets: '.preloader',
            duration: 1,
            opacity: 1
        })
        .add({
            targets: '.circle-pulse',
            duration: 300,
            //delay: 500,
            opacity: 1,
            zIndex: '-1',
            easing: 'easeInOutQuart'
        },'+=500')
        .add({
            targets: '.preloader__progress span',
            duration: 500,
            width: '100%',
			easing: 'easeInOutQuart'
        },'-=500')
        .add({
            targets: '.preloader',
            duration: 500,
            opacity: 0,
            zIndex: '-1',
            easing: 'easeInOutQuart'
        });
    };


    /*-----------------------------------------------------------------
      Hamburger
    -------------------------------------------------------------------*/
    $('.hamburger').on('click', function() {
        toggleHamburger();
    });
	
	function toggleHamburger(){
        $(this).toggleClass('is-active');
	    $('.inner-menu').toggleClass('is-active');
		$('body').toggleClass('open-menu');
    }
    /*-----------------------------------------------------------------
      Nav
    -------------------------------------------------------------------*/
    
    var sideNavOpen = $('.hamburger');
    var sideNavTl = anime.timeline({autoplay: false});

    if (window.matchMedia("(max-width: 580px)").matches) {
        $('.js-menu').each(function(i) {
            sideNavTl
            .add({
                targets: '.nav',
                duration: 1000,
                width: ['0', '100%'],
                opacity: [0, 1],
                easing: 'easeInOutBack'
            })
            .add({
                targets: '.nav__item',
                duration: 200,
                delay: anime.stagger(50),
                opacity: [0, 1],
                translateX: [70, 0],
                easing: 'easeInOutBack'
            },'-=500');
        }); 
    } else {
        $('.js-menu').each(function(i) {
            sideNavTl
            .add({
                targets: '.nav',
                duration: 1000,
                width: ['0', '100%'],
                easing: 'easeInOutBack'
            })
            .add({
                targets: '.nav__item',
                duration: 200,
                delay: anime.stagger(50),
                opacity: [0, 1],
                translateX: [70, 0],
                easing: 'easeInOutBack'
            },'-=500');
        });  
    }
    
    $(sideNavOpen).on('click', function(e) {
        e.preventDefault();
        if (sideNavTl.began) {
            sideNavTl.reverse()
			sideNavTl.completed = false;
        }
        if (sideNavTl.paused) {
            sideNavTl.play()
        }
    });

    
    /*-----------------------------------------------------------------
      Carousel
    -------------------------------------------------------------------*/	
    function enableCarousel(){
        // Testimonials
        $('.js-carousel-review').each(function() {
            var carousel = new Swiper('.js-carousel-review', {
                slidesPerView: 2,
                spaceBetween: 30,
                speed: 300,
                grabCursor: true,
                watchOverflow: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                autoplay: {
                    delay: 5000,
                },
                breakpoints: {
                    580: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    991: {
                        slidesPerView: 1
                    }
                }
            });
        });

        // Clients
        $('.js-carousel-clients').each(function() {
            var carousel = new Swiper('.js-carousel-clients', {
                slidesPerView: 4,
                spaceBetween: 30,
                //loop: true,
                grabCursor: true,
                watchOverflow: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },				
                    580: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },				
                    991: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    }
                }
            });
        });
    }
	
    
	
	
    /*-----------------------------------------------------------------
      Sticky sidebar
    -------------------------------------------------------------------*/

    function activeStickyKit() {
        $('.sticky-column').stick_in_parent({
            parent: '.sticky-parent'
        });

        // bootstrap col position
        $('.sticky-column')
        .on('sticky_kit:bottom', function(e) {
            $(this).parent().css('position', 'static');
        })
        .on('sticky_kit:unbottom', function(e) {
            $(this).parent().css('position', 'relative');
        });
    };
    activeStickyKit();

    function detachStickyKit() {
        $('.sticky-column').trigger("sticky_kit:detach");
    };

    //  stop sticky kit
    //  based on your window width

    var screen = 1200;

    var windowHeight, windowWidth;
    windowWidth = $(window).width();
    if ((windowWidth < screen)) {
        detachStickyKit();
    } else {
        activeStickyKit();
    }

    // windowSize
    // window resize
    function windowSize() {
        windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
        windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    }
    windowSize();

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    $(window).resize(debounce(function(){
        windowSize();
        $(document.body).trigger("sticky_kit:recalc");
        if (windowWidth < screen) {
            detachStickyKit();
        } else {
            activeStickyKit();
        }
    }, 250));


    /*-----------------------------------------------------------------
      Progress bar
    -------------------------------------------------------------------*/
    
	function progressBar() {
	    $('.progress').each(function() {
		    var ctrl = new ScrollMagic.Controller();
		    new ScrollMagic.Scene({
                triggerElement: '.progress',
	            triggerHook: 'onEnter',
	            duration: 300
            })
            .addTo(ctrl)
		    .on("enter", function (e) {
			    var progressBar = $('.progress-bar');
                progressBar.each(function(indx){
                    $(this).css({'width': $(this).attr('aria-valuenow') + '%', 'z-index': '2'});
                });
		    });
        });
    }
	
	
    /*-----------------------------------------------------------------
      Scroll indicator
    -------------------------------------------------------------------*/
  
    function scrollIndicator() {
        $(window).on('scroll', function() {
            var wintop = $(window).scrollTop(), docheight = 
            $(document).height(), winheight = $(window).height();
 	        var scrolled = (wintop/(docheight-winheight))*100;
  	        $('.scroll-line').css('width', (scrolled + '%'));
        });
    }
	
	scrollIndicator(); //Init
	
	
    /*-----------------------------------------------------------------
      ScrollTo
    -------------------------------------------------------------------*/
	
    function scrollToTop() {
        var $backToTop = $('.back-to-top'),
            $showBackTotop = $(window).height();
			
        $backToTop.hide();


        $(window).scroll( function() {
            var windowScrollTop = $(window).scrollTop();
            if( windowScrollTop > $showBackTotop ) {
                $backToTop.fadeIn('slow');
            } else {
                $backToTop.fadeOut('slow');
            }
        });
        
		$backToTop.on('click', function (e) {
            e.preventDefault();
            $(' body, html ').animate( {scrollTop : 0}, 'slow' );
        });
    }
	
	scrollToTop(); //Init


    /*-----------------------------------------------------------------
      Style background image
    -------------------------------------------------------------------*/	
  
    $('.js-image').each(function(){
        var dataImage = $(this).attr('data-image');
        $(this).css('background-image', 'url(' + dataImage + ')');
    });
    

    /*-----------------------------------------------------------------
      Init Map
    -------------------------------------------------------------------*/	
    function initMap(){
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ0dGVtcGxhdGUiLCJhIjoiY2s0M3I5ZHgzMGEzNDNucXM1cDd0dzl3cSJ9.a2wjLlxz8LzWj9nIoGsshw';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [-73.9751,40.7289], // starting position
            zoom: 13 // starting zoom
        });
                
        // create the popup
        var popup = new mapboxgl.Popup({ offset: 40 }).setText(
            '756 Livingston Street, Brooklyn, NY 11201'
        );

        // create DOM element for the marker
        var el = document.createElement('div');
        el.id = 'marker';
        
        // create the marker
        new mapboxgl.Marker(el)
            .setLngLat([-73.9751,40.7289])
            .setPopup(popup) // sets a popup on this marker
            .addTo(map);

        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    }
	
    /*-----------------------------------------------------------------
      Autoresize textarea
    -------------------------------------------------------------------*/	

    $('textarea').each(function(){
        autosize(this);
    });


    /*-----------------------------------------------------------------
	  Tabs
    -------------------------------------------------------------------*/	
    
	$('.js-tabs').each(function(){
	    $('.content .tabcontent').hide();
        $('.content .tabcontent:first').show();
        var tabContent = document.getElementById('tab-content');
        
        function activateTab(tabLink){
            var file = $(tabLink).attr('includeHTML');
            if (file) {
                /* Make an HTTP request using the attribute value as the file name: */
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            tabContent.innerHTML = this.responseText;
                            progressBar();
                            if(file.includes('about-tab')){
                                enableCarousel();
                            }
                            else if (file.includes('contact-tab')){
                                initMap();
                            }
                        }
                        if (this.status == 404) {tabContent.innerHTML = "Page not found.";}
                    }
                }
                xhttp.open("GET", file, true);
                xhttp.send();
                tabContent.innerHTML = "Loading ..."
            }
        }

        //activate the active tab
        $('.nav .nav__item a').each(function(){
            if($(this).hasClass('active')){
                activateTab($(this));
            }
        });

        $('.nav .nav__item a').on('click', function () {
            $('.nav .nav__item a').removeClass('active');
            $(this).addClass('active');
            activateTab($(this));
            $portfolioMasonry.isotope ({
                columnWidth: '.gallery-grid__item',
                gutter: '.gutter-sizer',
                isAnimated: true
            });
			$('.js-scroll').getNiceScroll().resize()
            return false;
        });
	    
		// Mobile close menu
	    var screenMobile = 580;
	
	    windowWidth = $(window).width();
        if ((windowWidth < screenMobile)) {	
            $('.nav .nav__item a').on('click', function (e) {
	            e.preventDefault();
                $('.hamburger').removeClass('is-active');
		        $('.inner-menu').removeClass('is-active');
		        $('body').removeClass('open-menu');
		  
                if (sideNavTl.began) {
                    sideNavTl.reverse()
			        sideNavTl.completed = false;
                }
                if (sideNavTl.paused) {
                    sideNavTl.play()
                }
	        });
            
			// autoscroll to content
            $(".nav__item a").click(function(e) {
		        e.preventDefault();
		        var offset = -35;
		
                $('html, body').animate({
                    scrollTop: $("#content").offset().top + offset
                }, 0);
            });			
	    } else {
		
	    }
	});

  
	
    /*-----------------------------------------------------------------
      Tooltip
    -------------------------------------------------------------------*/
	
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });


    /*-----------------------------------------------------------------
      Switch categories & Filter mobile
    -------------------------------------------------------------------*/	
  
    $('.select').on('click','.placeholder',function(){
      var parent = $(this).closest('.select');
      if ( ! parent.hasClass('is-open')){
          parent.addClass('is-open');
          $('.select.is-open').not(parent).removeClass('is-open');
      }else{
          parent.removeClass('is-open');
      }
    }).on('click','ul>li',function(){
        var parent = $(this).closest('.select');
        parent.removeClass('is-open').find('.placeholder').text( $(this).text() );
        parent.find('input[type=hidden]').attr('value', $(this).attr('data-value') );
	
	    $('.filter__item').removeClass('active');
	    $(this).addClass('active');
	    var selector = $(this).attr('data-filter');
		
	    $('.js-filter-container').isotope({
	        filter: selector
	    });
	    return false;	
    });


    /*-----------------------------------------------------------------
      Masonry
    -------------------------------------------------------------------*/	
	
    // Portfolio
    var $portfolioMasonry = $('.js-masonry').isotope({
        itemSelector: '.gallery-grid__item',
	    layoutMode: 'fitRows',
        percentPosition: true,
	    transitionDuration: '0.5s',
        hiddenStyle: {
            opacity: 0,
            transform: 'scale(0.001)'
        },
        visibleStyle: {
            opacity: 1,
            transform: 'scale(1)'
        },
        fitRows: {
            gutter: '.gutter-sizer'
        },	
        masonry: {
	        columnWidth: '.gallery-grid__item',
            gutter: '.gutter-sizer',
            isAnimated: true
        }
    });
  
    $portfolioMasonry.imagesLoaded().progress( function() {
        $portfolioMasonry.isotope ({
	        columnWidth: '.gallery-grid__item',
            gutter: '.gutter-sizer',
            isAnimated: true,
	        layoutMode: 'fitRows',
            fitRows: {
                gutter: '.gutter-sizer'
            }
	    });
    });	

	
    /*-----------------------------------------------------------------
      niceScroll
    -------------------------------------------------------------------*/		

    $('textarea').niceScroll({
		horizrailenabled:false
	});


    /*-----------------------------------------------------------------
      emoji add in textarea
    -------------------------------------------------------------------*/
	
    $(function() {
        $('.emoji-wrap img').on('click', function(){
            var emoji = $(this).attr('title');
            $('#commentForm').val($('#commentForm').val()+" "+emoji+" ");
        });
    });


    /*-----------------------------------------------------------------
	  mediumZoom
    -------------------------------------------------------------------*/
  
    mediumZoom('[data-zoom]', {
        margin: 30
    });

	
    /*-----------------------------------------------------------------
      Lazyload
    -------------------------------------------------------------------*/

    lazySizes.init();

	
    /*-----------------------------------------------------------------
      Polyfill object-fit
    -------------------------------------------------------------------*/	
	
    var $someImages = $('img.cover');
    objectFitImages($someImages);
});