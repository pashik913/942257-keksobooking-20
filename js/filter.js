'use strict';

(function () {
  var PRICES = {
    min: 10000,
    max: 50000
  };
  var priceSelect = document.querySelector('#housing-price');

  var filterByType = function (data, value, type) {
    return data.filter(function (it) {
      return it.offer[type].toString() === value;
    });
  };

  var filterByPrice = function (data, type) {
    return data.filter(function (it) {
      var price = it.offer[type];
      if (priceSelect.value === 'low') {
        return price <= PRICES.min;
      } else if (priceSelect.value === 'middle') {
        return price >= PRICES.min && price <= PRICES.max;
      } else if (priceSelect.value === 'high') {
        return price >= PRICES.max;
      }
      return it;
    });
  };

  var filterByFeatures = function (data, value) {
    return data.filter(function (it) {
      return it.offer.features.includes(value);
    });
  };

  var updateOffers = function (data) {
    var options = document.querySelectorAll('.map__filter');
    var features = document.querySelectorAll('.map__checkbox:checked');

    options = Array.from(options).filter(function (option) {
      return option.value !== 'any';
    });

    options.forEach(function (option) {
      switch (option.id) {
        case 'housing-type':
          data = filterByType(data, option.value, 'type');
          break;

        case 'housing-rooms':
          data = filterByType(data, option.value, 'rooms');
          break;

        case 'housing-guests':
          data = filterByType(data, option.value, 'guests');
          break;

        case 'housing-price':
          data = filterByPrice(data, 'price');
          break;
      }
    });

    features.forEach(function (feature) {
      data = filterByFeatures(data, feature.value);
    });

    return data;
  };

  window.filter = updateOffers;
})();
