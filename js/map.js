'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var isActive = false;
  var filters = document.querySelectorAll('.map__filter');
  var fieldsets = document.querySelectorAll('fieldset');
  var filterForm = document.querySelector('.map__filters');

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
    window.data.load();
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

  var onFilterChange = window.data.update;

  document.addEventListener('keydown', onPinEnterPress);
  filterForm.addEventListener('change', onFilterChange);

  //

  var card = document.querySelector('#card')
  .content
  .querySelector('.map__card');
  var cardBlock = document.querySelector('.map__cards');

  var fillCard = function (data) {
    var element = card.cloneNode(true);
    var avatar = element.querySelector('.popup__avatar');
    var title = element.querySelector('.popup__title');
    var cardAddress = element.querySelector('.popup__text--address');
    var price = element.querySelector('.popup__text--price');
    var type = element.querySelector('.popup__type');
    var capacity = element.querySelector('.popup__text--capacity');
    var time = element.querySelector('.popup__text--time');
    var features = element.querySelector('.popup__features');
    var description = element.querySelector('.popup__description');
    var photos = element.querySelector('.popup__photos');
    var photo = element.querySelector('popup__photo');

    title.textContent = data.offer.title;
    cardAddress.textContent = data.offer.address;
    price.textContent = data.offer.price + ' ₽/ночь';
    type.textContent = data.offer.type;
    time.textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;
    features.textContent = data.offer.features;
    description.textContent = data.offer.description;
    capacity.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests;
    avatar.src = data.author.avatar;

    return element;
  };

  var renderCard = function (data) {
    cardBlock.appendChild(fillCard(data));
  };

  window.map = {
    renderCard: renderCard,
    deactivatePage: deactivatePage
  };
})();
