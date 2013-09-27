$(document).ready(function() {
$(function(){
    
  
var $container = $('#ef-portfolio');
//var itemWdt = $container.width() / 4;
$container.imagesLoaded( function(){
    $container.isotope({
      itemSelector : '.ef-item',
      //masonry: { columnWidth: itemWdt }
    });
  });
});

/*Hovers*/
	
    $('.proj-img').has('.ef-proj-more').hover(function(){

        $(this).find('.proj-description').stop().animate({
            "opacity": "1"
        }, 400).children(':first-child').stop().animate({
        	top: '0'
        }, 200).next().stop().animate({
        	top: '0'
        }, 220).next().stop().animate({
        	bottom: '0'
        }, 200);
        
    }, function() {

        $(this).find('.proj-description').stop().animate({
            "opacity": "0"
        }, 400).children(':first-child').stop().animate({
        	top: '-40px'
        }, 200).next().stop().animate({
        	top: '-50px'
        }, 220).next().stop().animate({
        	bottom: '-75px'
        }, 200);
        
    });
});