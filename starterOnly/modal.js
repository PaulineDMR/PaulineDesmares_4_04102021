function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {  
  modalbg.style.display = "block";
}

//close modal form
const closeBtn = document.querySelector(".close");

function closeModal() {
  modalbg.style.display = "none";
}

closeBtn.addEventListener('click', closeModal);

// FORM INPUTS VALIDATION

const form = document.forms['reserve'];
let err = 0;


// Check input type text, number and email
function checkInputText(inputId, regex, errMessage) {
  const elt = document.getElementById(inputId)
  let eltValue = elt.value;
  let regEx = new RegExp(regex);
  if (!regEx.test(eltValue)) {
    displayErrorMessages(elt.parentNode, errMessage);
    elt.classList.add("red-input");
  }
}

// Check radio btn Location
function checkLocation() {
  let options = document.querySelectorAll('input[name="location"]');
  let x = 0;
  for (const option of options) {
    if (option.checked) {
      break;
    } else {
      x++;
    }   
  }
  if (x === options.length) {
    displayErrorMessages(document.querySelector(".locations"), "Veuillez selectionner une ville.");
  }
}

// Check checkbox legal conditions
function checkLegal() {
  const checkbox = document.getElementById('checkbox1');
  if (!checkbox.checked) {
    displayErrorMessages(document.querySelector(".legals"), "Vous devez accepter nos conditions d'utilisation.")
  }
}

// Check all
function checkAllInputs() {
  checkInputText("first", "^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\s-]{2,99}$", "Veuillez entrer un prénom d'au moins 2 caractères.");
  checkInputText("last", "^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\s-]{2,99}$", "Veuillez entrer un nom d'au moins 2 caractères.");
  checkInputText("email", "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$", "Veuillez entrer un email valide.");
  checkInputText("quantity", "^[0-9]{1,9999}$", "Veuillez entrer un nombre entre 0 et 9999.");
  checkLocation();
  checkLegal();
}

//Display error messages
function displayErrorMessages(parent, errMessage) {
  const p = document.createElement('p');
  p.classList.add("error-message");
  p.textContent = errMessage;
  parent.append(p);
  err++;
}

// Remove error messages
function removeErrorMessages() {
  const childs = document.querySelectorAll('.error-message');
  if (childs.length > 0) {
    for (let child of childs) {
      const parent = child.parentNode;
      parent.removeChild(child);
    }
  }
  let redInputs = document.querySelectorAll('.red-input');
  if (redInputs.length > 0) {
    for (let redInput of redInputs) {
      redInput.classList.remove("red-input");
    }
  }
}
  
// Display success message
function displaySuccessMessage() {
  form.style.display = "none";
  const successMessage = document.querySelector(".success-message");
  successMessage.classList.add("success-message--visible");
}


// Check inputs when submit
form.addEventListener('submit', function(e) {
  e.preventDefault();
  err = 0;
  removeErrorMessages();
  checkAllInputs();
  if (err === 0) {
    displaySuccessMessage();
  }
});


//red btn close
const btnClose = document.querySelector(".btn-submit--close");
btnClose.addEventListener('click', closeModal);



