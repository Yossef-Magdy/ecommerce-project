import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GovernorateService {

  private baseURL = '/control/governorates';

  constructor(private http: HttpClient) { }

  addGovernorate(governorate: any) {
    return this.http.post(this.baseURL, governorate).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when adding the governorate");
      })
    );
  }

  getGovernorates() {
    return this.http.get('/governorates');
  }

  updateGovernorate(data: any, governorateId: number) {
    return this.http.put(`${this.baseURL}/${governorateId}`, data).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when updating the governorate");
      })
    );
  }

  deleteGovernorate(governorateId: number) {
    return this.http.delete(`${this.baseURL}/${governorateId}`).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when deleting the governorate");
      })
    );
  }
}
