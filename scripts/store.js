(function runStartupShit() {
  populateVeggieList();
})();

function populateVeggieList() {
  var fancyPhrases = ["Goes well in", "Delicious in your", "Add it to your"];
  var fancyPhrase =
    fancyPhrases[Math.floor(Math.random() * fancyPhrases.length)];

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
      img: "./img/crops/collard.jpg",
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
      title: "Kamiya Laie Gold Papaya",
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
    cropCardsMap[container.id].map(function(crop) {
      container.innerHTML +=
        "<div class='card'><img src='" +
        crop["img"] +
        "'/><div class='inner'><h5>" +
        crop["title"] +
        "</h5><p>" +
        crop["description"] +
        "<p><small>" +
        fancyPhrase +
        " " +
        crop["uses"] +
        "</small></p></div></div>";
    });
  });
}
