import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BlackButtonComponent } from '../../../../shared/black-button/black-button.component';
import { LabelComponent } from "../../components/label/label.component";
import { AuthService } from '../../services/auth.service';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, BlackButtonComponent, RouterLink, LabelComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage?: string;

  constructor (private authService: AuthService) {}

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(5)]),
  });

  get firstName() {
    return this.registerForm.controls['firstName'];
  }
  get lastName() {
    return this.registerForm.controls['lastName'];
  }
  get email() {
    return this.registerForm.controls['email'];
  }
  get password() {
    return this.registerForm.controls['password'];
  }
  submit() {
    if (this.registerForm.invalid) {
      return;
    }
    const userData = {
      email: this.email.value,
      password: this.password.value,
      first_name: this.firstName.value,
      last_name: this.lastName.value,
    }
    this.authService.register(userData).subscribe({
      error: (error) => {
        if (error.status == HttpStatusCode.BadRequest) {
          this.errorMessage = 'Some fields are missing'
        }
      },
    });
  }
}
