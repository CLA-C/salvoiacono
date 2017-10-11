import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

  cart = [];

  constructor() {
    if(localStorage.getItem('cartItem')){
      this.cart = JSON.parse(localStorage.getItem('cartItem'));
    }
  }

  get() {
    return this.cart;
  }
  add(id) {
    if(this.cart.indexOf(id) == -1) {
      this.cart.push(id);
    }
    localStorage.cartItem = JSON.stringify(this.cart);
  }
  remove(id){
    let index: number = this.cart.indexOf(id);
    if (index !== -1) {this.cart.splice(index, 1);}
    localStorage.cartItem = JSON.stringify(this.cart);
  }

}