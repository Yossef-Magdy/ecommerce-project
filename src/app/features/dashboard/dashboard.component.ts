import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userData?: any;
  analytics?: any;
  constructor(private authService: AuthService, private analyticsService: AnalyticsService) {}
  ngOnInit() {
    this.authService.userData.subscribe((result: any) => {
      this.userData = result;
    });
    this.analyticsService.getAnalytics().subscribe((result: any) => {
      this.analytics = result;
    });
  }
  refresh() {
    this.analyticsService.getUpdatedAnalytics().subscribe((result: any) => {
      this.analytics = result;
    });
  }
}
