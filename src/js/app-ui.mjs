const icons = [
    "../../assets/img/p1.png", "../../assets/img/p2.png", "../../assets/img/p3.png", "../../assets/img/p4.png", "../../assets/img/p5.png",
    "../../assets/img/p6.png", "../../assets/img/p7.png", "../../assets/img/p8.png", "../../assets/img/p9.png", "../../assets/img/p10.png",
    "../../assets/img/p11.png", "../../assets/img/p12.png", "../../assets/img/p13.png"
];

// Basit
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

export function renderPeople(flowerCount) {
    const container = document.getElementById("garden");
    if (!container) return;
    
    container.innerHTML = "";
    const count = flowerCount || 0;
    if (count === 0) return;

    const shuffledIcons = shuffle([...icons]);

    const containerWidth = (container.clientWidth || window.innerWidth)*0.75;
    const maxContainerHeight = window.innerHeight * 0.50; 
    const totalArea = containerWidth * maxContainerHeight;
    const areaPerFlower = totalArea / count;
    
    // Bu alanın karekökü bize hücrenin kenar uzunluğunu verir (Cell Size)
    // Hafif bir güvenlik payı (0.9) ile çarpıyoruz ki tam sınıra dayanıp taşmasın.
    let cellSize = Math.floor(Math.sqrt(areaPerFlower) * 0.9);

    const minSize = 20;
    const maxSize = 80;
    
    cellSize = Math.max(minSize, Math.min(cellSize, maxSize));
    let columns = Math.floor(containerWidth / cellSize);
    
    let rows = Math.ceil(count / columns);
    while ((rows * cellSize) > maxContainerHeight && cellSize > minSize) {
        cellSize--; // Sığana kadar piksel piksel küçült
        columns = Math.floor(containerWidth / cellSize);
        rows = Math.ceil(count / columns);
    }

    const iconSize = Math.floor(cellSize * 0.75); 
    const gap = (cellSize - iconSize) / 2;

    container.style.width = (columns * cellSize) + "px";
    container.style.height = (rows * cellSize) + "px";
    container.style.position = "relative";
    container.style.margin = "0 auto"; 

    // --- 5. ÇİZİM ---
    for (let i = 0; i < count; i++) {
        const img = document.createElement("img");
        img.src = shuffledIcons[i % shuffledIcons.length];
        
        // Tailwind 'absolute' kalıyor, boyut classlarını siliyoruz
        img.className = "absolute object-contain"; 
        
        // JS ile dinamik boyut
        img.style.width = iconSize + "px";
        img.style.height = iconSize + "px";
        
        const col = i % columns;
        const row = Math.floor(i / columns);
        
        img.style.left = (col * cellSize + gap) + "px";
        img.style.top = (row * cellSize + gap) + "px";
        
        container.appendChild(img);
    }
}