'use strict';

(function () {
  var PRICES = {
    min: 10000,
    max: 50000
  };

  var filterByType = function (data, value, type) {
    return data.filter(function (it) {
      return it.offer[type].toString() === value;
    });
  };

  var priceSelect = document.querySelector('#housing-price');

  var filterByPrice = function (item) {
    var price = item.offer.price;

    if (priceSelect.value === 'low') {
      return price <= PRICES.min;
    } else if (priceSelect.value === 'middle') {
      return price >= PRICES.min && price <= PRICES.max;
    } else if (priceSelect.value === 'high') {
      return price >= PRICES.max;
    }

    return item;
  };

  var filterByFeatures = function (item) {
    var checkedFeaturesItems = document.querySelectorAll('input:checked');

    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  var updateOffers = function (data) {
    var options = document.querySelectorAll('.map__filter');

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
      }
    });

    data = data.filter(filterByPrice).filter(filterByFeatures);

    return data;
  };

  window.filter = updateOffers;
})();
