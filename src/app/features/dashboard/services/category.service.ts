import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, share, tap } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  private categoryURL = '/control/categories';
  private subcategoryURL = '/control/subcategories';

  constructor(private http: HttpClient, private toastService: ToastService) { }

  addCategory(data: any) {
    return this.http.post(this.categoryURL, data).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      map((result: any) => true),
      catchError((error: any) => of(false))
    );  
  }

  addSubcategory(data: any) {
    return this.http.post(this.subcategoryURL, data).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      map((result: any) => true),
      catchError((error: any) => of(false))
    );  
  }

  getCategories() {
    return this.http.get(this.categoryURL).pipe(
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting categories', 'error');
        return of ([])
      })
    );
  }

  getSubcategories() {
    return this.http.get(this.subcategoryURL).pipe(
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting subcategories', 'error');
        return of ([])
      })
    );;
  }

  updateCategory(data: any, categoryId: number) {
    return this.http.put(`${this.categoryURL}/${categoryId}`, data).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }), catchError((error: any) => {
        return of(false);
      })
    );  
  }

  updateSubcategory(data: any, subcategoryId: number) {
    return this.http.put(`${this.subcategoryURL}/${subcategoryId}`, data).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }), catchError((error: any) => {
        return of(false);
      })
    );  
  }

  deleteCategory(categoryId: number) {
    return this.http.delete(`${this.categoryURL}/${categoryId}`).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      map((result: any) => true),
      catchError((error: any) => of(false))
    );  
  }

  deleteSubcategory(subcategoryId: number) {
    return this.http.delete(`${this.subcategoryURL}/${subcategoryId}`).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      map((result: any) => true),
      catchError((error: any) => of(false))
    );  
  }

}
