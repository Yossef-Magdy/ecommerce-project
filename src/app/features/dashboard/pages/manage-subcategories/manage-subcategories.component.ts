import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { initModals } from 'flowbite';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { ButtonComponent } from "../../../../shared/button/button.component";

@Component({
  selector: 'app-manage-subcategories',
  standalone: true,
  imports: [ReactiveFormsModule, LabelComponent, BlackButtonComponent, ButtonComponent],
  templateUrl: './manage-subcategories.component.html',
  styleUrl: './manage-subcategories.component.css'
})
export class ManageSubcategoriesComponent {
  categories?: any = [];
  subcategories?: any = [];
  currentSubcategory: any;

  subcategoryForm = new FormGroup({
    id: new FormControl(-1),
    name: new FormControl(''),
    category_id: new FormControl(''),
  });

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getSubcategories().subscribe((result: any) => {
      this.subcategories = result.data;
      console.log(result);
      setTimeout(() => {
        initModals();
      }, 50);
    });
    this.categoryService.getCategories().subscribe((result: any) => {
      this.categories = result.data;
    });

  }

  selectSubcategory(category: any) {
    this.currentSubcategory = category;
  }

  updateForm() {
    if (this.currentSubcategory) {
      this.subcategoryForm.patchValue({
        id: this.currentSubcategory.id,
        name: this.currentSubcategory.name,
        category_id: this.currentSubcategory.category.id,
      });
    }
  }

  updateSubcategory() {
    const id = this.currentSubcategory.id;
    this.categoryService.updateSubcategory(this.subcategoryForm.value, id).subscribe((response) => {
      console.log(response);
    })
  }

  removeSubcategory() {
    const id = this.currentSubcategory.id;
    this.categoryService.deleteSubcategory(id).subscribe((response) => {
      console.log(response);
    })
  }
}
