import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js'
import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    getDoc,
    serverTimestamp,
    doc,
    onSnapshot,
    query,
    orderBy
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyDYiO2AmF1YtQfocZpTiaO5Y6jEXXa0rMw",
    authDomain: "birlikagaci-be477.firebaseapp.com",
    projectId: "birlikagaci-be477",
    storageBucket: "birlikagaci-be477.firebasestorage.app",
    messagingSenderId: "207104150644",
    appId: "1:207104150644:web:8e8afd4d54aa6fb1ebd521",
    measurementId: "G-2E09F1Q9L5"
};

// Firebase Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore references
const notesRef = collection(db, "notes");
const flowersDoc = doc(db, "flowers", "flower_doc_id");

// Elements
const btn_send_flower = document.getElementById("btn-send-flower");
const num_of_flowers = document.getElementById("num-of-flowers");

const dialog = document.getElementById("dialog");
const btn_close_dialog1 = document.getElementById("btn-close-dialog1");
const btn_close_dialog2 = document.getElementById("btn-close-dialog2");

const confirm_dialog = document.getElementById("confirm-dialog");
const btn_close_confirm1 = document.getElementById("btn-close-confirm1");
const btn_close_confirm2 = document.getElementById("btn-close-confirm2");
const btn_confirm = document.getElementById("btn-confirm");

const container_send_note = document.getElementById("container-send-note");
const input_name = document.getElementById("input-name");
const input_note = document.getElementById("input-note");
const btn_send_note = document.getElementById("btn-send-note");

const note_list = document.getElementById("note-list");
const note_list_empty = document.getElementById("note-list-empty");

// Music
document.addEventListener('DOMContentLoaded', function() {
    var music = document.getElementById('music');
    var checkbox_music = document.getElementById('checkbox-music');

    music.volume = 0.02;

    if (!music || !checkbox_music) {
        console.error("Gerekli elementler (music veya checkbox-music) bulunamadı.");
        return;
    }

    checkbox_music.addEventListener('change', ControlMusic);

    function ControlMusic() {
        if (checkbox_music.checked) {
            music.muted = false;
            music.play().catch(error => {
                console.error("Müzik oynatılırken hata oluştu:", error);
            });

        } else {
            music.muted = true;
        }
    }
});

// --------------------------
// REALTIME FLOWERS UPDATE
// --------------------------
onSnapshot(flowersDoc, (snap) => {
    const data = snap.data();
    num_of_flowers.textContent = data?.num_of_flowers ?? 0;
});

// --------------------------
// REALTIME NOTES UPDATE
// --------------------------
const q = query(notesRef, orderBy("timestamp", "desc"));

onSnapshot(q, (querySnapshot) => {
    note_list.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const item = doc.data();

        const li = document.createElement("li");
        const boldName = document.createElement("strong");
        const spanNote = document.createElement("span");

        boldName.textContent = item.user_name + ": ";
        spanNote.textContent = item.user_note;

        li.appendChild(boldName);
        li.appendChild(spanNote);
        note_list.appendChild(li);
    });

    if (note_list.innerHTML != "") note_list_empty.hidden = true;
    else note_list_empty.hidden = false;
});

const Dialog = (status) => {
    if (status) dialog.showModal();
    else dialog.close();
}

const ConfirmDialog = (status) => {
    if (status) confirm_dialog.showModal();
    else confirm_dialog.close();
}

// --------------------------
// SEND NOTE
// --------------------------
const SendNote = async () => {
    ConfirmDialog(false);
    if (localStorage.getItem("note_sent") === "true") return;

    const name = input_name.value.trim();
    const note = input_note.value.trim();

    if (note === "") {
        Dialog(true);
        return;
    }

    try {
        await addDoc(notesRef, {
            user_name: name,
            user_note: note,
            timestamp: serverTimestamp()
        });
    } catch (e) {
        console.error("Error adding note:", e);
    }

    localStorage.setItem("note_sent", "true");
    container_send_note.hidden = true;
};

// --------------------------
// SEND FLOWER
// --------------------------
const SendFlower = async () => {
    if (localStorage.getItem("flower_sent") === "true") return;

    try {
        const snap = await getDoc(flowersDoc);
        const current = snap.exists() ? snap.data().num_of_flowers : 0;

        await setDoc(flowersDoc, {
            num_of_flowers: current + 1
        }, { merge: true });

    } catch (e) {
        console.error("Error updating flower:", e);
    }

    localStorage.setItem("flower_sent", "true");
    btn_send_flower.hidden = true;
};

// --------------------------
// CONTROL UI
// --------------------------
if (localStorage.getItem("flower_sent") === "true")
    btn_send_flower.hidden = true;

if (localStorage.getItem("note_sent") === "true")
    btn_send_note.hidden = true;

function ClearLocalStorage() {
    localStorage.clear();
    btn_send_flower.hidden = false;
    container_send_note.hidden = false;
}

// --------------------------
// EVENTS
// --------------------------
btn_send_flower.addEventListener("click", SendFlower);
btn_send_note.addEventListener("click", () => ConfirmDialog(true));
num_of_flowers.addEventListener("click", ClearLocalStorage);
btn_close_dialog1.addEventListener("click", () => Dialog(false));
btn_close_dialog2.addEventListener("click", () => Dialog(false));
btn_close_confirm1.addEventListener("click", () => ConfirmDialog(false));
btn_close_confirm2.addEventListener("click", () => ConfirmDialog(false));
btn_confirm.addEventListener("click", SendNote);

const flowersContainer = document.getElementById("flowers-container");

const icons = [
    "icons/p1.png", "icons/p2.png", "icons/p3.png", "icons/p4.png", "icons/p5.png",
    "icons/p6.png", "icons/p7.png", "icons/p8.png", "icons/p9.png", "icons/p10.png",
    "icons/p11.png", "icons/p12.png", "icons/p13.png"
];


// Basit karıştırma
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function renderPeople(flowerCount) {
    const container = document.getElementById("garden");
    container.innerHTML = "";

    // DÜZELTME 1: Limiti kaldırdık. Artık count, gelen sayı neyse o.
    // (İstersen performans için bir üst limit koyabilirsin, örn: Math.min(flowerCount, 200))
    const count = flowerCount; 

    // İkonları bir kez karıştıralım
    const shuffledIcons = shuffle([...icons]);

    const iconSize = 70;
    const cellSize = iconSize + 20;
    const width = window.innerWidth;
    let columns;

    if (width < 500) { columns = 3; }
    else if (width < 900) { columns = 4; }
    else if (width < 1200) { columns = 8; }
    else { columns = 12; }

    // Sütun sayısı eleman sayısından fazlaysa daralt
    columns = Math.min(count, columns);
    const rows = Math.ceil(count / columns);

    container.style.width = (columns * cellSize) + "px";
    container.style.height = (rows * cellSize) + "px";

    for (let i = 0; i < count; i++) {
        const img = document.createElement("img");
        
        // DÜZELTME 2: Modulo (%) operatörü
        // i değişkeni 13'e geldiğinde (13 % 13 = 0) olur ve listenin başına döner.
        img.src = shuffledIcons[i % shuffledIcons.length];
        
        img.className = "person";

        const col = i % columns;
        const row = Math.floor(i / columns);

        img.style.left = (col * cellSize + 12) + "px";
        img.style.top = (row * cellSize + 12) + "px";

        container.appendChild(img);
    }
}

renderPeople();

onSnapshot(flowersDoc, (snap) => {
    const data = snap.data();
    const count = data?.num_of_flowers ?? 0;

    num_of_flowers.textContent = count;

    renderPeople(count);
});