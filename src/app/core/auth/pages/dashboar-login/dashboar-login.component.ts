import { Component } from '@angular/core';
import { LabelComponent } from "../../components/label/label.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlackButtonComponent } from '../../../../shared/black-button/black-button.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-dashboar-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BlackButtonComponent,
    RouterLink,
    LabelComponent,
  ],  templateUrl: './dashboar-login.component.html',
  styleUrl: './dashboar-login.component.css'
})
export class DashboarLoginComponent {
  errorMessage?: string;

  constructor(private authService: AuthService) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(8)]),
  });

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.dashboardLogin(this.loginForm.value).subscribe({
      error: (error) => {
        if (error.status == HttpStatusCode.Unauthorized) {
          this.errorMessage = error.error.message;
        } else if (error.status == HttpStatusCode.BadRequest) {
          this.errorMessage = 'Some fields are missing'
        }
      },
    });
  }
}
