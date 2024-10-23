import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartEmitter, CartItemComponent } from "./cart-item/cart-item.component";
import { BlackButtonComponent } from "../../shared/black-button/black-button.component";
import { CartService, CartItem } from '../../services/cart.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CartItemComponent, BlackButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  data : CartItem[] = [];
  subTotalPrice: number = 0;
  private destroy$ = new Subject<void>();
  
  constructor(private cartService: CartService){}

  updateQuantity(updatedItem: { productDetailId: number, quantity: number }) {
    this.cartService.updateQuantity(updatedItem.productDetailId, updatedItem.quantity);
    this.calculatesubTotalPrice();
  }

  calculatesubTotalPrice() {
    this.subTotalPrice = this.data.reduce((total, item) => {
      if (item.priceAfterDiscount) return total + item.priceAfterDiscount * item.quantity;
      return total + item.price * item.quantity;
    }, 0);
  }

  deleteItem(productDetailId: number){
    this.cartService.deleteItem(productDetailId);
    this.calculatesubTotalPrice();
  }


  ngOnInit(){
    this.cartService.getItems().pipe(takeUntil(this.destroy$))
    .subscribe((items:CartItem[])=>{
      this.data = items;
      this.calculatesubTotalPrice();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
