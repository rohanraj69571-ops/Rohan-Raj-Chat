importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDmsIygS5gwvvgZn2rDfUToI1gTlM-dmmM",
  authDomain: "rohan-raj-chat-85680.firebaseapp.com",
  projectId: "rohan-raj-chat-85680",
  storageBucket: "rohan-raj-chat-85680.firebasestorage.app",
  messagingSenderId: "565941235946",
  appId: "1:565941235946:web:295176ef9255e085006793"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "Rohan Raj Chat";
  const options = {
    body: payload.notification?.body || "Aapko naya message mila hai.",
    icon: "/favicon.ico"
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if ("focus" in client) return client.focus();
      }
      return clients.openWindow("/");
    })
  );
});
