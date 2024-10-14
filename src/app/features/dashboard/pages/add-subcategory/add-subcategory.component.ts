import { Component } from '@angular/core';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-add-subcategory',
  standalone: true,
  imports: [LabelComponent, ReactiveFormsModule, BlackButtonComponent],
  templateUrl: './add-subcategory.component.html',
  styleUrl: './add-subcategory.component.css'
})
export class AddSubcategoryComponent {
  constructor(private categorySerivce: CategoryService) {}

  subcategoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    categoryName: new FormControl('', [Validators.required]),
  });

  categories?: any;

  ngOnInit() {
    this.categorySerivce.getCategories().subscribe((result: any) => {
      this.categories = result.data;
    });
  }

  get name() {
    return this.subcategoryForm.controls['name'];
  }

  submit() {
    if (this.subcategoryForm.invalid) {
      return;
    }
    this.categorySerivce.addCategory(this.subcategoryForm.value).subscribe((result: boolean) => {
      if (result) {
        this.subcategoryForm.reset();
      }
    });
  }
}
