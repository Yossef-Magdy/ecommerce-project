import { Component } from '@angular/core';
import { OrderService } from './service/order.service';
import { MyCurrencyPipe } from '../../pipes/my-currency.pipe';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../profile/user.service';
import { GovernorateService } from '../profile/governorate.service';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [MyCurrencyPipe, NgIf, RouterLink],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.css'
})
export class OrderSuccessComponent {
  order!: any;
  orderSummary!: any;
  orderOverall!: any;
  shipping!: any;
  shippingFee: number = 0;
  payment!: any;
  user !: any;

  constructor(private orderService:OrderService, private userService: UserService, private router: Router, private governerateService: GovernorateService){}

  ngOnInit() {
    this.orderService.getOrderSummary().pipe().subscribe((order)=>{
      if (!Object.keys(order).length) this.router.navigate(['/']);
      else{
        this.order = order.data;
        this.orderSummary = order.data.items;
        this.orderOverall = order.data;
        this.shipping = order.data.shipping.shipping_detail; 
        this.payment = order.data.payment;
        this.getShippingCustomFee(order.data.shipping.shipping_detail.governorate);
      }
    });

    this.userService.getUserData().subscribe((res: any) => {
      this.user = res;
    });
  }

  getShippingCustomFee(governorate: string): any{
    this.governerateService.getGovernorates().subscribe(govs => {
      const fee = govs.data.filter((g: any) => g.name === governorate)[0].fee;
      this.shippingFee = fee;
    })
  }

}
