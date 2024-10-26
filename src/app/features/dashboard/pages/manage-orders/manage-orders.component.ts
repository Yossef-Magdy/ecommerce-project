import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { initModals } from 'flowbite';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { ButtonComponent } from "../../../../shared/button/button.component";
import { PaginationComponent } from "../../../../shared/pagination/pagination.component";
import { PaginationService } from '../../../../shared/pagination/services/pagination.service';
import { DatePipe } from '@angular/common';
import { MyCurrencyPipe } from '../../../../pipes/my-currency.pipe';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [ReactiveFormsModule, LabelComponent, BlackButtonComponent, ButtonComponent, PaginationComponent, DatePipe, MyCurrencyPipe],
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.css'
})
export class ManageOrdersComponent {
  shippingStatus = ['pending', 'processing', 'shipped', 'delivered', 'canceled'];
  paymentStatus = ['pending', 'processing', 'completed', 'canceled', 'incomplete', 'succeeded'];
  orders?: any;
  currentOrder: any;

  orderForm = new FormGroup({
    id: new FormControl(-1),
    shipping_status: new FormControl(''),
    payment_status: new FormControl('pending'),
  });
  from: number = 0;
  to: number = 0;
  total: number = 0;
  currentPage: number = 1;
  prev?: any;
  next?: any;

  constructor(private orderService: OrderService, private paginationService: PaginationService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe((result: any) => {
      this.orders = result.data;
      this.buildPagination(result);
      setTimeout(() => {
        initModals();
      }, 100);
    });
  }

  load = (url: any) => {
    if (url) {
      this.paginationService.load(url).subscribe((result: any) => {
        this.orders = result.data;
        this.buildPagination(result);
        setTimeout(() => {
          initModals();
        }, 50);
      });
    }
  }

  selectOrder(order: any) {
    this.currentOrder = order;
  }

  updateForm() {
    if (this.currentOrder) {
      this.orderForm.patchValue({
        id: this.currentOrder.id,
        shipping_status: this.currentOrder.shipping.status.toLowerCase(),
        payment_status: this.currentOrder.payment.status.toLowerCase(),
      });
    }
  }

  updateOrder() {
    const id = this.currentOrder.id;
    this.orderService.updateOrder(this.orderForm.value, id).subscribe((response: any) => {
      const data = response.data;
      this.orders = this.orders.map((governorate: any) => governorate.id == data.id ? data : governorate);
    })
  }

  buildPagination(data: any) {
    this.currentPage = data.meta.current_page;
    this.from = data.meta.from;
    this.to = data.meta.to;
    this.total = data.meta.total;
    this.prev = data.links.prev;
    this.next = data.links.next;
  }
}
