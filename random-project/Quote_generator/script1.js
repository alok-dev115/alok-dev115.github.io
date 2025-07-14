const api_url = "https://dummyjson.com/quotes/random";



async function get_quote(url) {
    const response = await fetch(url)
    let data = await response.json()

    // console.log(data);
    
}

get_quote(api_url)