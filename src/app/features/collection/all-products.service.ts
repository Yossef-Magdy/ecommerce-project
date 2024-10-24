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

  getProductsByCategory(category: string): Observable<any> {
    return this.http.get(`/collections/${category}`);
  }

  calculateDiscount(discount_type: string, discount_value: number, price: number): number{
    let priceAfterDiscount = 0;
    if (discount_type === 'fixed'){
      priceAfterDiscount = Number(price) - Number(discount_value);
    }
    else if (discount_type === 'percentage'){
      priceAfterDiscount = Number(price) - (Number(price) * Number(discount_value) / 100);
    }
    return priceAfterDiscount;
  }
}
