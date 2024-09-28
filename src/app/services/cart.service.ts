import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem{
  product: any;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { }
  private items = new BehaviorSubject<CartItem[]>([]);

  addToCart(product: any, quantity: number = 1){
    const updatedItems = this.items.value.map((item) => {
      if (item.product.id === product.id){
        const newQuantity = item.quantity + quantity;
        return {
          ...item,
          quantity: newQuantity > item.product.stock ? item.product.stock : newQuantity,
        };
      }
      return item;
    });

    if (!updatedItems.find((item) => item.product.id === product.id)){
      updatedItems.push({product, quantity});
    }

    this.items.next(updatedItems);
  }
  

  updateQuantity(productId: number, quantity: number){
    const updatedItems = this.items.value.map((item) => {
      if (item.product.id === productId) {
        return {
          ...item,
          quantity:
            quantity > item.product.stock ? item.product.stock : quantity,
        };
      }
      return item;
    });

    this.items.next(updatedItems);
  }

  getItems(){
    return this.items.asObservable();
  }
  
  getQuantity(productId: number): number{
    const item = this.items.value.find((item)=> item.product.id === productId);
    return item? item.quantity : 0;
  }

  deleteItem(productId: number){
    const updatedItems = this.items.value.filter((item) => item.product.id !== productId);

    this.items.next(updatedItems);
  }
}