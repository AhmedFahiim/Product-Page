// active menu in mobile

let bars = document.querySelector(".bars");
let menu = document.querySelector(".links");
bars.onclick = () => {
  menu.classList.toggle("active");
};

// product images elements
let images = document.querySelectorAll(".product-img");
let imagesView = document.querySelector(".view-area img");

// product details elements
let mainHead = document.querySelector(".main-head");
let newPrice = document.querySelector(".price-after");
let discPerc = document.querySelector(".disc-perc");
let oldPrice = document.querySelector(".price-before");
let handlers = document.querySelectorAll(".handler");
let productCounter = document.getElementById("product-counter");
let addToCard = document.getElementById("add-to-card");

// cart icon and cart list
let cartIcon = document.getElementById("card-icon");
let cart = document.getElementById("card-items");
let emptyText = document.querySelector(".empty-text");
let mainBox = document.querySelector(".main-box");
let checkout = document.querySelector(".checkout-button");

// icon counter number
let counterHolder = document.querySelector(".counter-holder"),
  cardCounter = counterHolder.querySelector(".card-counter");

// create product class
class Product {
  constructor(name, newPrice, oldPrice, disc, count, image) {
    this.name = name;
    this.newPrice = newPrice;
    this.oldPrice = oldPrice;
    this.disc = disc;
    this.count = count;
    this.image = image;
  }
}

// create the first instance of product class
const productOne = new Product(
  "Fall Limited Edition Sneakers",
  "125.00",
  "250.00",
  "50",
  `${productCounter.textContent}`,
  images[0].src
);

// function to fill the data
function fillData() {
  mainHead.textContent = productOne.name;
  newPrice.textContent = `$${productOne.newPrice}`;
  oldPrice.textContent = `$${productOne.oldPrice}`;
  discPerc.textContent = `${productOne.disc}%`;
}
fillData();

// function to add click event oon gallery images
function galleryFunction() {
  images.forEach((e) => {
    if (e.classList.contains("active")) {
      imagesView.src = e.src;
    }
    e.addEventListener("click", (ev) => {
      images.forEach((r) => {
        r.classList.remove("active");
      });
      ev.currentTarget.classList.add("active");
      imagesView.src = ev.currentTarget.src;
    });
  });
}
galleryFunction();

// function to increase and decrease items number
function addAndDeduct() {
  handlers.forEach((e) => {
    e.addEventListener("click", () => {
      let content = Number(productCounter.textContent);
      if (e === handlers[0]) {
        productCounter.textContent = content += 1;
      }
      if (e === handlers[1]) {
        if (content === 1) return;
        productCounter.textContent = content -= 1;
      }
    });
  });
}
addAndDeduct();

// function to toggle active class on cart icon
function toggleClass() {
  cartIcon.onclick = () => {
    cart.classList.toggle("active");
  };
}
toggleClass();

// add items to cart
function addToCart() {
  // function to show the counter number
  counterNumber();
  // create main div
  let productInCart = document.createElement("div");
  productInCart.className = "product-in-cart";

  let productImage = document.createElement("img");
  productImage.className = "product-image-in-cart";
  productImage.src = images[0].src;

  //   create name and price div
  let nameAndPrices = document.createElement("div");
  nameAndPrices.className = "priceAndName";

  let productName = document.createElement("p");
  productName.className = "name-in-cart";
  productName.textContent = productOne.name;

  let price = document.createElement("span");
  price.className = "newPrice-in-cart";
  price.textContent = `$${productOne.newPrice}`;

  let multiply = document.createElement("span");
  multiply.className = "multiply";
  multiply.textContent = "x";

  let counter = document.createElement("span");
  counter.className = "item-qty";
  counter.textContent = productCounter.textContent;

  let totalPrice = document.createElement("span");
  totalPrice.className = "totalPrice";
  totalPrice.textContent = `= $${(
    parseInt(productOne.newPrice) * parseInt(productCounter.textContent)
  ).toFixed(2)}`;

  nameAndPrices.append(productName, price, multiply, counter, totalPrice);

  // create delete button
  let deleteButton = document.createElement("img");
  deleteButton.className = "delete";
  deleteButton.src = "images/icon-delete.svg";

  test = deleteButton;
  //appending all items
  productInCart.append(productImage, nameAndPrices, deleteButton);
  mainBox.prepend(productInCart);

  // check the counter to show or hide the empty message
  showAndHide();
}
addToCard.onclick = addToCart;

// function to display and increase the counter icon number
function counterNumber() {
  cardCounter.textContent =
    parseInt(cardCounter.textContent) + parseInt(productCounter.textContent);
  counterHolder.style.opacity = "1";
}

// function to display or hide the empty cart message
function showAndHide() {
  if (cardCounter.textContent >= 1) {
    checkout.style.display = "block";
    emptyText.style.display = "none";
  } else {
    checkout.style.display = "none";
    emptyText.style.display = "block";
  }
}
showAndHide();

// function to delete item from cart
function deleteItemFromCart() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      e.target.parentElement.remove();
      cardCounter.textContent -=
        e.target.parentElement.children[1].children[3].textContent;
      showAndHide();
      if (cardCounter.textContent == 0) {
        counterHolder.style.opacity = "0";
      }
    }
  });
}
deleteItemFromCart();
