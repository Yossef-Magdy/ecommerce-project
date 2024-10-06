import { Component } from '@angular/core';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [LabelComponent, ReactiveFormsModule, BlackButtonComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

  constructor(private userSerivce: UserService) {}

  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  message?: string;
  isErrorMessage?: boolean;

  get email() {
    return this.userForm.controls['email'];
  }

  get firstName() {
    return this.userForm.controls['firstName'];
  }

  get lastName() {
    return this.userForm.controls['lastName'];
  }

  get password() {
    return this.userForm.controls['password'];
  }

  submit() {
    if (this.userForm.invalid) {
      return;
    }
    this.userSerivce.addUser(this.userForm.value).subscribe((response: any) => {
      console.log('response is', response);
      if (response.message) {
        this.isErrorMessage = false;
        this.message = response.message;
      } else {
        this.isErrorMessage = true;
        const key = Object.keys(response)[0];
        this.message = response[key][0];
      }
    });
  }
}
