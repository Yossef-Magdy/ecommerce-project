import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  activeRequests: number = 0;

  constructor() { }

  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }

  addRequest() {
    this.activeRequests++;
  }

  removeRequest() {
    this.activeRequests--;
  }

  isAllCompleted() {
    return this.activeRequests == 0;
  }
}
