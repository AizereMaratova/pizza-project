class Pizza{
    constructor(image, name, dough, diameter, priceS, priceM, priceL, meat, vegan, bbq, hot, calcone ){
    this.image = image
    this.name = name
    this.dough = dough
    this.diameter = diameter
    this.priceS = priceS
    this.priceM = priceM
    this.priceL = priceL
    this.meat = meat
    this.vegan = vegan
    this.bbq = bbq
    this.hot = hot
    this.calcone = calcone
    this.currentPrice = priceS

    }
    display(){
        return `<div class="pizza-card">
        <img src="${this.image}" alt="" class="pizza-card__img">
        <p class="pizza__name"> ${this.name}</p>

        <div class="preferences">
            <div class="preferences__dough">
                <span id = 'thin' class="dough__item">тонкое</span>
                <span id = 'regular' class="dough__item">традиционное</span>
                <div class="dough-block"></div>
            </div>
            <div class="preferences__size">
                <p class="preferences__size__small"> 26см. </p>
                <p class="preferences__size__medium"> 30см. </p>
                <p class="preferences__size__huge"> 40см. </p>
                <span class="diameter-block"></span>
            </div>
        </div>
        <div class="pizza-card__footer">
            <p class="price"> от ${this.priceS} ₽ </p>
            <button class="add-to-cart-btn"> Добавить </button>
        </div>
    </div>`
    }
}
let menuItems = document.querySelector('.menu__items')


let menu = [
    new Pizza('/assets/images/cheeseburger-card.jpg', 'Чизбургер-пицца', 'тонкое', 's', 395, 500, 700, true, false, false, false, false),
    new Pizza('/assets/images/cheesy.jpg', 'Сырная', 'тонкое','s', 450, 600, 750, false, true, false, false, false ),
    new Pizza('/assets/images/asianshrimp.jpg', 'Креветки по-азиатски', 'тонкое', 'm', 130, 290, 420, false, false, false, false, false),
    new Pizza('/assets/images/cheesychick.jpg', 'Сырный цыпленок', 'тонкое', 's', 395, 500, 600, false, false, false, false, false),
    new Pizza('https://dodopizza-a.akamaihd.net/static/Img/Products/afccc45d4d5e40fda6d1a8a3de31f6eb_292x292.webp', 'Диабло', 'тонкое', 'm', 579, 878, 1118, true, false, true, true, false),
    new Pizza('https://dodopizza-a.akamaihd.net/static/Img/Products/3acbbf877c35443c88765e52c932f8d3_584x584.webp', 'Ветчина и Грибы','традиционное', 'm', 479, 700, 858, true, false, false, false, false ),
    new Pizza('https://dodopizza-a.akamaihd.net/static/Img/Products/1bc70786fe494d1686f613726cc18a70_292x292.webp', 'Четыре сезона', 'традиционное', 'm', 479, 650, 810, true,  false, false, false, false),
    new Pizza('https://dodopizza-a.akamaihd.net/static/Img/Products/6748441352fe48d5bc982585f716e309_292x292.webp', 'Домашняя', 'тонкое', 's', 390, 520, 680, true, false, false, false, false),
]

for (i=0; i<menu.length; i++){
    menuItems.innerHTML += menu[i].display()
}

let sortedPizzas = menu

function pizzaConfig(){



let doughThin = document.querySelectorAll('#thin')
let doughRegular = document.querySelectorAll('#regular')
let sizeS = document.querySelectorAll('.preferences__size__small')
let sizeM = document.querySelectorAll('.preferences__size__medium')
let sizeL = document.querySelectorAll('.preferences__size__huge')
let addBtn = document.querySelectorAll('.add-to-cart-btn')
let pizzaPrice = document.querySelectorAll('.price')
let doughBlock = document.querySelectorAll('.dough-block')
let diameterBlock = document.querySelectorAll('.diameter-block')

for (let i=0; i<sortedPizzas.length; i++){
    doughThin[i].addEventListener('click', function(){
        sortedPizzas[i].dough = 'тонкое'
        anime({
            targets: doughBlock[i],
            translateX: "0%"
    
        })
    })
 
      
    doughRegular[i].addEventListener('click', function(){
        sortedPizzas[i].dough = 'традиционное'
        anime({
            targets: doughBlock[i],
            translateX: "100%"
    
        })

        
     })
     
    sizeS[i].addEventListener('click', function(){
        sortedPizzas[i].size = 's'
        sortedPizzas[i].currentPrice = sortedPizzas[i].priceS

        pizzaPrice[i].innerHTML = sortedPizzas[i].currentPrice + ' ₽ '
        anime({
            targets: diameterBlock[i],
            translateX: "0%"
    
        })
        
    })
    sizeM[i].addEventListener('click', function(){
        sortedPizzas[i].size = 'm'
        sortedPizzas[i].currentPrice = sortedPizzas[i].priceM

        pizzaPrice[i].innerHTML = sortedPizzas[i].currentPrice + ' ₽ '
        anime({
            targets: diameterBlock[i],
            translateX: "100%"
    
        })
        
        
    })
    sizeL[i].addEventListener('click', function(){
        sortedPizzas[i].size = 'l'
        sortedPizzas[i].currentPrice = sortedPizzas[i].priceL

        pizzaPrice[i].innerHTML = sortedPizzas[i].currentPrice + ' ₽ '
        anime({
            targets: diameterBlock[i],
            translateX: "200%"
    
        })
     })
     addBtn[i].addEventListener('click',function(){
        cartJSON = JSON.parse(cartJSON)
        cartJSON.items.push(sortedPizzas[i])
        cartJSON = JSON.stringify(cartJSON)
        cart.amount++
        cart.total += sortedPizzas[i].currentPrice
     })

  
    }
}
pizzaConfig()

//............cart

let cartItems = document.querySelector('.shopping-cart__main')
let cartAmount = document.querySelector('.cart-item__sum')
let cartTotal = document.querySelector('.cart-item__cost')

let cart = {
    items: [],
    amount: 0,
    total: 0,

    drawCart(){

        cartItems.innerHTML = ''
        let Items = JSON.parse(cartJSON).items
        for(i=0; i<cart.items.length; i++){
            cartItems.innerHTML +=
            `<div class="shopping-cart__item">
            <img src='${this.items[i].image}' alt="" class="cart-item__img">
            <div class="cart-item__info">
                <p class="cart-item__name">${this.items[i].name}</p>
                <p class="cart-item__parameters">${this.items[i].dough}</p>
            </div>
            <p class="cart-item__price">${this.items[i].currentPrice}</p>
            <img src="assets/images/cart-item__delete.svg" alt="" class="cart-item__delete">
        </div>`
        }



    }

}

function clearCart(){
    cartItems.innerHTML = ''
    cartItems = []
}

function removeCartItem(){

}

let cartJSON = JSON.stringify(cart)

function toggleCart(){
    document.querySelector('.shopping-cart').classList.toggle('shopping-cart_active')
    cart.drawCart()
}

//------------------Filter-----------------------

function displaySortedPizzas() {
    for(i=0; i<sortedPizzas.length; i++){
        menuItems.innerHTML += sortedPizzas[i].display()
    }
    pizzaConfig()
}


document.querySelector('#filter-meat').addEventListener('click', function(){
    menuItems.innerHTML = ''
    sortedPizzas = []
    for(i=0; i<menu.length; i++){
        if(menu[i].meat){
            sortedPizzas.push(menu[i])
        }
    }
    displaySortedPizzas()
})

document.querySelector('#filter-vegan').addEventListener('click', function(){
    menuItems.innerHTML = ''
    sortedPizzas = []
    for(i=0; i<menu.length; i++){
        if(menu[i].vegan){
            sortedPizzas.push(menu[i])
        }
    }
    displaySortedPizzas()
})
document.querySelector('#filter-bbq').addEventListener('click', function(){
    menuItems.innerHTML = ''
    sortedPizzas = []
    for(i=0; i<menu.length; i++){
        if(menu[i].bbq){
            sortedPizzas.push(menu[i])
        }
    }
    displaySortedPizzas()
})
document.querySelector('#filter-hot').addEventListener('click', function(){
    menuItems.innerHTML = ''
    sortedPizzas = []
    for(i=0; i<menu.length; i++){
        if(menu[i].hot){
            sortedPizzas.push(menu[i])
        }
    }
    displaySortedPizzas()
})
document.querySelector('#filter-closing').addEventListener('click', function(){
    menuItems.innerHTML = ''
    sortedPizzas = []
    for(i=0; i<menu.length; i++){
        if(menu[i].calcone){
            sortedPizzas.push(menu[i])
        }
    }
    displaySortedPizzas()
})
document.querySelector('#filter-all').addEventListener('click', function(){
    menuItems.innerHTML = ''
    sortedPizzas = menu
    displaySortedPizzas()
})

