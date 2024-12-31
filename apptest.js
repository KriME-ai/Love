const messageElement = document.getElementById("message");
const newYearCard = document.getElementById("newYearCard");
const fallingContainer = document.getElementById("fallingContainer");
const stopMusicBtn = document.getElementById("stopMusicBtn");
const slideshowImages = [
    "https://raw.githubusercontent.com/KriME-ai/Love/refs/heads/main/WhatsApp10.jpg",
    "https://raw.githubusercontent.com/KriME-ai/Love/refs/heads/main/WhatsApp12.jpg",
    "https://raw.githubusercontent.com/KriME-ai/Love/refs/heads/main/WhatsApp13.jpg",
    "https://raw.githubusercontent.com/KriME-ai/Love/refs/heads/main/WhatsApp8.jpg"
];
let currentSlideIndex = 0;

let audio;

const messages = [
    "Happy New Year My Love❤️",
    "May this New Year bring new opportunities and endless possibilities!",
    "Celebrate every moment and make memories to cherish forever!",
    "Here's to health, happiness, and success in the coming year!",
    "And Moi xodai tumar logot thakibo bisaru my cutuu Munu,Please mor logot xodai thakiba na"
];

function playMusic() {
    if (!audio) {
        audio = new Audio("./Audio.mp3"); // Add your music file here
        audio.loop = true;
    }
    audio.play();
}

function stopMusic() {
    if (audio) {
        audio.pause();
    }
    stopMusicBtn.style.display = "none";
}

function celebrate() {
    playMusic();
    stopMusicBtn.style.display = "inline-block";

    for (let i = 0; i < 100; i++) {
        const fallingElement = document.createElement("div");
        fallingElement.classList.add("falling");
        fallingElement.classList.add(Math.random() > 0.5 ? "heart" : "star");
        fallingElement.style.left = Math.random() * 100 + "vw";
        fallingElement.style.animationDuration = 2 + Math.random() * 3 + "s";
        fallingElement.style.opacity = Math.random();
        fallingContainer.appendChild(fallingElement);

        setTimeout(() => {
            fallingElement.remove();
        }, 4000);
    }

    const descriptionElement = document.querySelector(".card-description");
    descriptionElement.classList.add("showContent");
    descriptionElement.textContent = messages[Math.floor(Math.random() * messages.length)];
    setTimeout(() => {
        descriptionElement.classList.remove("showContent");
    }, 1200);
}

function startSlideshow() {
    const cardImage = document.querySelector(".card-img");
    const cardDescription = document.querySelector(".card-description");

    setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % slideshowImages.length;
        cardImage.src = slideshowImages[currentSlideIndex];
        cardDescription.textContent = messages[currentSlideIndex];
    }, 3000); // Change slide every 3 seconds
}

// Start the celebration immediately
celebrate();
startSlideshow();
