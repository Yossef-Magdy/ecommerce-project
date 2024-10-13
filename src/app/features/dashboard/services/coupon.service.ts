import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';
@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private baseURL = '/control/coupons';

  constructor(private http: HttpClient, private toastService: ToastService) { }

  addCoupon(coupon: any) {
    coupon = this.prepareCoupon(coupon); 
    return this.http.post('/control/coupons', coupon).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return true;
      }), catchError((error: any) => {
        return of(false);
      })
    );
  }

  getCoupons() {
    return this.http.get('/control/coupons').pipe(
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting coupons', 'error');
        return of ([])
      })
    );
  }

  updateCoupon(coupon: any, couponId: number) {
    coupon = this.prepareCoupon(coupon);
    return this.http.put(`${this.baseURL}/${couponId}`, coupon).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return result;
      }), catchError((error: any) => {
        return of(false);
      })
    );
  }

  deleteCoupon(couponId: number) {
    return this.http.delete(`${this.baseURL}/${couponId}`).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return true;
      }), catchError((error: any) => {
        return of(false);
      })
    );
  }

  private prepareCoupon(coupon: any) {
    const new_coupon: any = {
      coupon_code: coupon.couponCode,
      uses_count: coupon.usesCount,
      discount_type: coupon.discountType, 
      discount_value: coupon.discountValue,
      expiry_date: coupon.expiryDate,
    };
    if (coupon.id) {
      new_coupon.id = coupon.id;
    }
    return new_coupon;
  }
}
