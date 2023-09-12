import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
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

export const messaging=getMessaging(app);
  
