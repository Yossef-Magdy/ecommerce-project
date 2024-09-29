import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartItems: CartItem[] = [];
  totalQuantity: number = 0;

  constructor(private cartService:CartService){}

  ngOnInit(){
    this.cartService.getItems().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotalQuantity();
    })
  }

  calculateTotalQuantity(): void{
    this.totalQuantity = this.cartItems.reduce((total , cartItem) => total + cartItem.quantity, 0);
  }

}
