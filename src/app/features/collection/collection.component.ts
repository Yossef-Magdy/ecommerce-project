import { Component } from '@angular/core';
import { ButtonComponent } from "../../shared/button/button.component";
import { AllProductsService } from './all-products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MyCurrencyPipe } from '../../pipes/my-currency.pipe';
import { PaginationService } from '../../shared/pagination/services/pagination.service';
import { BlackButtonComponent } from "../../shared/black-button/black-button.component";

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [ButtonComponent, RouterLink, MyCurrencyPipe, BlackButtonComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent {
  
  clothsCards: any[] = [];
  next?: any;
  heroTitle: string = 'PRODUCTS';

  constructor(private allProductsService: AllProductsService, private route: ActivatedRoute, private paginationService: PaginationService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let category = params['category'];
      if (category) {
        category = category.replace(/\s+/g, '-');
        this.heroTitle = category;
        this.allProductsService.getProductsByCategory(category).subscribe((response: any) => {
          this.processResponse(response);
        });
      } else {
        this.allProductsService.getProducts().subscribe((response: any) => {
          this.processResponse(response);
        });
      }
    });
  }

  processResponse(response: any) {
    this.clothsCards = response.data;
    this.next = response.links.next;
    this.clothsCards.forEach((card) => {
      card.current_image = card.cover_image;
      if (card.discount_value){
        card.priceAfterDiscount = this.allProductsService.calculateDiscount(card.discount_type, card.discount_value, card.price);
      }
      else{
        card.discount_value = 0;
      }
    });
  }

  changeImage(card: any, newImage: string) {
    card.current_image = newImage;
  }

  loadMore() {
    if (!this.next) {
      return;
    }
    this.paginationService.load(this.next).subscribe((response: any) => {
      this.next = response.links.next;
      this.clothsCards.push(...response.data);
    })
  }
}
