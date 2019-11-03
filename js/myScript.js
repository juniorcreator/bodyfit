

function confirmValidate() {

  let form = $('#form-confirm');
  let formStep = $('.form-step');
  let thanksStep = $('.thanks-step');

  function clearForm(form) {
    $ || jQuery ? $(form)[0].reset() : form.reset();
  }
  function stepThanks() {
    formStep.removeClass('active');
    thanksStep.addClass('active');
  }
  form.on('submit', function (e) {
    e.preventDefault();
    stepThanks();
    window.location = 'pricing-email-sent.html';
  });
}

function lossPlan() {
  if ($('.swiper-container').length) {
    let mySwiper = new Swiper('.swiper-container', {
      loop: false,
      slidesPerView: 3,
      spaceBetween: 28,
      allowSlidePrev: false,
      allowSlideNext: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        300: {
          mousewheel: true,
          keyboard: true,
          slidesPerView: 1,
          spaceBetween: 24,
          allowSlidePrev: true,
          allowSlideNext: true
        },
        400: {
          slidesPerView: 1,
          spaceBetween: 24,
          allowSlidePrev: true,
          allowSlideNext: true
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 24,
          allowSlidePrev: true,
          allowSlideNext: true
        },
        700: {
          slidesPerView: 2,
          spaceBetween: 28,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 56,
          allowSlidePrev: true,
          allowSlideNext: true
        },
        960: {
          slidesPerView: 2,
          spaceBetween: 56,
          allowSlidePrev: true,
          allowSlideNext: true
        },
        991: {
          slidesPerView: 2,
          spaceBetween: 56,
        }
      }
    });
    //Reload swiper
    // $(window).resize(function(){
    //   mySwiper.update();
    //   console.log('wewedew');
    // });
    // $(window).on('load', function () {
    //   mySwiper.update();
    // });
  }
}
confirmValidate();
lossPlan();

