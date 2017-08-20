$(document).ready(function () {

  var md = new MobileDetect(window.navigator.userAgent),
    isMobile = md.mobile();

    var scrollToSection = function (direction) {
        var section = defineSection(sections);

        if (direction == 'up' && section.nextSection.length) { // скроллим вверх
            performTransition(section.nextSection.index());
        }

        if (direction == 'down' && section.prevSection.length) { //скроллим вниз
            performTransition(section.prevSection.index());
        }
    }

    $('.header__menu-link').on('click', function (e) {
        e.preventDefault()
        var fullScreenMenu = $('#fullscreen-menu');
        fullScreenMenu.addClass('active-menu');
        console.log(fullScreenMenu);
    })

    $('.close-btn').on('click', function (e) {
        e.preventDefault()
        var fullScreenMenu = $('#fullscreen-menu');
        fullScreenMenu.removeClass('active-menu');
        console.log(fullScreenMenu);
    }
    )

    $('.accordion__link').on('click', function (e) {
        e.preventDefault()
        var item = $(e.target).closest('.accordion__item'),
            items = item.siblings('.accordion__item'),
            itemHeight = item.outerHeight();

        if (!item.hasClass("active")) {
            items.removeClass('active');
            item.addClass('active')
        } else {
            item.removeClass('active')
        }
    });
    $('.menu__item').on('click', function (e) {
        e.preventDefault()
        var item = $(e.target).closest('.menu__item'),
            items = item.siblings('.menu__item'),
            itemHeight = item.outerHeight();

        if (!item.hasClass("active")) {
            items.removeClass('active');
            item.addClass('active')
        } else {
            item.removeClass('active')
        }

    });
    var sections = $('.section'),
        display = $('.maincontent')
    isscroll = false;

    var performTransition = function (section) {

        if (isscroll) return
        isscroll = true;

        var position = (section * -100) + '%';

        display.css({
            'transform': 'translateY(' + position + ')',
            '-webkit-transform': 'translateY(' + position + ')'
        })
        sections.eq(section).addClass('active')
            .siblings().removeClass('active');

        setTimeout(function () {
            isscroll = false;
            $('.scrol-nav__item').eq(section).addClass('active')
                .siblings().removeClass('active');
        }, 1300);
    }


    $('.wrapper').on({
        wheel: function (e) {
        var deltaY = e.originalEvent.deltaY,
            section = defineSection(sections);

        if (deltaY > 0 && section.nextSection.length) {
            performTransition(section.nextSection.index());
        }
        if (deltaY < 0 && section.prevSection.length) {
            performTransition(section.prevSection.index());
        }
        },
        
    });

    $('[data-scroll-to]').on('click', function (e) {
        e.preventDefault();
        var elem = $(e.target);
        sectionNum = parseInt(elem.attr('data-scroll-to'));
        performTransition(sectionNum);
    });

    $('.wrapper').on('swipe', function (e) {
        var deltaY = e.originalEvent.deltaY,
            section = defineSection(sections);
        console.log(e.originalEvent.deltaY);
        if (deltaY > 0 && section.nextSection.length) {
            performTransition(section.nextSection.index());
            console.log(deltaY);
        }
        if (deltaY < 0 && section.prevSection.length) {
            performTransition(section.prevSection.index());
            console.log(deltaY);
        }
    });

    $(document).on('keydown', function (e) {
        e.preventDefault();
        section = defineSection(sections);
        if (e.keyCode == 38 && section.nextSection.length) {
            performTransition(section.nextSection.index());
        }
        else if (e.keyCode == 40 && section.prevSection.length) {
            performTransition(section.prevSection.index());
        }



    });

    var defineSection = function (sections) {
        var activeSection = sections.filter('.active');
        return {
            nextSection: activeSection.next(),
            prevSection: activeSection.prev(),
        }

    }
    if (isMobile) {
        $(window).swipe({
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                scrollToSection(direction);
            }
        });
    }
}
)

