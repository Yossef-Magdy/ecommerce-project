import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  charge(amount: number, stripeToken: string, currency: string) {
    return this.http.post('/charge', { amount, currency, stripeToken });
  }

  order(order: any) {
    return this.http.post('/orders', order);
  }
}
