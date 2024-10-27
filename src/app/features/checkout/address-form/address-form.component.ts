import { Component, EventEmitter, Output } from '@angular/core';
import { GovernorateService } from '../../profile/governorate.service';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AddressService } from '../../profile/address.service';
import { BlackButtonComponent } from "../../../shared/black-button/black-button.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule, BlackButtonComponent, NgClass],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})
export class AddressFormComponent {
  governorates: any;
  addressForm: FormGroup;
  @Output() submitted = new EventEmitter<boolean>();

  constructor(private governorateService: GovernorateService,  private addressService:AddressService){
    this.addressForm = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      address: new FormControl('', Validators.required),
      apartment: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      governorate_id: new FormControl('', Validators.required),
      phone_number: new FormControl ('', [
        Validators.required, 
        Validators.pattern(/^(010|011|012|015)\d{8}$/)
      ]),
      postal_code: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      is_default: new FormControl (true),
    });
  }

  get address(){
    return this.addressForm.controls['address'];
  }
  get apartment(){
    return this.addressForm.controls['apartment'];
  }
  get city(){
    return this.addressForm.controls['city'];
  }
  get governorate_id(){
    return this.addressForm.controls['governorate_id'];
  }
  get phone_number(){
    return this.addressForm.controls['phone_number'];
  }
  get postal_code(){
    return this.addressForm.controls['postal_code'];
  }

  ngOnInit(){
    //Get stored governerates 
    this.governorateService.getGovernorates().subscribe((res: any) => {
      this.governorates = res.data;
    });
  }

  onSubmit(){
    if (this.addressForm.valid) {
      const address_data = this.addressForm.value;
      
      this.addressService.addAddress(address_data).subscribe(
        () => {
          this.submitted.emit(true);
        },
        (error) => {
          console.error('Error adding address', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }

  }
}
