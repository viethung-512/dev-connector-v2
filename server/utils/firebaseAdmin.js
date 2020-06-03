const admin = require('firebase-admin');

const serviceAccount = require('../serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dev-connector-ac7f7.firebaseio.com',
});

module.exports = admin;
