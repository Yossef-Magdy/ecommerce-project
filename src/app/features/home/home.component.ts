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
import { MarqueeComponent } from "./marquee/marquee.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, ArrowsComponent, RouterLink, ArrowsUpdatedComponent, NgClass, MarqueeComponent],
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
  onSaleProducts: any = [];
  colors: string[] = [];
  discount_value: number = 0;


  constructor(private categoryService: CategoriesService, private productsService: AllProductsService) {}
  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((res:any) => {
      this.categoryCards = res.data;

    });
    this.productsService.getProducts().subscribe((res:any)=>{
      this.products = res.data;
      this.products.forEach((product: any) =>{
        if (product.discount_value){
          product.priceAfterDiscount = this.productsService.calculateDiscount(product.discount_type, product.discount_value, product.price);
          this.onSaleProducts.push(product);
        }
        else{
          product.discount_value = 0;
        }
      });
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
