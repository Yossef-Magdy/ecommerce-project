import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { catchError, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private baseURL = '/control/coupons';

  constructor(private http: HttpClient) { }

  addCoupon(coupon: any) {
    coupon = this.prepareCoupon(coupon); 
    return this.http.post('/control/coupons', coupon).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when adding the coupon");
      })
    );
  }

  getCoupons() {
    return this.http.get('/control/coupons');
  }

  updateCoupon(coupon: any, couponId: number) {
    coupon = this.prepareCoupon(coupon);
    return this.http.put(`${this.baseURL}/${couponId}`, coupon).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when updating the coupon");
      })
    );
  }

  deleteCoupon(couponId: number) {
    return this.http.delete(`${this.baseURL}/${couponId}`).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when deleting the coupon");
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
