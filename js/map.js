'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var isActive = false;
  var filters = document.querySelectorAll('.map__filter');
  var fieldsets = document.querySelectorAll('fieldset');

  var setDisabled = function (fields) {
    for (var i = 0; i < fields.length; i++) {
      fields[i].disabled = !fields[i].disabled;
    }
  };

  var address = document.querySelector('#address');

  var setAddress = function (elem, offset) {
    var x = Math.round(elem.offsetLeft + elem.offsetWidth / 2);
    var y = Math.round(elem.offsetTop + elem.offsetHeight / offset);

    address.value = x + ', ' + y;
  };

  setAddress(mainPin, 2);

  setDisabled(filters);
  setDisabled(fieldsets);

  var activatePage = function () {
    window.utils.removeClass(map, 'map--faded');
    window.utils.removeClass(adForm, 'ad-form--disabled');
    window.pin.render(window.data);
    setDisabled(filters);
    setDisabled(fieldsets);
    isActive = true;
    document.removeEventListener('keydown', onPinEnterPress);
    setAddress(mainPin, 1);
  };

  var deactivatePage = function () {
    window.utils.addClass(map, 'map--faded');
    window.utils.addClass(adForm, 'ad-form--disabled');
    window.pin.remove();
    setDisabled(filters);
    setDisabled(fieldsets);
    document.addEventListener('keydown', onPinEnterPress);
    adForm.reset();
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (evt.button === 0 && !isActive) {
      activatePage();
    }
  });

  var ENTER_BUTTON = 'Enter';

  var onPinEnterPress = function (evt) {
    if (evt.key === ENTER_BUTTON) {
      evt.preventDefault();
      activatePage();
    }
  };

  document.addEventListener('keydown', onPinEnterPress);

  window.map = {
    deactivatePage: deactivatePage
  };
})();
