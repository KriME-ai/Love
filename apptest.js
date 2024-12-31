const messageElement = document.getElementById("message");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const newYearCard = document.getElementById("newYearCard");
const fallingContainer = document.getElementById("fallingContainer");
const stopMusicBtn = document.getElementById("stopMusicBtn");
const slideshowImages = [
    "https://via.placeholder.com/300x200?text=Image+1",
    "https://via.placeholder.com/300x200?text=Image+2",
    "https://via.placeholder.com/300x200?text=Image+3",
    "https://via.placeholder.com/300x200?text=Image+4"
];
let currentSlideIndex = 0;

let audio;

const messages = [
    "Cheers to a wonderful year ahead filled with love, joy, and new adventures!",
    "May this New Year bring new opportunities and endless possibilities!",
    "Celebrate every moment and make memories to cherish forever!",
    "Here's to health, happiness, and success in the coming year!"
];

const now = new Date();
const nextYear = now.getFullYear() + 1;
testTime = new Date(`January 1, ${nextYear} 00:00:00`);
localStorage.setItem("targetTime", testTime);
localStorage.removeItem("newYearCelebrated");

function updateCountdown() {
    const now = new Date();
    const timeLeft = testTime - now;

    if (timeLeft <= 0) {
        clearInterval(timer);
        messageElement.textContent = "🎉 Happy New Year! 🎊";
        document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/a0/a0/16/a0a01608a0386ad052a15a5af8196be7.png')";
        document.body.classList.add("background-fade-in");
        document.getElementById("countdown").style.display = "none";
        newYearCard.style.display = "block";
        localStorage.setItem("newYearCelebrated", true);
        localStorage.removeItem("targetTime");
        startSlideshow();
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    daysElement.textContent = days.toString().padStart(2, "0");
    hoursElement.textContent = hours.toString().padStart(2, "0");
    minutesElement.textContent = minutes.toString().padStart(2, "0");
    secondsElement.textContent = seconds.toString().padStart(2, "0");
}

function playMusic() {
    if (!audio) {
        audio = new Audio("test-music.mp3"); // Add your music file here
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

const timer = setInterval(updateCountdown, 1000);
updateCountdown();
