import { Component } from '@angular/core';
import { AccountOverviewComponent } from "../account-overview/account-overview.component";
import { OrderHistoryComponent } from "../../order-history/order-history.component";
import { AddressBookComponent } from "../address-book/address-book.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AddAddressComponent } from "../add-address/add-address.component";
import { EditAddressComponent } from "../edit-address/edit-address.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AccountOverviewComponent, OrderHistoryComponent, AddressBookComponent, RouterLink, RouterLinkActive, AddAddressComponent, EditAddressComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  name = 'Hadeer'.toUpperCase();
  selectedTab: string = 'overview';
}
