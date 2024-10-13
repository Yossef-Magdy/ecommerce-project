import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../data-interfaces';

@Injectable({
  providedIn: 'root',
})
export class RecentlyViewedServiceService {
  private readonly STORAGE_KEY = 'recentlyViewed';
  private readonly MAX_PRODUCTS = 5;
  private recentlyViewedSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>(this.loadRecentlyViewed());

  constructor() {}

  // Add product to recently viewed
  addToRecentlyViewed(product: IProduct): void {
    const viewedProducts = this.getRecentlyViewedFromStorage() || [];

    const isProductAlreadyViewed = viewedProducts.some((p: IProduct) => p.id === product.id);

    if (!isProductAlreadyViewed) {
      if (viewedProducts.length >= this.MAX_PRODUCTS) {
        viewedProducts.pop(); 
      }
      viewedProducts.unshift(product); 
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(viewedProducts));

      // Emit new value
      this.recentlyViewedSubject.next(viewedProducts);
    }
  }

  // Get recently viewed products as an Observable
  getRecentlyViewed(): Observable<IProduct[]> {
    return this.recentlyViewedSubject.asObservable();
  }

  // Load recently viewed products from local storage
  loadRecentlyViewed(): IProduct[] {
    return this.getRecentlyViewedFromStorage() || [];
  }

  private getRecentlyViewedFromStorage(): IProduct[] | null {
    const storedProducts = localStorage.getItem(this.STORAGE_KEY);
    return storedProducts ? JSON.parse(storedProducts) : null;
  }

  clearRecentlyViewed(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.recentlyViewedSubject.next([]); 
  }
}
