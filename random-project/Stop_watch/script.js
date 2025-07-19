let hour = document.getElementById("hour")
let minute = document.getElementById("min")
let second = document.getElementById("sec")

let start = document.getElementById("start")
let reset = document.getElementById("reset")
let stop = document.getElementById("stop")

let hr = 0;
let min = 0;
let sec = 0;


function reset_() {
    hr *= 0;
    min *= 0;
    sec *= 0;
}

function start_() {
    intervalId = setInterval(() => {
        sec++;
        if (sec === 60) {
            min++;
            sec = 0;
        }
        if (min === 60) {
            hr++;
            min = 0
        }
        document.querySelector("h1").innerHTML = `${hr}:${min}:${sec}`;

    }, 1000);

}


let time = new Date();

