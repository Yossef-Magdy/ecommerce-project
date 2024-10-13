import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BlackButtonComponent } from "../../shared/black-button/black-button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService } from '../profile/address.service';
import { ActivatedRoute } from '@angular/router';
import { GovernorateService } from '../profile/governorate.service';

@Component({
  selector: 'app-edit-address',
  standalone: true,
  imports: [BlackButtonComponent, ReactiveFormsModule],
  templateUrl: './edit-address.component.html',
  styleUrl: './edit-address.component.css'
})
export class EditAddressComponent {
  @Input() selectedTab: string = '';
  @Input() address: any;
  @Input() governorates: any;
  addressForm!: FormGroup;
  addressId: number = 0;
  @Output() tabChange = new EventEmitter<string>();

  constructor(private addressService: AddressService, private fb: FormBuilder, private route: ActivatedRoute, private governorateService: GovernorateService) {
    this.addressForm = this.fb.group({
      address: ['', Validators.required],
      apartment: ['', Validators.required],
      city: ['', Validators.required],
      governorate_id: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)]],
      postal_code: [''],
      is_default: [false]
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.addressId = idParam ? +idParam : 0;
    this.governorateService.getGovernorates().subscribe((res: any) => {
      this.governorates = res.data;
    });

    this.addressService.getAddressById(this.addressId).subscribe((response: any) => {
      console.log('Fetched address data:', response);
      const addressData = response.data;

      const governorate = this.governorates.find(
        (g: any) => g.name.toLowerCase() === addressData.governorate.toLowerCase()
      );

      this.addressForm.patchValue({
        address: addressData.address,
        apartment: addressData.apartment,
        city: addressData.city,
        governorate_id: governorate ? governorate.id : '',
        phone_number: addressData.phone_number,
        postal_code: addressData.postal_code,
        is_default: addressData.is_default
      });
    });
  }
  changeTab(tab: string) {
    this.tabChange.emit(tab);
  }
  get postal_code(){
    return this.addressForm.controls['postal_code'];
  }

  onSubmit() {
    if (this.addressForm.valid) {
      const address_data = this.addressForm.value;
      if(!this.postal_code.value){
        delete address_data.postal_code;
      }
      this.addressService.updateAddress(this.addressId, this.addressForm.value).subscribe({
        next: (response) => {
          console.log('Address updated successfully:', response);
          // this.changeTab('address');
          alert('Address updated successfully');
        },
        error: (error) => {
          console.error('Error updating address:', error);
        }
      });
    } else {
      console.log('Form is invalid', this.addressForm.errors);
    }
  }
}

