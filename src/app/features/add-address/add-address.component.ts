import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { BlackButtonComponent } from "../../shared/black-button/black-button.component";
import { AddressService } from '../profile/address.service';
import { GovernorateService } from '../profile/governorate.service';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [BlackButtonComponent, ReactiveFormsModule],
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent {
  @Input() selectedTab: string ='';
  @Input() addresses: any;
  @Input() governorates: any;
  addressForm: FormGroup;
  successMessage: string = '';
  failMessage: string = '';

  @Output() tabChange = new EventEmitter<string>();

  constructor(private addressService: AddressService, private governorateService: GovernorateService, private fb: FormBuilder) {
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
    this.governorateService.getGovernorates().subscribe((res: any) => {
      this.governorates = res.data;
      console.log(this.governorates);
    });


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
      this.addressService.addAddress(address_data).subscribe({
        next: (response) => {
          console.log('Address Added successfully:', response);
          this.successMessage = 'Address has been Added successfully';
          this.addressForm.reset();

          setTimeout(() => {
            this.successMessage = '';
          }, 2000);
        },
        error: (error) => {
          this.failMessage = 'Something went wrong';
          setTimeout(() => {
            this.failMessage = '';
          }, 2000);
          console.error('Error updating address:', error);
        }
      });

    } else {
      console.log('Form is invalid');
    }
  }

  

  changeTab(tab: string) {
    this.tabChange.emit(tab);
  }
}
