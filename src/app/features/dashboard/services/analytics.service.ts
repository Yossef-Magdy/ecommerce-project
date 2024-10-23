import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private baseURL = '/control/analytics';

  constructor(private http: HttpClient, private toastService: ToastService) { }

  getAnalytics() {
    return this.http.get(this.baseURL);
  }

  getLastWeekAnalytics() {
    return this.getAnalyticsByDays(7);
  }

  getLastMonthAnalytics() {
    return this.getAnalyticsByDays(30);
  }
  
  getLastYearAnalytics() {
    return this.getAnalyticsByDays(356);
  }

  getLast6MonthsAnalytics() {
    return this.getAnalyticsByDays(6 * 30);
  }

  getAnalyticsBetween(from: any, to: any) {
    return this.http.get(`${this.baseURL}/statistics/range`, {
      params: {
        from: from,
        to: to,
      }
    });
  }

  getAnalyticsByDays(days: number) {
    return this.http.get(`${this.baseURL}/statistics/days`, {
      params: {
        days: days,
      }
    }).pipe(
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting analytics', 'error');
        return of ([])
      })
    );
  }
}
