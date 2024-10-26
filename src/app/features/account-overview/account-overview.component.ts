import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { AddressService } from '../profile/address.service';
import { BlackButtonComponent } from "../../shared/black-button/black-button.component";
import { OrderHistoryComponent } from "../order-history/order-history.component";
import { Subject, takeUntil } from 'rxjs';
import { OrderService } from '../order-history/order.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-overview',
  standalone: true,
  imports: [BlackButtonComponent, OrderHistoryComponent, DatePipe, RouterLink],
  templateUrl: './account-overview.component.html',
  styleUrl: './account-overview.component.css'
})
export class AccountOverviewComponent {
  @Input() selectedTab: string ='';
  @Output() tabChange = new EventEmitter<string>();
  @Input() addresses: any;
  orders!: any[];
  receivedOrders?: any[];
  private destroyRef = inject(DestroyRef);
  private destroyed$ = new Subject<void>();

  constructor(private addressService: AddressService, private orderService: OrderService) {}

  ngOnInit() {
    this.destroyRef.onDestroy(() => {
      this.destroyed$.next();
      this.destroyed$.complete();
    });

    this.orderService.getOrders()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: any) => {
        console.log(res.data);
        this.orders = res.data;
        this.receivedOrders = res.data.filter((order: any) => order.shipping.status === 'delivered');
        console.log(this.receivedOrders);
      });

    this.addressService.getAddresses()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: any) => {
        console.log(res.data);
        this.addresses = res.data;
      })
  }

  changeTab(tab: string) {
    this.tabChange.emit(tab);
  }
}
