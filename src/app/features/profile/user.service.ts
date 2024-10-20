import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, take } from 'rxjs';
import { CartItem, CartService } from '../../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = '/cart';

  constructor(private http: HttpClient, private cartService: CartService) { }

  getUserData(): Observable<any> {
    return this.http.get('/user');
  }

  sendCartItems() {
    let requestData: any = {};
    
    return this.cartService.getItems().pipe(
      take(1),
      switchMap((cartItems) => {
        console.log("user cart items", cartItems);

        requestData.items = cartItems;
  
        // Return the HTTP POST request observable
        return this.http.post('/cart', requestData).pipe(
          catchError((error) => {
            if (error.status === HttpStatusCode.BadRequest || error.status === HttpStatusCode.UnprocessableEntity) {
              return of(error.error.errors); 
            }
            return of("An error occurred when adding the cart Items of user"); 
          })
        );
      })
    );
  }

  getCartItems():Observable<CartItem[]>{
    return this.http.get<CartItem[]>('/cart');
  }

}
