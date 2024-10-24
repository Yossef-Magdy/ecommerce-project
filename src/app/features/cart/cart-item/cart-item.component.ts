import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../../services/cart.service';
import { ToastService } from '../../../core/services/toast.service';
import { MyCurrencyPipe } from '../../../pipes/my-currency.pipe';

export interface CartEmitter {
  index: number;
  quantity: number;
}

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [RouterLink, MyCurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;
  @Input() index!: number;
  @Output() quantityChangeEmitter = new EventEmitter<{ productDetailId: number, quantity: number }>();
  @Output() deleteItemEmitter = new EventEmitter<number>();

  constructor(private toastService: ToastService){}

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
    else{
      this.toastService.showToast("Not enough stock", "error");
    }
  }

  deleteItem() {
    this.deleteItemEmitter.emit(this.cartItem.productDetailId);
  }

  onUpdateQuantity() {
    this.quantityChangeEmitter.emit({ productDetailId: this.cartItem.productDetailId, quantity: this.cartItem.quantity });
  }

  ngOnInit(){
    console.log(this.cartItem);
  }
}
