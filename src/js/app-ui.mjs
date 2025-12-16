// ✅ Import dialog elements from app.mjs
import { 
    dialog_main, 
    dialog_h1, 
    dialog_p, 
    dialog_btn1, 
    dialog_btn2 
} from "./app.mjs";

export const UpdateDialog = (title, paragraph, btn1_text, btn2_text = "") => {
    // Set Context
    dialog_h1.textContent = title;
    dialog_p.textContent = paragraph;
    dialog_btn1.textContent = btn1_text;
    dialog_btn2.hidden = true;
    // Control for Button 2
    if (btn2_text != "") {
        dialog_btn2.textContent = btn2_text;
        dialog_btn2.hidden = false;
    }
    // Show Dialog
    dialog_main.showModal();
}

export const CloseDialog = () => {
    dialog_main.close();
}

// ✅ Flower rendering functionality
const icons = [
    "../../assets/img/p1.png", "../../assets/img/p2.png", "../../assets/img/p3.png", "../../assets/img/p4.png", "../../assets/img/p5.png",
    "../../assets/img/p6.png", "../../assets/img/p7.png", "../../assets/img/p8.png", "../../assets/img/p9.png", "../../assets/img/p10.png",
    "../../assets/img/p11.png", "../../assets/img/p12.png", "../../assets/img/p13.png"
];

// Basit karıştırma
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

// ✅ EXPORT this so it can be called from other modules
export function renderPeople(flowerCount) {
    const container = document.getElementById("garden");
    if (!container) {
        console.error("Garden container not found!");
        return;
    }
    
    container.innerHTML = "";
    
    const count = flowerCount || 0;  // ✅ Handle undefined/null
    
    if (count === 0) return;  // ✅ Don't render if no flowers
    
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
        img.src = shuffledIcons[i % shuffledIcons.length];
        img.className = "person";
        
        const col = i % columns;
        const row = Math.floor(i / columns);
        
        img.style.left = (col * cellSize + 12) + "px";
        img.style.top = (row * cellSize + 12) + "px";
        
        container.appendChild(img);
    }
}