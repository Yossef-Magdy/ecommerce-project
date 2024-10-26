import { Component } from '@angular/core';
import { BlackButtonComponent } from "../../shared/black-button/black-button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../profile/user.service';
import { ToastService } from '../../core/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-username',
  standalone: true,
  imports: [BlackButtonComponent, ReactiveFormsModule],
  templateUrl: './change-username.component.html',
  styleUrl: './change-username.component.css'
})
export class ChangeUsernameComponent {
changeNameForm!: FormGroup;

errorMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private toastService: ToastService, private router: Router) {}

  ngOnInit(): void {
    this.changeNameForm = this.fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]]
    });

    this.userService.getUserData().subscribe(
      (userData) => {
        this.changeNameForm.patchValue({
          fname: userData.first_name,
          lname: userData.last_name
        });
      },
      (error) => {
        this.errorMessage = 'Error fetching user data';
      }
    );
  }

  onSubmit() {
    if (this.changeNameForm.valid) {
      const { fname, lname } = this.changeNameForm.value;
      this.userService.updateUserName({ firstName: fname, lastName: lname }).subscribe(
        (response) => {
          this.toastService.showToast('Username updated successfully', 'success');
          this.changeNameForm.reset();
          this.router.navigate(['/profile']);
        },
        (error) => {
          this.toastService.showToast('Error updating username', 'error');
    });
    }
  }
}
