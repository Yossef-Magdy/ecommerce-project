import { Injectable, signal } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { BehaviorSubject, catchError, concatMap, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userDataSubject: any = new BehaviorSubject<any>(null);
  private hasRolesOrPermissionsSubject = new BehaviorSubject<boolean>(false);
  private validLoginSubject = new BehaviorSubject<boolean>(false);

  userData = this.userDataSubject.asObservable();
  hasRolesOrPermissions = this.hasRolesOrPermissionsSubject.asObservable();
  validLogin = this.validLoginSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(userData: any) {
    return this.http.post('/login', userData).pipe(
      concatMap((token: any) => {
        this.saveToken(token);
        this.goHome();
        return this.http.get('/user').pipe(
          tap((response: any) => {
            this.setUserData(response);
            this.setHasRolesOrPermissions(response.roles.length || response.permissions.length);
            this.setValidLogin(true);
          })
        );
      })
    );
  }

  register(userData: any) {
    return this.http.post('/register', userData).pipe(
      concatMap((token: any) => {
        this.saveToken(token);
        this.goHome();
        return this.http.get('/user').pipe(
          tap((response: any) => {
            this.setUserData(response);
            this.setHasRolesOrPermissions(response.roles.length || response.permissions.length);
          })
        );
      })
    );
  }
  
  logout() {
    this.removeToken();
    this.setUserData(null);
    this.setHasRolesOrPermissions(false);
    this.setValidLogin(false);
    this.goHome();
  }
  checkUser(): Observable<boolean> {
    return this.http.get('/user').pipe(
      tap((response: any) => {
        this.setUserData(response);
        this.setHasRolesOrPermissions(response.roles.length || response.permissions.length);
        this.setValidLogin(true);
        return true;
      }), catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.Unauthorized) {
          this.removeToken();
          this.setValidLogin(false);
        }
        this.setUserData(null);
        return of(false);
      })
    );
  }
  
  canAccessDashboard(): Observable<boolean> {
    return this.http.get('/user').pipe(
      map((response: any) => {
        this.setHasRolesOrPermissions(response.roles.length || response.permissions.length);
        return response.roles.length || response.permissions.length;
      }), catchError((error: HttpErrorResponse) => {
        return of(false);
      })
    );
  }

  setUserData(userData: any) {
    this.userDataSubject.next(userData);
  }

  setHasRolesOrPermissions(value: boolean) {
    this.hasRolesOrPermissionsSubject.next(value);
  }

  setValidLogin(value: boolean) {
    this.validLoginSubject.next(value);
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
}
