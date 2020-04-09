$(function(e){
    e.preventDefalut;
    let dot = $(".carousel").find("li"),
          headerH =   $(".main-gnb").outerHeight();

    dot.click(function(){
        dot.removeClass("active")
        $(this).toggleClass("active");
        $(".dot").find("a").addClass("opacity");
        $(".dot").find("p, .column-line, .row-line").addClass("transform");
    });
          
      
    $(".section-hero .sticky-wrapper").css("top", -headerH);
    console.log(headerH);



});