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
	const form = document.getElementById('order-form');
	form.addEventListener('submit', handleOrder);

	for (let selector of document.getElementsByClassName('crop-selector')) {
		selector.addEventListener('change', handleQuantityChange);
		// TODO: how to get from storage and update shopping cart?
	}

	for (let selector of document.getElementsByClassName('toggle-card-size')) {
		selector.addEventListener('click', toggleCardSizes);
	}
}

function handlePaymentChoice(a) {
	var choiceMap = {
		venmo:
			'Please enter your valid Venmo Username in the Details section below!',
		crypto:
			'Please enter your cryptocurrency of choice (Coinbase options only)',
		cash: 'Please have cash ready on pickup or delivery, thank you!',
	};

	document.getElementById('form-payment-notification').innerHTML =
		choiceMap[a.value];
}

// email form for consulting handling
function handleOrder(e) {
	var button = document.getElementById('submit-button');
	button.classList.add('loading');
	button.disabled = true;

	e.preventDefault();

	const form = this;
	const cart = getShoppingCart();

	// Prepare data to send
	let data = {
		cart,
	};
	const formElements = Array.from(form);

	formElements.map(function(input) {
		data[input.name] = input.value;
	});

	data = removeEmpties(data);

	if (document.getElementById('honeypot').value) {
		window.location = 'https://www.youtube.com/watch?v=QH2-TGUlwu4';
	}

	// Construct an HTTP request
	var xhr = new XMLHttpRequest();
	xhr.open(form.method, form.action, true);
	xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

	// Send the collected data as JSON
	xhr.send(JSON.stringify(data));

	const formResponse = document.getElementById('js-form-response');

	// Callback function
	xhr.onloadend = function(response) {
		button.classList.remove('loading');
		button.disabled = false;

		if (response.target.status === 200) {
			// The form submission was successful
			form.reset();

			formResponse.classList.add('success');

			formResponse.innerHTML =
				"We've received your order and will reach out soon, thank you!";

			// TODO: clear shopping cart && all shopping list items.
			var followALongCheckout = document.getElementById(
				'follow-cart-container',
			);

			followALongCheckout.classList.remove('shown');
			document.getElementById('shopping-cart').innerHTML = '';
		} else {
			// The form submission failed
			formResponse.innerHTML =
				'Something went wrong, please email au.witherow@gmail.com if you see this and help him figure out how he messed up haha';
			formResponse.classList.add('error');
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
	var firstRoundCards = document.getElementById('firstRoundCards');
	var futureRoundCards = document.getElementById('futureRoundCards');

	var veggies = getVeggies();

	var cropCardsMap = {
		firstRoundCards: veggies.filter(function(veggie) {
			return veggie.round === 1;
		}),
		futureRoundCards: veggies.filter(function(veggie) {
			return veggie.round === 2;
		}),
	};

	var cardContainers = [
		firstRoundCards,
		futureRoundCards,
	];

	cardContainers.map(function(container) {
		cropCardsMap[container.id].map(function(crop) {
			var tags =
				"<ul class='tag-list'>" +
				crop['tags'].map(function(tag) {
					var cname = tag.replace(' ', '-');
					return "<li class='tag " + cname + "'>" + tag + '</li>';
				}) +
				'</ul>';

			tags = tags.replace(/,/g, '');

			var numberList = getArrayOfNumbers(50);

			var quantity = crop.stocked
				? "<select class='crop-selector' name=" +
					crop.id +
					'>' +
					numberList.map(function(x) {
						return '<option value=' + x + '>' + x + '</option>';
					}) +
					'</select> at '
				: '';

			container.innerHTML +=
				"<div class='card'><div class='price-tag'>" +
				quantity +
				' $' +
				crop['price'] +
				"<small>/pound</small></div><img src='" +
				crop['img'] +
				"'/><div class='inner'><h5>" +
				crop['title'] +
				'</h5><p>' +
				crop['description'] +
				tags +
				'</div></div>';
		});
	});
}

function handleQuantityChange() {
	var itemChanged = this.name;
	var newQuantity = this.value;

	var followALongCheckout = document.getElementById('follow-cart-container');

	if (!followALongCheckout.classList.contains('shown')) {
		followALongCheckout.classList.add('bounceIn', 'shown');
	}

	renderShoppingCartItem(itemChanged, newQuantity);

	var shoppingCartList = document.getElementById('shopping-cart');
	var shoppingCartCount = document.getElementById('shopping-cart-count');
	shoppingCartCount.innerText = shoppingCartList.getElementsByTagName(
		'li',
	).length;

	for (let selector of document.getElementsByClassName('crop-selector')) {
		if (itemChanged === selector.name && newQuantity != selector.value) {
			selector.value = newQuantity;
		}
	}

	updateTotalPrice();
}

function renderShoppingCartItem(item, quantity) {
	var li = document.getElementById('cart-item-' + item);
	var shoppingCart = document.getElementById('shopping-cart');
	var numberList = getArrayOfNumbers(50);
	var selected = function(x) {
		return x === parseInt(quantity) ? 'selected' : '';
	};
	var cssID = 'cart-item-' + item;

	var veggie = getVeggieById(item);

	var cartItem =
		"<select id='" +
		cssID +
		"' class='shopping-cart-item' name='" +
		item +
		"' data-price='" +
		veggie.price +
		"'>" +
		numberList.map(function(x) {
			return "<option value='" + x + "'" + selected(x) + '>' + x + '</option>';
		}) +
		'</select> - ' +
		capitalizeFirstLetter(item);

	// TODO: WHY DOES THIS NOT UPDATE ON RENDERING?
	//  +
	// " at $" +
	// veggie.price +
	// "/pound = $" +
	// multiply(veggie.price, quantity); //

	if (li) {
		li.innerHTML = cartItem;
	} else {
		shoppingCart.innerHTML += '<li>' + cartItem + '</li>';

		document
			.getElementById(cssID)
			.addEventListener('change', handleQuantityChange);
	}
}

function getVeggieById(id) {
	var veggies = getVeggies();
	return veggies.filter(function(veggie) {
		return veggie.id === id;
	})[0];
}

function getShoppingCart() {
	const cart = [];
	for (let orderItem of document.getElementsByClassName('shopping-cart-item')) {
		cart.push({
			name: orderItem.name,
			value: orderItem.value,
			price: getVeggieById(orderItem.name).price,
		});
	}
	return cart;
}

function updateTotalPrice() {
	const cart = getShoppingCart();
	const price = cart.map(function(item) {
		return parseFloat(item.price) * parseFloat(item.value);
	});

	var sum = 0;

	for (var i = 0; i < price.length; i++) {
		sum += price[i];
	}

	document.getElementById('total-order-amount').innerHTML = 'Total: $' + sum;
}

function multiply(a, b) {
	return a * b;
}

// TODO: accept size here to overrride newStyle from localStorage.
function toggleCardSizes() {
	const newStyle = this.dataset.size;
	const oldStyle = newStyle === 'small' ? 'big' : 'small';
	for (let card of document.getElementsByClassName('card')) {
		card.classList.remove(oldStyle);
		card.classList.add(newStyle);
	}

	for (let toggleButton of document.getElementsByClassName(
		'toggle-card-size',
	)) {
		toggleButton.dataset.size === newStyle
			? toggleButton.classList.add('active')
			: toggleButton.classList.remove('active');
	}
}
