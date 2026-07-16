const themeVideoLink = "https://www.youtube.com/embed/W-jb4GxRmuQ";


document
.getElementById("themeButton")
.addEventListener("click", function(){

    const videoSection = document.getElementById("themeVideo");
    const videoFrame = document.getElementById("youtubeVideo");

    videoFrame.src = themeVideoLink + "?autoplay=1";

    videoSection.style.display = "block";

    this.style.display = "none";

});


document
.getElementById("enterButton")
.addEventListener("click", function(){

    window.location.href = "pages/home.html";

});
