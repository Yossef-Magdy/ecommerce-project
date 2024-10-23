import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private baseURL = '/control/product-details';

  constructor(private http: HttpClient, private toastService: ToastService) { }

  addProductDetails(data: any) {
    return this.http.post(this.baseURL, data).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      catchError((error: any) => of(false))
    );
  }

  updateProductDetail(data: any, productDetailId: number) {
    return this.http.put(`${this.baseURL}/${productDetailId}`, data).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }), catchError((error: any) => {
        return of(false);
      })
    );
  }

  deleteProductDetail(productDetailId: number) {
    return this.http.delete(`${this.baseURL}/${productDetailId}`).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      map((result: any) => true),
      catchError((error: any) => of(false))
    );
  }

  getPossibleSubcategories(product_id: number) {
    return this.http.get(`/control/possible-subcategories/${product_id}`).pipe(
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting possible subcategories', 'error');
        return of ([])
      })
    )
  }
}
