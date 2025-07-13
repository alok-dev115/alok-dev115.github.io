let input_container = document.querySelector(".input-container")
let date_input = document.querySelector("input")


function calculate_age() {
    let date = date_input.value;
    let date_array = date.split("-")
    let current_date = new Date()

    let year = current_date.getFullYear() - parseInt(date_array[0])
    let month = Math.abs(current_date.getMonth() - parseInt(date_array[1]))
    let day = Math.abs(current_date.getDate() - parseInt(date_array[2]))

    let years = document.getElementById("years")
    let months = document.getElementById("months")
    let days = document.getElementById("days")

    let p = document.createElement('p')
    p.innerHTML = `You are ${years} years, ${months} months and ${days} days old`;
    container.appendChild(p);

}
calculate_age()






