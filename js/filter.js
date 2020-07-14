'use strict';

(function () {
  var PINS_LIMIT = 5;

  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select, input');
  var typeSelect = filter.querySelector('#housing-type');
  var priceSelect = filter.querySelector('#housing-price');
  var roomsSelect = filter.querySelector('#housing-rooms');
  var guestsSelect = filter.querySelector('#housing-guests');
  var featuresFieldset = filter.querySelector('#housing-features');
  var data = [];
  var filteredData = [];

  var filterItem = function (it, item, key) {
    return it.value === 'any' ? true : it.value === item[key].toString();
  };

  var filterByType = function (item) {
    return filterItem(typeSelect, item.offer, 'type');
  };

  var filterByRooms = function (item) {
    return filterItem(roomsSelect, item.offer, 'rooms');
  };

  var filterByGuests = function (item) {
    return filterItem(guestsSelect, item.offer, 'guests');
  };
})();
