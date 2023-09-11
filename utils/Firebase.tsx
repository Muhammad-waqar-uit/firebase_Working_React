import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging,getToken } from "firebase/messaging";
import {GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyAbseJW97n7lI2fMia-Ke9oPZ7v2P8n5Ws",
    authDomain: "react-push-notifications-1daee.firebaseapp.com",
    projectId: "react-push-notifications-1daee",
    storageBucket: "react-push-notifications-1daee.appspot.com",
    messagingSenderId: "748815813564",
    appId: "1:748815813564:web:9664176432eccd782bb9b9",
    measurementId: "G-WP46MW07YK"
  };

const app=initializeApp(firebaseConfig);
const Auth=getAuth(app);
const provider=new GoogleAuthProvider();

export {app,Auth,provider};


  
  export const requestForToken = () => {
    return getToken(messaging, { vapidKey: "BMWjUaBizMjnrLe4zouXi-X53rIBVTOE3wxKB54Z2qpH-8B2mT4vsJIAdSxc_Lp4MtTvDCnmwsEKbSRRIYOD3Lg" })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          // Perform any other neccessary action with the token
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };