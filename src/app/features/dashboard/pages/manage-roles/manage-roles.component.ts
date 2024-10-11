import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { initModals } from 'flowbite';
import { PaginationComponent } from "../../../../shared/pagination/pagination.component";
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { ButtonComponent } from "../../../../shared/button/button.component";

@Component({
  selector: 'app-manage-roles',
  standalone: true,
  imports: [PaginationComponent, ReactiveFormsModule, LabelComponent, NgSelectModule, BlackButtonComponent, ButtonComponent],
  templateUrl: './manage-roles.component.html',
  styleUrl: './manage-roles.component.css'
})
export class ManageRolesComponent {
  roles?: any = [];
  currentRole: any;
  permissions?: any = [];

  roleForm = new FormGroup({
    id: new FormControl(-1),
    name: new FormControl(''),
    permissions: new FormControl([]),
  });

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getRoles().subscribe((result: any) => {
      this.roles = result.data;
      console.log(result);
      setTimeout(() => {
        initModals();
      }, 50);
    });
    this.userService.getPermissions().subscribe((value: any) => {
      this.permissions = value.data;
    });
  }

  selectRole(role: any) {
    this.currentRole = role;
  }

  updateForm() {
    if (this.currentRole) {
      this.roleForm.patchValue({
        id: this.currentRole.id,
        name: this.currentRole.name,
        permissions: this.currentRole.permissions.map((permission: any) => permission.id),
      });
    }
  }

  updateRole() {
    const id = this.currentRole.id;
    this.userService.updateRole(this.roleForm.value, id).subscribe((response) => {
      console.log(response);
    });
  }

  removeRole() {
    const id = this.currentRole.id;
    this.userService.deleteRole(id).subscribe((response) => {
      console.log(response);
    });
  }
}
