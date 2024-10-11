import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { ArrowsComponent } from '../../shared/arrows/arrows.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from './categories.service';
import { AllProductsService } from '../collection/all-products.service';
import { IProduct } from '../../data-interfaces';
import { ProductDetailsService } from '../product-details/product-details.service';
import { ArrowsUpdatedComponent } from "../../shared/arrows-updated/arrows-updated.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, ArrowsComponent, RouterLink, ArrowsUpdatedComponent, NgClass],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categoryCurrentIndex = 0;
  clothsCurrentIndex = 0;
  maxCategoryVisibleCards = 3;
  maxClothsVisibleCards = 4;
  categoryCards?: any;
  products: any = [];
  colors: string[] = [];


  constructor(private categoryService: CategoriesService, private productsService: AllProductsService) {}
  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((res:any) => {
      console.log(res.data);
      this.categoryCards = res.data;

    });
    this.productsService.getProducts().subscribe((res:any)=>{
      console.log(res.data);
      this.products = res.data;
  });

  this.updateMaxVisibleCards(); 
    window.addEventListener('resize', this.updateMaxVisibleCards.bind(this)); 
  }
  

 

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


  changeImage(card: any, newImage: string){
    card.current_image = newImage;
  }

    // Update the number of visible cards based on screen size
    updateMaxVisibleCards() {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        this.maxClothsVisibleCards = 4; // Large screens
      } else if (screenWidth >= 768) {
        this.maxClothsVisibleCards = 3; // Medium screens
      } else {
        this.maxClothsVisibleCards = 2; // Small and XS screens
      }
    }
}
