// Firebase imports FIRST
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js'

// Firebase config and initialization
const firebaseConfig = {
  apiKey: "AIzaSyDYiO2AmF1YtQfocZpTiaO5Y6jEXXa0rMw",
  authDomain: "birlikagaci-be477.firebaseapp.com",
  projectId: "birlikagaci-be477",
  storageBucket: "birlikagaci-be477.firebasestorage.app",
  messagingSenderId: "207104150644",
  appId: "1:207104150644:web:8e8afd4d54aa6fb1ebd521",
  measurementId: "G-2E09F1Q9L5"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Flowers
export const num_of_flowers = document.getElementById("num-of-flowers");
export const btn_send_flower = document.getElementById("btn-send-flower");

// Send Note
export const send_note_main = document.getElementById("send-note-main");
export const input_name = document.getElementById("input-name");
export const input_note = document.getElementById("input-note");
export const btn_send_note = document.getElementById("btn-send-note");

// Note List
export const note_list = document.getElementById("note-list");
export const note_list_empty = document.getElementById("note-list-empty");

// Import and run AFTER all exports are defined
import { SetEventListeners } from "./app-events.mjs"
import { ControlLocalStorage, UpdateFlowers, UpdateNotes } from "./app-db.mjs"

ControlLocalStorage();
SetEventListeners();
UpdateFlowers();
UpdateNotes();