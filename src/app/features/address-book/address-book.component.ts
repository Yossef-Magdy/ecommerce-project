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

  showDeleteModal = false;
  addressIdToDelete: number | null = null;
  addressIndexToDelete: number | null = null;

  constructor(private addressService: AddressService, private router: Router) { }

  ngOnInit() {
    this.loadAddresses();
  }

  loadAddresses() {
    this.addressService.getAddresses().subscribe((res: any) => {
      this.addresses = res.data;
      this.sortAddresses();
    });
  }

  openDeleteModal(addressId: number, index: number) {
    this.showDeleteModal = true;
    this.addressIdToDelete = addressId;
    this.addressIndexToDelete = index;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.addressIdToDelete = null;
    this.addressIndexToDelete = null;
  }

  sortAddresses() {
    if (this.addresses && this.addresses.length > 0) {
      this.addresses.sort((a: any, b: any) => {
        return b.is_default - a.is_default;
      });
    }
  }

  confirmDelete() {
    if (this.addressIdToDelete !== null && this.addressIndexToDelete !== null) {
      this.addressService.deleteAddress(this.addressIdToDelete).subscribe(() => {
        this.addresses.splice(this.addressIndexToDelete, 1);
        this.sortAddresses();
        this.closeDeleteModal();
        console.log('Address deleted successfully');
      }, (error) => {
        console.error('Error deleting address:', error);
        this.closeDeleteModal();
      });
    }
  }

  onEditAddress(addressId: number) {
    this.router.navigate(['/edit-address', addressId]);
  }
}
