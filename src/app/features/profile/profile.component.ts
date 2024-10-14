import { Component } from '@angular/core';
import { AccountOverviewComponent } from "../account-overview/account-overview.component";
import { OrderHistoryComponent } from "../../order-history/order-history.component";
import { AddressBookComponent } from "../address-book/address-book.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AddAddressComponent } from "../add-address/add-address.component";
import { EditAddressComponent } from "../edit-address/edit-address.component";
import { AuthService } from '../../core/auth/services/auth.service';
import { AddressService } from './address.service';
import { GovernorateService } from './governorate.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AccountOverviewComponent, OrderHistoryComponent, AddressBookComponent, RouterLink, RouterLinkActive, AddAddressComponent, EditAddressComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  addresses: any;
  governorates: any;
  selectedTab: string = 'overview';
  constructor(private authService: AuthService) {}
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
  }
  changeTab(tab: string) {
    this.selectedTab = tab;
  }



  name = 'Hadeer'.toUpperCase();

  logout() {
    this.authService.logout();
  }
}
