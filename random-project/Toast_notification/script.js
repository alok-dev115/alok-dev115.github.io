let toast_box = document.getElementById("toast-box")
let success_message = `<img src="images/check_circle.png" style="width: 30px">Successfully submitted`;
let error_message = `<img src="images/cancel.png" style="width: 30px">Please fix the error!`;
let invalid_message = `<img src="images/exclamation.png" style="width: 30px">Invalid input, check again`;



function show_toast(msg) {
    let toast = document.createElement("div")
    toast.classList.add("toast")
    toast.innerHTML = msg;
    toast_box.appendChild(toast)
    if(msg.includes('error')){
        toast.classList.add("error")
    }
    if(msg.includes('Invalid')){
        toast.classList.add("invalid")
    }
    setTimeout(() => {
        toast.remove()
    }, 5000);

}