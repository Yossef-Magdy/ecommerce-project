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
      this.clothsCards = products; 
      console.log(this.clothsCards);
      this.clothsCards.forEach((card) => {
        card.current_image = card.cover_image;
      });
    });

    this.updateMaxVisibleCards(); 
    window.addEventListener('resize', this.updateMaxVisibleCards.bind(this)); 
  }
  
  changeImage(card: any, newImage: string){
    card.current_image = newImage;
  }

  getClothsTransform() {
    return `translateX(-${this.clothsCurrentIndex * (100 / this.maxClothsVisibleCards)}%)`;
  }

  onClothsArrowClick(newIndex: number) {
    const maxIndex = this.clothsCards.length - this.maxClothsVisibleCards;
    if (newIndex >= 0 && newIndex <= maxIndex) {
      this.clothsCurrentIndex = newIndex;
    }
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

    console.log('Max visible cards: ', this.maxClothsVisibleCards);
  }
}