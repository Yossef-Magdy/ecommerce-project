import { Component } from '@angular/core';
import { CategoriesService } from '../home/categories.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sub-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.css'
})
export class SubCategoriesComponent {
  categoryCurrentIndex = 0;
  subcategoryCards?: any;

  constructor(private categoryService: CategoriesService) {}

  ngOnInit() {
    this.categoryService.getAllSubCategories().subscribe((res) => {
      this.subcategoryCards = res.data;
    });
  }


  getTransform() {
    return `translateX(-${this.categoryCurrentIndex * 33.33}%)`;
  }
}
