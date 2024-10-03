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
export class HeaderComponent implements DoCheck {
  cartItems: CartItem[] = [];
  totalQuantity: number = 0;
  curToken: string | null  = null;
  validLogin?: boolean;
  hasRolesOrPermissions?: boolean;

  constructor(private cartService:CartService, private authService: AuthService){}

  ngOnInit(){
    this.curToken = this.authService.getToken();
    this.isLoggedIn(this.curToken);
    this.cartService.getItems().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotalQuantity();
    });
  }

  ngDoCheck() {
    if (this.curToken != this.authService.getToken()) {
      this.curToken = this.authService.getToken();
      this.isLoggedIn(this.curToken);
    }
  }

  isLoggedIn(token: string | null) {
    this.authService.isLoggedIn(token).then((result) => {
      this.validLogin = result;
      const userData = this.authService.getUserData();
      this.hasRolesOrPermissions = userData.roles.length || userData.permissions.length;
    }).catch((error) => {
      console.log('error', error);
    });
  }

  logout() {
    this.authService.logout();
  }

  calculateTotalQuantity(): void{
    this.totalQuantity = this.cartItems.reduce((total , cartItem) => total + cartItem.quantity, 0);
  }

}
