var filename, uploaded=0;

$(function() {
    $('#file_upload').uploadifive({
      'uploadScript' : 'uploadifive/uploadifive.php',
        'multi'    : false,
        'buttonText' : 'Picture',
        'height' : 28,
        'width' : 130,
        'queueSizeLimit'  : 1,
        'checkScript'  : '/check-exists.php',
        'fileType' : ["image\/gif","image\/jpeg","image\/png"] ,
        'onUploadComplete' : function(file, data) {
            filename = file.name;
            uploaded = 1;
        }
    });
});

$(function() {
    
    var title = $("#title"),
        context = $("#context"),
        allFields = $([]).add(title).add(context),
        tips = $(".validateTips");

    function updateTips(t) {
        tips
            .text(t)
            .addClass("ui-state-highlight");
        setTimeout(function() {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }

    function checkLength(o, n, min, max) {
        if (o.val().length > max || o.val().length < min) {
            o.addClass("ui-state-error");
            updateTips("Length of " + n + " must be between " +
                min + " and " + max + ".");
            return false;
        } else {
            return true;
        }
    }

    $("#dialog-form").dialog({
        autoOpen: false,
        height: 370,
        width: 340,
        modal: true,
        draggable: false,
        resizable: false,
        buttons: {
            "Add a new block": function() {
                var bValid = true;
                allFields.removeClass("ui-state-error");

                bValid = bValid && checkLength(title, "title", 0, 50);
                bValid = bValid && checkLength(context, "text", 0, 80);
                bValid = bValid && (uploaded == 1);
                if (uploaded == 0) {
                    updateTips("Select a picture first.");
                }
                
                if (bValid) {
                    $('#file_upload').uploadifive('clearQueue');
		    //$('#ef-portfolio').isotope('reLayout');
		    var $container = $('#ef-portfolio');
                    var $newdiv = $("<div class='ef-col1-4 ef-item'> <div class='proj-img clickable'> <img src=uploads/" + filename + " alt=''> <div class='proj-description'> <h4> <a href='#'>" + title.val() + "</a> </h4> <p>" + context.val() + "</p> <div class='ef-proj-links'> <div class='alignright'> <a class='ef-proj-more'> </a> </div> </div> </div> </div> </div> ");
                    $container.isotope('insert',$newdiv);
		    /*
		    $('#addBlock').click(function(){
			    $container.isotope('insert',$newdiv);
			    return false;
			  });
		    */
		   /* var $container = $('#ef-portfolio');
		    $container.isotope('reLayout');*/
		    
		    
                    //$('#ef-portfolio').isotope('insert', $newdiv);
                    //$('#ef-portfolio').isotope('layout', $newdiv);
                    uploaded = 0;
                    

                    /*Hovers*/ 
                    $('.proj-img').has('.ef-proj-more').hover(function() {

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

                    $(this).dialog("close");
                }
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
        }
    });

    $("#addBlock")
        .click(function() {
        $("#dialog-form").dialog("open");
    });
        
});


