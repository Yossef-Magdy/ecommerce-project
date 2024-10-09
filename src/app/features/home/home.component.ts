import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { ArrowsComponent } from '../../shared/arrows/arrows.component';
import { RouterLink } from '@angular/router';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, ArrowsComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categoryCurrentIndex = 0;
  clothsCurrentIndex = 0;
  maxCategoryVisibleCards = 3;
  maxClothsVisibleCards = 4;

  categoryCards?: any;
  constructor(private categoryService: CategoriesService) {}
  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((res) => {
      console.log(res.data);
      this.categoryCards = res.data;

    });
  }
  

  clothsCards = [
    {
      title: 'Ripped Thick Strap Basic Top',
      oldPrice: 'LE 190',
      newPrice: 'LE 150',
      colors: ['#EEF0EB', 'blue', 'white', 'gray'],
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'Ripped Fitted Half Sleeve Top',
      oldPrice: 'LE 190',
      newPrice: 'LE 150',
      colors: ['black', 'white', 'gray'],
      image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'Swim Shorts',
      oldPrice: 'LE 190',
      newPrice: 'LE 150',
      colors: ['black', 'pink', 'green', 'yellow'],
      image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'Leggings',
      oldPrice: 'LE 190',
      newPrice: 'LE 150',
      colors: ['black', 'blue', 'white', 'gray'],
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'Comfort T-shirt',
      oldPrice: 'LE 190',
      newPrice: 'LE 150',
      colors: ['black', 'blue', 'white', 'gray'],
      image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    }
  ];

  getTransform() {
    return `translateX(-${this.categoryCurrentIndex * 33.33}%)`;
  }

  getClothsTransform() {
    return `translateX(-${this.clothsCurrentIndex * (100 / this.maxClothsVisibleCards)}%)`;
  }

  onCategoryArrowClick(newIndex: number) {
    this.categoryCurrentIndex = newIndex;
  }

  onClothsArrowClick(newIndex: number) {
    this.clothsCurrentIndex = newIndex;
  }

}
