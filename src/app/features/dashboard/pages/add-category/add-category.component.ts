import { Component } from '@angular/core';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [LabelComponent, ReactiveFormsModule, BlackButtonComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  categoryForm: FormGroup;

  constructor(private categorySerivce: CategoryService) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  get name() {
    return this.categoryForm.controls['name'];
  }

  submit() {
    if (this.categoryForm.invalid) {
      return;
    }
    this.categorySerivce.addCategory(this.categoryForm.value).subscribe((result: boolean) => {
      if (result) {
        this.categoryForm.reset();
      }
    });
  }
}

