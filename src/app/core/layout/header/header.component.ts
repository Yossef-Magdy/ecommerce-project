import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../../services/cart.service';
import { AuthService } from '../../auth/services/auth.service';

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
  validLogin: boolean = false;

  constructor(private cartService:CartService, private authService: AuthService){}

  ngOnInit(){
    this.cartService.getItems().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotalQuantity();
    });
    this.authService.checkUser().subscribe();
    this.authService.validLogin.subscribe((value: boolean) => {
      this.validLogin = value;
    })
  }

  calculateTotalQuantity(): void{
    this.totalQuantity = this.cartItems.reduce((total , cartItem) => total + cartItem.quantity, 0);
  }

}
