let btn = document.getElementById("btn")
let icon = document.querySelector(".fa-solid")


btn.addEventListener("mousedown", () => {
    btn.style.transform = 'scale(0.9)'
})
btn.addEventListener("mouseup", () => {
    btn.style.transform = 'scale(1.2)'
})
btn.addEventListener("mouseenter", () => {
    btn.style.transform = 'scale(1.2)'
})
btn.addEventListener("mouseleave", () => {
    btn.style.transform = 'scale(1)'
})



function switch_modes(){
    document.body.classList.toggle("dark-theme")
    let arr  = Array.from(icon.classList);
    if(arr.includes("fa-circle-half-stroke")){
        icon.classList.add("fa-moon");
        icon.classList.remove("fa-circle-half-stroke");
    }
    else{
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-circle-half-stroke");

    }
}
