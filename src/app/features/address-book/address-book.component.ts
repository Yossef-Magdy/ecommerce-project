import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { BlackButtonComponent } from "../../shared/black-button/black-button.component";
import { AddressService } from '../profile/address.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-address-book',
  standalone: true,
  imports: [ProfileComponent, BlackButtonComponent, NgFor, NgIf, NgClass],
  templateUrl: './address-book.component.html',
  styleUrl: './address-book.component.css'
})
export class AddressBookComponent {

  @Output() tabChange = new EventEmitter<string>();
  @Input() addresses: any;

  constructor(private addressService: AddressService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.addressService.getAddresses().subscribe((res: any) => {
      console.log(res.data);
      this.addresses = res.data;
    });
  }

  changeTab(tab: string) {
    this.tabChange.emit(tab);
  }
  onEditAddress(addressId: number) {
    this.router.navigate(['/edit-address', addressId], { relativeTo: this.route });
  }

}
