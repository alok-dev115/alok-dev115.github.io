const notesConatiner = document.querySelector(".notes-container")
const createBtn = document.querySelector(".btn")
let notes = document.querySelectorAll(".input-box")

function show_notes(){
    notesConatiner.innerHTML = localStorage.getItem("notes");
}


function update_storage(){
    localStorage.setItem("notes", notesConatiner.innerHTML)
}
show_notes()

createBtn.addEventListener("click", () => {
    let input_box = document.createElement('p');
    let img = document.createElement("img")
    input_box.className = "input-box"
    input_box.setAttribute("contenteditable", "true")
    img.src = "images/delete.png"

    notesConatiner.appendChild(input_box).appendChild(img);
}
)

notesConatiner.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove()
        update_storage()
    }
    else if(e.target.tagName === "P"){
        notes = document.querySelectorAll(".input-box")
        notes.forEach(nt=>{
            nt.onkeyup = function(){
                update_storage()
            }
        })
    }
})


document.addEventListener("keydown", even=>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        even.preventDefault()
    }
})
// localStorage.removeItem("notes")