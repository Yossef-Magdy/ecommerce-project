import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../data-interfaces';
import { ToastService } from '../core/services/toast.service';

export interface CartItem {
  productDetailId: number;
  productSlug: string;
  coverImg: string;
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

  constructor(private toastService: ToastService) { }

  private items = new BehaviorSubject<CartItem[]>([]);

  addToCart(cartItem: CartItem) {
    const currentItems = this.items.value;
    
    const existingItem = currentItems.find((item) => item.productDetailId === cartItem.productDetailId);
  
    if (existingItem) {
      // If the item exists, update its quantity
      const newQuantity = existingItem.quantity + cartItem.quantity;

      if (newQuantity > existingItem.stock) {
        this.toastService.showToast("Not enough stock", 'error');
      }
      else{
        // Ensure the new quantity doesn't exceed the stock
        existingItem.quantity = newQuantity > existingItem.stock ? existingItem.stock : newQuantity;
      }
      
    } else {
      // If the item does not exist, add it to the cart
      currentItems.push(cartItem);
    }
  
    // Emit the updated cart items
    this.items.next([...currentItems]);
  }

  updateQuantity(productDetailId: number, quantity: number) {
    const updatedItems = this.items.value.map((item) => {
      if (item.productDetailId === productDetailId) {
        return {
          ...item,
          quantity:
            quantity > item.stock ? item.stock : quantity,
        };
      }
      return item;
    });
    this.items.next(updatedItems);
  }

  getItems() {
    return this.items.asObservable();
  }

  getQuantity(productDetailId: number): number {
    const item = this.items.value.find(
      (item) => item.productDetailId === productDetailId
    );
    return item ? item.quantity : 1;
  }

  deleteItem(productDetailId: number) {
    const updatedItems = this.items.value.filter(
      (item) => item.productDetailId !== productDetailId
    );
    this.items.next(updatedItems);
  }

  clearItems(): void {
    this.items.next([]);
  }

}