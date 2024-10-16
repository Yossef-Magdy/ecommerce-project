import { Component, DestroyRef, inject } from '@angular/core';
import { OrderService } from './order.service';
import { DatePipe, NgClass, NgSwitch } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { BlackButtonComponent } from "../../shared/black-button/black-button.component";

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [NgClass, BlackButtonComponent, NgSwitch, DatePipe],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  orders!: any[];
  private destroyRef = inject(DestroyRef);
  private destroyed$ = new Subject<void>();

  constructor(private orderService: OrderService) { }

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
      });
  }
}