import {menuArray} from '/data.js'

const menuEl = document.getElementById("menu-items")
const billEl = document.getElementById("bill")
const payBtn = document.getElementById("pay-btn")
const paymentOvrlay = document.getElementById("payment-overlay")

function displayMenu(menuArray)
{
    const menuItem = menuArray.map(function(menu){

        const{name, ingredients, price, emoji, id} = menu

        return `<div class="select-menu">
                  <div class="item">
                  <span class="item-emoji">${emoji}</span>
                  <div>
                  <h2 class="item-name">${name}</h2>
                  <p class="ingredients">${ingredients}</p>
                  <p class="price">$${price}</p>
                  </div>
                  </div>
                 <button class="add-item-btn" data-additem="${id}">+</button></div>`
    }).join("")

        menuEl.innerHTML = menuItem
         
}
displayMenu(menuArray)

let order = []

function displayBill(selectedItem){
   console.log(selectedItem)
}

document.addEventListener('click', function(e){
    displayBill(menuArray[e.target.dataset.additem])
})


payBtn.addEventListener("click", function(){
const customerName = document.getElementById("customer-name").textContent
paymentOvrlay.style.display = "none"
document.getElementById("order-confirm-msg").innerHTML = `Thanks, ${customerName}! Your order is on its way!`
})