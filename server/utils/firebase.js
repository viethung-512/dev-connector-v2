const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/storage');

const firebaseConfig = require('../../config/firebaseConfig');

firebase.initializeApp(firebaseConfig);

module.exports = firebase;
