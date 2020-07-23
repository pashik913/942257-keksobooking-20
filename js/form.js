'use strict';

(function () {
  var typeOfHouse = document.querySelector('#type');
  var priceOfHouse = document.querySelector('#price');
  var priceOfType = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var buttonReset = document.querySelector('.ad-form__reset');
  var adForm = document.querySelector('.ad-form');

  var onSelectChange = function () {
    var value = typeOfHouse.value;

    priceOfHouse.placeholder = priceOfType[value];
    priceOfHouse.min = priceOfType[value];
    disableСapacityOptions(roomsInput.value);

  };

  adForm.addEventListener('change', onSelectChange);

  var guestsInput = document.querySelector('#capacity');
  var roomsInput = document.querySelector('#room_number');

  var roomGuestRation = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var syncValue = function (first, second) {
    second.value = first.value;
  };

  timeIn.addEventListener('change', function () {
    syncValue(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    syncValue(timeOut, timeIn);
  });

  var disableСapacityOptions = function (inputValue) {
    var capacityOptions = guestsInput.querySelectorAll('option');
    capacityOptions.forEach(function (it) {
      it.disabled = true;
    });
    roomGuestRation[inputValue].forEach(function (it) {
      guestsInput.querySelector('option' + '[value="' + it + '"]').disabled = false;
      guestsInput.value = it;
    });
  };

  disableСapacityOptions(roomsInput.value);

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

  buttonReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.map.deactivatePage();
  });

  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(adForm), function () {
      window.map.deactivatePage();
      renderPopupSuccess();
      document.addEventListener('keydown', onEscPress);
    });
    evt.preventDefault();
  });

  var popupOnSuccess = document.querySelector('#success')
  .content.querySelector('.success');
  var main = document.querySelector('main');

  popupOnSuccess.cloneNode(true);

  var renderPopupSuccess = function () {
    main.insertAdjacentElement('beforeend', popupOnSuccess);
  };

  var ESC_BUTTON = 'Escape';

  var onEscPress = function (evt) {
    if (evt.key === ESC_BUTTON) {
      evt.preventDefault();
      popupOnSuccess.remove();
      document.removeEventListener('keydown', onEscPress);
    }
  };
})();
