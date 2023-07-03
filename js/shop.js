// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
   {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    const {offer, ...PRODUCT} = products.find(product => product.id == id); 

    cartList.push(PRODUCT); // The 'offer' field is not included within the cart products

    console.log("buy():", cartList)
}

// Exercise 2
function cleanCart() {
    cartList = [];

    console.log("cleanCart():", cartList)
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    total = cartList.reduce(
        (total, product) => total + product.price, 0
    );

    console.log("calculateTotal():", total)
}

// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    cart = [];
    cartList.forEach(product => {
        const IDX = cart.findIndex(val => val.id == product.id)

        if (IDX < 0) {
            cart.push({
                ...product, 
                quantity: 1, 
                subtotal: product.price, 
                subtotalWithDiscount: 0
            })
        } else {
            cart[IDX].quantity++;
            cart[IDX].subtotal += product.price
        }
    });

    console.log("generateCart():", cart);

    applyPromotionsCart()
}

// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    cart.forEach(val => {
        const ID = val.id;
        const Q = val.quantity;
        const PRODUCT = products.find(product => product.id == ID);
        const PRICE = PRODUCT.price;

        if (ID == 1 && Q >= 3)
            val.subtotalWithDiscount = Q * 10;
        
        if (ID == 3 && Q >= 10)
            val.subtotalWithDiscount = Q * PRICE * 2 / 3;
        
    });

    console.log("applyPromotionsCart():", cart)
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    const TBODY = document.getElementById("cart_list");

    TBODY.innerHTML = ""
    generateCart();

    cart.forEach(val => {
        const TOTAL = val.subtotalWithDiscount == 0 ? val.subtotal : val.subtotalWithDiscount;
        const HTML = '<th scope="row">' + val.name
            + '</th><td>$' + val.price
            + '</td><td>' + val.quantity
            + '</td><td>$' + TOTAL
            + '</td>';
        const ROW = document.createElement("tr");
        ROW.innerHTML = HTML;

        TBODY.append(ROW)
    })
}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
}

function open_modal(){
	console.log("Open Modal");
	printCart();
}