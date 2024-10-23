import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private baseURL = '/control/discounts';

  constructor(private http: HttpClient, private toastService: ToastService) { }

  addDiscount(discount: any) {
    return this.http.post(this.baseURL, discount).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      catchError((error: any) => of(false))
    );
  }

  getDiscounts() {
    return this.http.get(this.baseURL).pipe(
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting discounts', 'error');
        return of ([])
      })
    );
  }

  updateDiscount(discount: any, discountId: number) {
    return this.http.put(`${this.baseURL}/${discountId}`, discount).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }), 
      catchError((error: any) => of(false))
    );
  }

  deleteDiscount(discountId: number) {
    return this.http.delete(`${this.baseURL}/${discountId}`).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      map((result: any) => true),
      catchError((error: any) => of(false))
    );
  }
}
