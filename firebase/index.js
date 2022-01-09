var admin = require("firebase-admin");

var serviceAccount = require("../config/fireBaseserviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
module.exports = admin;
