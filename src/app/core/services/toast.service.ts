import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }
  
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  private messageSubject = new BehaviorSubject<string>('test text');
  private typeSubject = new BehaviorSubject<'success' | 'error'>('success');

  isVisible = this.isVisibleSubject.asObservable();
  message = this.messageSubject.asObservable();
  type = this.typeSubject.asObservable();

  setMessage(message: string) {
    this.messageSubject.next(message);
  }

  setType(type: 'success' | 'error') {
    this.typeSubject.next(type);
  }

  showToast(message: string, type: 'success' | 'error') {
    this.setMessage(message);
    this.setType(type);
    this.isVisibleSubject.next(true);
    setTimeout(() => {
      this.hideToast();
    }, 5000);
  }

  hideToast() {
    this.isVisibleSubject.next(false);
  }

}
