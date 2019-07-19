//Created class that puts element's data-id attr into localStorage
class ServiceStore {
    constructor() {
    }
    getProducts() {
        let products = [];
        let productsLocalStorage = localStorage.getItem('products');
        if (productsLocalStorage !== null) {
            products = JSON.parse(productsLocalStorage);
        }
        return products;
    }

    putProduct(id) {
        let products = this.getProducts();
        let index = products.indexOf(id);
        let pushProduct;
        if (index === -1) {
            products.push(id);
            pushProduct = true;
        } else {
            products.splice(index, 1);
            pushProduct = false;
        }
        localStorage.setItem('products', JSON.stringify(products));
        return {
            pushProduct: pushProduct,
            products: products
        };
    }
}

//initialize object from ServiceStore class
let serviceStore = new ServiceStore();

//variables
let products = serviceStore.getProducts();
let counter = products.length;
let productsAmount = document.getElementsByClassName('slider2-content');
let btnToBasket = document.getElementsByClassName('toBasket-but');
document.getElementById('counter').innerText = `(${counter})`;

//leaves buttons pressed when reload
for (let i = 0; i < productsAmount.length; i++) {
    let index = products.indexOf(productsAmount[i].getAttribute('data-id'));

        if (index === -1) {
            btnToBasket[i].innerText = 'в корзину';
        } else {
            btnToBasket[i].classList.add('btn-active');
            btnToBasket[i].innerText = 'в корзине';
        }

}

//reacts when we click on items which we want to put into basket
//not that clean though (but actually I didn't try to make it clean)
setTimeout(function () {
    let sameId = [];
    for(let i =0; i< productsAmount.length;i++){
        let atr = productsAmount[i].getAttribute('data-id');
        sameId.push(atr);
    }
    for (let i = 0; i < btnToBasket.length; i++) {
        btnToBasket[i].addEventListener('click', function () {
            // alert(this.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id'));
            this.classList.add('btn-active');
            let id = this.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');
            let result = serviceStore.putProduct(id);
            let counter = document.getElementById('counter');
            counter.innerText = `(${result.products.length})`;
            // for (let i = 0; i < ; i++)
            let idOfDataId = [];
            for(let j=0;j<sameId.length;j++){
                if (sameId[j] == id) {
                    idOfDataId.push(j);
            }}
                // alert(idOfDataId[0]);
                // alert(idOfDataId[1]);
            if (result.pushProduct) {
                for(let k = 0; k<idOfDataId.length;k++) {
                    btnToBasket[idOfDataId[k]].classList.add('btn-active');
                    btnToBasket[idOfDataId[k]].innerText = 'в корзине';
                }
            } else {
                for(let k = 0; k<idOfDataId.length;k++) {
                    btnToBasket[idOfDataId[k]].classList.remove('btn-active');
                    btnToBasket[idOfDataId[k]].innerText = 'в корзину';
                }
            }
        });
    }
}, 100);

