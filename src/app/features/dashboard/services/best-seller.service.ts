import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BestSellerService {
  private baseURL = '/best-seller';

  constructor(private http: HttpClient, private toastService: ToastService) { }

  getBestSeller() {
    return this.http.get(this.baseURL).pipe(
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting analytics', 'error');
        return of ([])
      })
    );
  }
}
