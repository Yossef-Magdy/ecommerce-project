import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, share, tap } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = '/control/products';

  constructor(private http: HttpClient, private toastService: ToastService) { }
  
  addProduct(data: any) {
    return this.http.post(this.baseURL, data).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      map((result: any) => true),
      catchError((error: any) => of(false))
    );
  }

  getProducts() {
    return this.http.get(this.baseURL).pipe(
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting products', 'error');
        return of ([])
      }),
      share()
    );
  }

  getProduct(productId: number) {
    return this.http.get(`${this.baseURL}/${productId}`).pipe(
      catchError ((error) => {
        return of (false);
      })
    );
  }

  updateProduct(data: any, productId: number) {
    return this.http.post(`${this.baseURL}/${productId}`, data).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }), catchError((error: any) => {
        return of(false);
      })
    );
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this.baseURL}/${productId}`).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      map((result: any) => true),
      catchError((error: any) => of(false))
    );
  }
}
