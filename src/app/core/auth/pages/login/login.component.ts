import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormButtonComponent } from "../../components/form-button/form-button.component";
import { LabelComponent } from "../../components/label/label.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormButtonComponent, RouterLink, LabelComponent],
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
