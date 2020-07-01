'use strict';

(function () {
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

  window.pin = {
    render: renderPins,
    remove: removePins
  };
})();
