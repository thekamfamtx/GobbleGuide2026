const sailDate = new Date("November 21, 2026 15:00:00");

function updateCountdown(){

    const today = new Date();

    const difference = sailDate - today;

    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

    document.getElementById("countdown").innerHTML =
        "🦃 " + days + " Days Until We Sail!";

}

updateCountdown();

setInterval(updateCountdown,60000);
