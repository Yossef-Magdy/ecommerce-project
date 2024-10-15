import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';
@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private baseURL = '/control/coupons';

  constructor(private http: HttpClient, private toastService: ToastService) { }

  addCoupon(coupon: any) {
    return this.http.post(this.baseURL, coupon).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      map((result: any) => true),
      catchError((error: any) => of(false))
    );
  }

  getCoupons() {
    return this.http.get(this.baseURL).pipe(
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting coupons', 'error');
        return of ([])
      })
    );
  }

  updateCoupon(coupon: any, couponId: number) {
    return this.http.put(`${this.baseURL}/${couponId}`, coupon).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }), 
      catchError((error: any) => of(false))
    );
  }

  deleteCoupon(couponId: number) {
    return this.http.delete(`${this.baseURL}/${couponId}`).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      map((result: any) => true),
      catchError((error: any) => of(false))
    );
  }
}
