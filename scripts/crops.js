function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getVeggies(rand) {
  const veggies = [
    {
      price: "3.00",
      title: "Kale",
      description:
        "Also known as Dinosaur Kale, highly nutritious dark green rich tender leaves known for its extraordinary levels of <strong>antioxidants, Vitmain C and K</strong>, as well as its ability to fight cancer, lower cholestoral and reduce heart disease risk.",
      img: "./img/crops/kale.jpg",
      tags: ["smoothies", "stirfrys", "salads"],
      id: "kale",
      stocked: true,
      limited: false,
      measurement: "bunch",
    },
    {
      price: "3.00",
      title: "Eggplant",
      description:
        "Scientifically known as Solanum melongena, the Galine Italian has a rich purple black lustor, containing an impressive array of life sustaining vitmains and minerals, known for promoting gut health, bone and heart health, as well as improving brain function.",
      img: "./img/crops/eggplant.jpg",
      tags: ["stirfrys", "pastas", "roasts", "curries"],
      id: "eggplant",
      stocked: false,
      limited: false,
      measurement: "bunch",
    },
    {
      price: "3.00",
      title: "Swiss Chard",
      description:
        "Rich orange attractive stems and savoyed leaves, Orange Ribbed Swiss Chard is known for its exceptional levels of dietary fiber, Vitamin A, K, Iron and antioxidants while defending against cancer, improving cognitive function and cleansing blood circulation.",
      img: "./img/crops/chard.jpg",
      tags: ["sauteed", "salads", "bakes", "smoothies"],
      id: "chard",
      stocked: true,
      limited: false,
      measurement: "bunch",
    },
    {
      price: "2.50",
      title: "Arugala",
      description:
        "Vibrant green leaves with a mild spice, known for its impressive vitamin and mineral spread, known for its ability to boost the immune system, slow aging, increase metabolism and general overall health from its high Vitamin A content.",
      img: "./img/crops/arugala.jpg",
      tags: ["salads", "pastas", "pizzas"],
      id: "arugala",
      stocked: true,
      limited: false,
      measurement: "bunch",
    },
    {
      price: "3.00",
      title: "Red Beets",
      description:
        "Strikingly beautiful colors, with excellent sweet flavour, boasting a variety of vitamins and minerals that work in combination to prevent heart disease and cancer, promote DNA healing, as well as regulate heart rate and metabolism.",
      img: "./img/crops/beets_red.jpg",
      tags: ["salads", "juices", "smoothies"],
      id: "beets_red",
      stocked: true,
      limited: false,
      measurement: "bunch",
    },
    {
      price: "3.00",
      title: "Gold Beets",
      description:
        "Strikingly beautiful colors, with excellent sweet flavour, boasting a variety of vitamins and minerals that work in combination to prevent heart disease and cancer, promote DNA healing, as well as regulate heart rate and metabolism.",
      img: "./img/crops/beets_gold.jpg",
      tags: ["salads", "juices", "smoothies"],
      id: "beets_gold",
      stocked: false,
      limited: false,
      measurement: "bunch",
    },
    {
      price: "2.50",
      title: "Spinach",
      description:
        "These beautiful, dark, glossy oval shaped leaves are high in Vitamins A, C, K1, B-6, B-9, folic acid, iron, calcium and more. Spinach slows aging, reduces the risk of cancer, improves eye health, regulates blood pressure and promotes heart health.",
      img: "./img/crops/spinach.jpg",
      tags: ["pizzas", "omelettes", "smoothies", "juices", "salads"],
      id: "spinach",
      stocked: true,
      limited: false,
      measurement: "bunch",
    },
    {
      price: "3.00",
      title: "Collard Greens",
      description:
        "These dark green smooth leaves are rich in phyto-nutrients that combat various types of cancer, natural anti-bacterial and anti-virual properties, packed with Vitamin C, A, K, B-3, B-5, and riboflavin, and boast an impressive essential minerals profile.",
      img: "./img/crops/collards.jpg",
      tags: ["steamed", "sauteed", "stews"],
      id: "collards",
      stocked: true,
      limited: false,
      measurement: "bunch",
    },
    {
      price: "3.00",
      title: "Radish",
      description:
        "This beautiful multicolor mix is crisp and mild, packed with Vitamins A, C, potassium, zinc and dietary fiber. They also contain enzymes such as myrosinase, diastase, esterases, and amylase which have anti-fungal properties and are known to promote digestive health.",
      img: "./img/crops/radish.jpg",
      tags: ["salads", "stews", "roasts", "pickled"],
      id: "radish",
      stocked: false,
      limited: false,
      measurement: "bunch",
    },
    {
      price: "2.50",
      title: "Lettuce",
      description:
        "These thick flavorful leaves boast impressive health benefits, including being an anti-inflammitory agent, protector of neuronal cells, cholestoral fighter, sleep aid, cancer fighter, anxiety controller and anti-microbial defenses.",
      img: "./img/crops/lettuce.jpg",
      tags: ["sandwiches", "salads", "juices"],
      id: "lettuce",
      stocked: true,
      limited: false,
      measurement: "bunch",
    },
    {
      price: "2.50",
      title: "Bok Choy",
      description:
        "Bok Choy is a light and nutritous supergreen with high levels of Antioxidants that specifically promote skin and eye health, fight cancer, reduce negative inflammitory effects on the body, and has a wide spread of healthy doses of ones daily vitamin requirements.",
      img: "./img/crops/bokchoy.jpg",
      tags: ["stirfrys", "smoothies", "juices"],
      id: "bokchoy",
      stocked: true,
      limited: false,
      measurement: "bunch",
    },
    {
      price: "2.50",
      title: "Rainbow Carrots",
      description:
        "Carrots are often claimed to only be starchy tubers with no health benefits, but this could not be further from true! Carrots provide a large quantity of Vitamin A, which helps to improve vision, cellular growth and repair. Carrots do so much more, including preventing cancer, slowing aging and aiding full body cleansing",
      img: "./img/crops/carrot.jpg",
      tags: ["stirfrys", "smoothies", "juices"],
      id: "carrot",
      stocked: false,
      limited: false,
      measurement: "bunch",
    },
    {
      price: "1.50",
      title: "Passionfruit",
      description:
        "These delicious fruits native to Hawaii are packed with an extremely impressive array of vitamins and minerals critical for a healthy existence. Boosting immunity, preventing cancer, aiding digestion, reducing blood pressure and more, Lilikoi are the perfect treat.",
      img: "./img/crops/lilikoi.jpg",
      tags: ["desserts", "punches", "juices", "smoothies", "drinks"],
      id: "",
      stocked: false,
      limited: false,
      measurement: "pound",
    },
    {
      price: "5.00",
      title: "Papaya",
      description:
        "A delicious gift to the world, the Kamiya Laie Gold Papaya will leave you glowing with its high dietary fiber content, immune boosting and anti-inflammitory agents, anti aging and skin care nutrients, as well as overall bodily fluid hardiness and health. The seeds are also endowed with magical properties.",
      img: "./img/crops/papaya.jpg",
      tags: ["desserts", "salads", "juices", "smoothies"],
      id: "",
      stocked: false,
      limited: false,
      measurement: "pound",
    },
    {
      price: "1.50",
      title: "Cilantro",
      description:
        "Traditionally a Mediterranean herb, used in savory dishes worldwide. You either love it, or have strong feelings against it. Perhaps put them aside, or love it deeper, because of its amazing cholestoral lowering properties, essential oil filled leaves, its richness in antioxidants and important vitamins and minerals.",
      img: "./img/crops/cilantro.jpg",
      tags: ["sauces", "salads", "salsa"],
      id: "cilantro",
      stocked: false,
      limited: true,
      measurement: "bunch",
    },

    {
      price: "1.50",
      title: "Ice Cream Banana",
      description:
        "matte sheen when young and warm, canary yellow hue when ripe, boasting delicious ice cream textured banana within when ripe. Its flavor is reminiscent of sweet honey and vanilla custard. Portable, perfect on the go nature snacks, but can bruise easily when ripe!",
      img: "./img/crops/banana_icecream.jpg",
      tags: ["desserts", "sauces", "curries", "smoothies"],
      id: "cilantro",
      stocked: false,
      limited: true,
      measurement: "bunch",
    },
  ];
  return rand ? shuffle(veggies) : veggies;
}
