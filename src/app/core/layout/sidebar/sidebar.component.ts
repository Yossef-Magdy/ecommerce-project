import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  curToken: string | null  = null;
  validLogin: boolean = false;
  userData?: any;
  firstName?: string;
  
  constructor(private authService: AuthService){}

  ngOnInit(){
    this.curToken = this.authService.getToken();
    this.isLoggedIn(this.curToken);
  }

  ngDoCheck() {
    if (this.curToken != this.authService.getToken()) {
      this.curToken = this.authService.getToken();
      this.isLoggedIn(this.curToken);
    }
  }

  isLoggedIn(token: string | null) {
    this.authService.isLoggedIn(token).then((result) => {
      this.validLogin = result;
      this.userData = this.authService.getUserData();
      this.firstName = this.userData.first_name;
    }).catch((error) => {
      console.log('error', error);
    });
  }

  hasRole(role: string) {
    return true;
  }

  hasRolesOrPermissions() {
    if (this.userData == null) {
      return false;
    }
    return this.userData.roles.length || this.userData.permissions.length;
  }
  // getUserFirstName() {
  //   return this.userData ? this.userData.first_name : "";
  // }
  hasRoles() {
    if (this.userData == null) {
      return false;
    }
    return this.userData.roles.length;
  }
  getRoles() {
    if (this.userData == null) {
      return "";
    }
    const roles = this.userData.roles;
    return roles.length == 1 ? roles[0].name : roles[0].name + " ...";
  }
}
