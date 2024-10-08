import { Component } from '@angular/core';
import { ArrowsComponent } from "../arrows/arrows.component";
import { RecentlyViewedServiceService } from '../../services/recently-viewed-service.service';
import { IProduct } from '../../data-interfaces';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ArrowsComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  clothsCurrentIndex = 0;
  maxClothsVisibleCards = 4;
  products:IProduct[] = [];

  constructor(private recentlyViewedService: RecentlyViewedServiceService){}

  ngOnInit(){
    this.recentlyViewedService.getRecentlyViewed().subscribe((products: IProduct[]) => {
      this.products = products; // Update the component state
      console.log(this.products); // Log for debugging
    });
  }
  
  getClothsTransform() {
    return `translateX(-${this.clothsCurrentIndex * (100 / this.maxClothsVisibleCards)}%)`;
  }

  onClothsArrowClick(newIndex: number) {
    this.clothsCurrentIndex = newIndex;
  }

}