import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getAddresses(): Observable<any> {
    return this.http.get('/shipping-details');
  }

  addAddress(addressData: any): Observable<any> {
    return this.http.post('/shipping-details', addressData);
  }
}
