'use strict';

(function () {
  var popupOnSuccess = document.querySelector('#success')
  .content
  .querySelector('.success');
  var popupOnError = document.querySelector('#error')
  .content
  .querySelector('.error');
  var main = document.querySelector('main');

  var renderPopupSuccess = function () {
    popupOnSuccess.cloneNode(true);
    main.insertAdjacentElement('beforeend', popupOnSuccess);
  };

  var renderPopupError = function () {
    popupOnError.cloneNode(true);
    main.insertAdjacentElement('beforeend', popupOnError);
  };

  var ESC_BUTTON = 'Escape';

  var popupClose = function () {
    popupOnSuccess.remove();
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onPopupClick);
  };

  var onEscPress = function (evt) {
    if (evt.key === ESC_BUTTON) {
      evt.preventDefault();
      popupClose();
    }
  };

  var onPopupClick = function (evt) {
    evt.preventDefault();
    popupClose();
  };

  window.popup = {
    success: renderPopupSuccess,
    error: renderPopupError,
    closeOnEsc: onEscPress,
    closeOnClick: onPopupClick
  };
})();

