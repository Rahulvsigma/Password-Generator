




const inputslider = document.querySelector("[data-length-slider]");
const lengthDisplay = document.querySelector("[data-lengthnumber]");
const passwordDisplay = document.querySelector("[displaypass]");
const copybtn = document.querySelector("[data-copybtn]");
const copymsg = document.querySelector("[data-copymsg]");
const uppercasecheck = document.querySelector("#uppercase");
const lowercasecheck = document.querySelector("#lowercase");
const numberscheck = document.querySelector("#numbers");
const symbolscheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generatebtn = document.querySelector(".generate-button");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");

let password = "";
let passwordlength = 15;
let checkcount = 1;

handleslider();
setindicator("#ccc");

function handleslider() {
  inputslider.value = passwordlength;
  lengthDisplay.innerText = passwordlength;
  const min=inputslider.min;
  const max=inputslider.max;
  inputslider.style.backgroundSize=((passwordlength-min)*100/(max-min))+"% 100%"
}

function setindicator(color) {
  indicator.style.backgroundColor = color;
}

function getrndinteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getrandomnumber() {
  return getrndinteger(0, 9);
}

function generatelowercase() {
  return String.fromCharCode(getrndinteger(97, 123));
}

function generateuppercase() {
  return String.fromCharCode(getrndinteger(65, 91));
}

function randsymbol() {
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
  const randnum = getrndinteger(0, symbols.length);
  return symbols[randnum];
}

function calcstrength() {
  let hasUpper = false;
  let haslower = false;
  let hasNum = false;
  let hassym = false;
  if (uppercasecheck.checked) hasUpper = true;
  if (lowercasecheck.checked) haslower = true;
  if (numberscheck.checked) hasNum = true;
  if (symbolscheck.checked) hassym = true;

  if (hasUpper && haslower && (hasNum || hassym) && passwordlength >= 8) {
    setindicator("#0f0");
  } else if ((haslower || hasUpper) && (hasNum || hassym) && passwordlength >= 6) {
    setindicator("#ff0");
  } else {
    setindicator("#f00");
  }
}

async function copycontent() {
  try {
    await navigator.clipboard.writeText(password);
    copymsg.innerText = "copied";
  } catch (e) {
    copymsg.innerText = "Failed";
  }

  setTimeout(() => {
    copymsg.classList.remove("active");
  }, 2000);
}

function shufflepassword(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

function handlecheckcount() {
  checkcount = 0;
  allcheckbox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkcount++;
    }
  });
  if (passwordlength < checkcount) {
    passwordlength = checkcount;
    handleslider();
  }
}

allcheckbox.forEach((checkbox) => {
  checkbox.addEventListener("change", handlecheckcount);
});

inputslider.addEventListener("input", (e) => {
  passwordlength = e.target.value;
  handleslider();
});

copybtn.addEventListener("click", () => {
  if (passwordDisplay) copycontent();
});

generatebtn.addEventListener("click", () => {
  if (checkcount <= 0) return;

  if (passwordlength < checkcount) {
    passwordlength = checkcount;
    handleslider();
  }

  password = "";

  let funcarr = [];

  if (uppercasecheck.checked) funcarr.push(generateuppercase);

  if (lowercasecheck.checked) funcarr.push(generatelowercase);

  if (numberscheck.checked) funcarr.push(getrandomnumber);

  if (symbolscheck.checked) funcarr.push(randsymbol);

  for (let i = 0; i < funcarr.length; i++) {
    password += funcarr[i]();
  }

  for (let i = 0; i < passwordlength - funcarr.length; i++) {
    let randindex = getrndinteger(0, funcarr.length);
    password += funcarr[randindex]();
  }

  password = shufflepassword(Array.from(password));

  passwordDisplay.value = password;

  calcstrength();
});


