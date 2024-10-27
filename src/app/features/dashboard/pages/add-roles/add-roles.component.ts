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
    permissions: new FormControl(''),
  });

  permissions?: any;

  ngOnInit() {
    this.userSerivce.getPermissions().subscribe((result: any) => {
      this.permissions = result.data;
    });
  }

  get name() {
    return this.roleForm.controls['name'];
  }

  get rolePermissions() {
    return this.roleForm.controls['permissions'];
  }

  submit() {
    this.roleForm.markAllAsTouched();
    if (this.roleForm.invalid) {
      return;
    }
    const data = this.roleForm.value;
    if (!this.rolePermissions.value) {
      delete data['permissions'];
    }
    this.userSerivce.addRole(data).subscribe((result: boolean) => {
      if (result) {
        this.roleForm.reset();
      }
    });
  }
}