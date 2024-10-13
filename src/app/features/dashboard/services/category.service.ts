import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  private categoryURL = '/control/categories';
  private subcategoryURL = '/control/subcategories';

  constructor(private http: HttpClient) { }

  addCategory(data: any) {
    return this.http.post(this.categoryURL, data).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when adding the category");
      })
    );
  }

  addSubcategory(data: any) {
    data = {
      name: data.name,
      category_id: data.categoryName,
    };
    return this.http.post(this.subcategoryURL, data).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when adding the subcategory");
      })
    );
  }

  getCategories() {
    return this.http.get('/categories');
  }

  getSubcategories() {
    return this.http.get('/subcategories');
  }

  updateCategory(data: any, categoryId: number) {
    return this.http.put(`${this.categoryURL}/${categoryId}`, data).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when updating the category");
      })
    );
  }

  updateSubcategory(data: any, subcategoryId: number) {
    return this.http.put(`${this.subcategoryURL}/${subcategoryId}`, data).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when updating the subcategory");
      })
    );
  }

  deleteCategory(categoryId: number) {
    return this.http.delete(`${this.categoryURL}/${categoryId}`).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when deleting the category");
      })
    );  
  }

  deleteSubcategory(subcategoryId: number) {
    return this.http.delete(`${this.subcategoryURL}/${subcategoryId}`).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when deleting the subcategory");
      })
    );  
  }

}
