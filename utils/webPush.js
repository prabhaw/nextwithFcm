import "firebase/messaging";
import firebase from "firebase/app";

// import localforage from "localforage";
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBcqvuYub6Ep8kLFw9gyaTGECc4eomGEkA",
    projectId: "fir-chat-a6c39",
    messagingSenderId: "613732405989",
    appId: "1:613732405989:web:b0164e5e3e6b87052a7a0c",
  });
}

const firebaseCloudMessaging = {
  //   tokenInlocalforage: async () => {
  //     return localforage.getItem("fcm_token");
  //   },

  init: async function () {
    try {
      //   if ((await this.tokenInlocalforage()) !== null) {
      //     return false;
      //   }
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      return token;
      //   localforage.setItem("fcm_token", token);
    } catch (error) {
      console.error(error);
    }
  },

  // getmsg: async function () {
  //   if (process.browser) {
  //     try {
  //       const messaging = firebase.messaging();
  //       await messaging.onMessage(function (message) {
  //         return message;
  //       });
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // },
};

export { firebaseCloudMessaging };
