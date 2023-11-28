import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blogic-e58ad.firebaseapp.com",
  projectId: "blogic-e58ad",
  storageBucket: "blogic-e58ad.appspot.com",
  messagingSenderId: "56618623435",
  appId: "1:56618623435:web:36de9aaee0363feb6cd64e"
};

export const app = initializeApp(firebaseConfig);