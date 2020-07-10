'use strict';

(function () {
  var offers = [];

  var onSuccess = function (data) {
    offers = data;
    window.pin.render(offers);
    console.log(offers);
  };

  var onError = function (message) {
    console.error(message);
  };

  var loadOffers = function () {
    window.backend.load(onSuccess, onError);
  };

  // var update = функция из фильтра

  window.data = {
    load: loadOffers
  };
})();

