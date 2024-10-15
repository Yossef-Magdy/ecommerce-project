import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { catchError, map, Observable, of, share, tap } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = '/control/users';
  private roleURL = '/control/roles';
  private permissionURL = '/control/permissions';

  constructor(private http: HttpClient, private toastService: ToastService) { }

  addUser(userData: any): Observable<boolean> {
    return this.http.post(this.userURL, userData).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      map((result: any) => true),
      catchError((error: any) => of(false))
    );
  }

  addRole(data: any): Observable<boolean> {
    return this.http.post(this.roleURL, data).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      map((result: any) => true),
      catchError((error: any) => of(false))
    );
  }

  getUsers() {
    return this.http.get(this.userURL).pipe(
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting users', 'error');
        return of ([])
      }), share()
    );
  }

  updateUser(userData: any, userId: number) {
    return this.http.put(`${this.userURL}/${userId}`, userData).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      catchError((error: any) => of(false))
    );
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.http.delete(`${this.userURL}/${userId}`).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      map((result: any) => true),
      catchError((error: any) => of(false))
    );  
  }

  getRoles() {
    return this.http.get(this.roleURL).pipe(
      map((roles: any) => {
        roles.data.map((role: any) => {
          role.permissions.map((permission: any) => {
            permission.name = permission.name.replace('-', ' ');
          });
        });
        return roles;
      }),
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting roles', 'error');
        return of ([])
      })
    )
  }

  updateRole(data: any, roleId: number) {
    return this.http.put(`${this.roleURL}/${roleId}`, data).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      catchError((error: any) => of(false))
    );
  }

  deleteRole(roleId: number): Observable<boolean> {
    return this.http.delete(`${this.roleURL}/${roleId}`).pipe(
      tap((result: any) => {
        this.toastService.showToast(result.message, 'success');
      }),
      map((result: any) => true),
      catchError((error: any) => of(false))
    );  
  }

  getPermissions() {
    return this.http.get(this.permissionURL).pipe(
      map((permissions: any) => {
        permissions.data.map((permission: any) => {
          permission.name = permission.name.replace('-', ' ');
        });
        return permissions;
      }),
      catchError ((error) => {
        this.toastService.showToast('an error occurred when getting permissions', 'error');
        return of ([])
      })
    )
  }
}
