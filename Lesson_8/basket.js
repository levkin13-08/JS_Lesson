'use strict';

const basketEl = document.querySelector(".basket");
const basketTotal = document.querySelector(".basketTotal");
const basketTotalValue = document.querySelector(".basketTotalValue");
const counter = document.querySelector(".cartIconWrap span");


document.querySelector(".cartIconWrap").addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});


const basket = {};


document.querySelector(".featuredItems").addEventListener('click', event => {
    if(!event.target.closest(".addToCart")) {
        return;
    }
    const featuredItemEl = event.target.closest(".featuredItem");
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;

    addToCart(id, name, price);
});

function addToCart (id, name, price) {
    if(!(id in basket)) {
        basket[id] = {id: id, name: name, price: price, count: 0};
    }
    basket[id].count++;
    counter.textContent = getTotal().toString();
    basketTotalValue.textContent = getPrice().toFixed(2);

    basketPaint(id);
}

function getTotal () {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getPrice () {
    return Object.values(basket).reduce((acc, product) => acc + product.count * product.price, 0);
}

function basketPaint(productId) {
    const productString = basketEl.querySelector(`.basketRow[data-id="${productId}"]`);

    if (!productString) {
        basketNewPaint(productId) ;
        return;
    };
    const product = basket[productId];
    productString.querySelector(".productCount").textContent = product.count;
    productString.querySelector(".productTotalRow").textContent = (product.price * product.count).toFixed(2);
};


function basketNewPaint(productId) {
    const productRow = `
      <div class="basketRow" data-id="${productId}">
        <div>${basket[productId].name}</div>
        <div>
          <span class="productCount">${basket[productId].count}</span> шт.
        </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
        </div>
      </div>
      `;
    basketTotal.insertAdjacentHTML("beforebegin", productRow);
  }