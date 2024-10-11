import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { BlackButtonComponent } from "../../shared/black-button/black-button.component";
import { AddressService } from '../profile/address.service';
import { GovernorateService } from '../profile/governorate.service';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';

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
      this.addressService.addAddress(address_data).subscribe(
        () => {
          alert('Address added successfully');
          this.addressForm.reset();
        },
        (error) => {
          console.error('Error adding address', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  changeTab(tab: string) {
    this.tabChange.emit(tab);
  }
}
