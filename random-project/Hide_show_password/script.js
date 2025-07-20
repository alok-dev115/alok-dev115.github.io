let password = document.getElementById("password")
let icon = document.querySelector(".fa-solid")


function hide_show() {
    const pass = password.value
    let len = password.value.length

    let hide = ""


    for (let i = 0; i < len; i++) {
        hide += '*'
    }

    let arr = Array.from(icon.classList);
    if (arr.includes("fa-eye-slash")) { // or password.type === "text"
        password.type = "text"
        icon.classList.add("fa-eye")
        icon.classList.remove("fa-eye-slash")
    }
    else{
        // password.value = get_password();
        icon.classList.add("fa-eye-slash")
        icon.classList.remove("fa-eye")
        password.type = "password"

    }
}

// function get_password(){
//     return password.value
// }