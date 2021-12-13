import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems : CartItem [] = [];
  totalPrice : Subject<number> = new Subject<number>();
  totalQuantity : Subject<number> = new Subject<number>();
  constructor() { }

  // addToCart(theCartItem : CartItem){

  //   //check if we already have the item in cart
  //   let alreadyExistsInCart :boolean = false;
  //   let existingCartItem : CartItem = undefined ;

  //   if(this.cartItems.length > 0){
  //     // find the item in the cart
  //     for(let tempcart of this.cartItems){
  //       if(tempcart.idProduit === theCartItem.idProduit){
  //         existingCartItem = tempcart ;
  //         break;
  //       }
  //     }

  //     //check if we found it
  //     alreadyExistsInCart= (existingCartItem != undefined);

  //     if(alreadyExistsInCart){
  //       // increment the quantity 
  //       existingCartItem.quantite++;
  //     }
  //     else{
  //       this.cartItems.push(theCartItem);
  //     }

  //     //compute total price and quantity
  //     this.computeCartTotals();
  //   }
  // }
  // computeCartTotals() {
  //   let totalPriceValue : number = 0;
  //   let totalQuantityValue : number = 0;
    
  //   for(let currentCartItem of this.cartItems){
  //     totalPriceValue += currentCartItem.quantite*currentCartItem.prixUnitaire;
  //     totalQuantityValue+=currentCartItem.quantite;
  //   }

  //   //publish valuese to subscribers 
  //   this.totalPrice.next(totalPriceValue);
  //   this.totalQuantity.next(totalQuantityValue);

  //   this.logCartData(totalPriceValue , totalQuantityValue);
  // }
  // logCartData(totalPriceValue: number, totalQuantityValue: number) {
  //   console.log('content of cart ')
  //   for(let tempCartItem of this.cartItems){
  //     const subTotalPrice = tempCartItem.quantite*tempCartItem.prixUnitaire;
  //     console.log(tempCartItem.libelle)
  //     console.log(tempCartItem.prixUnitaire)
  //     console.log(subTotalPrice)
  //   }
  //   console.log(totalPriceValue)
  //   console.log(totalQuantityValue)
  // }

  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id

      // for (let tempCartItem of this.cartItems) {
      //   if (tempCartItem.idProduit === theCartItem.idProduit) {
      //     existingCartItem = tempCartItem;
      //     break;
      //   }
      // }

      existingCartItem = this.cartItems.find(tempcartitem => tempcartitem.idProduit === theCartItem.idProduit)

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantite++;
    }
    else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantite * currentCartItem.prixUnitaire;
      totalQuantityValue += currentCartItem.quantite;
    }

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantite * tempCartItem.prixUnitaire;
      console.log(`name: ${tempCartItem.libelle}, quantity=${tempCartItem.quantite}, unitPrice=${tempCartItem.prixUnitaire}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }

  decrementQuantity(theCartItem: CartItem) {

    theCartItem.quantite--;

    if (theCartItem.quantite === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {

    // get index of item in the array
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.idProduit === theCartItem.idProduit );

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }
}
