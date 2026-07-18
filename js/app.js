// ======================================
// Gobble Guide Version 2.0
// The KAM Fam
// ======================================

// ---------- GREETING ----------

const greeting = document.getElementById("greeting");

function updateGreeting() {

    if (!greeting) return;

    const hour = new Date().getHours();

    let message = "";

    if (hour < 12) {

        message = "☀️ Good Morning, Cruiser!";

    } else if (hour < 18) {

        message = "🌞 Good Afternoon, Cruiser!";

    } else {

        message = "🌙 Good Evening, Cruiser!";

    }

    greeting.textContent = message;

}

updateGreeting();


// ---------- COUNTDOWN ----------

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

// November 21, 2026 10:00 AM CST
const sailDate = new Date("2026-11-21T10:00:00-06:00");

function updateCountdown() {

    const now = new Date();

    const difference = sailDate - now;

    if (difference <= 0) {

        if (days) days.textContent = "0";
        if (hours) hours.textContent = "0";
        if (minutes) minutes.textContent = "0";
        if (seconds) seconds.textContent = "0";

        return;

    }

    const totalSeconds = Math.floor(difference / 1000);

    const d = Math.floor(totalSeconds / 86400);

    const h = Math.floor((totalSeconds % 86400) / 3600);

    const m = Math.floor((totalSeconds % 3600) / 60);

    const s = totalSeconds % 60;

    if (days) days.textContent = d;
    if (hours) hours.textContent = String(h).padStart(2, "0");
    if (minutes) minutes.textContent = String(m).padStart(2, "0");
    if (seconds) seconds.textContent = String(s).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);


// ---------- BUTTON ----------

const enterButton = document.querySelector(".enter-btn");

if (enterButton) {

    enterButton.addEventListener("click", function (e) {

        e.preventDefault();

        document.body.style.transition = "opacity .4s";

        document.body.style.opacity = "0";

        setTimeout(() => {

            window.location.href = "pages/home.html";

        }, 400);

    });

}
