// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDH58TwbpA7wvJdr40bcF-PnLgNsiPPHW4",
    authDomain: "thesocialnetwork-43f03.firebaseapp.com",
    databaseURL: "https://thesocialnetwork-43f03-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "thesocialnetwork-43f03",
    storageBucket: "thesocialnetwork-43f03.appspot.com",
    messagingSenderId: "512049929222",
    appId: "1:512049929222:web:5070ec382431b51dc97787",
    measurementId: "G-8QWKJ0QF60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
