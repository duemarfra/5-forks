// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeZyH_k2vMx9mbI8N2m0ibkkgNN-a_zSQ",
  authDomain: "forks-dev-85d8e.firebaseapp.com",
  projectId: "forks-dev-85d8e",
  storageBucket: "forks-dev-85d8e.appspot.com",
  messagingSenderId: "24291960995",
  appId: "1:24291960995:web:4bdbd38104d6d793253716",
};

export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase);
