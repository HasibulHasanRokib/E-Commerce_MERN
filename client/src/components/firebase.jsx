import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA66NsPmzrGWLbLHnoJLZXtX-qHh8WbDKI",
  authDomain: "interior-design-website-652f7.firebaseapp.com",
  projectId: "interior-design-website-652f7",
  storageBucket: "interior-design-website-652f7.appspot.com",
  messagingSenderId: "921150947771",
  appId: "1:921150947771:web:294cedbfff98105718849e",
  measurementId: "G-YTPMGJQH9B"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);