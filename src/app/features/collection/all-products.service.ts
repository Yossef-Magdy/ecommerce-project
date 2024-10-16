import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllProductsService {

  constructor(private http: HttpClient, private router: Router) { }

  getProducts():Observable<any>{
    return this.http.get(`/products`);
  }

  getProductBySlug(slug: string): Observable<any> {
    return this.http.get(`/products/${slug}`);
  }

  getProductsByCategoryName(categoryName: string): Observable<any> {
    return this.http.get(`/collections/${categoryName}`);
  }

  getProductsBySubCategoryName(subcategoryName: string): Observable<any> {
    return this.http.get(`/collections/${subcategoryName}`);
  }
}
