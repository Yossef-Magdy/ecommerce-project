import { Component, CSP_NONCE, DoCheck, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../../services/cart.service';
import { AuthService } from '../../auth/services/auth.service';
import { HttpStatusCode } from '@angular/common/http';

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
  hasRolesOrPermissions?: boolean = false;

  constructor(private cartService:CartService, private authService: AuthService){}

  ngOnInit(){
    this.cartService.getItems().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotalQuantity();
    });
    this.authService.checkUser().subscribe((isValid: boolean) => {
      this.validLogin = isValid;
      if (this.validLogin) {
        const userData = this.authService.getUserData();
        this.hasRolesOrPermissions = userData.roles.length || userData.permissions.length;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  calculateTotalQuantity(): void{
    this.totalQuantity = this.cartItems.reduce((total , cartItem) => total + cartItem.quantity, 0);
  }

}
