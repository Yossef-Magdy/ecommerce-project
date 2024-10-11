import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = '/control/products';

  constructor(private http: HttpClient) { }
  
  addProduct(data: any) {
    return this.http.post(this.baseURL, data).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when adding the product");
      })
    );
  }
}
