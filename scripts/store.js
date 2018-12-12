// TOC
// 1. startup - self invoking
// 2. setEventListeners - handles all event listeners
// 3. handleOrder - order signup form handler
// 4. populateVeggieList - render veggie cards
// 5. handleQuantityChange - updates UI of deisred shopping cart item.
// 6. renderShoppingCartItem - updates order form quantities of veggies above form

function getArrayOfNumbers(limit) {
  return Array.from(Array(limit + 1), function(_, x) {
    return x;
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

(function startup() {
  populateVeggieList();
  setEventListeners();
})();

function setEventListeners() {
  // order form
  const form = document.getElementById("order-form");
  form.addEventListener("submit", handleOrder);

  for (let selector of document.getElementsByClassName("crop-selector")) {
    selector.addEventListener("change", handleQuantityChange);
    // TODO, how to get from storage and update shopping cart?
  }
}

// email form for consulting handling
function handleOrder(e) {
  e.preventDefault();

  const form = this;
  const itemsOrdered = [];

  for (let orderItem of document.getElementsByClassName("shopping-cart-item")) {
    itemsOrdered.push({ name: orderItem.name, value: orderItem.value });
  }

  // Prepare data to send
  let data = { itemsOrdered };
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
  xhr.setRequestHeader(
    "Access-Control-Allow-Origin",
    "https://farmily.ventures"
  );

  // Send the collected data as JSON
  xhr.send(JSON.stringify(data));

  const formResponse = document.getElementById("js-form-response");

  // Callback function
  xhr.onloadend = function(response) {
    if (response.target.status === 200) {
      // The form submission was successful
      form.reset();

      formResponse.classList.add("success");

      formResponse.innerHTML =
        "We've received your order and will reach out soon!";

      closeConsulting();
      formResponse.style = "display: none";
    } else {
      // The form submission failed
      formResponse.innerHTML =
        "Something went wrong, please email au.witherow@gmail.com if you see this and help him figure out how he messed up haha";
      formResponse.classList.add("error");
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

function populateVeggieList() {
  // TODO: switch tags from text to array of tags.
  var firstRoundVeggies = [
    {
      price: "3.00",
      title: "Tuscano Kale",
      description:
        "Also known as Dinosaur Kale, highly nutritious dark green rich tender leaves known for its extraordinary levels of <strong>antioxidants, Vitmain C and K</strong>. Known for its ability to fight cancer, lower cholestoral and reduce heart disease risk.",
      img: "./img/crops/kale.jpg",
      tags: ["smoothies", "stirfrys", "salads"],
      id: "kale",
      stocked: true
    },
    {
      price: "3.00",
      title: "Galine Heirloom Italian Eggplant",
      description:
        "Scientifically known as Solanum melongena, the Galine Italian has a rich purple black lustor, contain an impressive array of life sustaining vitmains and minerals, known for promoting gut health, bone and heart health, as well as improving brain function.",
      img: "./img/crops/eggplant.jpg",
      tags: ["stirfrys", "pastas", "roasts", "curries"],
      id: "eggplant",
      stocked: true
    },
    {
      price: "3.00",
      title: "Orange Ribbed Swiss Chard",
      description:
        "Rich orange attractive stems and savoyed leaves, Orange Ribbed Swiss Chard is known for its exceptional levels of dietary fiber, Vitamin A, K, Iron and antioxidants while defending against cancer, improving cognitive function and cleansing blood circulation.",
      img: "./img/crops/chard.jpg",
      tags: ["sauteed", "salads", "bakes", "smoothies"],
      id: "chard",
      stocked: true
    },
    {
      price: "2.50",
      title: "Astro Arugala",
      description:
        "Vibrant green leaves with a mild spice, known for its impressive vitamin and mineral spread, known for its ability to boost the immune system, slow aging, increase metabolism and general overall health from its high Vitamin A content.",
      img: "./img/crops/arugala.jpg",
      tags: ["salads", "pastas", "pizzas"],
      id: "arugala",
      stocked: true
    },
    {
      price: "3.50",
      title: "Early Wonder, Detroit Red and Touchstone Gold Beets",
      description:
        "Strikingly beautiful colors, with excellent sweet flavour, boasting a variety of vitamins and minerals that work in combination to prevent heart disease and cancer, promote DNA healing, as well as regulate heart rate and metabolism.",
      img: "./img/crops/beets.jpg",
      tags: ["salads", "juices", "smoothies"],
      id: "beets",
      stocked: true
    },
    {
      price: "2.50",
      title: "Acadia Spinach",
      description:
        "These beautiful, dark, glossy oval shaped leaves are high in Vitamins A, C, K1, B-6, B-9, folic acid, iron, calcium and more. These empower you to slow aging, reduce the risk of cancer, improve eye health, regulate blood pressure and promote heart health.",
      img: "./img/crops/spinach.jpg",
      tags: ["pizzas", "omelettes", "smoothies", "juices", "salads"],
      id: "spinach",
      stocked: true
    },
    {
      price: "3.00",
      title: "Flash Collard Greens",
      description:
        "These dark green smooth leaves rich in phyto-nutrients that combat various types of cancer, natural anti-bacterial and anti-virual properties, packed with Vitamin C, A, K, B-3, B-5, and riboflavin, and boast a an impressive essential minerals profile.",
      img: "./img/crops/collard.jpg",
      tags: ["steamed", "sauteed", "stews"],
      id: "collards",
      stocked: true
    },
    {
      price: "3.50",
      title: "Easter Egg Radish",
      description:
        "This beautiful multicolor mix are crisp and mild, packed with Vitamins A, C, potassium, zinc and dietary fiber. They also contain enzymes such as myrosinase, diastase, esterases, and amylase which have anti-fungal properties and are known to promote digestive health.",
      img: "./img/crops/radish.jpg",
      tags: ["salads", "stews", "roasts", "pickled"],
      id: "radish",
      stocked: true
    },
    {
      price: "2.50",
      title: "Sylvestia Lettuce",
      description:
        "These thick flavorful leaves boast impressive health benefits, including being an anti-inflammitory agent, protector of neuronal cells, cholestoral fighter, sleep aid, cancer fighter, anxiety controller and anti-microbial defenses.",
      img: "./img/crops/lettuce.jpg",
      tags: ["sandwiches", "salads", "juices"],
      id: "lettuce",
      stocked: true
    }
  ];

  var futureRounds = [
    {
      price: "1.50",
      title: "Hawaiian Lilikoi (Passionfruit)",
      description:
        "These delicious fruits native to Hawaii are packed with an extremely impressive array of vitamins and minerals critical for a healthy existence. Boosting immunity, preventing cancer, aiding digestion, reducing blood pressure and more, Lilikoi are the perfect treat.",
      img: "./img/crops/lilikoi.jpg",
      tags: ["desserts", "punches", "juices", "smoothies", "drinks"],
      id: "",
      stocked: false
    },
    {
      price: "5.00",
      title: "Kamiya Laie Gold Papaya",
      description:
        "A delicious gift to the world, the Kamiya Laie Gold Papaya will leave you glowing with its high dietary fiber content, immune boosting and anti-inflammitory agents, anti aging and skin care nutrients, as well as overall bodily fluid hardiness and health. The seeds are also endowed with magical properties.",
      img: "./img/crops/papaya.jpg",
      tags: ["desserts", "salads", "juices", "smoothies"],
      id: "",
      stocked: false
    },
    {
      price: "0.00",
      title: "Your Dream Item",
      description:
        "North Shore Agricultural Lands of Oahu are especially fertile. We are interested in cultivating fast growing crops that thrive in Hardiness Zone 12B, or transplantable fruit trees 1-3 years in age. Let us know if you have ideas!",
      img: "./img/crops/dream.jpg",
      tags: ["anything"],
      id: "",
      stocked: false
    }
  ];

  var firstRoundCards = document.getElementById("firstRoundCards");
  var futureRoundCards = document.getElementById("futureRoundCards");

  var cropCardsMap = {
    firstRoundCards: firstRoundVeggies,
    futureRoundCards: futureRounds
  };

  var cardContainers = [firstRoundCards, futureRoundCards];

  cardContainers.map(function(container) {
    cropCardsMap[container.id].map(function(crop) {
      var tags =
        "<ul class='tag-list'>" +
        crop["tags"].map(function(tag) {
          var cname = tag.replace(" ", "-");
          return "<li class='tag " + cname + "'>" + tag + "</li>";
        }) +
        "</ul>";

      tags = tags.replace(/,/g, "");

      var numberList = getArrayOfNumbers(50);

      var quantity = crop.stocked
        ? "<select class='crop-selector' name=" +
          crop.id +
          ">" +
          numberList.map(function(x) {
            return "<option value=" + x + ">" + x + "</option>";
          }) +
          "</select> at "
        : "";

      container.innerHTML +=
        "<div class='card'><div class='price-tag'>" +
        quantity +
        " $" +
        crop["price"] +
        "<small>/pound</small></div><img src='" +
        crop["img"] +
        "'/><div class='inner'><h5>" +
        crop["title"] +
        "</h5><p>" +
        crop["description"] +
        tags +
        "</div></div>";
    });
  });
}

function handleQuantityChange() {
  var itemChanged = this.name;
  var newQuantity = this.value;

  var followALongCheckout = document.getElementById("follow-cart-container");

  if (!followALongCheckout.classList.contains("shown")) {
    followALongCheckout.classList.add("bounceIn", "shown");
  }

  renderShoppingCartItem(itemChanged, newQuantity);

  var shoppingCartList = document.getElementById("shopping-cart");
  var shoppingCartCount = document.getElementById("shopping-cart-count");
  shoppingCartCount.innerText = shoppingCartList.getElementsByTagName(
    "li"
  ).length;

  for (let selector of document.getElementsByClassName("crop-selector")) {
    if (itemChanged === selector.name && newQuantity != selector.value) {
      selector.value = newQuantity;
    }
  }
}

function renderShoppingCartItem(item, quantity) {
  var li = document.getElementById("cart-item-" + item);

  var shoppingCart = document.getElementById("shopping-cart");

  var numberList = getArrayOfNumbers(50);

  var selected = function(x) {
    return x === parseInt(quantity) ? "selected" : "";
  };

  var id = "cart-item-" + item;

  var quantitySelector =
    "<select id='" +
    id +
    "' class='shopping-cart-item' name='" +
    item +
    "'>" +
    numberList.map(function(x) {
      return "<option value='" + x + "'" + selected(x) + ">" + x + "</option>";
    }) +
    "</select> - " +
    capitalizeFirstLetter(item);

  if (li) {
    li.innerHTML = quantitySelector;
  } else {
    shoppingCart.innerHTML += "<li>" + quantitySelector + "</li>";

    document
      .getElementById(id)
      .addEventListener("change", handleQuantityChange);
  }
}
