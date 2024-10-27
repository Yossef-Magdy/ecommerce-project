import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { BlackButtonComponent } from "../../shared/black-button/black-button.component";
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, BlackButtonComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit{
  changePasswordForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  
  onSubmit() {
    this.errorMessage = '';
  
    if (this.changePasswordForm.valid) {
      const { oldPassword, newPassword } = this.changePasswordForm.value;
  
      this.authService.changePassword(oldPassword, newPassword).subscribe(
        (response) => {
            this.toastService.showToast('Password updated successfully', 'success');
            this.router.navigate(['/profile']);
        },
        (error) => {
          if (error.status === 401 && error.error?.message === "wrong password") {
            this.toastService.showToast('Incorrect old password. Please try again.', 'error');
            this.changePasswordForm.get('oldPassword')?.reset();
          } else {
            this.toastService.showToast('An error occurred. Please try again later.', 'error');
          }
        }
      );
    }
  }
  
  
}
