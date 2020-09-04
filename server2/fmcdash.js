var admin = require("firebase-admin");

var serviceAccount = require("./fcmsdk.json");

function message(data) {
  !admin.apps.length
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        //   databaseURL: "https://fir-chat-a6c39.firebaseio.com",
      })
    : admin.app();

  var payload = {
    notification: {
      title: "Hello world",
      body: "A deposit to your savings account has just cleared.",
    },
    data: {
      account: "Savings",
      balance: "$3020.25",
    },
  };

  var options = {
    priority: "high",
    timeToLive: 60,
  };

  admin
    .messaging()
    .sendToDevice(data.deviceId, payload, options)
    .then(function (response) {
      console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
      console.log("Error sending message:", error);
    });
}

module.exports = message;
