importScripts("https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.19.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBcqvuYub6Ep8kLFw9gyaTGECc4eomGEkA",
  projectId: "fir-chat-a6c39",
  messagingSenderId: "613732405989",
  appId: "1:613732405989:web:b0164e5e3e6b87052a7a0c",
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
