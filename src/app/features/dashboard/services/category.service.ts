import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private http: HttpClient) { }

  addCategory(data: any) {
    return this.http.post('/control/categories', data).pipe(
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
    return this.http.post('/control/subcategories', data).pipe(
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

}
