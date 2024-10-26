import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderSubject = new BehaviorSubject<any>({});

  setOrderData(order: any) {
    this.orderSubject.next(order); // Update the latest order data
  }
  
  getOrderSummary(){
    return this.orderSubject.asObservable();
  }

}
