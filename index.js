import {menuArray} from '/data.js'

const menuEl = document.getElementById("menu-items")
const billEl = document.getElementById("bill")
const payBtn = document.getElementById("pay-btn")
const paymentOvrlay = document.getElementById("payment-overlay")
const billHead = document.getElementById("bill-heading")

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

function orderSelect(selectedItem){
   if(order.includes(selectedItem))
    {
        selectedItem.price += selectedItem.price
     
    }
   else
    {
    order.push(selectedItem)
    } 

 displayBill(order)
}

function displayBill(order){

    billEl.innerHTML = ``

    if(order.length === 0) {
    billEl.innerHTML = "<p>No items in your order.</p>";
    return;
  }

     billEl.innerHTML = order.filter(item => item && item.name).map(function(orders){



     return `<div class="billed-item">
    <div class="billed-item-name">${orders.name}</div>
    <button class="remove-item-btn" id="remove-item-btn">Remove</button>
    </div>
    <div class="billed-item-name">$${orders.price}</div>`
}).join("")
}

document.addEventListener('click', function(e){
    billHead.style.display = "block"
    orderSelect(menuArray[e.target.dataset.additem])
})

payBtn.addEventListener("click", function(){
const customerName = document.getElementById("customer-name").textContent
paymentOvrlay.style.display = "none"
document.getElementById("order-confirm-msg").innerHTML = `Thanks, ${customerName}! Your order is on its way!`
})