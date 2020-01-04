$(function () {

   var  Area = $("#contentsArea"),
           $main = Area.find("main"),
           $nav = Area.find("nav"),
            $sec = $main.find("section"),
            $secTop = $sec.find(".secTop"),
            noise = $(".noise-container"),
            noiseLogo = $(".noise-logo");

    //skroll 
    skrollr.init();

    $(window).scroll(function () {
        var wScroll = parseInt($(this).scrollTop());
        $(".scroll_top").text(wScroll);

        if (wScroll >= $(".sec1").offset().top) {
            $(".sec1").addClass("show");
            $(".bar").addClass("fix-bar");
        } else {
            $(".sec1").removeClass("show");
            $(".bar").removeClass("fix-bar");
        }
        if (wScroll >= $sec.eq(1).offset().top) {
            $(".bar").removeClass("fix-bar");
        } else {
            $sec.eq(1).removeClass("show");
        }
        if(wScroll >= $(".sec3").offset().top) {
            $(".sec3").addClass('active');
            $(".sec3").removeClass('no-js');
        } else {
            $(".sec3").removeClass('active');
            $(".sec3").addClass('no-js');
        }
     });


     //cursor 

    $("")





    // var R_H =  $sec.eq(2).offset().top;
    // var r_h =   Math.round(R_H);

    // $sec.eq(2).find($secTop).attr('data-'+ r_h,'display:block');


    //visual
    noise.mouseenter(function (e) {
        e.preventDefault();
        noise.removeClass("no-mask");
        noiseLogo.removeClass("showee");
    });

    noiseLogo.mouseenter(function (e) {
        e.preventDefault();
        noise.addClass("no-mask");
        noiseLogo.addClass("showee");
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
        $nav.find(".sec2 .marquee").css('height', CHAR_H + '%');

    }



       

});


