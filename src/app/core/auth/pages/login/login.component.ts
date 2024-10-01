import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BlackButtonComponent } from '../../../../shared/black-button/black-button.component';
import { LabelComponent } from "../../components/label/label.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, BlackButtonComponent, RouterLink, LabelComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(5)]),
  });
  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }
}
