//constant global variables
const DEFAULT_COLOR = '#222222'
const DEFAULT_MODE = 'color'

const DEFAULT_SIZE = 16

//global variables
let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

//mouse variable to be able to paint while dragging
let mouseDown = false;


document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//DOM Elements
const colorInput = document.querySelector('.colors');
const sizeInput = document.getElementById('size-input');
const selectedColor = document.getElementById('selectedColor');
const blackButton = document.getElementById('blackButton');
const eraseButton = document.getElementById('eraseButton');
const grayButton = document.getElementById('grayButton');
const randomButton = document.getElementById('randomButton');
const resetButton = document.getElementById('resetButton');

colorInput.style.backgroundColor = '#ededed'



//function to set new color
function setCurrentColor(newColor) {
    currentColor = newColor;
  }

  //function to set new mode
  function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode;
  }


//Color input default color
colorInput.value = currentColor;

colorInput.oninput = (e) => setCurrentColor(e.target.value),

selectedColor.onclick = () => setCurrentMode('color')
blackButton.onclick = () => setCurrentMode('black')
eraseButton.onclick = () => setCurrentMode('erase')
grayButton.onclick = () => setCurrentMode('gray')
randomButton.onclick = () => setCurrentMode('random')
resetButton.onclick = () => resetTable();



function setCurrentColor(newColor) {
    currentColor = newColor
  }

  function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
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
        sizeInput.value = DEFAULT_SIZE;
    }
    else
    {
        console.log("Error, too many squares");
    }
}

function colorSquare(e){

    if(e.type === 'mouseover' && !mouseDown) return
        if(currentMode === 'random')
        {
            e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }
        else if(currentMode === 'color')
        {
            e.target.style.backgroundColor = currentColor;
        }
        else if(currentMode === 'black')
        {
            
            e.target.style.backgroundColor = '#000000';
        }
        else if(currentMode === 'erase')
        {
            e.target.style.backgroundColor = '#ffffff';
        }
        else if(currentMode === 'gray')
        {
            e.target.style.backgroundColor = '#808080';
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

//function to give and remove 'active' class to buttons for UX
function activateButton(newMode) {
    if (currentMode === 'random') 
    {
      randomButton.classList.remove('button-85')

    }
    else if (currentMode === 'color')
    {
      selectedColor.classList.remove('active')

    } 
    else if (currentMode === 'erase')
    {
      eraseButton.classList.remove('active')
      
    }
    else if (currentMode === 'black')
    {
        blackButton.classList.remove('active')
    }
    else if (currentMode === 'gray')
    {
        grayButton.classList.remove('active')
    }
  
    if (newMode === 'random')
    {
      randomButton.classList.add('button-85')

    }
    else if (newMode === 'color')
    {
      selectedColor.classList.add('active')

    } 
    else if (newMode === 'erase')
    {
      eraseButton.classList.add('active')
    }
    else if (newMode === 'black')
    {
      blackButton.classList.add('active')
    }
    else if (newMode === 'gray')
    {
      grayButton.classList.add('active')
    }
  }

function inputChange(){
    
    color = colorInput.value
}


window.onload = () => {
    populateTable(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
  }