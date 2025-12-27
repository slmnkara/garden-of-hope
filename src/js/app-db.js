import { addDoc, setDoc, getDoc, getDocs, serverTimestamp, query, orderBy, collection, doc } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js'
import { db } from "./firebase-config.js";

import { renderPeople } from './app-ui.js';

export class Database {
    constructor() {
        this.numNotes = document.getElementById("num-notes");
        this.num_of_flowers = document.getElementById("num-of-flowers");
        this.input_name = document.getElementById("input-name");
        this.input_note = document.getElementById("input-note");
        this.note_list = document.getElementById("note-list");
        this.note_list_empty = document.getElementById("note-list-empty");
    }

    GetNumFlowers = async () => {
        try {
            const snap = await getDoc(doc(db, "flowers", "flower_doc_id"));
            const data = snap.data();
            const count = data?.num_of_flowers ?? 0;

            return count;
        } catch (e) {
            console.error("Error in UpdateFlowers:", e);
        }
    }

    UpdateFlowers = async () => {
        let count = await this.GetNumFlowers();
        this.num_of_flowers.textContent = count;
        renderPeople(count);
    }

    SendFlower = async () => {
        try {
            const flowersDoc = doc(db, "flowers", "flower_doc_id");
            const current = await this.GetNumFlowers();

            await setDoc(flowersDoc, {
                num_of_flowers: current + 1
            }, { merge: true });

            await this.UpdateFlowers();

        } catch (e) {
            console.error("Error updating flower:", e);
        }
    }

    UpdateNotes = async () => {
        try {
            const notesRef = collection(db, "notes");
            const q = query(notesRef, orderBy("timestamp", "desc"));
            const querySnapshot = await getDocs(q);

            this.numNotes.textContent = querySnapshot.size;

            this.note_list.innerHTML = "";
            querySnapshot.forEach((doc) => {
                const item = doc.data();
                const li = document.createElement("li");
                const boldName = document.createElement("strong");
                const spanNote = document.createElement("span");
                boldName.textContent = item.user_name + ": ";
                spanNote.textContent = item.user_note;
                li.appendChild(boldName);
                li.appendChild(spanNote);
                this.note_list.appendChild(li);
            });

            if (this.note_list.innerHTML != "") this.note_list_empty.hidden = true;
            else this.note_list_empty.hidden = false;
        } catch (e) {
            console.error("Error in UpdateNotes:", e);
        }
    }

    SendNote = async () => {
        const name = this.input_name.value.trim();
        const note = this.input_note.value.trim();

        if (note === "") {
            alert("Dikkat", "Lütfen notu boş bırakmayınız.", "Tamam");
            return;
        }

        try {
            const notesRef = collection(db, "notes");
            await addDoc(notesRef, {
                user_name: name || "Anonim",
                user_note: note,
                timestamp: serverTimestamp()
            });

            await this.UpdateNotes();

            this.input_name.value = "";
            this.input_note.value = "";

        } catch (e) {
            console.error("Error adding note:", e);
        }
    }
}