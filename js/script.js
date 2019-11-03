$(function() {

    $('.navicon').on('click', function(event) {
        event.stopPropagation();
        
        var $sidebar = $('.sidebar'),
            scrollTop = ($('html').scrollTop()) ? $('html').scrollTop() : $('body').scrollTop();

        if ($('.header').outerHeight() + $('.content').outerHeight() + $('.footer').outerHeight() > $(window).height() || $sidebar.find('.sidebar-content').outerHeight() > $(window).height()) {
            $('html').addClass('no-scroll').css('top', -scrollTop + 'px');
            $sidebar.addClass('sidebar-scroll');
        }

        $sidebar.addClass('sidebar-open');
    });

    $('.sidebar').find('.close').on('click', function() {
        var scrollTop = parseInt($('html').css('top'));
        $('html').removeClass('no-scroll');
        
        if (scrollTop) {
            $('html, body').scrollTop(-scrollTop);
        }
        
        $('.sidebar').removeClass('sidebar-open sidebar-scroll');
    });

    $('.modal-button').on('click', function() {
        var $modal = $('.modal'),
            scrollTop = ($('html').scrollTop()) ? $('html').scrollTop() : $('body').scrollTop();

        if ($('.header').outerHeight() + $('.content').outerHeight() + $('.footer').outerHeight() > $(window).height() || $modal.find('.modal-content').outerHeight(true) > $(window).height()) {
            $('html').addClass('no-scroll').css('top', -scrollTop + 'px');
            $modal.addClass('modal-scroll');
        }

        $modal.addClass('modal-show');
    });

    $('.modal').find('.close').on('click', function() {
        var scrollTop = parseInt($('html').css('top'));
        $('html').removeClass('no-scroll');
        
        if (scrollTop) {
            $('html, body').scrollTop(-scrollTop);
        }
        
        $('.modal').removeClass('modal-show modal-scroll');
    });

    $('.modal-overlay').on('click', function() {
        $('.modal').find('.close').trigger('click');
    });

  	$('.dropdown-label').on('click', function(event) {
        event.stopPropagation();
        
        $(this).closest('.dropdown-block').siblings().find('.dropdown').removeClass('dropdown-open');
        $(this).closest('.dropdown').siblings().removeClass('dropdown-open');
		$(this).closest('.dropdown').toggleClass('dropdown-open');
	});

	$('.dropdown-list').find('li').on('click', function() {
		$(this).siblings().removeClass('chosen').attr('data-value', '');
		$(this).addClass('chosen').attr('data-value', $(this).text());
		$(this).closest('.dropdown').find('.dropdown-label').children('span').text($(this).text());
		$(this).closest('.dropdown').removeClass('dropdown-open');
	});

    $('.accordion').each(function() {
        if ($(this).hasClass('accordion-open')) {
            $(this).find('.accordion-content').css('display', 'block');
        }
    });

    $('.accordion').find('.accordion-label').on('click', function(event) {
        event.stopPropagation();
        
        var $accordion = $(this).closest('.accordion');

        if ($accordion.hasClass('accordion-open')) {
            $accordion.removeClass('accordion-open');
            $accordion.find('.accordion-content').slideUp(250);
        } else {
            $accordion.addClass('accordion-open');
            $accordion.find('.accordion-content').slideDown(250);
        }
    });

	$('.tabs-nav').find('a').on('click', function(event) {
      	event.preventDefault();

      	var currentTab = $(this).attr('href');

      	$(this).closest('.tabs').find('.tabs-nav').children('li').removeClass('current-tab');
      	$(this).closest('li').addClass('current-tab');

        $(this).closest('.tabs').find('.tab-content').removeClass('current-tab-content');
        $(currentTab).addClass('current-tab-content');
  	});

    $('.tabs-content').find('.tab-content').each(function() {
        var $this = $(this);
        $this.find('.dropdown-block').each(function(i) {
            $(this).find('.dropdown').css('z-index', ($(this).siblings().length-i)+1);
        });
    });

  	$('.form').find('input').on('focus', function() {
        $(this).closest('.input-block').addClass('focus');
    });

    $('.form').find('input').on('blur', function() {
        $(this).closest('.input-block').removeClass('focus');
    });

    $(document).on('click', function(event) {
        if ($(event.target).closest('.dropdown').length == 0) {
            $('.dropdown').removeClass('dropdown-open');
        }
        if ($(event.target).closest('.accordion').length == 0) {
            $('.accordion').removeClass('accordion-open');
            $('.accordion').find('.accordion-content').slideUp(250);
        }
        if ($(event.target).closest('.sidebar').length == 0 && window.matchMedia('screen and (min-width: 768px)').matches) {
            $('.sidebar').find('.close').trigger('click');
        }
    });

    $('.progress-step').on('click', function() {
        var stepWidth = $('.progress').find('.progress-step').outerWidth(),
            stepLength = $('.progress').find('.progress-step').length;

    	$('.progress').find('.progress-step').removeClass('current-step');
    	$(this).addClass('current-step');
        $('.progress').find('.progress-line').find('.progress-percent').css('width', parseInt(((stepWidth*stepLength)*$(this).attr('data-percent'))/100) + 'px');

        moveActiveSteps();
    });

    $('.progress-button').on('click', function() {
        var stepWidth = $('.progress').find('.progress-step').outerWidth(),
            stepLength = $('.progress').find('.progress-step').length;

	    if ($(this).hasClass('prev')) {
	    	if ($('.progress').find('.current-step').prev().length && $('.progress').find('.current-step').prev().hasClass('active-step')) {
		    	$('.progress').find('.current-step').prev().addClass('current-step');
		    	$('.progress').find('.current-step').last().removeClass('current-step');
		    	$('.progress').find('.progress-line').find('.progress-percent').css('width', parseInt(((stepWidth*stepLength)*$('.progress').find('.current-step').attr('data-percent'))/100) + 'px');
		    }
	    }
	    if ($(this).hasClass('next')) {
	    	if ($('.progress').find('.current-step').next().length && $('.progress').find('.current-step').next().hasClass('active-step')) {
		    	$('.progress').find('.current-step').next().addClass('current-step');
		    	$('.progress').find('.current-step').first().removeClass('current-step');
		    	$('.progress').find('.progress-line').find('.progress-percent').css('width', parseInt(((stepWidth*stepLength)*$('.progress').find('.current-step').attr('data-percent'))/100) + 'px');
		    }
	    }
	});

    $('.option').each(function() {
        $(this).attr('data-value', $(this).find('.big-text').text());
    });

	$('.option').on('click', function() {
        if ($(this).hasClass('single-option')) {
            $(this).closest('.step').find('.option').removeClass('chosen');
            $(this).addClass('chosen');
        }
        if ($(this).hasClass('multiple-option')) {
            $(this).addClass('chosen');
        }
		
		moveNonActiveSteps();
	});

});

$(window).on('load', function() {
	setPercentSteps();
    fillCircle();
});

$(window).on('resize', function() {
    setPercentSteps();
});

function fillCircle() {
    if ($('#circle').length) {
        var $circle = $('#circle'),
            $circlePercent = $circle.closest('.circle').find('.circle-percent').children('span'),
            $circleText = $('.circle-text').children('span'),
            circleTextLength = $('.circle-text').children('span').length,
            circleTextCount = 1,
            $path = $circle.find('path'),
            pathLength = Math.round($path.get(0).getTotalLength()),
            offset = 1;

        $path.attr('stroke-dasharray', '0,'+ pathLength).css('opacity', '1');
        
        var fillPath = setInterval(function() {
            if (offset <= 100) {
                $path.attr('stroke-dasharray', (pathLength/100)*offset +','+ pathLength);
                $circlePercent.text(offset);

                if (offset == Math.round((100/circleTextLength)*circleTextCount)) {
                    $circleText.eq(circleTextCount-1).addClass('change');
                    circleTextCount++;
                }

                offset++;
            } else {
                clearInterval(fillPath);
            }
        }, 100);
    }
}

function setPercentSteps() {
	var stepWidth = $('.progress').find('.progress-step').outerWidth(),
        stepLength = $('.progress').find('.progress-step').length,
    	stepPercent = Math.floor((100/stepLength)*10)/10;
    
    $('.progress-step').each(function(i) {
    	$(this).attr({
    		'data-index': $(this).index() + 1,
    		'data-percent': Math.floor(stepPercent*(i+1)*10)/10
    	});
    });

    $('.progress').find('.progress-steps, .progress-line').css('width', stepWidth*stepLength + 'px');
    $('.progress').find('.progress-line').find('.progress-percent').css('width', parseInt(((stepWidth*stepLength)*$('.progress').find('.current-step').attr('data-percent'))/100) + 'px');

    if ($('.progress').find('.current-step').attr('data-index') > 4 && window.matchMedia('screen and (min-width: 768px)').matches) {
        if ($('.progress').find('.current-step').nextAll().length > 1) {
            $('.progress-track').css({
                'transform': 'translateX(-'+ parseInt(stepWidth*($('.progress').find('.current-step').attr('data-index') - 4)) +'px)',
                '-webkit-transform': 'translateX(-'+ parseInt(stepWidth*($('.progress').find('.current-step').attr('data-index') - 4)) +'px)'
            });
            $('.progress-track').attr('data-offset', -stepWidth*($('.progress').find('.current-step').attr('data-index') - 4));
        } else if ($('.progress').find('.current-step').nextAll().length > 0) {
            $('.progress-track').css({
                'transform': 'translateX(-'+ parseInt(stepWidth*($('.progress').find('.current-step').attr('data-index') - 5)) +'px)',
                '-webkit-transform': 'translateX(-'+ parseInt(stepWidth*($('.progress').find('.current-step').attr('data-index') - 5)) +'px)'
            });
            $('.progress-track').attr('data-offset', -stepWidth*($('.progress').find('.current-step').attr('data-index') - 5));
        } else {
            $('.progress-track').css({
                'transform': 'translateX(-'+ parseInt(stepWidth*($('.progress').find('.current-step').attr('data-index') - 6)) +'px)',
                '-webkit-transform': 'translateX(-'+ parseInt(stepWidth*($('.progress').find('.current-step').attr('data-index') - 6)) +'px)'
            });
            $('.progress-track').attr('data-offset', -stepWidth*($('.progress').find('.current-step').attr('data-index') - 6));
        }
    } else if ($('.progress').find('.current-step').attr('data-index') > 2 && window.matchMedia('screen and (max-width: 767px)').matches) {
        if ($('.progress').find('.current-step').nextAll().length > 0) {
            $('.progress-track').css({
                'transform': 'translateX(-'+ parseInt(stepWidth*($('.progress').find('.current-step').attr('data-index') - 3)) +'px)',
                '-webkit-transform': 'translateX(-'+ parseInt(stepWidth*($('.progress').find('.current-step').attr('data-index') - 3)) +'px)'
            });
            $('.progress-track').attr('data-offset', -stepWidth*($('.progress').find('.current-step').attr('data-index') - 3));
        } else {
            $('.progress-track').css({
                'transform': 'translateX(-'+ parseInt(stepWidth*($('.progress').find('.current-step').attr('data-index') - 4)) +'px)',
                '-webkit-transform': 'translateX(-'+ parseInt(stepWidth*($('.progress').find('.current-step').attr('data-index') - 4)) +'px)'
            });
            $('.progress-track').attr('data-offset', -stepWidth*($('.progress').find('.current-step').attr('data-index') - 4));
        }
    }

    if (window.matchMedia('screen and (min-width: 768px)').matches) {
        $('.progress').find('.progress-step').slice(0, 4).addClass('first-step');
        $('.progress').find('.progress-step').slice(-2).addClass('last-step');
    } else {
        $('.progress').find('.progress-step').slice(0, 3).addClass('first-step');
        $('.progress').find('.progress-step').slice(-1).addClass('last-step');
    }
}

function moveNonActiveSteps() {
    var stepWidth = $('.progress').find('.progress-step').outerWidth(),
        stepLength = $('.progress').find('.progress-step').length,
        maxOffsetX = parseInt($('.progress-track').attr('data-offset'));

	if (!$('.progress').find('.current-step').next().hasClass('active-step')) {
		if ($('.progress').find('.current-step').next().index() > $('.progress').find('.current-step').index()) {
			$('.progress').find('.current-step').next().addClass('active-step');
			$('.progress').find('.current-step').next().addClass('current-step');
		    $('.progress').find('.current-step').first().removeClass('current-step');
			$('.progress').find('.progress-line').find('.progress-percent').css('width', parseInt(((stepWidth*stepLength)*$('.progress').find('.current-step').attr('data-percent'))/100) + 'px');

            if ($('.progress').find('.current-step').prevAll().length > 3 && $('.progress').find('.current-step').nextAll().length > 1 && window.matchMedia('screen and (min-width: 768px)').matches || $('.progress').find('.current-step').prevAll().length > 2 && $('.progress').find('.current-step').nextAll().length > 0 && window.matchMedia('screen and (max-width: 767px)').matches) {
                if (maxOffsetX) {
                    $('.progress-track').css({
                        'transform': 'translateX('+ parseInt($('.progress-track').attr('data-offset') - stepWidth) +'px)',
                        '-webkit-transform': 'translateX('+ parseInt($('.progress-track').attr('data-offset') - stepWidth) +'px)'
                    });
                    $('.progress-track').attr('data-offset', parseInt($('.progress-track').attr('data-offset') - stepWidth));
                } else {
                    $('.progress-track').css({
                        'transform': 'translateX(-'+ stepWidth +'px)',
                        '-webkit-transform': 'translateX(-'+ stepWidth +'px)'
                    });
                    $('.progress-track').attr('data-offset', -stepWidth);
                }
            }
    	}
	}
}

var offsetCount = 0;
var changeDirection = false;

function moveActiveSteps() {
    var stepWidth = $('.progress').find('.progress-step').outerWidth(),
        stepLength = $('.progress').find('.progress-step').length,
        currentOffset = $('.progress-track').css('transform') || $('.progress-track').css('-webkit-transform'),
        currentOffsetX = parseInt(currentOffset.split(',')[4]),
        maxOffsetX = parseInt($('.progress-track').attr('data-offset'));

    if ($('.progress').find('.current-step').prev().hasClass('active-step')) {
        if ($('.progress').find('.current-step').prev().index() < $('.progress').find('.current-step').index()) {
            $('.progress').find('.progress-line').find('.progress-percent').css('width', parseInt(((stepWidth*stepLength)*$('.progress').find('.current-step').attr('data-percent'))/100) + 'px');

            if (currentOffsetX == 0) {
                changeDirection = true;
            }

            if (currentOffsetX == maxOffsetX) {
                changeDirection = false;
            }
            
            if (window.matchMedia('screen and (min-width: 768px)').matches) {
                if ($('.progress').find('.current-step').attr('data-index') == parseInt($('.progress').find('.active-step').not('.last-step').last().attr('data-index') - (offsetCount*5) - 3) && changeDirection == false && !$('.progress').find('.current-step').hasClass('first-step')) {
                    if ($('.progress').find('.current-step').prevAll().length > 4) {
                        $('.progress-track').css({
                            'transform': 'translateX('+ parseInt(currentOffsetX + (stepWidth*5)) +'px)',
                            '-webkit-transform': 'translateX('+ parseInt(currentOffsetX + (stepWidth*5)) +'px)'
                        });
                    } else {
                        $('.progress-track').css({
                            'transform': 'translateX('+ parseInt(currentOffsetX + (stepWidth*$('.progress').find('.current-step').prevAll().length)) +'px)',
                            '-webkit-transform': 'translateX('+ parseInt(currentOffsetX + (stepWidth*$('.progress').find('.current-step').prevAll().length)) +'px)'
                        });
                    }
                    
                    offsetCount++;
                } else if ($('.progress').find('.current-step').attr('data-index') == parseInt($('.progress').find('.active-step').not('.last-step').last().attr('data-index') - (offsetCount*5) + 2) && currentOffsetX != 0 && currentOffsetX != maxOffsetX && changeDirection == false && !$('.progress').find('.current-step').hasClass('first-step')) {
                    if ($('.progress').find('.current-step').nextAll().length > 4) {
                        $('.progress-track').css({
                            'transform': 'translateX('+ parseInt(currentOffsetX - (stepWidth*5)) +'px)',
                            '-webkit-transform': 'translateX('+ parseInt(currentOffsetX - (stepWidth*5)) + 'px)'
                        });
                    } else {
                        $('.progress-track').css({
                            'transform': 'translateX('+ parseInt(currentOffsetX - (stepWidth*$('.progress').find('.current-step').nextAll().length)) +'px)',
                            '-webkit-transform': 'translateX('+ parseInt(currentOffsetX - (stepWidth*$('.progress').find('.current-step').nextAll().length)) + 'px)'
                        });
                    }
                    
                    offsetCount--;
                } else if ($('.progress').find('.current-step').attr('data-index') == parseInt($('.progress').find('.active-step').not('.last-step').last().attr('data-index') - (offsetCount*5) + 3) && changeDirection == true && !$('.progress').find('.current-step').hasClass('first-step')) {
                    if ($('.progress').find('.current-step').nextAll().length > 4) {
                        $('.progress-track').css({
                            'transform': 'translateX('+ parseInt(currentOffsetX - (stepWidth*5)) +'px)',
                            '-webkit-transform': 'translateX('+ parseInt(currentOffsetX - (stepWidth*5)) + 'px)'
                        });
                    } else {
                        $('.progress-track').css({
                            'transform': 'translateX('+ parseInt(currentOffsetX - (stepWidth*$('.progress').find('.current-step').nextAll().length)) +'px)',
                            '-webkit-transform': 'translateX('+ parseInt(currentOffsetX - (stepWidth*$('.progress').find('.current-step').nextAll().length)) + 'px)'
                        });
                    }
                    
                    offsetCount--;
                } else if ($('.progress').find('.current-step').attr('data-index') == parseInt($('.progress').find('.active-step').not('.last-step').last().attr('data-index') - (offsetCount*5) - 2) && changeDirection == true && !$('.progress').find('.current-step').hasClass('first-step')) {
                    if ($('.progress').find('.current-step').prevAll().length > 4) {
                        $('.progress-track').css({
                            'transform': 'translateX('+ parseInt(currentOffsetX + (stepWidth*5)) +'px)',
                            '-webkit-transform': 'translateX('+ parseInt(currentOffsetX + (stepWidth*5)) +'px)'
                        });
                    } else {
                        $('.progress-track').css({
                            'transform': 'translateX('+ parseInt(currentOffsetX + (stepWidth*$('.progress').find('.current-step').prevAll().length)) +'px)',
                            '-webkit-transform': 'translateX('+ parseInt(currentOffsetX + (stepWidth*$('.progress').find('.current-step').prevAll().length)) +'px)'
                        });
                    }
                    
                    offsetCount++;
                } else {
                    $('.progress-track').css({
                        'transform': 'translateX('+ currentOffsetX +'px)',
                        '-webkit-transform': 'translateX('+ currentOffsetX + 'px)'
                    });
                }
            } else {
                if ($('.progress').find('.current-step').attr('data-index') == parseInt($('.progress').find('.active-step').not('.last-step').last().attr('data-index') - (offsetCount*3) - 2) && changeDirection == false && !$('.progress').find('.current-step').hasClass('first-step')) {
                    if ($('.progress').find('.current-step').prevAll().length > 2) {
                        $('.progress-track').css({
                            'transform': 'translateX('+ parseInt(currentOffsetX + (stepWidth*3)) +'px)',
                            '-webkit-transform': 'translateX('+ parseInt(currentOffsetX + (stepWidth*3)) +'px)'
                        });
                    } else {
                        $('.progress-track').css({
                            'transform': 'translateX('+ parseInt(currentOffsetX + (stepWidth*$('.progress').find('.current-step').prevAll().length)) +'px)',
                            '-webkit-transform': 'translateX('+ parseInt(currentOffsetX + (stepWidth*$('.progress').find('.current-step').prevAll().length)) +'px)'
                        });
                    }
                    
                    offsetCount++;
                } else if ($('.progress').find('.current-step').attr('data-index') == parseInt($('.progress').find('.active-step').not('.last-step').last().attr('data-index') - (offsetCount*3) + 1) && currentOffsetX != 0 && currentOffsetX != maxOffsetX && changeDirection == false && !$('.progress').find('.current-step').hasClass('first-step')) {
                    if ($('.progress').find('.current-step').nextAll().length > 2) {
                        $('.progress-track').css({
                            'transform': 'translateX('+ parseInt(currentOffsetX - (stepWidth*3)) +'px)',
                            '-webkit-transform': 'translateX('+ parseInt(currentOffsetX - (stepWidth*3)) + 'px)'
                        });
                    } else {
                        $('.progress-track').css({
                            'transform': 'translateX('+ parseInt(currentOffsetX - (stepWidth*$('.progress').find('.current-step').nextAll().length)) +'px)',
                            '-webkit-transform': 'translateX('+ parseInt(currentOffsetX - (stepWidth*$('.progress').find('.current-step').nextAll().length)) + 'px)'
                        });
                    }
                    
                    offsetCount--;
                } else if ($('.progress').find('.current-step').attr('data-index') == parseInt($('.progress').find('.active-step').not('.last-step').last().attr('data-index') - (offsetCount*3) + 3) && changeDirection == true && !$('.progress').find('.current-step').hasClass('first-step')) {
                    if ($('.progress').find('.current-step').nextAll().length > 2) {
                        $('.progress-track').css({
                            'transform': 'translateX('+ parseInt(currentOffsetX - (stepWidth*3)) +'px)',
                            '-webkit-transform': 'translateX('+ parseInt(currentOffsetX - (stepWidth*3)) + 'px)'
                        });
                    } else {
                        $('.progress-track').css({
                            'transform': 'translateX('+ parseInt(currentOffsetX - (stepWidth*$('.progress').find('.current-step').nextAll().length)) +'px)',
                            '-webkit-transform': 'translateX('+ parseInt(currentOffsetX - (stepWidth*$('.progress').find('.current-step').nextAll().length)) + 'px)'
                        });
                    }
                    
                    offsetCount--;
                } else if ($('.progress').find('.current-step').attr('data-index') == parseInt($('.progress').find('.active-step').not('.last-step').last().attr('data-index') - (offsetCount*3)) && changeDirection == true && !$('.progress').find('.current-step').hasClass('first-step')) {
                    if ($('.progress').find('.current-step').prevAll().length > 2) {
                        $('.progress-track').css({
                            'transform': 'translateX('+ parseInt(currentOffsetX + (stepWidth*3)) +'px)',
                            '-webkit-transform': 'translateX('+ parseInt(currentOffsetX + (stepWidth*3)) +'px)'
                        });
                    } else {
                        $('.progress-track').css({
                            'transform': 'translateX('+ parseInt(currentOffsetX + (stepWidth*$('.progress').find('.current-step').prevAll().length)) +'px)',
                            '-webkit-transform': 'translateX('+ parseInt(currentOffsetX + (stepWidth*$('.progress').find('.current-step').prevAll().length)) +'px)'
                        });
                    }
                    
                    offsetCount++;
                } else {
                    $('.progress-track').css({
                        'transform': 'translateX('+ currentOffsetX +'px)',
                        '-webkit-transform': 'translateX('+ currentOffsetX + 'px)'
                    });
                }
            }
        }
    }
}