"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/**
 *
 */
function _default() {
  if (navigator.userAgent.match(/Trident\/7\./)) {
    var onWheel = function onWheel(e) {
      if (!e) e = window.event; //for legacy IE

      e.preventDefault();
      var wheelDelta = e.wheelDelta;
      var currentScrollPosition = window.pageYOffset;
      window.scrollTo(0, currentScrollPosition - wheelDelta);
    };

    // if IE
    var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';

    try {
      document.addEventListener(mousewheelevent, onWheel, false);
    } catch (e) {
      //for legacy IE
      document.attachEvent('onmousewheel', onWheel);
    }
  }
}

$(function () {
  var thumbClass = 'gallery-list';
  var thumbClick = window.ontouchstart === null ? 'touchstart' : 'click';
  var mySwiper = new Swiper('#rooms .js-gallery-main', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.gallery-lists',
      type: 'custom',
      renderCustom: function renderCustom(swiper, current, total) {
        var slides = swiper.slides;
        var html = '';

        for (var i = 0; i < total; i++) {
          if (current == i + 1) {
            html = html + "<div class=\"".concat(thumbClass, " current\" data-slideto=\"").concat(i, "\">").concat(slides[i].innerHTML, "</div>");
          } else {
            html = html + "<div class=\"".concat(thumbClass, "\" data-slideto=\"").concat(i, "\">").concat(slides[i].innerHTML, "</div>");
          }
        }

        return html;
      }
    }
  });

  var clickThumbs = function clickThumbs() {
    var thumbItems = document.getElementsByClassName(thumbClass);

    for (var i = 0; i < thumbItems.length; i++) {
      thumbItems[i].addEventListener(thumbClick, function (e) {
        var index = e.currentTarget.dataset.slideto;
        mySwiper.slideTo(index, 500, true);
      }, false);
    }
  };

  clickThumbs();
  mySwiper.on('slideChange', clickThumbs);
});