const inputslider=document.querySelector("[data-length-slider]")
const lengthDisplay=document.querySelector("[data-lengthnumber]")
const passwordDisplay=document.querySelector("[displaypass]")
const copybtn=document.querySelector("[data-copybtn]")
const copymsg=document.querySelector("[data-copymsg]")
const uppercasecheck=document.querySelector("#uppercase")
const lowercasecheck=document.querySelector("#lowercase")
const numberscheck=document.querySelector("#numbers")
const symbolscheck=document.querySelector("#symbols")
const indicator=document.querySelector("[data-indicator]")
const generatebtn=document.querySelector(".generate-button")
const allcheckbox=document.querySelectorAll("input[type=checkbox")


let password="";
let passwordlength=15
let checkcount=1;
//strength to grey

handleslider();

function handleslider()
{
    inputslider.value=passwordlength
    lengthDisplay.innerText=passwordlength
}


function setindicator(color)
{
indicator.style.backgroundColor=color
}


function getrndinteger(min,max)
{
 return Mathfloor(Math.random()*(max-min))+min
}

function getrandomnumber()
{
    return getrndinteger(0,9)
}

function generatelowercase()
{
    return String.fromCharCode(getrndinteger(97,123))
}


function generateuppercase()
{
    return String.fromCharCode(getrndinteger(65,91))
}

function randsymbol()
{
  const randnum=getrndinteger(0,symbols.length)
  return symbols.charAt[randnum]
}


