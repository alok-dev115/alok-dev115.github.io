const api_url = "https://dummyjson.com/quotes/random";

const container = document.querySelector(".container")
const quote = document.querySelector(".quote")
const writer = document.querySelector(".writer")

async function get_quote(url) {
    const response = await fetch(url)
    let data = await response.json()
    // console.log(data);

    quote.innerHTML = data.quote;

    writer.innerHTML = data.author;

    // container.appendChild(div).appendChild(p) 
}

function open_tweet(){
    window.open(`https://twitter.com/intent/tweet?text=${quote.innerHTML} ---by${writer.innerHTML}`, "Tweet ur quote", "height=300, width=600")
}

get_quote(api_url)