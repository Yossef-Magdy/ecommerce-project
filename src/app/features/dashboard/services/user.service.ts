import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = '/control/users';

  constructor(private http: HttpClient) { }

  addUser(userData: any) {
    userData = this.prepareUserData(userData);
    return this.http.post(this.baseURL, userData).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest) {
          return of(error.error.errors);
        }
        return of("an error occured when adding the user");
      })
    );
  }

  getUsers() {
    return this.http.get(this.baseURL);
  }

  getUser(userId: number) {
    return this.http.get(`${this.baseURL}/${userId}`);
  }

  updateUser(userData: any , userId: number) {
    userData = this.prepareUserData(userData);
    return this.http.put(`${this.baseURL}/${userId}`, userData);
  }

  private prepareUserData(userData: any) {
    return {
      'first_name': userData.firstName,
      'last_name': userData.lastName,
      'email': userData.email,
      'password': userData.password,
      'roles': userData.roles,
      'permissions': userData.permissions,
    };
  }

}
