import { Database } from "./app-db.js";

export class App {
    constructor() {
        this.database = new Database();
        this.btn_send_flower = document.getElementById("btn-send-flower");
        this.btn_send_note = document.getElementById("btn-send-note");
    }

    InitEventListeners = () => {
        this.btn_send_flower.addEventListener("click", () => this.database.SendFlower());
        this.btn_send_note.addEventListener("click", () => this.database.SendNote());
    }

    Init = () => {
        this.database.UpdateFlowers();
        this.database.UpdateNotes();
        this.InitEventListeners();
    }
}