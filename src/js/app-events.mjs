import { CloseDialog, UpdateDialog } from "./app-ui.mjs"  // ✅ Add UpdateDialog
import { SendFlower, SendNote } from "./app-db.mjs";
import {
    dialog_btn1, 
    dialog_btn2, 
    dialog_btn_close,
    btn_send_flower, 
    btn_send_note
} from "./app.mjs";

let send_note_dialog_flag = false;

export const SetEventListeners = () => {
    // Database Events
    btn_send_flower.addEventListener("click", () => {
        SendFlower();  // ✅ Remove UpdateFlowers() - it's called inside SendFlower()
    });
    
    btn_send_note.addEventListener("click", () => {
        UpdateDialog("Uyarı", "Bu işlem geri alınamaz, devam etmek istediğinize emin misiniz?", "Evet", "Hayır");
        send_note_dialog_flag = true;
    });
    
    // Dialog Events
    dialog_btn1.addEventListener("click", () => {
        CloseDialog();
        if (send_note_dialog_flag) {
            SendNote();  // ✅ Remove UpdateNotes() - it's called inside SendNote()
            send_note_dialog_flag = false;
        }
    });
    
    dialog_btn2.addEventListener("click", CloseDialog);
    dialog_btn_close.addEventListener("click", CloseDialog);
}