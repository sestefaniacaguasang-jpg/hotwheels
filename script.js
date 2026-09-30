/* ==========================================================================
   CONFIGURACIÓN DE FLORES, FOTOS Y FRASES
   ========================================================================== */
const configFlores = [
    { id: 1, foto: "imagenes/carro1.jpg", frase: "Aceleraste mi corazón desde el primer día.", x: 160, y: 150, stemPath: "M 200,480 Q 170,300 160,150" },
    { id: 2, foto: "imagenes/carro2.jpg", frase: "Haces que cada día sea mejor que el anterior.", x: 240, y: 150, stemPath: "M 200,480 Q 230,300 240,150" },
    { id: 3, foto: "imagenes/carro3.jpg", frase: "Cuanto más tiempo estoy contigo, más te amo.", x: 100, y: 240, stemPath: "M 200,480 Q 130,350 100,240" },
    { id: 4, foto: "imagenes/carro4.jpg", frase: "Eres mi destino favorito en este viaje.", x: 200, y: 250, stemPath: "M 200,480 Q 190,360 200,250" },
    { id: 5, foto: "imagenes/carro5.jpg", frase: "Juntos somos el mejor equipo de la pista.", x: 300, y: 240, stemPath: "M 200,480 Q 270,350 300,240" },
    { id: 6, foto: "imagenes/carro6.jpg", frase: "Mi amor por ti no tiene límite de velocidad. 💙", x: 140, y: 340, stemPath: "M 200,480 Q 155,400 140,340" },
    { id: 7, foto: "imagenes/carro7.jpg", frase: "Gracias por ser mi lugar feliz todos los días.", x: 260, y: 340, stemPath: "M 200,480 Q 245,400 260,340" }
];

/* Hojas Verdes agrupadas hacia abajo */
const configHojas = [
    { d: "M 180,440 Q 120,430 100,460 Q 140,470 180,440", color: "#327730" },
    { d: "M 220,440 Q 280,430 300,460 Q 260,470 220,440", color: "#2d632b" },
    { d: "M 170,390 Q 100,370 80,400 Q 120,420 170,390", color: "#3d883b" },
    { d: "M 230,390 Q 300,370 320,400 Q 280,420 230,390", color: "#327730" },
    { d: "M 160,340 Q 90,320 70,350 Q 110,360 160,340", color: "#479b44" },
    { d: "M 240,340 Q 310,320 330,350 Q 290,360 240,340", color: "#3d883b" }
];

/* ==========================================================================
   INICIALIZACIÓN Y EVENTOS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    generarEstrellas();
    iniciarPantallaDeCarga();
    configurarMusica();
    configurarModal();
});

/* 1. GENERADOR DE ESTRELLAS DE FONDO */
function generarEstrellas() {
    const container = document.getElementById("stars-container");
    const count = 70;

    for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;

        container.appendChild(star);
    }
}

/* 2. PANTALLA DE CARGA Y VELOCÍMETRO */
function iniciarPantallaDeCarga() {
  const container = document.getElementById("stars-container");
    const count = 70;

    for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;

        container.appendChild(star);
    }
    const needle = document.getElementById("needle");
    const speedText = document.getElementById("speed-text");
    const car = document.getElementById("loading-car");
    const loadingScreen = document.getElementById("loading-screen");
    const mainExperience = document.getElementById("main-experience");

    let speed = 0;
    const targetSpeed = 100;
    const duration = 3500; // 3.5 segundos
    const startTime = performance.now();

    function updateLoading(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // Animación de velocidad
        speed = Math.floor(progress * targetSpeed);
        speedText.innerText = `${speed} KM/H`;

        // Rotación de la aguja (-90deg a 90deg)
        const angle = -90 + (progress * (180 / 180) * 180);
        needle.style.transform = `translateX(-50%) rotate(${angle}deg)`;

        // Movimiento horizontal del carro
        car.style.left = `${progress * 100}%`;

        if (progress < 1) {
            requestAnimationFrame(updateLoading);
        } else {
            // Finalizar carga y hacer transición
            setTimeout(() => {
                loadingScreen.classList.add("hidden");
                mainExperience.classList.remove("hidden");
                iniciarSecuenciaRamo();
            }, 500);
        }
    }

    requestAnimationFrame(updateLoading);
}

/* 3. SECUENCIA ANIMADA DE CRECIMIENTO DEL RAMO */
function iniciarSecuenciaRamo() {
    const stemsGroup = document.getElementById("stems-group");
    const leavesGroup = document.getElementById("leaves-group");
    const flowersContainer = document.getElementById("flowers-container");

    // A. Dibujar Tallos progresivamente
    configFlores.forEach((item, index) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", item.stemPath);
        path.setAttribute("stroke", "#40883d");
        path.setAttribute("stroke-width", "5");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-linecap", "round");
        path.classList.add("stem-path");
        path.style.animationDelay = `${index * 0.45}s`;

        stemsGroup.appendChild(path);
    });

    // B. Aparecer Hojas
    configHojas.forEach((leaf, index) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", leaf.d);
        path.setAttribute("fill", leaf.color);
        path.classList.add("leaf-path");
        path.style.animationDelay = `${index * 0.9}s`;

        leavesGroup.appendChild(path);
    });

    // C. Aparecer Flores una por una
    configFlores.forEach((item, index) => {
        setTimeout(() => {
            const flowerEl = crearElementoFlor(item);
            flowersContainer.appendChild(flowerEl);
            
            // Forzar reflow para activar animación CSS
            setTimeout(() => {
                flowerEl.classList.add("appear");
            }, 50);
        }, 1500 + (index * 400));
    });
}

/* Generador del HTML/CSS de cada flor */
function crearElementoFlor(data) {
    const flower = document.createElement("div");
    flower.classList.add("flower-item");
    
    flower.style.left = `${(data.x / 400) * 100}%`;
    flower.style.top = `${(data.y / 500) * 100}%`;

    flower.innerHTML = `
        <div class="flower-head">
            <svg viewBox="0 0 100 110" class="flower-svg">
                <defs>
                    <linearGradient id="flowerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#a2eeff" />
                        <stop offset="40%" stop-color="#54beed" />
                        <stop offset="100%" stop-color="#2179bd" />
                    </linearGradient>
                </defs>
                <!-- Silueta acampanada con 4 ondas en la parte superior -->
                <path d="
                    M 10,30 
                    C 10,20 15,12 22.5,20 
                    C 30,12 35,20 42.5,20 
                    C 50,12 55,20 62.5,20 
                    C 70,12 85,20 90,30 
                    C 95,65 75,95 50,98 
                    C 25,95 5,65 10,30 Z
                " fill="url(#flowerGrad)" />
            </svg>
        </div>
        
        <!-- Moño Azul amarrado al tallo -->
        <div class="flower-ribbon">
            <div class="ribbon-loop ribbon-left"></div>
            <div class="ribbon-loop ribbon-right"></div>
            <div class="ribbon-knot"></div>
            <div class="ribbon-tail tail-left"></div>
            <div class="ribbon-tail tail-right"></div>
        </div>
    `;

    flower.addEventListener("click", () => {
        abrirTarjeta(data);
    });

    return flower;
}

/* ==========================================================================
   4. CONTROL DEL MODAL Y TARJETA
   ========================================================================== */
function configurarModal() {
    const closeBtn = document.getElementById("close-card-btn");
    const modal = document.getElementById("card-modal");
    const backdrop = document.getElementById("modal-backdrop");

    const cerrarModal = (e) => {
        if (e) e.preventDefault();
        if (modal) {
            modal.classList.add("hidden");
        }
    };

    // Agregar eventos para clic y pantalla táctil en el botón X
    if (closeBtn) {
        closeBtn.addEventListener("click", cerrarModal);
        closeBtn.addEventListener("touchstart", cerrarModal, { passive: false });
    }

    // Agregar evento para cerrar al hacer clic en el fondo borroso (backdrop)
    if (backdrop) {
        backdrop.addEventListener("click", cerrarModal);
        backdrop.addEventListener("touchstart", cerrarModal, { passive: false });
    }
}

function abrirTarjeta(data) {
    const modal = document.getElementById("card-modal");
    const cardImage = document.getElementById("card-image");
    const cardPhrase = document.getElementById("card-phrase");

    if (cardImage) cardImage.src = data.foto;
    if (cardPhrase) cardPhrase.innerText = data.frase;

    if (modal) {
        modal.classList.remove("hidden");
        // Re-aseguramos la asignación de eventos al abrir por si el DOM sufrió cambios
        configurarModal();
    }
}