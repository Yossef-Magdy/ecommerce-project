import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class GovernorateService {

  private baseURL = '/control/governorates';

  constructor(private http: HttpClient, private toastService: ToastService) { }

  addGovernorate(governorate: any) {
    return this.http.post(this.baseURL, governorate).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      map((result: any) => true),
      catchError((error: any) => of(false))
    );
  }

  getGovernorates() {
    return this.http.get(this.baseURL).pipe(
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting governorates', 'error');
        return of ([])
      })
    );
  }

  updateGovernorate(data: any, governorateId: number) {
    return this.http.put(`${this.baseURL}/${governorateId}`, data).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      catchError((error: any) => of(false))
    );
  }

  deleteGovernorate(governorateId: number) {
    return this.http.delete(`${this.baseURL}/${governorateId}`).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      map((result: any) => true),
      catchError((error: any) => of(false))
    );
  }
}
