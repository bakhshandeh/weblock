$(function() {
    // a workaround for a flaw in the demo system (http://dev.jqueryui.com/ticket/4375), ignore!
    $("#dialog:ui-dialog").dialog("destroy");

    var browse = $("#browse"),
        title = $("#title"),
        context = $("#context"),
        allFields = $([]).add(browse).add(title).add(context),
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
        height: 320,
        width: 380,
        modal: true,
        buttons: {
            "ایجاد یک بلاک": function() {
                var bValid = true;
                allFields.removeClass("ui-state-error");

                bValid = bValid && checkLength(title, "عنوان", 0, 16);
                bValid = bValid && checkLength(context, "متن", 0, 80);
                bValid = bValid && checkLength(browse, "عکس", 0, 500);

                //bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter." );
                // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                //bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
                //bValid = bValid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );

                if (bValid) {

                    var $newdiv = $("<div class='ef-col1-4 ef-item'> <div class='proj-img clickable'> <img src='images/web/glendale-thumb.jpg' alt=''> <div class='proj-description'> <h4> <a href='work/glendale.php.html'> خوش آمدید </a> </h4> <p> توسعه </p> <div class='ef-proj-links'> <div class='alignright'> <a class='ef-proj-more'> </a> </div> </div> </div> </div> </div> ");
                    $('#ef-portfolio').isotope('insert', $newdiv);
                    $('#ef-portfolio').isotope('layout', $newdiv);
                    //pageLoad();
                    //$(document).ready();
                    //var efItem = $('#ef-portfolio .ef-item');
                    //efItem.find('.proj-img').append('<span class="ef-cover"></span>');
                    //var itemWdt = $('#ef-portfolio').width() / 4;		  
                    //$('.ef-width2').css({width: itemWdt * 2});

                    //$('#ef-portfolio').isotope( 'reLayout');





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


                    //$("#ef-portfolio").append(newdiv);
                    //newdiv.
                    //portfolio = document.getElementByID("ef-portfolio");
                    //portfolio.append($newdiv);
                    //$("<div><img src='images/web/glendale-thumb.jpg' alt=''>div>").appendTo("#ef-portfolio");

                    /* $( "#users tbody" ).append( "<tr>" +
                                                "<td>" + name.val() + "</td>" + 
                                                "<td>" + email.val() + "</td>" + 
                                                "<td>" + password.val() + "</td>" +
                                        "</tr>" ); */
                    $(this).dialog("close");
                }
            },
            "انصراف": function() {
                $(this).dialog("close");
            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
        }
    });

    $("#AddBlock")
        .button()
        .click(function() {
        $("#dialog-form").dialog("open");
    });
});

function HandleBrowseClick() {
    var fileinput = document.getElementById("browse");
    fileinput.click();
}

function Handlechange() {
    var fileinput = document.getElementById("browse");
    var textinput = document.getElementById("filename");
    textinput.value = fileinput.value;
}