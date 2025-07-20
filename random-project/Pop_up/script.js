let pop_up = document.getElementById("pop-up")


function open_pop_up(){
    pop_up.style.visibility = 'visible'
    pop_up.classList.add("open-pop-up")
    // pop_up.classList.remove("close-pop-up")
}

function close_pop_up(){
    // the following line with the setTimeout makes the transition go again to scale(0), top: 0
    // so it's not necessary to add .clos-pop-up 
    // try executing with no setTimeout function 
    pop_up.classList.remove("open-pop-up")
    // pop_up.classList.add("close-pop-up")
    setTimeout(() => {
        pop_up.style.visibility = 'hidden';
    }, 400);
    // let close_ = document.querySelector(".close-pop-up");
    // if(close_.style.visibility == 'visible'){
    //     close_.style.visibility = 'hidden'
    // }


    // just make scale(0) then no need to add setTimeout and visibility
}