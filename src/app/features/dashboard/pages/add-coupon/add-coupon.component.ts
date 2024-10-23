import { Component } from '@angular/core';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { CouponService } from '../../services/coupon.service';
import { fromEvent } from 'rxjs';
@Component({
  selector: 'app-add-coupon',
  standalone: true,
  imports: [LabelComponent, ReactiveFormsModule, BlackButtonComponent],
  templateUrl: './add-coupon.component.html',
  styleUrl: './add-coupon.component.css'
})
export class AddCouponComponent {

  couponForm: FormGroup;

  constructor(private couponSerivce: CouponService) {
    this.couponForm = new FormGroup({
      coupon_code: new FormControl('', [Validators.required, this.alphaDash()]),
      uses_count: new FormControl(50, [Validators.required, Validators.min(50)]),
      discount_type: new FormControl('fixed'),
      discount_value: new FormControl(0, [Validators.min(0), this.invalidPercent()]),
      expiry_date: new FormControl(),
    });
    this.discountType?.valueChanges.subscribe(() => {
      this.discountValue.updateValueAndValidity();
    });
  }

  get couponCode() {
    return this.couponForm.controls['coupon_code'];
  }

  get usesCount() {
    return this.couponForm.controls['uses_count'];
  }

  get expiryDate() {
    return this.couponForm.controls['expiry_date'];
  }

  get discountType() {
    if (this.couponForm) {
      return this.couponForm.controls['discount_type'];
    }
    return null;
  }

  get discountValue() {
    return this.couponForm.controls['discount_value'];
  }

  invalidPercent(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.discountType?.value != 'fixed' && control.value > 100) {
        return { invalidPercent: true };
      }
      return null;
    }
  }

  alphaDash(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const value = control.value;
      const charsRegExp = new RegExp('^([a-zA-Z]|[-_0-9])*$');
      if (!charsRegExp.test(value)) {
        return { notAlphaDash: true }
      }
      return null;
    }
  }

  submit() {
    this.couponForm.markAllAsTouched();
    if (this.couponForm.invalid) {
      return;
    }
    const data = this.couponForm.value;
    if (!this.expiryDate.value) {
      delete data.expiry_date;
    }
    this.couponSerivce.addCoupon(data).subscribe((result: boolean) => {
      if (result) {
        this.couponForm.reset();
      }
    });
  }
}