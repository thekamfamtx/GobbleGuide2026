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

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("./service-worker.js")

            .then(() => {

                console.log("Gobble Guide Service Worker Registered");

            })

            .catch(error => {

                console.log(error);

            });

    });

}

const shipButton = document.getElementById("shipModeBtn");
const offlineStatus = document.getElementById("offlineStatus");
const lastUpdated = document.getElementById("lastUpdated");

if (shipButton) {

    shipButton.addEventListener("click", async () => {

        offlineStatus.innerHTML =
            "🚢 Preparing Gobble Guide for the ship...";

        try {

   const cache = await caches.open("gobble-guide-v1.0.2");

const basePath = window.location.pathname.includes("/pages/")
    ? "../"
    : "./";

const filesToDownload = [
    basePath,
    basePath + "index.html",
    basePath + "manifest.json",
    basePath + "css/style.css",
    basePath + "js/app.js",
    basePath + "pages/home.html",
    basePath + "pages/cruise-info.html",
    basePath + "pages/schedule.html",
    basePath + "pages/videos.html",
    basePath + "pages/memories.html",
    basePath + "pages/merch.html",
    basePath + "images/gobble-banner.png",
    basePath + "images/kam-logo.png",
    basePath + "icons/icon-192.png",
    basePath + "icons/icon-512.png",
    basePath + "icons/apple-touch-icon.png"
];

offlineStatus.innerHTML =
    "🔍 Checking for the latest Gobble Guide updates...";

let count = 0;

for (const file of filesToDownload) {

    const response = await fetch(file, {
        cache: "no-store"
    });

    await cache.put(file, response.clone());

    count++;

    offlineStatus.innerHTML =
        `🚢 Downloading latest updates... ${count}/${filesToDownload.length}`;

}


  const updateTime = new Date();

localStorage.setItem(
    "gobbleGuideUpdated",
    updateTime.toLocaleString()
);

offlineStatus.innerHTML =
`✅ Gobble Guide has been updated!

You can now switch to Airplane Mode and continue using Gobble Guide offline.

🦃 Enjoy your cruise! 🚢`;

lastUpdated.innerHTML =
"Last updated: " + updateTime.toLocaleString();

        }

        catch(error) {

            console.error(error);

            offlineStatus.innerHTML =
                "⚠️ Something went wrong. Please try again.";

        }

    });

}

const savedUpdate = localStorage.getItem("gobbleGuideUpdated");

if (savedUpdate && lastUpdated) {
    lastUpdated.innerHTML =
    "Last updated: " + savedUpdate;
}


function hideIphoneInstallCard() {
    document.getElementById("iphoneInstallCard").style.display = "none";
}


window.addEventListener("load", () => {

    const card = document.getElementById("iphoneInstallCard");

    if (!card) return;


// Already installed as an app
if (
    window.navigator.standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches
) {
    return;
}




    // Detect iPhone/iPad
    const isIOS = /iphone|ipad|ipod/i.test(
        navigator.userAgent
    );


    if (isIOS) {
        card.style.display = "block";
    }

});
