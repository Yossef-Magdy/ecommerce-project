import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BlackButtonComponent } from '../../../../shared/black-button/black-button.component';
import { LabelComponent } from '../../components/label/label.component';
import { AuthService } from '../../services/auth.service';
import { HttpStatusCode } from '@angular/common/http';
import { UserService } from '../../../../features/profile/user.service';
import { CartItem, CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BlackButtonComponent,
    RouterLink,
    LabelComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorMessage?: string;

  constructor(private authService: AuthService, private userService: UserService, private cartService: CartService) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(8)]),
  });

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) =>{
        this.userService.getCartItems().subscribe((items) => {
          console.log("Cart items of user:", items);
          if (items.length){
            items.forEach((item: CartItem) => {
              this.cartService.addToCart({
                productDetailId: item.productDetailId,
                productSlug: item.productSlug,
                coverImg: item.coverImg,
                name: item.name,
                color: item.color,
                size: item.size,
                price: item.price,
                stock: item.stock,
                quantity: item.quantity,
              });
            });
          }
        });
      },
      error: (error) => {
        if (error.status == HttpStatusCode.Unauthorized) {
          this.errorMessage = error.error.message;
        } else if (error.status == HttpStatusCode.BadRequest) {
          this.errorMessage = 'Some fields are missing'
        }
      },
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe({
      error: (error) => {
        if (error.status == HttpStatusCode.Unauthorized) {
          this.errorMessage = error.error.message;
        } else if (error.status == HttpStatusCode.BadRequest) {
          console.error('Google login failed', error);
          this.errorMessage = 'Google login failed';
        }
      },
    });
  }
}
