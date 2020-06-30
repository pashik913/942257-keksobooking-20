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

(function () {
  var getOffer = function () {
    var x = window.utils.getRandomIntInclusive(OFFER.location.x.min, OFFER.location.x.max);
    var y = window.utils.getRandomIntInclusive(OFFER.location.y.min, OFFER.location.y.max);
    return {
      author: {
        avatar: OFFER.avatar[window.utils.getRandomIntInclusive(0, OFFER.avatar.length - 1)]
      },
      offer: {
        title: OFFER.title[window.utils.getRandomIntInclusive(0, OFFER.title.length - 1)],
        address: x + ', ' + y,
        price: window.utils.getRandomIntInclusive(OFFER.price.min, OFFER.price.max),
        type: OFFER.type[window.utils.getRandomIntInclusive(0, OFFER.type.length - 1)],
        rooms: window.utils.getRandomIntInclusive(OFFER.rooms.min, OFFER.rooms.max),
        guests: window.utils.getRandomIntInclusive(OFFER.guests.min, OFFER.guests.max),
        checkin: OFFER.checkin[window.utils.getRandomIntInclusive(0, OFFER.checkin.length - 1)],
        checkout: OFFER.checkout[window.utils.getRandomIntInclusive(0, OFFER.checkout.length - 1)],
        features: OFFER.features.slice(0, window.utils.getRandomIntInclusive(0, OFFER.features.length - 1)),
        description: '21324',
        photos: OFFER.photos.slice(0, window.utils.getRandomIntInclusive(0, OFFER.photos.length - 1))
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

  window.data = {
    getOffer: getOffer,
    getOffers: getOffers
  };
})();

