/* eslint-disable no-unused-expressions */
'use strict';
// Отдельный модуль 1

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var pin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapPinBlock = document.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');
var isActive = false;
var buttonReset = document.querySelector('.ad-form__reset');

var fillPin = function (data) {
  var element = pin.cloneNode(true);
  var image = element.querySelector('img');

  element.style.left = data.location.x + 'px';
  element.style.top = data.location.y + 'px';
  image.src = data.author.avatar;
  image.alt = data.offer.title;

  return element;
};

var renderPins = function (data) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(fillPin(data[i]));
  }

  mapPinBlock.appendChild(fragment);
};

var removePins = function () {
  var pins = document.querySelectorAll('.map__pin');

  for (var i = 0; i < pins.length; i++) {
    if (!pins[i].classList.contains('map__pin--main')) {
      pins[i].remove();
    }
  }
};

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
  renderPins(window.data.getOffers());
  setDisabled(filters);
  setDisabled(fieldsets);
  isActive = true;
  document.removeEventListener('keydown', onPinEnterPress);
  setAddress(mainPin, 1);
};

var deactivatePage = function () {
  window.utils.addClass(map, 'map--faded');
  window.utils.addClass(adForm, 'ad-form--disabled');
  removePins();
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

buttonReset.addEventListener('click', function (evt) {
  evt.preventDefault();
  deactivatePage();
});

var typeOfHouse = document.querySelector('#type');
var priceOfHouse = document.querySelector('#price');
var priceOfType = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var onSelectChange = function () {
  var value = typeOfHouse.value;
  priceOfHouse.placeholder = priceOfType[value];
  priceOfHouse.min = priceOfType[value];
};

document.addEventListener('change', onSelectChange);

var guestsInput = document.querySelector('#capacity');
var roomsInput = document.querySelector('#room_number');

guestsInput.addEventListener('invalid', function () {
  if (guestsInput.validity.valueMissing) {
    roomsInput.setCustomValidity('Выберите желаемое количество гостей');
  } else {
    roomsInput.setCustomValidity('');
  }
});

roomsInput.addEventListener('input', function () {
  var guestsValue = guestsInput.value;
  var roomsValue = roomsInput.value;

  if (guestsValue > roomsValue) {
    roomsInput.setCustomValidity('Добавьте больше комнат на ' + (guestsValue - roomsValue));
  } else {
    roomsInput.setCustomValidity('');
  }
});

var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;
var titleInput = document.querySelector('#title');

titleInput.addEventListener('invalid', function () {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

titleInput.addEventListener('input', function () {
  var valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Вам нужно ввести ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    titleInput.setCustomValidity('');
  }
});

priceOfHouse.addEventListener('invalid', function () {
  if (priceOfHouse.validity.valueMissing) {
    priceOfHouse.setCustomValidity('Обязательное поле');
  } else {
    priceOfHouse.setCustomValidity('');
  }
});

priceOfHouse.addEventListener('input', function () {
  if (priceOfHouse.validity.rangeUnderflow) {
    priceOfHouse.setCustomValidity('Введите значение от ' + priceOfHouse.min + ' до ' + priceOfHouse.max);
  } else if (priceOfHouse.validity.rangeOverflow) {
    priceOfHouse.setCustomValidity('Введите значение до ' + priceOfHouse.max);
  } else if (priceOfHouse.validity.valueMissing) {
    priceOfHouse.setCustomValidity('Введите сумму');
  } else {
    priceOfHouse.setCustomValidity('');
  }
});

