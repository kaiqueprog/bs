$(document).ready(function(){
    // Vídeo popup
    const videoSrc = $("#player-1").attr("src");
    $(".video-play-btn, .video-popup").on("click", function() {
        if ($(".video-popup").hasClass("open")) {
            $(".video-popup").removeClass("open");
                $("#player-1").attr("src","");
            } else {
                $(".video-popup").addClass("open");
                if ($("#player-1").attr("src") == '') {
                    $("#player-1").attr("src",videoSrc);
                }
                
            }
        });

});




$(window).on("load", function () {

    "use strict";

    /* ===================================
            Loading Timeout
     ====================================== */

    $('.side-menu').removeClass('hidden');

    setTimeout(function(){
        $('.preloader').fadeOut();
    }, 1000);
});


jQuery(function ($) {


    "use strict";

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 260) { // Set position from top to add class
            $('header').addClass('header-appear');
        }
        else {
            $('header').removeClass('header-appear');
        }
    });

    //scroll to appear
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 500)
            $('.scroll-top-arrow').fadeIn('slow');
        else
            $('.scroll-top-arrow').fadeOut('slow');
    });

    //Click event to scroll to top
    $(document).on('click', '.scroll-top-arrow', function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    $(".scroll").on("click", function (event) {
        event.preventDefault();
        $("html,body").animate({
            scrollTop: $(this.hash).offset().top - 60}, 1200);
    });

    /* ===================================
        Side Menu
    ====================================== */
    if ($("#sidemenu_toggle").length) {
        $("#sidemenu_toggle").on("click", function () {
            $(".pushwrap").toggleClass("active");
            $(".side-menu").addClass("side-menu-active"), $("#close_side_menu").fadeIn(700)
        }), $("#close_side_menu").on("click", function () {
            $(".side-menu").removeClass("side-menu-active"), $(this).fadeOut(200), $(".pushwrap").removeClass("active")
        }), $(".side-nav .navbar-nav .nav-link").on("click", function () {
            $(".side-menu").removeClass("side-menu-active"), $("#close_side_menu").fadeOut(200), $(".pushwrap").removeClass("active")
        }), $("#btn_sideNavClose").on("click", function () {
            $(".side-menu").removeClass("side-menu-active"), $("#close_side_menu").fadeOut(200), $(".pushwrap").removeClass("active")
        });
    }


    /* ===================================
         Counter
    ====================================== */


    $('.count').each(function () {
        $(this).appear(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 3000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });

    $(".progress-bar").each(function () {
        $(this).appear(function () {
            $(this).animate({width: $(this).attr("aria-valuenow") + "%"}, 3000)
        });
    });

    /* ===================================
      Mouse parallax
     ====================================== */


$('.home-banner').mousemove(function(e) {
    $('[data-depth]').each(function () {
        var depth = $(this).data('depth');
        var amountMovedX = (e.pageX * -depth/4);
        var amountMovedY = (e.pageY * -depth/4);

        $(this).css({
            'transform':'translate3d(' + amountMovedX +'px,' + amountMovedY +'px, 0)',
        });
    });
});

    /* =====================================
          Parallax
       ====================================== */

    if ($(window).width() > 992) {
        $(".parallax").parallaxie({
            speed: 0.55,
            offset: 0,
        });
    }

    /* ===================================
      Owl Carousel
     ====================================== */

    //Testimonial Slider

    $('.testimonial-two').owlCarousel({
        loop: true,
        smartSpeed: 500,
        responsiveClass: true,
        nav:false,
        dots:false,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 1,
                margin: 30,
            },
            480: {
                items: 1,
                margin: 30,
            },
            992: {
                items: 1,
                margin: 30,
            }
        }
    });

    $('.partners-slider').owlCarousel({
        items: 5,
        autoplay: 1500,
        smartSpeed: 1500,
        autoplayHoverPause: true,
        slideBy: 1,
        loop: true,
        margin: 30,
        dots: false,
        nav: false,
        responsive: {
            1200: {
                items: 5,
            },
            768: {
                items: 3,
            },
            480: {
                items: 2,
            },
            320: {
                items: 1,
            },
        }
    });


    /*============================================*
            Cube Portfolio
  * ============================================*/


    $('#js-grid-mosaic-flat').cubeportfolio({
        filters: '#js-filters-mosaic-flat',
        layoutMode: 'mosaic',
        sortByDimension: true,
        mediaQueries: [{
            width: 1500,
            cols: 6,
        }, {
            width: 1100,
            cols: 4,
        }, {
            width: 800,
            cols: 3,
        }, {
            width: 480,
            cols: 1,
            options: {
                gapHorizontal: 15,
                gapVertical: 15,
            }
        }],
        defaultFilter: '*',
        animationType: 'fadeOutTop',
        gapHorizontal: 10,
        gapVertical: 10,
        gridAdjustment: 'responsive',
        caption: 'zoom',

        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true,
        lightboxTitleSrc: 'data-title',
    });

    //About Us Image Tilt
    $('.js-tilt').tilt({
        maxTilt:  1,
        easing:         "cubic-bezier(.03,.98,.52,1)",    // Easing on enter/exit.
    });



    if ($(".rev-slider").length) {
        $("#rev_slider_1_5").show().revolution({
            sliderType: "standard",
            jsFileLocation: "//localhost/reveditor/revslider/public/assets/js/",
            sliderLayout: "fullscreen",
            dottedOverlay: "none",
            delay: 9000,
            navigation: {
                keyboardNavigation: "off",
                keyboard_direction: "horizontal",
                mouseScrollNavigation: "off",
                mouseScrollReverse: "default",
                onHoverStop: "off",
                touch: {
                    touchenabled: "on",
                    touchOnDesktop: "on",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: false
                },
                bullets: {
                    enable: true,
                    hide_onmobile: true,
                    hide_onleave: false,
                    hide_under: 768,
                    hide_over: 9999,
                    style: "berex-5",
                    direction: "vertical",
                    h_align: "right",
                    v_align: "center",
                    h_offset: 45,
                    v_offset: 0,
                    space: 5,
                    tmp: '<div class="tp-bullet-number"><span class="tp-count">{{param1}}</span><span class="tp-bullet-line"></span></div>'
                }
            },
            responsiveLevels: [1240, 1024, 778, 480],
            visibilityLevels: [1240, 1024, 778, 480],
            gridwidth: [1140, 1024, 778, 480],
            gridheight: [700, 768, 960, 420],
            lazyType: "none",
            parallax: {
                type: "mouse",
                origo: "enterpoint",
                speed: 400,
                speedbg: 0,
                speedls: 0,
                levels: [2, 3, 5, 10, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
                disable_onmobile: "on"
            },
            shadow: 0,
            spinner: "off",
            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            shuffle: "off",
            autoHeight: "off",
            fullScreenAutoWidth: "off",
            fullScreenAlignForce: "off",
            fullScreenOffsetContainer: "",
            fullScreenOffset: "",
            disableProgressBar: "on",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false,
            fallbacks: {
                simplifyAll: "off",
                nextSlideOnWindowFocus: "off",
                disableFocusListener: false,
            }
        });
    }
});

// Data atualizada
let data = new Date;
let data2 = new Date;
document.getElementById('ano').innerHTML = data.getFullYear();
document.getElementById('ano2').innerHTML = data2.getFullYear();
