$(document).ready(function () {

    viewport = $(window).width();

    function slaiderWith(viewport) {
        if (viewport < 480) {
            $('.burgers__content').css({
                'width': viewport * 0.9,
            })
            $('.burgers__wrapper').css({
                'width': viewport * 0.9,
            })
        }
    }

    slaiderWith(viewport);


    $(window).resize(function (viewport) {


        if (viewport <= 940) {
            var sliderItem = $('.burgers__content'),
                sliderWraper = $('.burgers__wrapper')
            sliderItem.css({
                'width': viewport * 0.9,
            })
            sliderWraper.css({
                'width': viewport * 0.9,
            })
        }
        ;
        console.log("Handler for .resize() called");
    });
    ///////////////////////////////////////////////////////////////

    $('.header__menu-link').on('click', function (e) {
        e.preventDefault()
        var fullScreenMenu = $('#fullscreen-menu');
        fullScreenMenu.addClass('active-menu');
        console.log(fullScreenMenu);
    })


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


    $('.close-btn').on('click', function (e) {
            e.preventDefault()
            if ($(this).hasClass('close-btn-red')) {

                fullRewies = $('#review-modal');

                fullRewies.find('.reviews__title--modal').empty();
                fullRewies.find('.reviews__text--modal').empty();
                fullRewies.addClass('active-reviews');
                $(this).closest('.review-modal').removeClass('active-reviews');
            } else {
                var fullScreenMenu = $('#fullscreen-menu');
                fullScreenMenu.removeClass('active-menu');
            }
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

            viewport = $(window).width();
        if (viewport <= 500) {
            itemHeight = item.outerHeight();
            items.hide();
            if (!item.hasClass("active")) {
                items.removeClass('active');
                item.addClass('active')
            } else {
                item.removeClass('active')
                items.show();
            }
        } else {
            if (!item.hasClass("active")) {
                items.removeClass('active');
                item.addClass('active')
            } else {
                item.removeClass('active')
                items.show();
            }

        }


    });
    var sections = $('.section'),
        display = $('.maincontent');
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
        }, 1000);
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
        if ($('#fullscreen-menu').hasClass('active-menu')) {
            $('#fullscreen-menu').removeClass('active-menu')
        }
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

    var moveSlaide = function (container, slaiderNum) {

        var items = container.find('.burgers__item'),
            activeSlide = items.filter('.active'),
            reqItem = items.eq(slaiderNum),
            reqIndex = reqItem.index(),
            list = container.find('.burgers__list'),
            duration = 500;

        if (reqItem)
            list.animate({
                'left': reqIndex * -100 + '%'
            }, duration, function () {
                activeSlide.removeClass('active'),
                    reqItem.addClass('active')
            })

    }


    $('.arrow__link').on('click', function (e) {
        e.preventDefault();
        section = defineSection(sections);
        performTransition(section.nextSection.index());

    });


    $('.arrow__burgers').on('click', function (e) {
            e.preventDefault();
            var container = $(this).closest('.burgers__container'),
                items = $('.burgers__item', container),
                activeItem = items.filter('.active'),
                exitedItem,
                edgeItem,
                reqItem;


            if ($(this).hasClass('arrow__burgers-next')) {
                exitedItem = activeItem.next();
                edgeItem = items.first();
            }
            if ($(this).hasClass('arrow__burgers-prev')) {
                exitedItem = activeItem.prev();
                edgeItem = items.last();
            }
            reqItem = exitedItem.length ? exitedItem.index() : edgeItem.index();

            moveSlaide(container, reqItem);
        }
    )

    $('.reviews__button').on('click', function (e) {
            e.preventDefault();

            var rewiesItem = $(this).closest('.reviews__content'),
                rewiesTitle = rewiesItem.find('.reviews__title').text(),
                rewiesText = rewiesItem.find('.reviews__text').text(),
                fullRewies = $('#review-modal');
            fullRewies.find('.reviews__title--modal').append(rewiesTitle);
            fullRewies.find('.reviews__text--modal').append(rewiesText);
            fullRewies.addClass('active-reviews');
            console.log(fullRewies);

        }
    )

    $('.submit').on('click', function (e) {
        e.preventDefault();

    });
})

