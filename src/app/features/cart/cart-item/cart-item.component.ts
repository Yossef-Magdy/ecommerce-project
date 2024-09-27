import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  @Input() cartItem!: any[];
  @Input() index!: number;

  productSlug = 'product-slug';

  // decreaseQuantity(){
  //   if (this.cartItem.quantity > 0){
  //     this.cartItem.quantity--;
  //     this.onUpdateQuantity();
  //   }
  // }

  // increaseQuantity(){
  //   if (this.cartItem.quantity < this.cartItem.product.stock){
  //     this.cartItem.quantity++;
  //     this.onUpdateQuantity();
  //   }
  // }

  removeItem() {}

  onUpdateQuantity() {}
}
