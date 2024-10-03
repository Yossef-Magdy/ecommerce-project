import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private http: HttpClient, private router: Router) { }

  getProductById(productId: number):Observable<any>{
    return this.http.get(`/products/${productId}`);
  }
  
}
