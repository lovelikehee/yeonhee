$(function (e) {
    e.preventDefalut;

    // 변수 
    let width = window.innerWidth;
    let height = window.innerHeight;
    let carousel = $(".carousel-wrap li");
    let circle = $(".rect-items");
    let contItems = $(".contact-items").find("input");

    //scrollTop value
    $(window).scroll(function () {
        let Scroll = $(window).scrollTop();
        let ScrollH = Math.ceil(Scroll);
        $(".Scroll").text(ScrollH);



        let offset = (Scroll - $(".triptych-column").offset().top) * 0.18;
        let offset1 = (Scroll - $(".column-right").offset().top) * 0.07;
        let offset2 = (Scroll - $(".triptych-column").offset().top) /1000;
        let offset3 = (Scroll - $(".section-about").offset().top) *0.18;
        //.ability
        $(".about-display").css({
            "transform": "scale("+ -offset2 +") translateY(" + offset3+"px)"
       
        });

        //.triptych-column Scroll
        $(".triptych-column .triptych-image-container  figure").css({ "transform": "translateY(" + -offset + "px)"});
        $(".gallery-img-all").css({"transform": "translateY(" + -(offset1-60) + "px)" });
        $(".work-typography").css({ "transform": "translateY(" + -(offset1-50) + "px)"});

    });

    //webfont load가 script load보다 늦어서 setTimeout 300을 줌.
    setTimeout(function () {
        let headerH = $(".main-gnb").outerHeight();
        $(".section-hero .sticky-wrapper").css("top", -headerH);
        console.log(headerH);
    }, 300);


    //carousel click motion
    carousel.click(function () {
        carousel.removeClass("active");
        $(this).toggleClass("active");
        $(".carousel").find("a").addClass("opacity");
        $(".carousel").find("p, .column-line, .row-line").addClass("transform");
    });
});

$(function(){




});

    // //ability slide
    //          let index = 1;
    //          let current = 0;
    //          setInterval(function(){
    //             $(".banner li").eq(index).css({"margin-left":"100%"}).animate({"margin-left" : 0},300);
    //             $(".banner li").eq(index-1).animate({"margin-left" : "-100%"},300);
    //             index++;
    //             if(index == 3){
    //                 index = 0;
    //             }
    //             console.log(index);
    //          },1000);


    //.contacts label 
    $(function () {
        $("#uName").keydown(function (key) {
            if (key.keyCode == 13) { // name 입력부분에서 엔터키를 쳤을 경우
                key.preventDefault();
                $("#uMail").focus(); // mail 입력부분으로 포커스 이동한다
            } 
        });
        $("#uMail").keydown(function (key) {
            if (key.keyCode == 13) {
                $("#uMemo").focus(); // memo 입력부분으로 포커스 이동한다
            }
        });
        $("#uMemo").keydown(function (e) {
            if (e.keyCode == 13) {
                $(".contact-button").focus(); // button 입력부분으로 포커스 이동한다
            }
        });
        $(".input").focus(function () {
            $(this).siblings(".line").css('background', '#02F093');
        });
        $(".input").blur(function () {
            $(this).siblings(".line").css('background', '#fff');
        });
        $(".input").change(function () {
            $(this).parent(".contact-input").siblings(".label-text").addClass("active");
        });
    });



