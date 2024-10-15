import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, share } from 'rxjs';
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
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return true;
      }), catchError((error: any) => {
        return of(false);
      })
    );  
  }

  addSubcategory(data: any) {
    data = {
      name: data.name,
      category_id: data.categoryName,
    };
    return this.http.post(this.subcategoryURL, data).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return true;
      }), catchError((error: any) => {
        return of(false);
      })
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
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return result;
      }), catchError((error: any) => {
        return of(false);
      })
    );  
  }

  updateSubcategory(data: any, subcategoryId: number) {
    return this.http.put(`${this.subcategoryURL}/${subcategoryId}`, data).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return result;
      }), catchError((error: any) => {
        return of(false);
      })
    );  
  }

  deleteCategory(categoryId: number) {
    return this.http.delete(`${this.categoryURL}/${categoryId}`).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return true;
      }), catchError((error: any) => {
        return of(false);
      })
    );  
  }

  deleteSubcategory(subcategoryId: number) {
    return this.http.delete(`${this.subcategoryURL}/${subcategoryId}`).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return true;
      }), catchError((error: any) => {
        return of(false);
      })
    );  
  }

}
