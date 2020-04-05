$(function(e){
    e.preventDefalut;
 let dot =  $(".carousel").find("li");

dot.click(function(e){
    e.preventDefalut;
    dot.removeClass("active")
    $(this).toggleClass("active");
    $(".dot").find("a").addClass("opacity");
    $(".dot").find("p, .column-line, .row-line").addClass("transform");

});




// let dot = $(".carousel").find("li");

// dot.click(function(e){
//     e.preventDefault();
//     var target = $(this);
//     var index = target.index();
//     //alert(index);

 
// });



});