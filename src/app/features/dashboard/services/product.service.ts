import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = '/control/products';

  constructor(private http: HttpClient, private toastService: ToastService) { }
  
  addProduct(data: any) {
    return this.http.post(this.baseURL, data).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return true;
      }), catchError((error: any) => {
        return of(false);
      })
    );
  }

  getProducts() {
    return this.http.get(this.baseURL).pipe(
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting products', 'error');
        return of ([])
      })
    );
  }

  updateProduct(data: any, productId: number) {
    return this.http.put(`${this.baseURL}/${productId}`, data).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return result;
      }), catchError((error: any) => {
        return of(false);
      })
    );
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this.baseURL}/${productId}`).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return true;
      }), catchError((error: any) => {
        return of(false);
      })
    );
  }
}
