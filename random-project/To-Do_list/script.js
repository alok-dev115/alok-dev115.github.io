const input_box = document.getElementById("input-box");
const list_container = document.getElementById("list-container");

function add_task(){
    if(input_box.value === '')
        alert("You must write something before adding");
    else{
        let li = document.createElement("li");
        li.innerHTML = input_box.value;
        list_container.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = '\u00d7';
        li.appendChild(span)
        
    }
    input_box.value = '';
    save_data();
}

list_container.addEventListener('click', function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        save_data();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        save_data();
    }
}, false)

// saving data in our browser
function save_data(){
    localStorage.setItem("data", list_container.innerHTML);

}
// diplaying our data whenever we reopen the website

function show_task(){
    list_container.innerHTML = localStorage.getItem("data");
}

// is called outside of other functions and not like save_data() 
// becoz we also want it to show our tasks when we open 
// out web-browser again
show_task()