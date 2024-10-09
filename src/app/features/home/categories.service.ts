import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient, private router: Router) {}
    getAllCategories():Observable<any> {
      return this.http.get(`/categories`);
    }

    getAllSubCategories():Observable<any> {
      return this.http.get(`/subcategories`);
    }
   
}
