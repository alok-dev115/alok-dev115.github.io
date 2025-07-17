let progress = document.getElementById("progress")
let song = document.getElementById("song")
let ctrl_icon = document.getElementById("ctrl-icon")
let pause_ = document.querySelector(".pause")
let play_ = document.querySelector(".play")
// play_.remove()

song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;

}


function play_pause(){
    if(ctrl_icon.classList.contains("pause")){
        song.pause();
        pause_.src = "images/play.png"
        pause_.classList.remove("pause")
        // ctrl_icon.classList.remove("fa-pause")
        // ctrl_icon.classList.add("fa-play")
    }
    else{
        song.play()
        pause_.src = "images/pause.png"
        pause_.classList.add("pause")
        // ctrl_icon.classList.add("fa-pause")
        // ctrl_icon.classList.remove("fa-play")
    }
}

if(song.play()){
    setInterval(() => {
        progress.value = song.currentTime
    }, 500);
}

progress.onchange = function(){
    song.play();
    song.currentTime = progress.value
    // pause_.classList.add("pause")
    // pause_.classList.remove("play")

}