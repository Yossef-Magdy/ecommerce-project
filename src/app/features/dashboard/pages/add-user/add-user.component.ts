import { Component } from '@angular/core';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { UserService } from '../../services/user.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [LabelComponent, ReactiveFormsModule, BlackButtonComponent, NgSelectModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

  constructor(private userSerivce: UserService) {}

  userForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    roles: new FormControl([]),
    permissions: new FormControl([]),
  });

  roles?: any;
  permissions?: any;

  ngOnInit() {
    this.userSerivce.getRoles().subscribe((value: any) => {
      this.roles = value.data;
    });
    this.userSerivce.getPermissions().subscribe((value: any) => {
      this.permissions = value.data;
    });
  }

  message?: string;
  isErrorMessage?: boolean;

  get email() {
    return this.userForm.controls['email'];
  }

  get firstName() {
    return this.userForm.controls['first_name'];
  }

  get lastName() {
    return this.userForm.controls['last_name'];
  }

  get password() {
    return this.userForm.controls['password'];
  }

  submit() {
    if (this.userForm.invalid) {
      return;
    }
    this.userSerivce.addUser(this.userForm.value).subscribe((result: boolean) => {
      if (result) {
        this.userForm.reset();
      }
    });
  }
}
