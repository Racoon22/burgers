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
}
)