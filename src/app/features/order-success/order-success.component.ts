import { Component } from '@angular/core';
import { OrderService } from './service/order.service';
import { MyCurrencyPipe } from '../../pipes/my-currency.pipe';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [MyCurrencyPipe, NgIf],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.css'
})
export class OrderSuccessComponent {
  order: any = {
    "message": "Order created successfully",
    "data": {
        "id": 91,
        "paid_amount": 0,
        "outstanding_amount": 207,
        "total_price": 207,
        "shipping": {
            "status": "Pending",
            "shipping_detail": {
                "id": 17,
                "city": "Hawamdia",
                "address": "11st, Hawamdia, Giza, Egypt",
                "apartment": "5",
                "postal_code": "12916",
                "phone_number": "01127152192",
                "is_default": true,
                "governorate": "giza"
            }
        },
        "payment": {
            "method": "cod",
            "status": "Incomplete"
        },
        "coupon": null,
        "items": [
            {
                "item_id": 101,
                "size": "2-3",
                "color": "brown",
                "material": "quick-drying fabric",
                "quantity": 1,
                "price": 220,
                "total_price": 187,
                "discount": 33,
                "product": {
                    "product_detail_id": 34,
                    "product_id": 14,
                    "name": "Kids Swim Shorts",
                    "description": "These kids swim shorts offer comfort and style for your little ones. Made from high-quality materials, they provide a secure fit and quick-drying fabric for hours of fun in the water. The perfect choice for any active child! The model is 1.88 m wearing size L",
                    "image": "http://127.0.0.1:8000/cover/pjcZISFzeRkXMHJkKBKLe5lcZpok6SiWi35YXcRl.webp",
                    "price": 220
                }
            }
        ],
        "created_at": "2024-10-26T19:28:33.000000Z",
        "updated_at": "2024-10-26T19:28:33.000000Z"
    },
    "success": true,
    "charge": null
}

orderSummary: any = this.order.data.items;
orderOverall: any = this.order.data;
shipping: any = this.order.data.shipping.shipping_detail;
payment: any = this.order.data.payment;

  constructor(private orderService:OrderService){}

  ngOnInit() {
    this.orderService.getOrderSummary().pipe().subscribe((order)=>{
      this.order = order.data;
      console.log(order);
      
    })
  }

}
