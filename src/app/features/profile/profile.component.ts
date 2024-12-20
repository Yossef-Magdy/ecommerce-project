import { Component } from '@angular/core';
import { AccountOverviewComponent } from "../account-overview/account-overview.component";
import { OrderHistoryComponent } from "../order-history/order-history.component";
import { AddressBookComponent } from "../address-book/address-book.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AddAddressComponent } from "../add-address/add-address.component";
import { EditAddressComponent } from "../edit-address/edit-address.component";
import { AuthService } from '../../core/auth/services/auth.service';
import { AddressService } from './address.service';
import { GovernorateService } from './governorate.service';
import { UserService } from './user.service';
import { CartService } from '../../services/cart.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AccountOverviewComponent, OrderHistoryComponent, AddressBookComponent, RouterLink, RouterLinkActive, AddAddressComponent, EditAddressComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any;
  addresses: any;
  governorates: any;
  selectedTab: string = 'overview';
  cartEmpty: boolean = true;
  constructor(private authService: AuthService, private userService: UserService, private cartService: CartService) {}
  ngOnInit() {
    if (this.selectedTab === 'address') {
      this.selectedTab = 'address';
    } else if (this.selectedTab === 'add-address') {
      this.selectedTab = 'add-address';
    }else if (this.selectedTab === 'edit-address') {
      this.selectedTab = 'edit-address';
    }
    else {
      this.selectedTab = 'overview';
    }

    this.userService.getUserData().subscribe((res: any) => {
      this.user = res;
    });
    
  }
  changeTab(tab: string) {
    this.selectedTab = tab;
  }

  logout() {
    this.cartService.getItems().subscribe((res)=>{
      if (res.length) this.cartEmpty = false;
    });

    //checks if the cart empty don't send request
    if (!this.cartEmpty){
      this.userService.sendCartItems().subscribe({
        next: (response) => {
        },
        error: (err) => {
        }
      });
      this.cartService.clearItems();
    }
    this.authService.logout();
  }
}
