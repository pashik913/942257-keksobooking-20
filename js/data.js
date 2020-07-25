'use strict';

(function () {
  var offers = [];

  var onSuccess = function (data) {
    offers = data;
    window.pin.render(offers);
  };

  var onError = function (message) {
    window.popup.error(message);
  };

  var loadOffers = function () {
    window.backend.load(onSuccess, onError);
  };

  var updateOffers = function () {
    window.pin.remove();
    window.pin.render(window.filter(offers));
  };

  window.data = {
    load: loadOffers,
    update: updateOffers
  };
})();

