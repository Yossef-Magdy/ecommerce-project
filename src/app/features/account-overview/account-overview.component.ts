import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddressService } from '../profile/address.service';

@Component({
  selector: 'app-account-overview',
  standalone: true,
  imports: [],
  templateUrl: './account-overview.component.html',
  styleUrl: './account-overview.component.css'
})
export class AccountOverviewComponent {
  @Input() selectedTab: string ='';
  @Output() tabChange = new EventEmitter<string>();
  @Input() addresses: any;

  constructor(private addressService: AddressService) {}

  ngOnInit() {
    this.addressService.getAddresses().subscribe((res: any) => {
      console.log(res.data);
      this.addresses = res.data;
    });
  }

  changeTab(tab: string) {
    this.tabChange.emit(tab);
  }
}
