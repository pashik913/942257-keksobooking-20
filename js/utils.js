'use strict';

(function () {
  var removeClass = function (element, className) {
    element.classList.remove(className);
  };

  var addClass = function (element, className) {
    element.classList.add(className);
  };

  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.utils = {
    removeClass: removeClass,
    addClass: addClass,
    getRandomIntInclusive: getRandomIntInclusive
  };
})();
