import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { initModals } from 'flowbite';
import { PaginationComponent } from "../../../../shared/pagination/pagination.component";
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { ButtonComponent } from "../../../../shared/button/button.component";
import { PaginationService } from '../../../../shared/pagination/services/pagination.service';

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

  from: number = 0;
  to: number = 0;
  total: number = 0;
  currentPage: number = 1;
  prev?: any;
  next?: any;

  constructor(private userService: UserService, private paginationService: PaginationService) {}

  ngOnInit() {
    this.userService.getRoles().subscribe((result: any) => {
      this.roles = result.data;
      this.buildPagination(result);
      setTimeout(() => {
        initModals();
      }, 100);
    });
    this.userService.getPermissions().subscribe((value: any) => {
      this.permissions = value.data;
    });
  }

  load = (url: any) => {
    if (url) {
      this.paginationService.load(url).subscribe((result: any) => {
        this.roles = result.data;
        this.buildPagination(result);
        setTimeout(() => {
          initModals();
        }, 50);
      });
    }
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
    this.userService.updateRole(this.roleForm.value, id).subscribe((response: any) => {
      const data = response.data;
      this.roles = this.roles.map((role: any) => role.id == data.id ? data : role);
    });
  }

  removeRole() {
    const id = this.currentRole.id;
    this.userService.deleteRole(id).subscribe((response) => {
      this.userService.getRoles().subscribe((result: any) => {
        this.roles = result.data;
        this.buildPagination(result);
        setTimeout(() => {
          initModals();
        }, 50);
      });
    });
  }

  buildPagination(data: any) {
    this.currentPage = data.meta.current_page;
    this.from = data.meta.from;
    this.to = data.meta.to;
    this.total = data.meta.total;
    this.prev = data.links.prev;
    this.next = data.links.next;
  }
}
