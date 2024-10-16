import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseURL = '/control/orders';

  constructor(private http: HttpClient, private toastService: ToastService) { }

  getOrders() {
    return this.http.get(this.baseURL).pipe(
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting orders', 'error');
        return of ([])
      })
    );
  }

  updateOrder(data:any, orderId: number) {
    return this.http.put(`${this.baseURL}/${orderId}`, data).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      catchError((error: any) => of(false))
    );
  }
}
