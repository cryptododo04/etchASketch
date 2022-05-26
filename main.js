//constant global variables
const DEFAULT_COLOR = '#222222'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

//global variables
let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE


//mouse variable to be able to paint while dragging
let mouseDown = false

document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

//DOM Elements
const colorInput = document.querySelector('.colors')



//Color input default color
colorInput.value = currentColor

colorInput.oninput = (e) => setCurrentColor(e.target.value)



function setCurrentColor(newColor) {
    currentColor = newColor
  }

  


//create table of divs to paint
function populateTable(size){

    let table = document.querySelector('.table');

    let squares = table.querySelectorAll("div");

    squares.forEach((div) => div.remove());

    table.style.gridTemplateColumns = `repeat(${size} , 1fr)`;

    table.style.griTemplateRows = `repeat(${size} , 1fr)`;


    let amount = size * size
    for (let i = 0; i < amount; i++){
            
            let square = document.createElement('div');

            square.addEventListener('mouseover', colorSquare)
            
            square.addEventListener('mousedown', colorSquare)

            square.classList.add('Square-element')

            square.addEventListener('dragstart', (e) => {
                e.preventDefault()
              })
              
              square.addEventListener('drop', (e) => {
                e.preventDefault()
              })

            square.style.backgroundColor = 'white';

            table.insertAdjacentElement("beforeend", square);

    }

}


function changeSize(input){

    if(input >= 2 && input <= 100)
    {
        populateTable(input);    
    }
    else if(input < 2)
    {
        alert("Error, not enough squares");
    }
    else
    {
        console.log("Error, too many squares");
    }
}

function colorSquare(e){

    if(e.type === 'mouseover' && !mouseDown) return
        if(currentColor === 'random')
        {
            e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }
        else
        {
            e.target.style.backgroundColor = currentColor;
        }
    }

//function to change colors
function changeColor(choice){
    currentColor = choice;
}

//function to reset table
function resetTable(){

    let table = document.querySelector('.table');

    let squares = table.querySelectorAll("div");

    squares.forEach((div) => div.style.backgroundColor = "white");

}


function inputChange(){
    
    let colorInput = document.querySelector('.colors')

    color = colorInput.value

    console.log(color)
    console.log(colorInput.value)
}


window.onload = () => {
    populateTable(DEFAULT_SIZE)
  }