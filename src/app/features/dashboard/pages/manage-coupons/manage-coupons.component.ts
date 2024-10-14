import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CouponService } from '../../services/coupon.service';
import { initModals } from 'flowbite';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { ButtonComponent } from "../../../../shared/button/button.component";
import { DatePipe } from '@angular/common';
import { PaginationComponent } from "../../../../shared/pagination/pagination.component";
import { PaginationService } from '../../../../shared/pagination/services/pagination.service';
@Component({
  selector: 'app-manage-coupons',
  standalone: true,
  imports: [ReactiveFormsModule, LabelComponent, BlackButtonComponent, ButtonComponent, DatePipe, PaginationComponent],
  templateUrl: './manage-coupons.component.html',
  styleUrl: './manage-coupons.component.css'
})
export class ManageCouponsComponent {
  coupons?: any = [];
  currentCoupon: any;
  couponForm: FormGroup;

  from: number = 0;
  to: number = 0;
  total: number = 0;
  currentPage: number = 1;
  prev?: any;
  next?: any;
  lastPage: number = 1;

  constructor(private couponService: CouponService, private paginationService: PaginationService) {
    this.couponForm = new FormGroup({
      id: new FormControl(-1),
      couponCode: new FormControl('', [Validators.required]),
      usesCount: new FormControl(50, [Validators.min(50)]),
      discountType: new FormControl('fixed'),
      discountValue: new FormControl(0, [Validators.min(0), this.invalidPercent()]),
      expiryDate: new FormControl(new Date().toISOString().substring(0, 10), [this.pastDate()]),
    });
    this.discountType?.valueChanges.subscribe(() => {
      this.discountValue.updateValueAndValidity();
    });
  }

  ngOnInit() {
    this.couponService.getCoupons().subscribe((result: any) => {
      this.coupons = result.data;
      this.buildPagination(result);
      setTimeout(() => {
        initModals();
      }, 50);
    });
  }

  load = (url: any) => {
    if (url) {
        this.paginationService.load(url).subscribe((result: any) => {
        this.coupons = result.data;
        this.buildPagination(result);
        setTimeout(() => {
          initModals();
        }, 50);
      });
    }
  }

  get couponCode() {
    return this.couponForm.controls['couponCode'];
  }

  get usesCount() {
    return this.couponForm.controls['usesCount'];
  }

  get expiryDate() {
    return this.couponForm.controls['expiryDate'];
  }

  get discountType() {
    if (this.couponForm) {
      return this.couponForm.controls['discountType'];
    }
    return null;
  }

  get discountValue() {
    return this.couponForm.controls['discountValue'];
  }

  pastDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const today = new Date()
      const date = new Date(control.value);
      if (date < today ) {
        return { pastDate: true };
      }
      return null;
    }
  }

  invalidPercent(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.discountType?.value != 'fixed' && control.value > 100) {
        return { invalidPercent: true };
      }
      return null;
    }
  }

  selectCoupon(coupon: any) {
    this.currentCoupon = coupon;
  }

  updateForm() {
    if (this.currentCoupon) {
      this.couponForm.patchValue({
        id: this.currentCoupon.id,
        couponCode: this.currentCoupon.coupon_code,
        usesCount: this.currentCoupon.uses_count,
        discountType: this.currentCoupon.discount_type,
        discountValue: this.currentCoupon.discount_value,
        expiryDate: this.currentCoupon.expiry_date,
      });
    }
  }

  displayDiscount(coupon: any) {
    return coupon.discount_value + (coupon.discount_type == 'fixed' ? '' : '%');
  }

  updateCoupon() {
    const id = this.currentCoupon.id;
    this.couponService.updateCoupon(this.couponForm.value, id).subscribe((response: any) => {
      const data = response.data;
      this.coupons = this.coupons.map((coupon: any) => coupon.id == data.id ? data : coupon);
    })
  }

  removeCoupon() {
    const id = this.currentCoupon.id;
    this.couponService.deleteCoupon(id).subscribe((response) => {
      this.couponService.getCoupons().subscribe((result: any) => {
        this.coupons = result.data;
        this.buildPagination(result);
        setTimeout(() => {
          initModals();
        }, 50);
      });
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
