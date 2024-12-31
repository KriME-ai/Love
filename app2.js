const messageElement = document.getElementById("message");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const newYearCard = document.getElementById("newYearCard");
const fallingContainer = document.getElementById("fallingContainer");
const stopMusicBtn = document.getElementById("stopMusicBtn");

let audio;

const messages = [
    "Cheers to a wonderful year ahead filled with love, joy, and new adventures!",
    "May this New Year bring new opportunities and endless possibilities!",
    "Celebrate every moment and make memories to cherish forever!",
    "Here's to health, happiness, and success in the coming year!"
];

// Set the target time for 2 minutes from now
let testTime;
if (localStorage.getItem("targetTime")) {
    testTime = new Date(localStorage.getItem("targetTime"));
} else {
    const now = new Date();
    testTime = new Date(now.getTime() + 1 * 60 * 1000); // 2 minutes from now
    localStorage.setItem("targetTime", testTime);
}

function updateCountdown() {
    const now = new Date();
    const timeLeft = testTime - now;

    if (timeLeft <= 0) {
        clearInterval(timer);
        messageElement.textContent = "🎉 Happy New Year! 🎊";
        document.getElementById("countdown").style.display = "none";
        newYearCard.style.display = "block";
        localStorage.removeItem("targetTime");
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

const timer = setInterval(updateCountdown, 1000);
updateCountdown();
