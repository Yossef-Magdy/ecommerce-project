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
  selector: 'app-manage-categories',
  standalone: true,
  imports: [ReactiveFormsModule, LabelComponent, BlackButtonComponent, ButtonComponent, PaginationComponent],
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

  from: number = 0;
  to: number = 0;
  total: number = 0;
  currentPage: number = 1;
  prev?: any;
  next?: any;

  constructor(private categoryService: CategoryService, private paginationService: PaginationService) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((result: any) => {
      this.categories = result.data;
      console.log('on init');
      this.buildPagination(result);
      setTimeout(() => {
        initModals();
      }, 50);
    });
  }

  load = (url: any) => {
    if (url) {
      this.paginationService.load(url).subscribe((result: any) => {
        this.categories = result.data;
        this.buildPagination(result);
        setTimeout(() => {
          initModals();
        }, 50);
      });
    }
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
    this.categoryService.updateCategory(this.categoryForm.value, id).subscribe((response: any) => {
      const data = response.data;
      this.categories = this.categories.map((category: any) => category.id == data.id ? data : category);
    })
  }

  removeCategory() {
    const id = this.currentCategory.id;
    this.categoryService.deleteCategory(id).subscribe((response) => {
      this.categoryService.getCategories().subscribe((result: any) => {
        this.categories = result.data;
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
