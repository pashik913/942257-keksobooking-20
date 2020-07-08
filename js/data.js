'use strict';

(function () {
  var offers = [];

  var onSuccess = function (data) {
    offers = data;
    window.pin.render(offers);
  };

  var onError = function (message) {
    console.error(message);
  };

  var loadOffers = function () {
    window.backend.load(onSuccess, onError);
  };

  window.data = {
    load: loadOffers
  };
})();

