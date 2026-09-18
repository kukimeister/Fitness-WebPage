// Podsjetnici za Firebase inicijalizaciju
//
// Trebam zamijeniti placeholdere svojim
// pravim podacima iz Firebase konzole.
//
// U Firebase konzoli još trebam:
// 1. uključiti "Email/Password", i pod "Users" ručno dodati jednog korisnika (svoj email/lozinku) -
//    to je "trener" login.
// 2. Firestore Database -> Create database -> pokrenuti u test modu za
//    razvoj, security rules mogu kasnije.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCB0U6fz_kPWJuERCrZ2j4mzRFLoymQ6SI",
  authDomain: "fitness-web-app-b2bae.firebaseapp.com",
  projectId: "fitness-web-app-b2bae",
  storageBucket: "fitness-web-app-b2bae.firebasestorage.app",
  messagingSenderId: "597033828207",
  appId: "1:597033828207:web:3c7c97be9516d55a1e729a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
