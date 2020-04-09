$(function(e){
    e.preventDefalut;
    let dot = $(".carousel").find("li");

    dot.click(function(){
        dot.removeClass("active")
        $(this).toggleClass("active");
        $(".dot").find("a").addClass("opacity");
        $(".dot").find("p, .column-line, .row-line").addClass("transform");
    });
          
 
    setTimeout(function(){
        var  headerH = $(".main-gnb").outerHeight();
        $(".section-hero .sticky-wrapper").css("top", -headerH);
        console.log(headerH);
       },1000);




});