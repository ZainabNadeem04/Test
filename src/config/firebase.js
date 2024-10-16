import { initializeApp } from "firebase/app"
import { getAuth , GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKJZ6T7y1oWuHmAZLikxtdLzLwvRFwNq0",
  authDomain: "secprojrct.firebaseapp.com",
  projectId: "secprojrct",
  storageBucket: "secprojrct.appspot.com",
  messagingSenderId: "750955263940",
  appId: "1:750955263940:web:aa6276769568d344175691",
  measurementId: "G-K99Z1G45F6"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const loginwithGoogle = new GoogleAuthProvider()
export const db = getFirestore(app)
