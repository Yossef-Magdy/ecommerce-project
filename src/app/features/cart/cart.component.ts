import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { BlackButtonComponent } from "../../shared/black-button/black-button.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CartItemComponent, BlackButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  data = ["m"];
  totalPrice: number = 0;

}
