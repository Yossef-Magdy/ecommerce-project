import { Component, viewChild, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-control-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './control-header.component.html',
  styleUrl: './control-header.component.css'
})
export class ControlHeaderComponent {
  curToken: string | null  = null;
  validLogin: boolean = false;
  userData: any;
  
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
    if (!this.authService.tokenExists()) {
      this.validLogin = false;
      return;
    }
    this.authService.getUser().subscribe({
      next: (response) => {
        this.userData = response;
        this.authService.setUserData(response);
        this.validLogin = true;
      },
      error: (error) => {
        this.authService.logout();
        this.validLogin = false;
      }
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
}
