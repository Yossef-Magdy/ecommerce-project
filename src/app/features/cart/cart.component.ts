import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartEmitter, CartItemComponent } from "./cart-item/cart-item.component";
import { BlackButtonComponent } from "../../shared/black-button/black-button.component";
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CartItemComponent, BlackButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  data : CartItem[] = [];
  totalPrice: number = 0;
  constructor(private cartService: CartService){}

  updateQuantity(info: CartEmitter){
    this.cartService.updateQuantity(
      this.data[info.index].product.id,
      info.quantity
    );
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void{
    this.totalPrice = Number(
      this.data.reduce((total, cartItem) => {
        const discount = cartItem.product.discountPercentage ? 1 - cartItem.product.discountPercentage / 100 : 1;
        return (total + cartItem.quantity * (cartItem.product.price * discount));

      }, 0).toFixed(2),
    );
  }

  deleteItem(productId: number){
    this.cartService.deleteItem(productId);
    this.calculateTotalPrice();
  }


  ngOnInit(){
    this.cartService.getItems().subscribe((items)=>{
      this.data = items;
      this.calculateTotalPrice();
    });
  }
}
