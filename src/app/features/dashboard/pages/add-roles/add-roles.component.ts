import { Component } from '@angular/core';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { UserService } from '../../services/user.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-add-roles',
  standalone: true,
  imports: [LabelComponent, ReactiveFormsModule, BlackButtonComponent, NgSelectModule],
  templateUrl: './add-roles.component.html',
  styleUrl: './add-roles.component.css'
})
export class AddRolesComponent {
  constructor(private userSerivce: UserService) {}

  roleForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    permissions: new FormControl('', [Validators.required]),
  });

  message?: string;
  isErrorMessage?: boolean;
  permissions?: any;

  ngOnInit() {
    this.userSerivce.getPermissions().subscribe((result: any) => {
      this.permissions = result.data;
    });
  }

  get name() {
    return this.roleForm.controls['name'];
  }

  submit() {
    if (this.roleForm.invalid) {
      return;
    }
    this.userSerivce.addRole(this.roleForm.value).subscribe((response: any) => {
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