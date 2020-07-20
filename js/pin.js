'use strict';

(function () {
  var MAX_PINS = 5;

  var pin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  var mapPinBlock = document.querySelector('.map__pins');

  var fillPin = function (data) {
    var element = pin.cloneNode(true);
    var image = element.querySelector('img');

    element.style.left = data.location.x + 'px';
    element.style.top = data.location.y + 'px';
    image.src = data.author.avatar;
    image.alt = data.offer.title;

    var onPinClick = function (evt) {
      evt.preventDefault();

      var cardRemovable = document.querySelector('.map__card');

      if (cardRemovable) {
        cardRemovable.remove();
      }

      window.card.renderCard(data);
    };

    element.addEventListener('click', onPinClick);

    return element;
  };

  var renderPins = function (data) {
    var fragment = document.createDocumentFragment();

    data.length = data.length > MAX_PINS ? MAX_PINS : data.length;

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

  window.pin = {
    render: renderPins,
    remove: removePins
  };
})();
