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

  constructor(private addressService: AddressService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.addressService.getAddresses().subscribe((res: any) => {
      this.addresses = res.data;
    });
  }

  // لفتح المودال عندما يتم الضغط على زر الحذف
  openDeleteModal(addressId: number, index: number) {
    this.showDeleteModal = true;
    this.addressIdToDelete = addressId;
    this.addressIndexToDelete = index;
  }

  // لغلق المودال
  closeDeleteModal() {
    this.showDeleteModal = false;
    this.addressIdToDelete = null;
    this.addressIndexToDelete = null;
  }

  // لتأكيد الحذف
  confirmDelete() {
    if (this.addressIdToDelete !== null && this.addressIndexToDelete !== null) {
      this.addressService.deleteAddress(this.addressIdToDelete).subscribe(() => {
        // إزالة العنوان من القائمة بعد الحذف
        this.addresses.splice(this.addressIndexToDelete, 1);
        this.closeDeleteModal(); // غلق المودال بعد الحذف
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

