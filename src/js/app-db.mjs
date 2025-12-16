import {
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    serverTimestamp,
    query,
    orderBy,
    collection,
    doc
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js'

import {
    db,
    num_of_flowers, 
    btn_send_flower,
    input_name, 
    input_note, 
    btn_send_note,
    note_list, 
    note_list_empty
} from './app.mjs';

import { UpdateDialog } from './app-ui.mjs';
import { renderPeople } from './app-ui.mjs';

// ✅ DON'T create these at top level - create them inside functions
// const notesRef = collection(db, "notes");  ❌ This runs immediately
// const flowersDoc = doc(db, "flowers", "flower_doc_id");  ❌ This runs immediately

// ✅ Helper functions to get refs when needed
const getNotesRef = () => collection(db, "notes");
const getFlowersDoc = () => doc(db, "flowers", "flower_doc_id");

export const ControlLocalStorage = () => {
    if (localStorage.getItem("flower_sent") === "true") {
        btn_send_flower.textContent = "Daha önce gönderildi!";
        btn_send_flower.disabled = true;
    }
    if (localStorage.getItem("note_sent") === "true") {
        btn_send_note.textContent = "Daha önce gönderildi!";
        btn_send_note.disabled = true;
    }
}

export async function UpdateFlowers() {
    try {
        const flowersDoc = getFlowersDoc();
        const snap = await getDoc(flowersDoc);
        const data = snap.data();
        const count = data?.num_of_flowers ?? 0;
        
        num_of_flowers.textContent = count;
        renderPeople(count);  // ✅ Render flowers visually
        
    } catch (e) {
        console.error("Error in UpdateFlowers:", e);
    }
}

export async function UpdateNotes() {
    try {
        const notesRef = getNotesRef();  // ✅ Get it here
        const q = query(notesRef, orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        
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
    } catch (e) {
        console.error("Error in UpdateNotes:", e);
    }
}

export const SendNote = async () => {
    const name = input_name.value.trim();
    const note = input_note.value.trim();
    
    if (note === "") {
        UpdateDialog("Dikkat", "Lütfen notu boş bırakmayınız.", "Tamam");
        return;
    }
    
    try {
        const notesRef = getNotesRef();  // ✅ Get it here
        await addDoc(notesRef, {
            user_name: name || "Anonim",
            user_note: note,
            timestamp: serverTimestamp()
        });
        
        await UpdateNotes();
        
    } catch (e) {
        console.error("Error adding note:", e);
    }
    
    localStorage.setItem("note_sent", "true");
    btn_send_note.textContent = "Daha önce gönderildi!";
    btn_send_note.disabled = true;
};

export const SendFlower = async () => {
    try {
        const flowersDoc = getFlowersDoc();  // ✅ Get it here
        const snap = await getDoc(flowersDoc);
        const current = snap.exists() ? snap.data().num_of_flowers : 0;
        
        await setDoc(flowersDoc, {
            num_of_flowers: current + 1
        }, { merge: true });
        
        await UpdateFlowers();
        
    } catch (e) {
        console.error("Error updating flower:", e);
    }
    
    localStorage.setItem("flower_sent", "true");
    btn_send_flower.textContent = "Daha önce gönderildi!";
    btn_send_flower.disabled = true;
};