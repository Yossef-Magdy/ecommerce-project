import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userData: any;
  constructor(private authService: AuthService) {}
  ngAfterInit() {
    this.userData = this.authService.getUserData();
    console.log(this.userData);
  }
  ngOnInit() {
  }
}
