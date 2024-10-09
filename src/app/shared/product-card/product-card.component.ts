import { Component } from '@angular/core';
import { ArrowsComponent } from "../arrows/arrows.component";
import { RecentlyViewedServiceService } from '../../services/recently-viewed-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ArrowsComponent, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  clothsCards!: any[];
  colors: string[] = [];
  clothsCurrentIndex = 0;
  maxClothsVisibleCards = 4;

  constructor(private recentlyViewedService: RecentlyViewedServiceService){}

  ngOnInit(){
    this.recentlyViewedService.getRecentlyViewed().subscribe((products: any) => {
      this.clothsCards = products; // Update the component state
      console.log(this.clothsCards); // Log for debugging
      this.clothsCards.forEach((card) => {
        card.current_image = card.cover_image;
      });
    });
  }
  
  changeImage(card: any, newImage: string){
    card.current_image = newImage;
  }

  getClothsTransform() {
    return `translateX(-${this.clothsCurrentIndex * (100 / this.maxClothsVisibleCards)}%)`;
  }

  onClothsArrowClick(newIndex: number) {
    this.clothsCurrentIndex = newIndex;
  }
}