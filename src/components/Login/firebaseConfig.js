import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrtKrbH6BnQZyhDK4TH-uNuUt3UgEuRUY",
  authDomain: "antrixmesh-c7f68.firebaseapp.com",
  projectId: "antrixmesh-c7f68",
  storageBucket: "antrixmesh-c7f68.appspot.com",
  messagingSenderId: "757743785845",
  appId: "1:757743785845:web:092b3353b848b861d0a53c",
  measurementId: "G-GR1VTKP9LL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const fireAuth = getAuth(app);
