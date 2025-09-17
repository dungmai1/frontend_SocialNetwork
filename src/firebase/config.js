// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTqolKa3-Dgoako7JHpcxCMv9wsrEV0T4",
  authDomain: "uploadimage-2566f.firebaseapp.com",
  projectId: "uploadimage-2566f",
  storageBucket: "uploadimage-2566f.appspot.com",
  messagingSenderId: "1087217591503",
  appId: "1:1087217591503:web:5326a3a24eb5d21e2f83ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);