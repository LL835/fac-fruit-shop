myBasket = {apple: 0, orange: 0};
let lastButtonClicked = "";

const addToBasketButtons = document.querySelectorAll(".add-to-basket-btn")
for (let i = 0; i < addToBasketButtons.length; i++){
    addToBasketButtons[i].addEventListener("click",  (event) => {
        const fruit = event.target.previousElementSibling.innerText.toLowerCase()
        addFruitToBasket(fruit)
    }
    )
}

function addFruitToBasket(fruit){
    myBasket[`${fruit}`] += 1;
    lastButtonClicked = "increase"
    updateBasket()    
}

function decreaseFruitQuantity(fruit){
    totalNumOfFruits = calculateTotalQuantity()
    if (myBasket[`${fruit}`] != 0){
        myBasket[`${fruit}`] -= 1;
    }
    lastButtonClicked = "decrease"
    updateBasket()
}

function removeFruit(fruit){
    myBasket[`${fruit}`] = 0;
    lastButtonClicked = "remove"
    updateBasket()
}

function updateBasket(){
    const basket = document.querySelector(".basket");
    const totalQuantity = calculateTotalQuantity()
    if (totalQuantity === 0) { // If the total quantity is reduced to zero, remove the basket and tell the user that the basket is empty
        const rows = document.querySelectorAll(".row")
        for (let i = 0; i < rows.length; i++){
            rows[i].remove();
        }
        const newEmptyBasketMessage = document.createElement("div");
        newEmptyBasketMessage.classList.add("empty-basket-message");
        newEmptyBasketMessage.innerText = "Your basket is empty.";
        basket.appendChild(newEmptyBasketMessage);
        return;
    }
    if (totalQuantity === 1 && lastButtonClicked === "increase"){ // if the total quantity is increased to 1, create a basket displaying the quantity of each fruit. (Increase only because a basket shouldn't be created on a decrease as a basket will already exist)
        const emptyBasketMessage = document.querySelector(".empty-basket-message");
        emptyBasketMessage.remove() // removes the message telling the user the basket is empty

        const basketContents = document.createElement("div"); // creates a new basket
        basketContents.classList.add("basket-items")
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
                <button class="change-qty-btn decrease-qty"> - </button>
                <div class="fruit-quantity apple-quantity">${myBasket["apple"]}</div>
                <button class="change-qty-btn increase-qty"> + </button>
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
                <button class="change-qty-btn decrease-qty"> - </button>
                <div class="fruit-quantity orange-quantity">${myBasket["orange"]}</div>
                <button class="change-qty-btn increase-qty"> + </button>
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
        basket.appendChild(basketContents);
        addEventListenersForNewButtons() // add event listeners to the newly appended buttons
    }
    // Update the values in the basket to be equal to the values of the properties in the object.
    const totalNumOfFruits = document.querySelector(".total-quantity")
    const appleQuantity = basket.querySelector(".apple-quantity");
    const orangeQuantity = basket.querySelector(".orange-quantity");
    appleQuantity.textContent = myBasket["apple"];
    orangeQuantity.textContent = myBasket["orange"];
    totalNumOfFruits.textContent = totalQuantity
}

function calculateTotalQuantity(){
    const totalQuantity = Object.values(myBasket);
    let currentTotal = 0;
    for (let i = 0; i < totalQuantity.length; i++){
        currentTotal += totalQuantity[i]
    }
    return currentTotal
}

function addEventListenersForNewButtons(){
    const removeButtons = document.querySelectorAll(".remove-from-basket-btn");
    const increaseQuantity = document.querySelectorAll(".increase-qty");
    const decreaseQuantity = document.querySelectorAll(".decrease-qty");

    for (let i = 0; i < increaseQuantity.length; i++){
        increaseQuantity[i].addEventListener("click", (event) => {
            const parent = event.target.parentNode.parentNode;
            const selected = parent.querySelector(".selected-fruit").innerHTML.toLowerCase()
            addFruitToBasket(selected);
        })
    }

    for (let i = 0; i < decreaseQuantity.length; i++){
        decreaseQuantity[i].addEventListener("click", (event) => {
            const parent = event.target.parentNode.parentNode;
            const selected = parent.querySelector(".selected-fruit").innerHTML.toLowerCase()
            decreaseFruitQuantity(selected);
        })
    }

    for (let i = 0; i < removeButtons.length; i++){
        removeButtons[i].addEventListener("click", (event) => {
            const parent = event.target.parentNode.parentNode;
            const selected = parent.querySelector(".selected-fruit").innerHTML.toLowerCase()
            removeFruit(selected);
        })
    }
}


