
$(function(e){
    e.preventDefalut;

// 변수 
let width = window.innerWidth;
let height = window.innerHeight;
let carousel = $(".carousel-wrap li"); 
let circle = $(".circle-items");


//scrollTop value
    $(window).scroll(function(){
        let Scroll = $(window).scrollTop();          
        $(".Scroll").text(Scroll);


  

            let offset = (Scroll - $(".triptych-column").offset().top )* 0.18;
            let offset1 = (Scroll - $(".column-right").offset().top )* 0.07;
  
            $(".triptych-column .triptych-image-container  figure").css({"transform":"translateY("+ -offset+"px)"});
            $(".gallery-img-all").css({"transform":"translateY("+ -offset+"px)"});
            $(".work-typography").css({"transform":"translateY("+ -offset1+"px)"});



    });


    //webfont load가 script load보다 늦어서 setTimeout 300을 줌.
    setTimeout(function(){
        var  headerH = $(".main-gnb").outerHeight();
        $(".section-hero .sticky-wrapper").css("top", -headerH);
        console.log(headerH);
    },300);

    //carousel click motion
    carousel.click(function(){
        carousel.removeClass("active");
        $(this).toggleClass("active");
        $(".carousel").find("a").addClass("opacity");
        $(".carousel").find("p, .column-line, .row-line").addClass("transform");
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


    });


