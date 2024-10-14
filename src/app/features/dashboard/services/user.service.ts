import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { catchError, map, Observable, of, share } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = '/control/users';
  private roleURL = '/control/roles';

  constructor(private http: HttpClient, private toastService: ToastService) { }

  addUser(userData: any): Observable<boolean> {
    userData = this.prepareUserData(userData);
    return this.http.post(this.userURL, userData).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return result;
      }), catchError((error: any) => {
        return of(false);
      })
    );
  }

  addRole(data: any): Observable<boolean> {
    return this.http.post(this.roleURL, data).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return true;
      }), catchError((error: any) => {
        return of(false);
      })
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

  updateUser(userData: any) {
    const userId: number = userData.id;
    return this.http.put(`${this.userURL}/${userId}`, userData).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return result;
      }), catchError((error: any) => {
        return of(false);
      })
    );
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.http.delete(`${this.userURL}/${userId}`).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return true;
      }), catchError((error: any) => {
        return of(false);
      })
    );  
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
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return result;
      }), catchError((error: any) => {
        return of(false);
      })
    );
  }

  deleteRole(roleId: number): Observable<boolean> {
    return this.http.delete(`${this.roleURL}/${roleId}`).pipe(
      map((result: any) => {
        this.toastService.showToast(result.message, 'success');
        return true;
      }), catchError((error: any) => {
        return of(false);
      })
    );  
  }

  getPermissions() {
    return this.http.get('/control/permissions').pipe(
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
