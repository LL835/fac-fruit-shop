myBasket = {apple: 0, orange: 0};

const addToBasketButtons = document.querySelectorAll(".add-to-basket-btn")
for (let i = 0; i < addToBasketButtons.length; i++){
    addToBasketButtons[i].addEventListener("click",  (event) => {
        addFruitToBasket(event.target)
    }
    )
}

function addFruitToBasket(event){
    const fruit = event.previousElementSibling.innerText.toLowerCase();
    myBasket[`${fruit}`] += 1;
    updateBasket()    
}

function updateBasket(){
    const totalQuantity = calculateTotalQuantity()
    const emptyBasketMessage = document.querySelector(".empty-basket-message");
    const basket = document.querySelector(".basket");
    if (totalQuantity === 1){ //the first time an item is added to the basket, create an element displaying the basket's contents and remove the empty-basket message
        emptyBasketMessage.remove();
        const basketContents = document.createElement("div");
        const contents = 
        `<div class="row">
            <div class="column-heading item-column">Item</div>
            <div class="column-heading quantity-column">Quantity</div>
            <div class="column remove-items-column"></div>
        </div>

        <div class="row">
            <div class="column item-column">
                <div class="selected-fruit">Apple</div>
            </div>
            <div class="column quantity-column">
                <button class="change-qty-btn"> - </button>
                <div class="fruit-quantity apple-quantity">${myBasket["apple"]}</div>
                <button class="change-qty-btn"> + </button>
            </div>
            <div class="column remove-items-column">
                <button class="change-qty-btn remove-from-basket-btn">Remove</button>
            </div>
        </div>

        <div class="row">
            <div class="column item-column">
                <div class="selected-fruit">Orange</div>
            </div>
            <div class="column quantity-column">
                <button class="change-qty-btn">-</button>
                <div class="fruit-quantity orange-quantity">${myBasket["orange"]}</div>
                <button class="change-qty-btn"> + </button>
            </div>
            <div class="column remove-items-column">
                <button class="change-qty-btn remove-from-basket-btn">Remove</button>
            </div>
        </div>

        <div class="row">
            <div class="column-heading item-column">Total</div>
            <div class=" quantity-column total-quantity">${totalQuantity}</div>
            <div class="column remove-items-column"></div>
        </div>`;
        basketContents.innerHTML = contents;
        basket.appendChild(basketContents)
    } else if (totalQuantity === 0){ // if the total quantity is 0, remove the basket and show a message to the user saying the basket is empty
        const rows = document.querySelectorAll(".row")
        for (let i = 0; i < rows.length; i++){
            rows[i].remove();
        }
        const newEmptyBasketMessage = document.createElement("div");
        newEmptyBasketMessage.classList.add("empty-basket-message");
        newEmptyBasketMessage.innerText = "Your basket is empty."
        basket.appendChild(newEmptyBasketMessage);
    } else {  // if the total quantity is greater than 1, update the table's values
        const totalNumOfFruits = document.querySelector(".total-quantity")
        const appleQuantity = basket.querySelector(".apple-quantity");
        const orangeQuantity = basket.querySelector(".orange-quantity");
        appleQuantity.textContent = myBasket["apple"];
        orangeQuantity.textContent = myBasket["orange"];
        totalNumOfFruits.textContent = totalQuantity
    }
}

function calculateTotalQuantity(){
    const totalQuantity = Object.values(myBasket);
    let currentTotal = 0;
    for (let i = 0; i < totalQuantity.length; i++){
        currentTotal += totalQuantity[i]
    }
    return currentTotal
}