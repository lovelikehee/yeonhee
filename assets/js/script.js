$(function(e) {
    e.preventDefalut;

    // 변수 
    let carousel = $(".carousel-wrap").find("li");
    let circle = $(".rect-items");
    let contItems = $(".contact-items").find("input");
    let section = $(".main").find("section");
    let menu = $(".navlist").find("li");
    let contH = $(".section").offset().top;
    //Height 값구하기 
    let headerH = $(".main-gnb").outerHeight();
    let pagingH = $(".paging").outerHeight();
    let currentH = $(".current").find("li").outerHeight();

    //scrollTop value
    $(window).scroll(function() {
        let Scroll = $(window).scrollTop();
        let ScrollH = Math.ceil(Scroll);
        $(".Scroll").text(ScrollH);

        //offset 
        let offset = (Scroll / contH)*2;
        let offset1 = (Scroll - $(".column-right").offset().top)*0.07;
        let offset2 = (Scroll - $(".triptych-column").offset().top)/5;
        let offset3 = (Scroll - $(".section-about").offset().top)*0.18;
        let offset4 = (Scroll - $(".ability-content").offset().top)*0.05;
        let offset5 = (Scroll - $(".hero-manifesto").offset().top)*0.23;
        let offset6 = (Scroll - $(".section-contact").offset().top)*0.2;

        //.hero
        $(".typography-hero-subhead").css({"opacity": offset/10.5,"transform": "matrix(1, 0, 0, 1, 0," + offset + ")"});
        $(".hero-copy").css({"opacity": offset/11,"transform": "matrix(1, 0, 0, 1, 0," +offset+ ")"});
        //.about
        $(".about-display").css({"transform": "matrix(" +70/offset+ ", 0, 0, " +70/offset+ " ,0," +-offset4*1.6 + ")"});
        $(".screm").css({"opacity": -offset4/480});
        $(".fill-screen-bg").css({ "transform": "matrix( 1, 0, 0, 1 ,0,"+-offset5*1.1 +")"});
        //.triptych-column Scroll
        $(".triptych-column .triptych-image-container  figure").css({ "transform": "translateY("+offset2+"px)"});
        $(".gallery-img-all").css({ "transform": "translateY("+ -(offset1-60) + "px)" });
        $(".work-typography").css({"transform": "translateY(" + -(offset1-50) + "px)"});

        $(".contact-wrap").css({"transform": "translateY(" + -offset6*1.4+ "px)"});


        if (Scroll >= section.eq(0).offset().top) {
            $(".carousel-wrap > li").eq(0).addClass("active");
            menu.removeClass("show");
        } else {
            $(".carousel-wrap > li").eq(0).removeClass("active");
        }
        if (Scroll >= section.eq(1).offset().top) {
            $(".section-about").addClass("active");
            $(".carousel-wrap> li").eq(1).addClass("active");
            menu.eq(1).addClass("show");
        } else {
            $(".section-about").removeClass("active");
            $(".carousel-wrap> li").eq(1).removeClass("active");
            menu.eq(1).removeClass("show");
        }
        if (Scroll >= section.eq(2).offset().top/1.2) {
            $(".carousel-wrap >li").eq(2).addClass("active");
            menu.eq(1).removeClass("show");
        } else {
            $(".carousel-wrap >li").eq(2).removeClass("active");
        }
        if (Scroll >= section.eq(3).offset().top) {
            $(".carousel-wrap >li").eq(3).addClass("active");
            menu.eq(0).addClass("show");
        } else {
            $(".carousel-wrap >li").eq(3).removeClass("active");
        }
        if (Scroll >= section.eq(4).offset().top) {
            $(".carousel-wrap >li").eq(4).addClass("active");
            menu.eq(0).removeClass("show");
        } else {
            $(".carousel-wrap >li").eq(4).removeClass("active");
        }
        if (Scroll >= section.eq(5).offset().top) {
            $(".carousel-wrap >li").eq(5).addClass("active");
            menu.eq(2).addClass("show");
        } else {
            $(".carousel-wrap >li").eq(5).removeClass("active");
            menu.eq(2).removeClass("show");
        }
    });

    setTimeout(function () {
        $(".section-hero .sticky-wrapper").css("top", -headerH); // webfont load가 script load보다 늦어서 setTimeout 300을 줌.
        $(".paging").css("height", pagingH);
        $(".current-area").css("height", currentH);
        $(".section-hero").addClass("active");
        console.log(currentH);
    }, 300);

    //nav
    menu.find("a").click(function () {
        menu.find("a").removeClass("dot-four");
        $(this).addClass("dot-four");
    });

    //ability
    let idx = 1;
    let current = 0;
    let item = $(".ability-content").find("li");
    let items = item.length;

    $(".next").click(function () {
        item.eq(idx).css({"margin-left": "110%" }).animate({"margin-left": 0}, 300);
        item.eq(idx - 1).animate({"margin-left": "-110%"}, 300);
        $(".current li").eq(idx).animate({"margin-top": 0},300);
        $(".current li").eq(idx-1).animate({"margin-top":-currentH},300);
        $(".current li").eq(idx+1).animate({"margin-top":-currentH*items},300);
        idx++;
        if (idx == items) {
            idx = 0;
        }
        console.log(currentH);
    });

    //carousel click motion
    carousel.click(function () {
        let index = $(this).index();
        let sec = section.eq(index);
        let secTop = sec.offset().top;
        $("html,body").animate({
            scrollTop: secTop
        }, 600, "easeInOutExpo");
        carousel.removeClass("active");
        $(this).toggleClass("active");
        $(".carousel").find("a").addClass("opacity");
        $(".carousel").find("p, .column-line, .row-line").addClass("transform");
    });


    //contact
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

    //input 에 keyup되었을때, placeholder 변경 
    $("#uName").on("propertychange change paste input", function () {
        uName = $("#uName").val();
        console.log(uName)
        if (!uName == "") {
            $(this).parent(".contact-input").siblings(".label-text").addClass("active");
            $(".caution").eq(0).css("display", "none").html("");
            $("#uName").siblings(".line").css('background', '#02F093');
        } else {
            $(this).parent(".contact-input").siblings(".label-text").removeClass("active");
            $(".caution").eq(0).css("display", "block").html("이름을 작성해주세요");
            $("#uName").siblings(".line").css('background', '#932422');
        }
    });

    $("#uMail").on("propertychange change paste input", function () {
        uMail = $("#uMail").val();
        uName = $("#uName").val();
        console.log(uMail)
        if (!uMail == "") {
            $(this).parent(".contact-input").siblings(".label-text").addClass("active");
            $(".caution").eq(1).css("display", "none").html("");
            $("#uMail").siblings(".line").css('background', '#02F093');
        } else {
            $(this).parent(".contact-input").siblings(".label-text").removeClass("active");
            $(".caution").eq(1).css("display", "block").html("메일주소를 입력해주세요");
            $("#uMail").siblings(".line").css('background', '#932422');
        }
    });

    $("#uMemo").on("propertychange change paste input", function () {
        uMemo = $("#uMemo").val();
        console.log(uMemo)
        if (!uMemo == "") {
            $(this).parent(".contact-input").siblings(".label-text").addClass("active");
            $(".caution").eq(2).css("display", "none").html("");
            $("#uMemo").siblings(".line").css('background', '#02F093');
        } else {
            $(this).parent(".contact-input").siblings(".label-text").removeClass("active");
            $(".caution").eq(2).css("display", "block").html("메모를 입력해주세요");
            $("#uMemo").siblings(".line").css('background', '#932422');
        }

    });

});