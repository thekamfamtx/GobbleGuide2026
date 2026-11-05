
// ======================================
// Gobble Guide Version 2.1
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


// ---------- SERVICE WORKER ----------

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


// ---------- SHIP MODE / OFFLINE DOWNLOAD ----------

const shipButton = document.getElementById("shipModeBtn");
const offlineStatus = document.getElementById("offlineStatus");
const lastUpdated = document.getElementById("lastUpdated");

if (shipButton) {

    shipButton.addEventListener("click", async () => {

        offlineStatus.innerHTML =
            "🚢 Preparing Gobble Guide for the ship...";

        try {

  const cache = await caches.open("gobble-guide-v1.0.4");

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
                basePath + "pages/slot-pull.html",
                basePath + "pages/videos.html",
                basePath + "pages/memories.html",
                basePath + "pages/merch.html",
                basePath + "images/gobble-banner.png",
                basePath + "images/kam-logo.png",
                basePath + "icons/icon-192.png",
                basePath + "icons/icon-512.png",
               basePath + "carnival-liberty-deck-plan-pdf.pdf",
                basePath + "icons/apple-touch-icon.png"
                
            ];

            offlineStatus.innerHTML =
                "🔍 Checking for the latest Gobble Guide updates...";

            let count = 0;

            for (const file of filesToDownload) {

                const response = await fetch(file, {
                    cache: "reload"
                });

                if (!response.ok) {
                    throw new Error("Could not download: " + file);
                }

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


// ---------- IPHONE INSTALL CARD ----------

function hideIphoneInstallCard() {

    const card = document.getElementById("iphoneInstallCard");

    if (card) {
        card.style.display = "none";
    }

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


// ======================================
// TODAY'S KAM FAM ACTIVITIES
// Reads directly from schedule.html
// ======================================

async function loadTodaysActivities() {

    const activityList = document.getElementById("todaysActivitiesList");
    const dateLabel = document.getElementById("todayDateLabel");

    // Only run on the Home page
    if (!activityList || !dateLabel) return;

const today = new Date();
today.setHours(0, 0, 0, 0);

    const cruiseStart = new Date(2026, 10, 21);
    const cruiseEnd = new Date(2026, 10, 29);

    dateLabel.textContent = today.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    if (today < cruiseStart) {

        activityList.textContent =
            "Your KAM Fam activities will appear here when the cruise begins on November 21!";

        return;

    }

    if (today > cruiseEnd) {

        activityList.textContent =
            "Thanks for joining us for Gobble Til You Wobble! 🦃";

        return;

    }

    try {

        // The schedule page is in the same folder as home.html.
        // This also allows the service worker to provide its cached copy offline.
        const response = await fetch("schedule.html");

        if (!response.ok) {
            throw new Error("Unable to load the schedule.");
        }

        const scheduleHTML = await response.text();

        const parser = new DOMParser();
        const scheduleDocument = parser.parseFromString(
            scheduleHTML,
            "text/html"
        );

        const eventCards = scheduleDocument.querySelectorAll(
            ".container > section.card"
        );

        const monthNames = {
            January: 0,
            February: 1,
            March: 2,
            April: 3,
            May: 4,
            June: 5,
            July: 6,
            August: 7,
            September: 8,
            October: 9,
            November: 10,
            December: 11
        };

        function getField(card, fieldName) {

            const paragraphs = card.querySelectorAll("p");

            for (const paragraph of paragraphs) {

                const strong = paragraph.querySelector("strong");

                if (
                    strong &&
                    strong.textContent.trim().toLowerCase() ===
                    fieldName.toLowerCase() + ":"
                ) {

                    return paragraph.textContent
                        .replace(strong.textContent, "")
                        .trim();

                }

            }

            return "";

        }

        const todaysEvents = [];

        eventCards.forEach(card => {

            const dateText = getField(card, "Date");

            const dateMatch = dateText.match(
                /(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})/i
            );

            // Skip events without a specific date, such as TBD.
            if (!dateMatch) return;

            const monthName = Object.keys(monthNames).find(
                name => name.toLowerCase() === dateMatch[1].toLowerCase()
            );

            if (!monthName) return;

            const eventDate = new Date(
                2026,
                monthNames[monthName],
                Number(dateMatch[2])
            );

            eventDate.setHours(0, 0, 0, 0);

            if (eventDate.getTime() === today.getTime()) {
                todaysEvents.push(card);
            }

        });

        activityList.innerHTML = "";

        if (todaysEvents.length === 0) {

            activityList.textContent =
                "No KAM Fam activities are scheduled for today. Enjoy your day! 🦃";

            return;

        }

        todaysEvents.forEach(event => {

            const eventBox = document.createElement("div");

            eventBox.style.border = "1px solid #ddd";
            eventBox.style.borderRadius = "10px";
            eventBox.style.padding = "12px";
            eventBox.style.marginBottom = "12px";

            const title = document.createElement("h3");

            title.textContent =
                event.querySelector("h2")?.textContent || "KAM Fam Event";

            eventBox.appendChild(title);

            const time = getField(event, "Time");
            const location = getField(event, "Location");
            const description = getField(event, "Description");

            if (time) {

                const timeText = document.createElement("p");
                timeText.textContent = "🕒 " + time;
                eventBox.appendChild(timeText);

            }

            if (location) {

                const locationText = document.createElement("p");
                locationText.textContent = "📍 " + location;
                eventBox.appendChild(locationText);

            }

            if (description) {

                const descriptionText = document.createElement("p");
                descriptionText.textContent = description;
                eventBox.appendChild(descriptionText);

            }

            // Preserve event detail links, such as the Slot Pull details.
            const eventLink = event.querySelector("a.btn");

            if (eventLink) {

                const link = document.createElement("a");

                link.href = eventLink.getAttribute("href");
                link.textContent = eventLink.textContent;
                link.className = "btn";

                eventBox.appendChild(link);

            }

            activityList.appendChild(eventBox);

        });

    }

    catch(error) {

        console.error("Today's Activities error:", error);

        activityList.textContent =
            "Today's activities could not be loaded. Please open the full schedule.";

    }

}


// Load today's activities when the Home page opens.
loadTodaysActivities();
