import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor(private http: HttpClient) { }

  load(url: string) {
    url = url.substring(url.lastIndexOf("/api") + 4);
    return this.http.get(url);
  }
}
