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
    // calculateTotalPrice();
  }

  deleteItem(productId: number){
    this.cartService.deleteItem(productId);
    // calculateTotalPrice();
  }


  ngOnInit(){
    this.cartService.getItems().subscribe((items)=>{
      this.data = items;
      // calculateTotalPrice();
    })
  }
}
