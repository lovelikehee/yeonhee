$(function(e){
    e.preventDefalut;
    let dot = $(".carousel").find("li");

    dot.click(function(){
        dot.removeClass("active")
        $(this).toggleClass("active");
        $(".dot").find("a").addClass("opacity");
        $(".dot").find("p, .column-line, .row-line").addClass("transform");
    });
          
 //webfont load가 script load보다 늦어서 setTimeout 300을 줌.
    setTimeout(function(){
        var  headerH = $(".main-gnb").outerHeight();
        $(".section-hero .sticky-wrapper").css("top", -headerH);
        console.log(headerH);
       },300);




});