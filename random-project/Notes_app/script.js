// make id for the notes-container
let notes_container = document.querySelector(".notes-container")
let delete_btn = document.querySelector(".image")

function create_notes(){
    let p = document.createElement("p");
    p.contentEditable = true;
    p.classList.add('input-box')
    // p.className = "input-box"
    notes_container.appendChild(p)
    
    let img = document.createElement("img")
    img.src = "images/delete.png"
    img.classList.add('image')
    p.appendChild(img);
    save_data()
}

notes_container.addEventListener("click", (e) => {
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove()
        save_data()
    }
    else if(e.target.tagName === "P"){
        let p = document.getElementsByClassName("input-box")
        let array = Array.from(p)
        array.forEach(e => {
            e.onkeyup = function() {
              save_data()
            }
            
        });
    }
}
)



function save_data(){
    localStorage.setItem("notes-data", notes_container.innerHTML);
}

function show_data(){
    notes_container.innerHTML = localStorage.getItem('notes-data')
}

function reset_notes(){
    localStorage.removeItem("notes-data")
    // deletes the data from the storage only 
    // it does not delete what is being displayed in browser
    // we need to reload the web browser to also delete the all the contents
    // make all the contents  = ""
    // location.reload()
    notes_container.innerHTML = ""

}
// reset_notes()

show_data()