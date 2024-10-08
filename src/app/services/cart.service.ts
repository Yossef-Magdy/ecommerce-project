import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../data-interfaces';

export interface CartItem {
  productId: number;
  productSlug: string;
  coverImg:string;
  name: string;
  color: string;
  size: string;
  price: number;
  stock: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items = new BehaviorSubject<CartItem[]>([]);

  addToCart(cartItem: CartItem) {
    const updatedItems = this.items.value.map((item) => {
      if (
        item.productId === cartItem.productId &&
        item.color === cartItem.color &&
        item.size === cartItem.size
      ) {
        const newQuantity = item.quantity + cartItem.quantity;
        return {
          ...item,
          quantity: newQuantity > item.price ? item.price : newQuantity,
        };
      }
      return item;
    });

    // If the item with the same color and size doesn't exist, add it to the cart
    if (
      !updatedItems.find(
        (item) =>
          item.productId === cartItem.productId &&
          item.color === cartItem.color &&
          item.size === cartItem.size
      )
    ) {
      updatedItems.push(cartItem);
    }

    this.items.next(updatedItems);
  }

  updateQuantity(productId: number, quantity: number) {
    const updatedItems = this.items.value.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity:
            quantity > item.price ? item.price : quantity,
        };
      }
      return item;
    });

    this.items.next(updatedItems);
  }

  getItems() {
    return this.items.asObservable();
  }

  getQuantity(productId: number): number {
    const item = this.items.value.find(
      (item) => item.productId === productId
    );
    return item ? item.quantity : 1;
  }

  deleteItem(productId: number) {
    const updatedItems = this.items.value.filter(
      (item) => item.productId !== productId
    );
    this.items.next(updatedItems);
  }
}