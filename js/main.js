$(document).ready(function () {
    $('.masters-carousel').slick({
        arrows: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        speed: 500,
        infinite: true,
        prevArrow: $('#prev'),
        nextArrow: $('#next'),
        appendDots: $('.dots-slick'),
        responsive: [
            {
                breakpoint: 1229,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.gallery-carousel').slick({
        arrows: true,
        dots: true,
        variableWidth: true,
        focusOnSelect: true,
        prevArrow: $('#prev2'),
        nextArrow: $('#next2'),
        appendDots: $('.dots-slick2'),
        centerPadding: '70px',
        centerMode: true,
        slidesToShow: 3,
        infinite: true,
        responsive: [
            {
                breakpoint: 1250,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    $("#faq-accordion")
        .accordion({
            header: "> div > h3",
            heightStyle: "content"
            // collapsible: true
        })
        .sortable({
            axis: "y",
            handle: "h3",
            stop: function (event, ui) {
                // IE doesn't register the blur when sorting
                // so trigger focusout handlers to remove .ui-state-focus
                ui.item.children("h3").triggerHandler("focusout");

                // Refresh accordion to handle new order
                $(this).accordion("refresh");
            }
        });

    ymaps.ready(init);

    function init() {
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [53.925460, 27.650504],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 14,
            controls: ['zoomControl'],
            behaviors: ['drag']
        });

        var myPlacemark = new ymaps.Placemark([53.925460, 27.650504], [53.893668, 27.551878]);
        myMap.geoObjects.add(myPlacemark);
    }

    new WOW().init();

    $('.gallery-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        // closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });

    $('.open-modal').click(() => {
        $('#sign_up-container').css('display', 'flex');
    });

    $('#sign_up-cancel-close, #sign_up-container').click((e) => {
        if (e.target.id === 'sign_up-cancel-close' || e.target.id === 'sign_up-container') {
            $('#sign_up-container').hide();
        }
    });

    $('#sign_up-button > button').click(() => {
        $('#sign_up .error-input').hide();
        let name = $('#name');
        let phone = $('#phone');
        let ritual = $('#ritual');
        let datetime = $('#datetime');

        let hasError = false;
        //если нет значения
        if (!name.val()) {
            name.siblings('.error-input').show();
            hasError = true;
            $(name).css('border-color', 'red');
        } else {
            $(name).css('border-color', '');
        }

        // если нет значения
        if (!phone.val()) {
            phone.siblings('.error-input').show();
            hasError = true;
            $(phone).css('border-color', 'red');
        } else {
            $(phone).css('border-color', '');
        }

        // если нет значения
        if (!ritual.val()) {
            ritual.siblings('.error-input').show();
            hasError = true;
            $(ritual).css('border-color', 'red');
        } else {
            $(ritual).css('border-color', '');
        }

        // если нет значения
        if (!datetime.val()) {
            datetime.siblings('.error-input').show();
            hasError = true;
            $(datetime).css('border-color', 'red');
        } else {
            $(datetime).css('border-color', '');
        }

        if (name.val() && phone.val() && ritual.val() && datetime.val()) {
            $('#sent').show();
            $('#sign_up-content').hide();

            // Раскомментировать, если размещать на хостинге!
            // $.ajax({
            //     type: 'post',
            //     url: 'mail.php',
            //     data: 'name=' + name.val() + '&phone=' + phone.val() + '&ritual=' + ritual.val() + '&datetime=' + datetime.val(),
            //     success: () => {
            //         $('#sent').show();
            //         $('#sign_up-content').hide();
            //     },
            //     error: () => {
            //         $('#sign_up-container').hide();
            //         alert('Ошибка бронирования. Свяжитесь, пожалуйста, по номеру телефона.');
            //     }
            // });
        }
        // else {
        //     $('#sign_up-error').show();
        //     alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
        // }
    });


    $('#faq-form-button > button').click(() => {
        $('#faq .error-input').hide();
        let your_phone = $('#your-phone');
        let hasError = false;

        // если нет значения
        if (!your_phone.val()) {
            your_phone.siblings('.error-input').show();
            hasError = true;
            $(your_phone).css('border-color', 'red');
        } else {
            $(your_phone).css('border-color', '');
        }

        if (your_phone.val()) {
            $('#faq-form-sent').show();
            $('#faq-form-content').hide();

            // Раскомментировать, если размещать на хостинге!
            // $.ajax({
            //     type: 'post',
            //     url: 'mail2.php',
            //     data: 'your_phone=' + your_phone.val(),
            //     success: () => {
            //         $('#faq-form-sent').show();
            //         $('#faq-form-content').hide();
            //     },
            //     error: () => {
            //         $('#faq-form').hide();
            //         alert('Ошибка бронирования. Свяжитесь, пожалуйста, по номеру телефона.');
            //     }
            // });
        }
        // else {
        //     $('#faq-form-error').show();
        //     your_phone.css('border-color', 'red');
        // }
    });

    $('#burger').click(() => {
        $('#header').toggleClass('menu-open');
    });

    $('#header #header-container #menu a').click(() => {
        $('#header').removeClass('menu-open');
    });

    $('#menu svg').click(() => {
        $('#header').removeClass('menu-open');
    });
});

