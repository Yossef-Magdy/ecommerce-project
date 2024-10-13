import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { initModals } from 'flowbite';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { ButtonComponent } from "../../../../shared/button/button.component";
@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [ReactiveFormsModule, LabelComponent, BlackButtonComponent, ButtonComponent],
  templateUrl: './manage-categories.component.html',
  styleUrl: './manage-categories.component.css'
})
export class ManageCategoriesComponent {
  categories?: any = [];
  currentCategory: any;

  categoryForm = new FormGroup({
    id: new FormControl(-1),
    name: new FormControl(''),
  });

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((result: any) => {
      this.categories = result.data;
      console.log(result);
      setTimeout(() => {
        initModals();
      }, 50);
    });
  }

  selectCategory(category: any) {
    this.currentCategory = category;
  }

  updateForm() {
    if (this.currentCategory) {
      this.categoryForm.patchValue({
        id: this.currentCategory.id,
        name: this.currentCategory.name,
      });
    }
  }

  updateCategory() {
    const id = this.currentCategory.id;
    this.categoryService.updateCategory(this.categoryForm.value, id).subscribe((response) => {
      console.log(response);
    })
  }

  removeCategory() {
    const id = this.currentCategory.id;
    this.categoryService.deleteCategory(id).subscribe((response) => {
      console.log(response);
    })
  }
}
