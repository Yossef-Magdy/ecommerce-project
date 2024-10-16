import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private baseURL = '/control/analytics';

  constructor(private http: HttpClient, private toastService: ToastService) { }

  getAnalytics() {
    return this.http.get(this.baseURL).pipe(
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting analytics', 'error');
        return of ([])
      })
    );
  }

  getUpdatedAnalytics() {
    return this.http.put(`${this.baseURL}/update`, '').pipe(
      tap ((result) => {
        console.log(result);
      }),
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting analytics', 'error');
        return of ([])
      })
    );
  }
}
