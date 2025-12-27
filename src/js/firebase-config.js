import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyDYiO2AmF1YtQfocZpTiaO5Y6jEXXa0rMw",
  authDomain: "birlikagaci-be477.firebaseapp.com",
  projectId: "birlikagaci-be477",
  storageBucket: "birlikagaci-be477.firebasestorage.app",
  messagingSenderId: "207104150644",
  appId: "1:207104150644:web:8e8afd4d54aa6fb1ebd521",
  measurementId: "G-2E09F1Q9L5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);