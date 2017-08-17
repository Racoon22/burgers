$(document).ready(function () {




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
}
)