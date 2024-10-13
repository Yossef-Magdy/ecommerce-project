import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewsServiceService {

  constructor(private http:HttpClient) { }

  getReviewsById(producId:number):Observable<any>{
    return this.http.get(`/reviews?product_id=${producId}`)
  }
}
