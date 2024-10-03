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
  validLogin: boolean = false;
  userData?: any;
  
  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.checkUser().subscribe({
      next: (response) => {
        this.validLogin = true;
        this.userData = this.authService.getUserData();
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  isAdmin(): boolean {
    if (!this.userData) {
      return false;
    }
    const result = this.userData.roles.find((role: any) => role.name == 'admin');
    return result !== undefined;
  }

  hasRoles(): boolean {
    if (this.userData == null) {
      return false;
    }
    return this.userData.roles.length != 0;
  }
  getRoles(): string {
    if (this.userData == null) {
      return "";
    }
    const roles = this.userData.roles;
    return roles.length == 1 ? roles[0].name : roles[0].name + " ...";
  }
}
