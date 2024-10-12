import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, private router: Router) { }

  searchByProduct(query: string):Observable<any>{
    const params = new HttpParams()
    .set('type', 'product')
    .set('query', query);

    return this.http.get<any>(`/search?${params}`);
  }
}
