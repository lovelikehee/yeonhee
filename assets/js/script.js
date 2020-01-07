$(function () {

    var Area = $("#contentsArea"),
        $main = Area.find("main"),
        $nav = Area.find("nav"),
        $sec = $main.find("section"),
        $secTop = $sec.find(".secTop"),
        noise = $(".noise-container"),
        noiseLogo = $(".noise-logo");

    //skroll 


    skrollr.init({
        mobileCheck: function(){
             if((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
                  // mobile device
             }
        }
   });

    $(window).scroll(function () {
        var wScroll = parseInt($(this).scrollTop());
        $(".scroll_top").text(wScroll);

        if (wScroll >= $nav.offset().top) {
            $nav.addClass("show");
        } else {
            $nav.removeClass("show");
        }
        if (wScroll >= $(".sec1").offset().top) {
            $(".sec1").addClass("show");
            $(".bar").addClass("fix-bar");
        } else {
            $(".sec1").removeClass("show");
            $(".bar").removeClass("fix-bar");
        }
        if (wScroll >= $sec.eq(1).offset().top) {
            $(".bar").removeClass("fix-bar");
            $(".custom-cursor__text ").find("span").hide();
        } else {
            $sec.eq(1).removeClass("show");
        }
        if (wScroll >= $(".sec4").offset().top) {
            $(".sec-end").addClass('show');
            $(".sec4").hide();
        } else {
            $(".sec-end").removeClass('show');
              $(".sec4").hide();
        }
    });



        $('.section__up').click(function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 200);
        });




    //cursor 
    $nav.mouseenter(function () {
        $(".custom-cursor__text ").find("span").hide();
    });




    // var R_H =  $sec.eq(2).offset().top;
    // var r_h =   Math.round(R_H);

    // $sec.eq(2).find($secTop).attr('data-'+ r_h,'display:block');


    //visual
    noise.mouseenter(function (e) {
        e.preventDefault();
        noise.removeClass("no-mask");
        noiseLogo.removeClass("showee");
        $(".custom-cursor__text ").find("span").show();
    });

    noiseLogo.mouseenter(function (e) {
        e.preventDefault();
        noise.addClass("no-mask");
        noiseLogo.addClass("showee");
        $(".custom-cursor__text ").find("span").hide();
    });



    // .moving text
    marqueeCharW();
    $(window).resize(function () {
        marqueeCharW();
    });

    function marqueeCharW() {
        var $marquee = $(".marquee").find("span");
        $marquee.css({
            'width': 'auto',
            'height': 'auto'
        });
        var CHAR_W = $marquee.eq(0).width();
        var CHAR_H = $marquee.eq(0).height();
        $nav.find(".sec2 .moving").css('width', CHAR_W + 'px');
        $nav.find(".sec2 .moving").css('height', CHAR_H + 'px');
        $nav.find(".sec2 .marquee").css('width', CHAR_W * 2 + 'px');
        $nav.find(".sec2 .marquee").css('height', CHAR_H + 'px');

    }





});