import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { catchError, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CouponService {

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

  private prepareCoupon(coupon: any) {
    return {
      coupon_code: coupon.couponCode,
      uses_count: coupon.usesCount,
      discount_type: coupon.discountType, 
      discount_value: coupon.discountValue,
      expiry_date: coupon.expiryDate,
    };
  }
}
