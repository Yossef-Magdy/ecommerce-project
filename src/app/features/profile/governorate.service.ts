import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GovernorateService {

  constructor(private http: HttpClient) {}

  getGovernorates(): Observable<any> {
    return this.http.get<any>('/governorates');
  }
}
