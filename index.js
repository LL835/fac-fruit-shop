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
    console.log(fruit)
}

function calculateTotalQuantity(){
    const totalQuantity = Object.values(myBasket);
    let currentTotal = 0;
    for (let i = 0; i < totalQuantity.length; i++){
        currentTotal += totalQuantity[i]
    }
    return currentTotal
}