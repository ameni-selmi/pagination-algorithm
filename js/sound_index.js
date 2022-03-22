var sound = document.getElementById("mySound");

function soundon() {
    var off = document.getElementById("imgsoundoff");
    off.style.visibility = "visible";
    var on = document.getElementById("imgsoundon");
    on.style.visibility = "hidden";

    sound.play();

}

function soundoff() {

    var off = document.getElementById("imgsoundoff");
    off.style.visibility = "hidden";
    var on = document.getElementById("imgsoundon");
    on.style.visibility = "visible";

    sound.pause();
    sound.currentTime = 0;
}