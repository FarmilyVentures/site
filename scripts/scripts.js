// scripts.js
// table of contents
// -------
// global variables
// 0. event listeners
// 1. mobile menu handler
// 2. scroll enablers and disablers
// 3. consultingPopup opener

(function runStartupShit() {
  spawnEventListeners();
  // loadVeggieTicker();
})();

//
//
//
// 0. event listeners
function spawnEventListeners() {
  var h = document.getElementById("hamburger");
  h.addEventListener("click", openMenu);

  // mobile menu event listeners
  // includes closeButton and all links that are clickable
  var c = document.getElementById("mobileMenu").childNodes || [];
  // TODO: get fancy and add an array 1-11, odd only numbers to show off to people snooping code.
  var n = [c[1], c[3], c[5], c[7]];

  for (var i = 0; i < n.length; i++) {
    n[i].addEventListener("click", closeMenu);
  }

  // consulting buttons scattered throughout the page.
  var cBs = document.getElementsByClassName("consultingButton");
  for (var i = 0; i < cBs.length; i++) {
    cBs[i].addEventListener("click", openConsulting);
  }

  // close popup window
  var ccB = document.getElementById("closeConsulting");
  ccB.addEventListener("click", closeConsulting);
  console.log("closeConsultingButton on standby.");

  const form = document.getElementById("consulting-form");
  form.addEventListener("submit", handleForm);
}

//
//
//
// 1. mobile menu handlers
function openMenu() {
  disableScroll();
  var mobileMenu = document.getElementById("mobileMenu");
  mobileMenu.classList.add("bounceIn", "shown");
}

function closeMenu() {
  enableScroll();
  var mobileMenu = document.getElementById("mobileMenu");
  mobileMenu.classList.add("fadeOut");
  setTimeout(function() {
    mobileMenu.classList.remove("shown", "bounceIn", "fadeOut");
  }, 500);
}

//
//
//
// 2. scroll enable/disable
function disableScroll() {
  document.getElementsByTagName("body")[0].classList.add("noScroll");
}

function enableScroll() {
  document.getElementsByTagName("body")[0].classList.remove("noScroll");
}

//
//
//
// 3. consulting window popup
function openConsulting() {
  var key; // get this.data attribute of button used
  disableScroll();
  var consultingPopup = document.getElementById("consultingPopup");
  consultingPopup.classList.add("bounceIn", "shown");
}

function closeConsulting() {
  enableScroll();
  console.log("closing consultingPopup");
  var consultingPopup = document.getElementById("consultingPopup");
  consultingPopup.classList.add("fadeOut");
  setTimeout(function() {
    consultingPopup.classList.remove("shown", "bounceIn", "fadeOut");
  }, 500);
}

// email form for consulting handling
function handleForm(e) {
  e.preventDefault();

  const form = this;

  // Prepare data to send
  let data = {};
  const formElements = Array.from(form);

  formElements.map(function(input) {
    data[input.name] = input.value;
  });

  data = removeEmpties(data);

  if (document.getElementById("honeypot").value) {
    window.location = "https://www.youtube.com/watch?v=QH2-TGUlwu4";
  }

  // Log what our lambda function will receive
  console.log(JSON.stringify(data));

  // Construct an HTTP request
  var xhr = new XMLHttpRequest();
  xhr.open(form.method, form.action, true);
  xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  // Send the collected data as JSON
  xhr.send(JSON.stringify(data));

  const formResponse = document.getElementById("js-form-response");

  // Callback function
  xhr.onloadend = function(response) {
    if (response.target.status === 200) {
      // The form submission was successful
      form.reset();

      formResponse.innerHTML =
        "Thanks for the message. I’ll be in touch shortly.";

      closeConsulting();
      formResponse.style = "display: none";
    } else {
      // The form submission failed
      formResponse.innerHTML = "Something went wrong";
      console.error(JSON.parse(response.target.response).message);
    }
  };
}

// remove empty key/value pairs from objects
function removeEmpties(obj) {
  var newObj = {};
  Object.keys(obj).forEach(function(prop) {
    if (obj[prop]) {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
}

function loadVeggieTicker() {
  var veggies = getVeggies(true);
  var tickerContainer = document.getElementById("veggie-ticker");

  veggies
    .filter(function(veggie) {
      return veggie.stocked;
    })
    .map(function(veggie) {
      console.log(veggie);
      tickerContainer.innerHTML +=
        "<a href='https://hawaii.localorbit.com/sellers/29420#supplierCatalog' class='ticker-card' style='background: url(img/crops/" +
        veggie.id +
        ".jpg); -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;'><h3>" +
        veggie.title +
        "</h3></a>";
    });
}
