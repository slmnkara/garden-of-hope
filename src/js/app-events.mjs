import { SendFlower, SendNote } from "./app-db.mjs";
import {
    btn_send_flower, 
    btn_send_note
} from "./app.mjs";

export const SetEventListeners = () => {
    // Database Events
    btn_send_flower.addEventListener("click", () => {
        SendFlower();
    });
    
    btn_send_note.addEventListener("click", () => {
        SendNote();
    });
}