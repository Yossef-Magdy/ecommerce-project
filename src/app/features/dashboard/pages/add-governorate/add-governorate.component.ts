import { Component } from '@angular/core';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { GovernorateService } from '../../services/governorate.service';

@Component({
  selector: 'app-add-governorate',
  standalone: true,
  imports: [LabelComponent, ReactiveFormsModule, BlackButtonComponent],
  templateUrl: './add-governorate.component.html',
  styleUrl: './add-governorate.component.css'
})
export class AddGovernorateComponent {
  governorateForm: FormGroup;

  constructor(private governorateService: GovernorateService) {
    this.governorateForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      fee: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  message?: string;
  isErrorMessage?: boolean;

  get name() {
    return this.governorateForm.controls['name'];
  }

  get fee() {
    return this.governorateForm.controls['fee'];
  }

  submit() {
    if (this.governorateForm.invalid) {
      return;
    }
    this.governorateService.addGovernorate(this.governorateForm.value).subscribe((response: any) => {
      if (response.message) {
        this.isErrorMessage = false;
        this.message = response.message;
      } else {
        this.isErrorMessage = true;
        const key = Object.keys(response)[0];
        this.message = response[key][0];
      }
    });
  }
}
