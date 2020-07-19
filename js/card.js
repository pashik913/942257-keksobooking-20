'use strict';

(function () {

  var card = document.querySelector('#card')
  .content
  .querySelector('.map__card');
  var block = document.querySelector('.map__filters-container');


  var createFeatureFragment = function (data) {
    var featureFragment = document.createDocumentFragment();

    data.offer.features.forEach(function (it) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + it;
      featureFragment.appendChild(featureItem);
    });

    return featureFragment;
  };

  var createPhotosFragment = function (data) {
    var photosFragment = document.createDocumentFragment();
    var template = document.querySelector('template');
    var popupPhoto = template.content.querySelector('.popup__photo');

    data.offer.photos.forEach(function (it) {
      var popupPhotoItem = popupPhoto.cloneNode(true);
      popupPhotoItem.src = it;
      photosFragment.appendChild(popupPhotoItem);
    });

    return photosFragment;
  };

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
    var photo = element.querySelector('.popup__photo');

    title.textContent = data.offer.title;
    cardAddress.textContent = data.offer.address;
    price.textContent = data.offer.price + ' ₽/ночь';
    type.textContent = data.offer.type;
    time.textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;
    features.textContent = data.offer.features;
    description.textContent = data.offer.description;
    capacity.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    avatar.src = data.author.avatar;
    features.innerHTML = '';
    features.appendChild(createFeatureFragment(data));
    photos.removeChild(photo);
    photos.appendChild(createPhotosFragment(data));

    return element;
  };


  var renderCard = function (data) {
    block.insertAdjacentElement('beforebegin', card.appendChild(fillCard(data)));
  };

  window.card = renderCard;
})();
