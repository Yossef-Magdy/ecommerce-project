import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { BlackButtonComponent } from "../../shared/black-button/black-button.component";
import { AddressService } from '../profile/address.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

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

  constructor(private addressService: AddressService) { }

  ngOnInit() {
    this.addressService.getAddresses().subscribe((res: any) => {
      console.log(res.data);
      this.addresses = res.data;
    });
  }


}
