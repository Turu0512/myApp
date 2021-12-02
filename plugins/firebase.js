import firebase from "firebase/compat/app";
import "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASURMENT_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

export default firebase;
