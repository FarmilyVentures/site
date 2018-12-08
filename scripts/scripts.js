// scripts.js
// table of contents
// -------
// global variables
// 0. event listeners
// 1. mobile menu handler
// 2. scroll enablers and disablers
// 3. consultingPopup opener

(function runStartupShit() {
  //setMissionImage(); // TODO: do not run on all pages, need to modularize JS!
  populateVeggieList();
})();

//
//
//
// 0. event listeners
(function spawnEventListeners() {
  var h = document.getElementById("hamburger");
  h.addEventListener("click", openMenu);

  // mobile menu event listeners
  // includes closeButton and all links that are clickable
  var c = document.getElementById("mobileMenu").childNodes;
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
})();

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

function setMissionImage() {
  var images = [
    {
      num: 1,
      caption: "beets and beards"
    },

    {
      num: 2,
      caption: "kaipo cuddles"
    },

    {
      num: 3,
      caption: "sexy kale"
    },
    {
      num: 4,
      caption: "sean the man with a plan"
    },
    {
      num: 5,
      caption: "naps and hydration lead to enlightenment"
    },
    {
      num: 6,
      caption: "harvest time!"
    }
  ];

  var placeholder = document.getElementById("missionImg");
  var caption = document.getElementById("missionCaption");
  var imagesAvailable = images.length; // can we programatically do this via "img/slides" folder?
  var rand = Math.floor(Math.random() * imagesAvailable) + 1;
  placeholder.src = "./img/slides/" + rand + ".jpeg";
  caption.innerHTML = images[rand - 1].caption;
}

function populateVeggieList() {
  var fancyPhrases = ["Goes well in", "Delicious in your", "Add it to your"];
  var firstRoundVeggies = [
    {
      title: "Tuscano Kale",
      description:
        "Also known as Dinosaur Kale, highly nutritious dark green rich tender leaves known for its extraordinary levels of <strong>antioxidants, Vitmain C and K</strong>. Known for its ability to fight cancer, lower cholestoral and reduce heart disease risk.",
      img: "./img/crops/kale.jpg",
      uses: "smoothies, stir fry, and salads."
    },
    {
      title: "Galine Heirloom Italian Eggplant",
      description:
        "Scientifically known as Solanum melongena, the Galine Italian has a rich purple black lustor, contain an impressive array of life sustaining vitmains and minerals, known for promoting gut health, bone and heart health, as well as improving brain function.",
      img: "./img/crops/eggplant.jpg",
      uses: "stir fry, pasta, roasting, and curries"
    }
  ];

  var secondRoundVeggies = [
    {
      title: "Astro Arugala",
      description:
        "Vibrant green leaves with a mild spice, known for its impressive vitamin and mineral spread, known for its ability to boost the immune system, slow aging, increase metabolism and general overall health from its high Vitamin A content.",
      img: "./img/crops/arugala.jpg",
      uses: ""
    },
    {
      title: "Early Wonder, Detroit Red and Touchstone Gold Beets",
      description:
        "Strikingly beautiful colors, with excellent sweet flavour, boasting a variety of vitamins and minerals that work in combination to prevent heart disease and cancer, promote DNA healing, as well as regulate heart rate and metabolism.",
      img: "./img/crops/beets.jpg",
      uses: ""
    }
  ];

  var thirdRoundVeggies = [
    {
      title: "Orange Ribbed Swiss Chard",
      description:
        "Rich orange attractive stems and savoyed leaves, Orange Ribbed Swiss Chard is known for its exceptional levels of dietary fiber, Vitamin A, K, Iron and antioxidants while defending against cancer, improving cognitive function and cleansing blood circulation.",
      img: "./img/crops/chard.jpg",
      uses: ""
    },
    {
      title: "Flash Collard Greens",
      description: "",
      img: "./img/crops/collards.jpg",
      uses: ""
    },
    {
      title: "Sylvestia Lettuce",
      description: "",
      img: "./img/crops/lettuce.jpg",
      uses: ""
    },
    {
      title: "Acadia Spinach",
      description: "",
      img: "./img/crops/spinach.jpg",
      uses: ""
    },
    {
      title: "Easter Egg Radish",
      description: "",
      img: "./img/crops/radish.jpg",
      uses: ""
    },
    {
      title: "Hawaiian Lilikoi (Passionfruit)",
      description: "",
      img: "./img/crops/lilikoi.jpg",
      uses: ""
    },
    {
      title: "Golden Sunrise Papaya",
      description: "",
      img: "./img/crops/papaya.jpg",
      uses: ""
    }
  ];

  var firstRoundCards = document.getElementById("firstRoundCards");
  var secondRoundCards = document.getElementById("secondRoundCards");
  var thirdRoundCards = document.getElementById("thirdRoundCards");

  var cropCardsMap = {
    firstRoundCards: firstRoundVeggies,
    secondRoundCards: secondRoundVeggies,
    thirdRoundCards: thirdRoundVeggies
  };

  var cardContainers = [firstRoundCards, secondRoundCards, thirdRoundCards];

  cardContainers.map(function(container) {
    console.log(container.id);
    var crops = cropCardsMap[container.id];
    console.log(crops);
  });
}
