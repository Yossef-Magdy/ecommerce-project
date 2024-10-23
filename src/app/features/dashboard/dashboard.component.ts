import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { AnalyticsService } from './services/analytics.service';
import { ChartModule } from 'primeng/chart';
import { BestSellerService } from './services/best-seller.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyCurrencyPipe } from '../../pipes/my-currency.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule, ReactiveFormsModule, MyCurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userData?: any;
  analytics?: any;
  bestSeller?: any;
  ordersData?: any = [];
  earningData?: any = [];
  options?: any;
  durationForm: FormGroup;
  constructor(
    private authService: AuthService, 
    private analyticsService: AnalyticsService,
    private bestSellerService: BestSellerService,
  ) {
      this.durationForm = new FormGroup({
        duration: new FormControl('week')
      });

      this.duration.valueChanges.subscribe((result: any) => {
        this.getAnalytics();
      });
      
      this.options = {
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        scales: {
            x: {
                ticks: {
                    color: '#000000'
                },
                grid: {
                    color: 'rgba(50,50,50,0.1)'
                }
            },
            y: {
                ticks: {
                    color: '#000000'
                },
                grid: {
                    color: 'rgba(50,50,50,0.1)'
                }
            },
        }
    };
  }

  ngOnInit() {
    this.authService.userData.subscribe((result: any) => {
      this.userData = result;
    });
    this.getAnalytics();
    this.bestSellerService.getBestSeller().subscribe((result: any) => {
      this.bestSeller = result;
    });
  }

  getAnalytics() {
    switch(this.duration.value) {
      case 'week':
        this.getLastWeekAnalytics();
        break;
      case 'month':
        this.getLastMonthAnalytics();
        break;
      case '6months':
        this.getLast6MonthsAnalytics();
        break;
      case 'year':
        this.getLastYearAnalytics();
        break;
      default:
        console.error('something went wrong');
    }
    
  }

  getLastWeekAnalytics() {
    this.analyticsService.getLastWeekAnalytics().subscribe((result: any) => {
      const statistics = result.statistics;
      this.analytics = this.calculateSum(statistics);
      this.calculateData(statistics);
    });
  }

  getLastMonthAnalytics() {
    this.analyticsService.getLastMonthAnalytics().subscribe((result: any) => {
      const statistics = result.statistics;
      this.analytics = this.calculateSum(statistics);
      this.calculateData(statistics);
    });
  }

  getLastYearAnalytics() {
    this.analyticsService.getLastYearAnalytics().subscribe((result: any) => {
      const statistics = result.statistics;
      this.analytics = this.calculateSum(statistics);
      this.calculateData(statistics);
    });
  }

  getLast6MonthsAnalytics() {
    this.analyticsService.getLast6MonthsAnalytics().subscribe((result: any) => {
      const statistics = result.statistics;
      this.analytics = this.calculateSum(statistics);
      this.calculateData(statistics);
    });
  }

  calculateSum(statistics: any) {
    const initialValue = {
      total_earning: 0,
      total_orders: 0,
      total_refunded: 0,
      total_users: 0,
    };
    return statistics.reduce((sum: any, element: any) => {
      sum.total_earning += element.total_earning;
      sum.total_orders += element.total_orders;
      sum.total_refunded += element.total_refunded;
      sum.total_users += element.total_users;
      return sum;
    }, initialValue);
  }

  get duration() {
    return this.durationForm.controls['duration'];
  }

  private calculateData(result: any) {
    this.ordersData = {
      labels: result.map((element: any) => element.date),
      datasets: [
        {
          label: 'Orders',
          borderColor: '#3f83f8',
          yAxisID: 'y',
          tension: 0.4,
          data: result.map((element: any) => element.total_orders)
        }
      ]
    };
    this.earningData = {
      labels: result.map((element: any) => element.date),
      datasets: [
        {
          label: 'Earnings',
          borderColor: '#3f83f8',
          backgroundColor: '#3f83f8',
          yAxisID: 'y',
          data: result.map((element: any) => element.total_earning)
        },
        {
          label: 'Refunds',
          borderColor: '#0e9f6e',
          backgroundColor: '#0e9f6e',
          yAxisId: 'y',
          data: result.map((element: any) => element.total_refunded)
        }
      ]
    }; 
  }
}
