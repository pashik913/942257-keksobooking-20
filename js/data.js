'use strict';

(function () {
  var offers = [];

  var onSuccess = function (data) {
    offers = data;
    window.pin.render(offers);
    window.card.renderCard(offers[0]);
    console.log(offers);
  };

  var onError = function (message) {
    console.error(message);
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

