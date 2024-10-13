import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class GovernorateService {

  private baseURL = '/control/governorates';

  constructor(private http: HttpClient, private toastService: ToastService) { }

  addGovernorate(governorate: any) {
    return this.http.post(this.baseURL, governorate).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return true;
      }), catchError((error: any) => {
        return of(false);
      })
    );
  }

  getGovernorates() {
    return this.http.get('/governorates').pipe(
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting governorates', 'error');
        return of ([])
      })
    );
  }

  updateGovernorate(data: any, governorateId: number) {
    return this.http.put(`${this.baseURL}/${governorateId}`, data).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return result;
      }), catchError((error: any) => {
        return of(false);
      })
    );
  }

  deleteGovernorate(governorateId: number) {
    return this.http.delete(`${this.baseURL}/${governorateId}`).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return true;
      }), catchError((error: any) => {
        return of(false);
      })
    );
  }
}
