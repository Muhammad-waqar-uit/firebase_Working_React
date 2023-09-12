importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyAbseJW97n7lI2fMia-Ke9oPZ7v2P8n5Ws",
    authDomain: "react-push-notifications-1daee.firebaseapp.com",
    projectId: "react-push-notifications-1daee",
    storageBucket: "react-push-notifications-1daee.appspot.com",
    messagingSenderId: "748815813564",
    appId: "1:748815813564:web:9664176432eccd782bb9b9",
    measurementId: "G-WP46MW07YK"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});