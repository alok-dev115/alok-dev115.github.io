const btn = document.querySelector("button")
const input = document.querySelector("input")
const qr_image = document.querySelector("#qr_image")
const img_box = document.querySelector(".img-box")

function generate_qr(){
    let input_text = input.value;
    console.log(input_text)
    let api_url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input_text}`
    img_box.classList.add("show-image")
    qr_image.src = api_url;
}
