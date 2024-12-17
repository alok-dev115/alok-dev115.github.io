let cont_body = document.body.children;

let cont = cont_body[0].children;


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];// Math.floor(Math.random() * 16) generates a random number b/w 0-15
    }
    return color;
  }

for (let x of cont){
    x.style.backgroundColor = getRandomColor()
}
