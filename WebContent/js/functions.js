function hpslider(){
    var _this = jQuery('.homepageslickslider');
    jQuery('.homepageslickslider').slick({
        slide: '.homepagetileouter',
        dots: false,
        arrows: true,
        autoplay: false,
        variableHeight: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 1
                }
            },
        ]
    });
};


if (typeof (TCH) === 'undefined') {
	var TCH = {};
}

TCH.Tusk = {

    spanfield: [],
    spanfieldIntervals: {},
    spanfieldActualCount: {},

	/**
	 * Tusk initialization.
	 */
	Init: function () {
		var self = this;
        this.FancyInput ();
        hpslider();
        if (jQuery('.homepagetitle').length > 0){
            jQuery(window).on('load', function(){
                self.alternateText();
            })
        };

        jQuery (window).on ('load scroll', function () {
            self.StickyMainNavigation ();
        });

        if (jQuery ('.services-tusk-attributes').length > 0) {
			jQuery ('body').on ('click', '.services-tusk-attributes-list button', function () {
				self.ToggleTuskAttribute (jQuery (this));
			});
		};

        jQuery('body').on('click', '.mobile-navtoggle', function(e){
            self.NavToggle ();
        });
        jQuery('body').on('click', function(e){
            self.NavClose(e);
        });

        if (jQuery('.slidearrow').length > 0 ){
            jQuery(window).on('load scroll', function(){
                self.slideArrow();
        })
        };
        if (jQuery('.slidebluehere').length > 0 ){
            jQuery(window).on('load', function(){
                self.slideBlue();
            })
        };

        if (jQuery('.extralargep').length > 0 ){
            jQuery(window).on('load', function(){
                self.setNumbers();
            })
        };
        if (jQuery('.extralargep').length > 0 ){
            jQuery(window).on('load scroll', function(){
                 self.countUp();
            })
        };
        if (jQuery('.tilebottompart').length > 0 ){
            jQuery(window).on('load resize',function(){
                self.resizeTilesBottom();
            })
        };
	},

    /**
     *  resize bottom parts of tiles
     */

    resizeTilesBottom: function(){
        var minHeight = 0;
        jQuery('.tilebottompart').each(function(){
            if (jQuery (this).height () > minHeight) {
                minHeight = jQuery (this).height ();
            }
        })
        jQuery('.tilebottompart').css('min-height', minHeight+'px');
    },

    /**
     *  adding texts to homepage title
     */
    alternateText: function(){
        jQuery('.appendto').append('</br>').append(jQuery('.allvariations').css('display', 'inline'));
        jQuery('.typethis').lettering();
        TCH.Tusk.slideTextStart();
    },

    slideTextStart: function() {
        jQuery('.allvariations .typethis.shown').fadeOut(500).promise().then(function(){ jQuery('.allvariations span').hide();
            //reset after all cycles finished
            if (jQuery('.allvariations .typethis:not(.shown)').length < 1) {
                jQuery('.allvariations .typethis').removeClass('shown');
                jQuery('.allvariations span').removeClass('shown');
            }
            var actualSaying = jQuery('.allvariations .typethis:not(.shown)').first();
            TCH.Tusk.singleLine(actualSaying);
        });

    },

    singleLine: function(actualSaying){
        actualSaying.show().css('display', 'inline');
        setTimeout(TCH.Tusk.slideChars(actualSaying), 500, actualSaying);
    },

    slideChars: function(actualSaying){
        if (actualSaying.children('span:not(.shown)').length < 1) {
            actualSaying.addClass('shown');
            setTimeout(TCH.Tusk.slideTextStart, 2000);
        } else {
            var pickSpan = function () {
                actualSaying.children('span:not(.shown)').first().fadeIn(200).addClass('shown');
                TCH.Tusk.slideChars(actualSaying);
            };
            setTimeout(pickSpan, 100, actualSaying);
        }
    },

     /**
      * countdown on numbers with extralargep style
      */
    setNumbers: function(){
        i = 0;
        jQuery('.extralargep span').each(function(){
            var span = jQuery(this);
            var text = span.text();
            var number = parseInt(text);
            var rest = text.replace(number, '');
            span.attr('data-initial', number);
            span.attr('data-addition', rest);
            span.text('0' + rest);
            var id = 'span' + i;
            span.attr('id', id);
            TCH.Tusk.spanfield.push(id);
            i++;
        }).show();
    },

    countUp: function(){
        if (jQuery('.extralargep span:not(.started)').length > 0 ) {
            for (var i = 0; i < TCH.Tusk.spanfield.length; i++) {
                var id = TCH.Tusk.spanfield[i];

                var span = jQuery('#' + id);
                if (TCH.Tusk.isScrolledIntoView(span) && !span.hasClass('started')) {
                    span.addClass('started');
                    var initial = span.data('initial');
                    var addition = span.data('addition');
                    TCH.Tusk.spanfieldActualCount[id] = 0;

                    (function (initial, addition, span, id ) {
                        var intervalSpeed = 3000 / initial;
                        TCH.Tusk.spanfieldIntervals [id] = setInterval(function () {
                            TCH.Tusk.tick(initial, addition, span, id);
                        }, intervalSpeed);
                    })(initial, addition, span, id);
                }
            }
        }
    },

    tick: function (initial, addition, span, id){
        TCH.Tusk.spanfieldActualCount [id]++;
        span.text(TCH.Tusk.spanfieldActualCount [id] + addition);
        if (TCH.Tusk.spanfieldActualCount [id] >= initial){

            clearInterval(TCH.Tusk.spanfieldIntervals [id]);
        }
    },


    isScrolledIntoView: function(element){
        var elem = element;
        var jWindow = jQuery(window);

        var docViewTop = jWindow.scrollTop();
        var docViewBottom = docViewTop + jWindow.innerHeight();

        var elemTop = elem.offset().top;
        var elemBottom = elemTop + elem.height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    },

    slideBlue: function() {
        jQuery('.slidebluething').addClass('afterslide');
    },

    slideArrow: function (){
        var arrow = jQuery('.slidearrow');
        var container = jQuery('.yellowbackground');
        var scrollnow = container.position().top - arrow.outerHeight()/2;
        if (jQuery (window).scrollTop () > scrollnow ){
            arrow.addClass ('afterslide');
        }
    },

    /**
     * Sticky primary navigation to top on scroll.
     * Scrolldown is animated together with primary.
     */
    StickyMainNavigation: function () {
        var body = jQuery ('body');
        if (body.hasClass ('noScroll')) {
            return;
        }

        var masthead = jQuery ('#masthead');
        //var navHeight = masthead.attr ('data-height');
        windowWidth = jQuery('html').outerWidth(false);
        if (windowWidth > 991) {
            var navHeight = 80;
        }else{
            var navHeight = 50;
        }
        /*if (typeof (navHeight) === 'undefined' || parseFloat (navHeight) <= 0) {
            navHeight = masthead.outerHeight (false);
            masthead.attr ('data-height', navHeight);
        }*/

        var scrolldown = jQuery ('#scrolldown');
        if (jQuery (window).scrollTop () > navHeight) {
            if (!masthead.hasClass ('sticky')) {
                masthead.addClass ('sticky');
            }
            if (!scrolldown.hasClass ('gone')) {
                scrolldown.addClass ('gone');
            }
        } else {
            if (masthead.hasClass ('sticky')) {
                masthead.removeClass ('sticky');
            }
            if (scrolldown.hasClass ('gone')) {
                scrolldown.removeClass ('gone');
            }
        }
    },

    /**
     * Handle change of status for fancy inputs.
     */
    FancyInput: function () {
        var body = jQuery ('body');
        body.on ('focusin', '.fancy-input input', function () {
            jQuery (this).parents ('.fancy-input').eq (0).addClass ('focused');
        });
        body.on ('focusout', '.fancy-input input', function () {
            jQuery (this).parents ('.fancy-input').eq (0).removeClass ('focused');
        });

        var isWritten = function (thiss) {
            if (thiss.val ().length > 0) {
                thiss.parents ('.fancy-input').eq (0).addClass ('written');
            } else {
                thiss.parents ('.fancy-input').eq (0).removeClass ('written');
            }
        };
        body.on ('change', '.fancy-input input', function () {
            isWritten (jQuery (this));
        });
        jQuery (window).on ('load', function () {
            jQuery ('.fancy-input input'). each (function () {
                isWritten (jQuery (this));
            });
        });

        body.on ('focusin', '.fancy-textarea textarea', function () {
            jQuery (this).parents ('.fancy-textarea').eq (0).addClass ('focused');
        });
        body.on ('focusout', '.fancy-textarea textarea', function () {
            jQuery (this).parents ('.fancy-textarea').eq (0).removeClass ('focused');
        });

        var isWrittenTextArea = function (thiss) {
            if (thiss.val ().length > 0) {
                thiss.parents ('.fancy-textarea').eq (0).addClass ('written');
            } else {
                thiss.parents ('.fancy-textarea').eq (0).removeClass ('written');
            }
        };
        body.on ('change', '.fancy-textarea textarea', function () {
            isWrittenTextArea (jQuery (this));
        });
        jQuery (window).on ('load', function () {
            jQuery ('.fancy-textarea textarea'). each (function () {
                isWrittenTextArea (jQuery (this));
            });
        });
    },


    NavToggle: function(){
        if (jQuery('.menu-top-container').hasClass('visible')) {
            jQuery('.menu-top-container').removeClass('visible');
            jQuery('.mobile-navtoggle').removeClass('open');
        } else {
            jQuery('.menu-top-container').addClass('visible');
            jQuery('.mobile-navtoggle').addClass('open');
        }
        if (jQuery('.menu-top-container').hasClass('visible')) {

        }else{

        }
        jQuery('.menu-top-container').slideToggle(500);
    },


    NavClose: function(e){
        if (typeof(e.target) != 'undefined') {
            if (jQuery(e.target).hasClass('menu-top-container') || jQuery(e.target).hasClass('mobile-navtoggle') || jQuery(e.target).parents('.mobile-navtoggle').length > 0 || jQuery(e.target).parents('.menu-top-container').length > 0) {
                return;
            }
            if (jQuery('.menu-top-container').hasClass('visible')) {
                this.NavToggle();
            }
        }
    }
}

jQuery (function () {
	TCH.Tusk.Init ();
});
