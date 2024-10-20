import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get('/orders');
  }

  cancelOrder(orderId: number) {
    const url = `/orders/${orderId}`;
    const body = {status: 'canceled'};
    return this.http.put(url, body);
  }
}
