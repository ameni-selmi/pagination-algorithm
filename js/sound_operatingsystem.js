var sound_op = document.getElementById("mySound_op");

function soundon_op() {
    var off = document.getElementById("imgsoundoff_op");
    off.style.visibility = "visible";
    var on = document.getElementById("imgsoundon_op");
    on.style.visibility = "hidden";

    sound_op.play();

}

function soundoff_op() {

    var off = document.getElementById("imgsoundoff_op");
    off.style.visibility = "hidden";
    var on = document.getElementById("imgsoundon_op");
    on.style.visibility = "visible";

    sound_op.pause();
    sound_op.currentTime = 0;
}