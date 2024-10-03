import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(userData: any) {
    return this.http.post('/login', userData).pipe(
      tap((response: any) => {
        this.saveToken(response);
        this.goHome();
      })
    );
  }

  register(userData: any) {
    return this.http.post('/register', userData).pipe(
      tap((response: any) => {
        this.saveToken(response);
        this.goHome();
      })
    );
  }
  
  logout() {
    this.removeToken();
    this.setUserData(null);
  }
  
  getUser() {
    return this.http.get('/user');
  }

  getUserData() {
    return this.userData;
  }
  
  setUserData(userData: any) {
    this.userData = userData;
  }

  getToken() {
    return localStorage.getItem('token');
  }
  
  tokenExists() {
    const token = this.getToken();
    return token == null ? false : true;
  }

  private removeToken() {
    localStorage.removeItem('token');
  }

  private goHome() {
    this.router.navigate(['/']);
  }

  private saveToken(response: any) {
    const authToken = `${response.token_type} ${response.access_token}`;
    localStorage.setItem('token', authToken);
  }

  isLoggedIn(token: string | null) {
    return new Promise <boolean> ((resolve, reject) => {
      if (!this.tokenExists()) {
        resolve(true);
      }
      this.getUser().subscribe({
        next: (response) => {
          this.setUserData(response);
          resolve(true);
        },
        error: (error) => {
          if (error.status == HttpStatusCode.Unauthorized) {
            this.logout();
            resolve(false);
          }
        }
      });
    });
  }
}
