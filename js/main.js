/* eslint-disable no-unused-expressions */
'use strict';

var OFFER = {
  ammount: 8,
  avatar: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'],
  title: ['Дворец', 'Замок', 'Бунгало'],
  address: '',
  price: {
    min: 10000,
    max: 50000
  },
  type: ['place', 'flat', 'house', 'bungalo'],
  rooms: {
    min: 1,
    max: 3
  },
  guests: {
    min: 0,
    max: 2
  },
  checkin: ['12:00', '13:00', '14:00'],
  checkout: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  description: ['С балконом', 'Рядом метро'],
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  location: {
    x: {
      min: 0,
      max: 1200
    },
    y: {
      min: 130,
      max: 630
    }
  }
};

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var pin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapPinBlock = document.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');
var isActive = false;
var buttonReset = document.querySelector('.ad-form__reset');

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var removeClass = function (element, className) {
  element.classList.remove(className);
};

var addClass = function (element, className) {
  element.classList.add(className);
};

var getOffer = function () {
  var x = getRandomIntInclusive(OFFER.location.x.min, OFFER.location.x.max);
  var y = getRandomIntInclusive(OFFER.location.y.min, OFFER.location.y.max);

  return {
    author: {
      avatar: OFFER.avatar[getRandomIntInclusive(0, OFFER.avatar.length - 1)]
    },
    offer: {
      title: OFFER.title[getRandomIntInclusive(0, OFFER.title.length - 1)],
      address: x + ', ' + y,
      price: getRandomIntInclusive(OFFER.price.min, OFFER.price.max),
      type: OFFER.type[getRandomIntInclusive(0, OFFER.type.length - 1)],
      rooms: getRandomIntInclusive(OFFER.rooms.min, OFFER.rooms.max),
      guests: getRandomIntInclusive(OFFER.guests.min, OFFER.guests.max),
      checkin: OFFER.checkin[getRandomIntInclusive(0, OFFER.checkin.length - 1)],
      checkout: OFFER.checkout[getRandomIntInclusive(0, OFFER.checkout.length - 1)],
      features: OFFER.features.slice(0, getRandomIntInclusive(0, OFFER.features.length - 1)),
      description: '21324',
      photos: OFFER.photos.slice(0, getRandomIntInclusive(0, OFFER.photos.length - 1))
    },
    location: {
      x: x,
      y: y
    }
  };
};

var getOffers = function () {
  var array = [];

  for (var i = 0; i < OFFER.ammount; i++) {
    array.push(getOffer());
  }

  return array;
};

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

setDisabled(filters);
setDisabled(fieldsets);

var activatePage = function () {
  removeClass(map, 'map--faded');
  removeClass(adForm, 'ad-form--disabled');
  renderPins(getOffers());
  setDisabled(filters);
  setDisabled(fieldsets);
  isActive = true;
  document.removeEventListener('keydown', onPinEnterPress);
};

var deactivatePage = function () {
  addClass(map, 'map--faded');
  addClass(adForm, 'ad-form--disabled');
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

var onPinEnterPress = function (evt) {
  if (evt.key === 'Enter') {
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

priceOfHouse.placeholder = '1000';
priceOfHouse.min = '1000';

var onSelectChange = function () {
  if (typeOfHouse.value === 'bungalo') {
    priceOfHouse.placeholder = '0';
    priceOfHouse.min = '0';
  }
  if (typeOfHouse.value === 'flat') {
    priceOfHouse.placeholder = '1000';
    priceOfHouse.min = '1000';
  }
  if (typeOfHouse.value === 'house') {
    priceOfHouse.placeholder = '5000';
    priceOfHouse.min = '5000';
  }
  if (typeOfHouse.value === 'palace') {
    priceOfHouse.placeholder = '10000';
    priceOfHouse.min = '10000';
  }
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
