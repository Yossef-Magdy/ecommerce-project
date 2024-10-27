import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { AnalyticsService } from './services/analytics.service';
import { ChartModule } from 'primeng/chart';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyCurrencyPipe } from '../../pipes/my-currency.pipe';

enum Duration {
  WEEK = 7,
  MONTH = 30,
  SIX_MONTH = 6 * 30,
  YEAR = 356,
};
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule, ReactiveFormsModule, MyCurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userData?: any;
  total?: any;
  earningData?: any = [];
  bestSellerData?: any = [];
  earningLength:number = 0;
  bestSellerLength: number = 0;
  options?: any;
  durationForm: FormGroup;
  constructor(
    private authService: AuthService, 
    private analyticsService: AnalyticsService,
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
                    color: 'rgba(50,50,50,0)'
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
  }

  getAnalytics() {
    switch(this.duration.value) {
      case 'week':
        this.getAnalyticsByDays(Duration.WEEK);
        break;
      case 'month':
        this.getAnalyticsByDays(Duration.MONTH);
        break;
      case '6months':
        this.getAnalyticsByDays(Duration.SIX_MONTH);
        break;
      case 'year':
        this.getAnalyticsByDays(Duration.YEAR);
        break;
      default:
        console.error('something went wrong');
    }
    
  }

  getAnalyticsByDays(days: number) {
    this.analyticsService.getAnalyticsByDays(days).subscribe((result: any) => {
      this.total = result.total;
      this.calculateData(result.max_earning, result.best_seller);
    });
  }


  get duration() {
    return this.durationForm.controls['duration'];
  }

  private calculateData(maxEarning: any, bestSeller: any) {
    this.earningLength = maxEarning.length;
    this.bestSellerLength = bestSeller.length;
    this.earningData = {
      labels: maxEarning.map((element: any) => element.date),
      datasets: [
        {
          label: 'Earning',
          borderColor: '#3f83f8',
          backgroundColor: '#3f83f8',
          yAxisID: 'y',
          data: maxEarning.map((element: any) => element.total_earning)
        }
      ]
    };
    this.bestSellerData = {
      labels: bestSeller.map((element: any) => element.product.name),
      datasets: [
        {
          label: 'Quantity',
          borderColor: '#3f83f8',
          backgroundColor: '#3f83f8',
          yAxisID: 'y',
          data: bestSeller.map((element: any) => element.quantity)
        },
      ]
    }; 
  }
}
