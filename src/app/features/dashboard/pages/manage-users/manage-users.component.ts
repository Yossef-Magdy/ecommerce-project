import { Component, DoCheck, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { initModals } from 'flowbite';
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { ButtonComponent } from "../../../../shared/button/button.component";
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { PaginationService } from '../../../../shared/pagination/services/pagination.service';
import { DatePipe } from '@angular/common';
import { PaginationComponent } from "../../../../shared/pagination/pagination.component";

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [BlackButtonComponent, ButtonComponent, LabelComponent, NgSelectModule, ReactiveFormsModule, DatePipe, PaginationComponent],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {

  users?: any;
  currentUser: any;
  roles?: any = [];
  permissions?: any = [];
  
  from: number = 0;
  to: number = 0;
  total: number = 0;
  currentPage: number = 1;
  prev?: any;
  next?: any;
  lastPage: number = 1;
  userForm = new FormGroup({
    id: new FormControl(-1),
    first_name: new FormControl({value: '', disabled: true}),
    last_name: new FormControl({value: '', disabled: true}),
    roles: new FormControl([]),
    permissions: new FormControl([]),
  });

  constructor(private userService: UserService, private paginationService: PaginationService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((result: any) => {
      this.users = result.data;
      this.buildPagination(result);
      setTimeout(() => {
        initModals();
      }, 100);
    });
    this.userService.getRoles().subscribe((value: any) => {
      this.roles = value.data;
    });
    this.userService.getPermissions().subscribe((value: any) => {
      this.permissions = value.data;
    });
  }

  load = (url: any) => {
    if (url) {
      this.paginationService.load(url).subscribe((result: any) => {
        this.users = result.data;
        this.buildPagination(result);
        setTimeout(() => {
          initModals();
        }, 50);
      });
    }
  }

  getRole(user: any) {
    if (user.roles.length) {
      return user.roles[0].name;
    }
    return 'customer';
  }

  selectUser(user: any) {
    this.currentUser = user;
  }

  updateForm() {
    if (this.currentUser) {
      this.userForm.patchValue({
        id: this.currentUser.id,
        first_name: this.currentUser.first_name,
        last_name: this.currentUser.last_name,
        roles: this.currentUser.roles.map((role: any) => role.id),
        permissions: this.currentUser.permissions.map((permission: any) => permission.id),
      });
    }
  }

  updateUser() {
    const id = this.currentUser.id; 
    this.userService.updateUser(this.userForm.value, id).subscribe((response: any) => {
      const data = response.data;
      this.users = this.users.map((user: any) => user.id == data.id ? data : user);
    });
  }

  removeUser() {
    if (!this.currentUser) {
      return;
    }
    const id = this.currentUser.id;
    this.userService.deleteUser(id).subscribe((response) => {
      this.userService.getUsers().subscribe((result: any) => {
        this.users = result.data;
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
