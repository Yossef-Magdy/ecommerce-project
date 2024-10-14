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

  submit() {
    this.couponForm.markAllAsTouched();
    if (this.couponForm.invalid) {
      return;
    }
    this.couponSerivce.addCoupon(this.couponForm.value).subscribe((result: boolean) => {
      if (result) {
        this.couponForm.reset();
      }
    });
  }
}