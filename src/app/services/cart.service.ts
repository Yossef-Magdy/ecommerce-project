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
    const updatedItem = this.items.value.find((item) => item.productDetailId === cartItem.productDetailId);
    console.log("updated item", updatedItem);
    
    if (!updatedItem) {
      return this.items.value.push(cartItem);
    }

    const newQuantity = updatedItem.quantity + cartItem.quantity;
    if (newQuantity > updatedItem.stock) return this.toastService.showToast("not enough stock", 'error');
    updatedItem.quantity = newQuantity > updatedItem.stock ? updatedItem.stock : newQuantity;

    this.items.next(this.items.value);
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