import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { initModals } from 'flowbite';
import { LabelComponent } from "../../../../core/auth/components/label/label.component";
import { BlackButtonComponent } from "../../../../shared/black-button/black-button.component";
import { ButtonComponent } from "../../../../shared/button/button.component";
import { PaginationComponent } from "../../../../shared/pagination/pagination.component";
import { PaginationService } from '../../../../shared/pagination/services/pagination.service';

@Component({
  selector: 'app-manage-subcategories',
  standalone: true,
  imports: [ReactiveFormsModule, LabelComponent, BlackButtonComponent, ButtonComponent, PaginationComponent],
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

  from: number = 0;
  to: number = 0;
  total: number = 0;
  currentPage: number = 1;
  prev?: any;
  next?: any;

  constructor(private categoryService: CategoryService, private paginationService: PaginationService) {}

  ngOnInit() {
    this.categoryService.getSubcategories().subscribe((result: any) => {
      this.subcategories = result.data;
      console.log(result);
      this.buildPagination(result);
      setTimeout(() => {
        initModals();
      }, 50);
    });
    this.categoryService.getCategories().subscribe((result: any) => {
      this.categories = result.data;
    });

  }

  load = (url: any) => {
    if (url) {
      this.paginationService.load(url).subscribe((result: any) => {
        this.subcategories = result.data;
        this.buildPagination(result);
        setTimeout(() => {
          initModals();
        }, 50);
      });
    }
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
    this.categoryService.updateSubcategory(this.subcategoryForm.value, id).subscribe((response: any) => {
      const data = response.data;
      this.subcategories = this.subcategories.map((subcategory: any) => subcategory.id == data.id ? data : subcategory);
    })
  }

  removeSubcategory() {
    const id = this.currentSubcategory.id;
    this.categoryService.deleteSubcategory(id).subscribe((response) => {
      this.categoryService.getSubcategories().subscribe((result: any) => {
        this.subcategories = result.data;
        this.buildPagination(result);
        setTimeout(() => {
          initModals();
        }, 50);
      });
    })
  }

  buildPagination(data: any) {
    this.currentPage = data.meta.current_page;
    this.from = data.meta.from;
    this.to = data.meta.to;
    this.total = data.meta.total;
    this.prev = data.links.prev;
    this.next = data.links.next;
  }
}
