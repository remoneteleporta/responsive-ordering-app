import {menuArray} from '/data.js'

const menuEl = document.getElementById("menu-items")
const billEl = document.getElementById("bill")
const payBtn = document.getElementById("pay-btn")
const paymentOvrlay = document.getElementById("payment-overlay")
const billList = document.getElementById("bill-list")
const totalBill = document.getElementById("total")
const completeBtn = document.getElementById("complete-order-btn")
let ordConfrender = document.getElementById("order-confirm")

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
                 <button id="add-item-btn" data-additem="${id}">+</button></div>`
    }).join("")

        menuEl.innerHTML = menuItem
         
}
displayMenu(menuArray)

let order = []

function orderSelect(selectedItem){
billList.style.display = "block"
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
    totalBill.innerHTML = ``

    if(order.length === 0) {
    billEl.innerHTML = "<p>No items in your order.</p>";
    completeBtn.style.display = "none"
    ordConfrender.style.display="none"
    return;
  }
  else{completeBtn.style.display = "block"}

     billEl.innerHTML = order.filter(item => item && item.name).map(function(orders){

     return `<div class="billed-item">
    <div id="bill-item-remove">
    <h3 class="billed-item-name">${orders.name}</h3>
    <button id="remove-item-btn" data-rmvitem="${orders.id}">Remove</button>
    </div>
    <div class="billed-item-price">$${orders.price}</div></div>`
}).join("")

const totalAmount = order.reduce((total, currentItem) => {
  return total + currentItem.price;
}, 0)

  totalBill.innerHTML = `<div>Total price:</div>
  <div class="total-amount">$${totalAmount}</div>`
}

function removeOrder(removeItem){
   order.pop(removeItem)
   displayBill(order)
}

document.addEventListener('click', function(e){
    if(e.target.id === "add-item-btn"){
    orderSelect(menuArray[e.target.dataset.additem])}
    else
    if(e.target.id === "remove-item-btn"){
        removeOrder(order[e.target.dataset.rmvitem])
    }
})

completeBtn.addEventListener("click", function(){
    paymentOvrlay.style.display = "block"
})

payBtn.addEventListener("click", function(){
const customerName = document.getElementById("customer-name").value
billList.style.display = "none"
paymentOvrlay.style.display = "none"
const payForm = document.getElementById('payment-form')
payForm.addEventListener('submit', function(e){
    e.preventDefault()
})
ordConfrender.innerHTML = `<p id="order-confirm-msg">Thanks, ${customerName}! Your order is on its way!</p>`
})