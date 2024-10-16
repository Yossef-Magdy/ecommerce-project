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

  getAddressById(addressId: number): Observable<any> {
    return this.http.get(`/shipping-details/${addressId}`);
  }

  addAddress(addressData: any): Observable<any> {
    return this.http.post('/shipping-details', addressData);
  }

  updateAddress(addressId: number, addressData: any): Observable<any> {
    return this.http.patch(`/shipping-details/${addressId}`, addressData);
  }

  deleteAddress(addressId: number): Observable<any> {
    return this.http.delete(`/shipping-details/${addressId}`);
  }
  
}
