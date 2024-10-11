import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = '/control/users';
  private roleURL = '/control/roles';

  constructor(private http: HttpClient) { }

  addUser(userData: any) {
    userData = this.prepareUserData(userData);
    return this.http.post(this.userURL, userData).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when adding the user");
      })
    );
  }

  addRole(data: any) {
    return this.http.post(this.roleURL, data).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when adding the role");
      })
    );
  }

  getUsers() {
    return this.http.get(this.userURL);
  }

  updateUser(userData: any) {
    const userId: number = userData.id;
    return this.http.put(`${this.userURL}/${userId}`, userData).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when updating the user");
      })
    );
  }

  deleteUser(userId: number) {
    return this.http.delete(`${this.userURL}/${userId}`).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when deleting the user");
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
        console.log('an error occurred when getting roles')
        return of ([])
      })
    )
  }

  updateRole(data: any, roleId: number) {
    return this.http.put(`${this.roleURL}/${roleId}`, data).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when updating the role");
      })
    );
  }

  deleteRole(roleId: number) {
    return this.http.delete(`${this.roleURL}/${roleId}`).pipe(
      catchError((error) => {
        if (error.status == HttpStatusCode.BadRequest || error.status == HttpStatusCode.UnprocessableEntity) {
          return of(error.error.errors);
        }
        return of("an error occured when deleting the role");
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
        console.log('an error occurred when getting permissions')
        return of ([])
      })
    )
  }

}
