$(document).ready(function(){

  new WOW(
    {
      boxClass:     'wow',
      animateClass: 'animate__animated'
    }
  ).init();

  // Карусель
  $('.carousel__inner').slick({
    speed: 500,
    adaptiveHeight: true,
    nextArrow: '<button type="button" class="slick-next"><img src="ico/right.png" alt=""></button>',
    prevArrow: '<button type="button" class="slick-prev"><img src="ico/left.png" alt=""></button>',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  });

  // Табы
  $('ul.catalog__tabs').on('click', 'li:not(.active)', function() {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('.container').find('div.catalog__inner').removeClass('active').eq($(this).index()).addClass('active');
  });

  // Link more
  $('.catalog-item__link').each(function (i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $(this).closest('.catalog-item').toggleClass('active');
    });
  });

  // Modal
  $('.modal').on('click', function(e) {
    e.stopPropagation();
  });
  $('.modal__close, .overlay').on('click', function() {
    $('.overlay, .modal').fadeOut();
  });
  $('[data-modal]').on('click', function() {
    $('.overlay, #consultation').fadeIn();
  });

  // Catalog
  $('.catalog-item__button').each(function (i) {
    $(this).on('click', function() {
      $('#order .modal__subtitle').text(
          $('.catalog-item__content .catalog-item__title').eq(i).text()
        );
      $('.overlay, #order').fadeIn();
    });
  });

  // Validate
  const validate = function(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Пожалуйста введите ваше имя",
        phone: "Пожалуйста введите ваш номер",
        email: {
          required: "Пожалуйста введите ваш email",
          email: "Неправильно введен адрес"
        }
      }
    });
  };

  validate('#consultation form');
  validate('#order form');
  validate('.consulting__form');

  // Phone inputs mask
  $("input[name=phone").mask("+380 99 999 9999");

  // Send form
  $('form').submit(function(e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('.modal').fadeOut();
      $('#thank').fadeIn();
      $('form').trigger('reset');
    });
    return false;
  });

  // Smooth page and scrollup
  $(window).scroll(function() {
    if ($(this).scrollTop() > 650) {
      $(".scroll-up").fadeIn();
    } else {
      $(".scroll-up").fadeOut();
    }
  });

  // $("a[href^='#']").click(function(){
  //   const href = $(this).attr("href");
  //   $("html, body").animate({
  //     scrollTop: $(href).offset().top+'px'
  //   });
  //   return false;
  // });


});


