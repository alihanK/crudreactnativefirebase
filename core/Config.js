import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "###your api key",
    authDomain: "################",
    projectId: "#######################",
    storageBucket: "####################",
    messagingSenderId: "##########################",
    appId: "###########################"
};

export const app = initializeApp(firebaseConfig);
// MARK: Firestore Reference
export const db = getFirestore(app);