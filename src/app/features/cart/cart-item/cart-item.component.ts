import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../../services/cart.service';

export interface CartEmitter {
  index: number;
  quantity: number;
}

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;
  @Input() index!: number;
  @Output() quantityChangeEmitter = new EventEmitter<{ productDetailId: number, quantity: number }>();
  @Output() deleteItemEmitter = new EventEmitter<number>();

  decreaseQuantity(){
    if (this.cartItem.quantity > 1){
      this.cartItem.quantity--;
      this.onUpdateQuantity();
    }
  }

  increaseQuantity(){
    if (this.cartItem.quantity < this.cartItem.stock){
      this.cartItem.quantity++;
      this.onUpdateQuantity();
    }
  }

  deleteItem() {
    this.deleteItemEmitter.emit(this.cartItem.productDetailId);
  }

  onUpdateQuantity() {
    this.quantityChangeEmitter.emit({ productDetailId: this.cartItem.productDetailId, quantity: this.cartItem.quantity });
  }
}
