import { Component, CSP_NONCE, DoCheck, EventEmitter, Output } from '@angular/core';
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
export class HeaderComponent implements DoCheck {
  cartItems: CartItem[] = [];
  totalQuantity: number = 0;
  curToken: string | null  = null;
  validLogin: boolean = false;
  userData: any;

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
    if (!this.authService.tokenExists()) {
      this.validLogin = false;
      return;
    }
    this.authService.getUser().subscribe({
      next: (response) => {
        this.userData = response;
        this.authService.setUserData(response);
        this.validLogin = true;
      },
      error: (error) => {
        this.logout();
        this.validLogin = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  hasRolesOrPermissions() {
    if (this.userData == null) {
      return false;
    }
    return this.userData.roles.length || this.userData.permissions.length;
  }

  calculateTotalQuantity(): void{
    this.totalQuantity = this.cartItems.reduce((total , cartItem) => total + cartItem.quantity, 0);
  }

}
