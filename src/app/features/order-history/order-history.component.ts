import { Component, DestroyRef, inject } from '@angular/core';
import { OrderService } from './order.service';
import { CommonModule, DatePipe, NgClass, NgSwitch } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { BlackButtonComponent } from "../../shared/black-button/black-button.component";
import { Router } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';
import { ProductReviewsServiceService } from '../product-details/product-reviews/product-reviews-service.service';
import { UserService } from '../profile/user.service';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [NgClass, BlackButtonComponent, NgSwitch, DatePipe, CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  orders!: any[];
  reviewedProducts: Set<number> = new Set();
  showCancelModal = false;
  orderIdToCancel: number | null = null;
  private destroyRef = inject(DestroyRef);
  private destroyed$ = new Subject<void>();

  constructor(private orderService: OrderService,
    private router: Router,
    public toastService: ToastService,
    private productReviewsService: ProductReviewsServiceService,
    private userService: UserService,) { }

    ngOnInit() {
      this.destroyRef.onDestroy(() => {
        this.destroyed$.next();
        this.destroyed$.complete();
      });
      this.loadOrders();
      this.checkUserReviews();
    }

  loadOrders() {
    this.orderService.getOrders()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: any) => {
        this.orders = res.data;
        this.checkUserReviews();
      });
  }
  
  checkUserReviews() {
    this.userService.getUserData().pipe(takeUntil(this.destroyed$)).subscribe(userData => {
      
      if (this.orders && Array.isArray(this.orders)) {
        this.orders.forEach(order => {
          if (order.items && Array.isArray(order.items)) { 
            order.items.forEach((item: any) => {
              this.productReviewsService.getReviewsById(item.product.product_id)
                .pipe(takeUntil(this.destroyed$))
                .subscribe({
                  next: (response) => {
                    const reviews = response.data;

                    if (Array.isArray(reviews)) {
                      const userReview = reviews.find((review: any) => review.reviewer.toLowerCase() === userData.first_name.toLowerCase() + ' ' + userData.last_name.toLowerCase());
                      
                      if (userReview) {
                        this.reviewedProducts.add(item.product.product_id);
                      }
                    }
                  },
                  error: (err) => {
                    console.error('Error fetching reviews:', err);
                  }
                });
            });
          }
        });
      }
    });
  }
  

  openCancelModal(orderId: number) {
    this.showCancelModal = true;
    this.orderIdToCancel = orderId;
  }

  closeCancelModal() {
    this.showCancelModal = false;
    this.orderIdToCancel = null;
  }

  confirmCancel() {
    if (this.orderIdToCancel !== null) {
      this.orderService.cancelOrder(this.orderIdToCancel)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => {
          this.loadOrders();
          this.toastService.showToast('Order cancelled successfully!', 'success');
          this.closeCancelModal();
        }, (error) => {
          this.toastService.showToast('Something went wrong, please try again later.', 'error');
          this.closeCancelModal();
        });
    }
  }

  onAddReview(productId: number) {
    this.router.navigate(['/create-review', productId]);
  }
}
