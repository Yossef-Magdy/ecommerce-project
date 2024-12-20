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

  createReview(reviewData: any): Observable<any> {
    return this.http.post(`/reviews`, reviewData);
  }

  getUserReviews(): Observable<number[]> {
    return this.http.get<number[]>('/user-reviews');
  }
}
