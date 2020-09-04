var FCM = require("fcm-node");
const sendNotic = (data) => {
  var serviceKey = require("./fcm.json");
  var fcm = new FCM(serviceKey);

  var message = {
    //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: `${data.deviceId}`,
    collapse_key: "notification",
    notification: {
      title: "Title of your push notification",
      body: "Body of your push notification",
      tag: "notification",
    },
    // data: {
    //
    //   my_key: "my value",
    //   my_another_key: "my another value",
    // },
  };
  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!");
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
};

module.exports = sendNotic;
