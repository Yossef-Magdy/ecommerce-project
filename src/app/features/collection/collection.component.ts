import { Component } from '@angular/core';
import { ButtonComponent } from "../../shared/button/button.component";
import { AllProductsService } from './all-products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent {
  
  clothsCards: any[] = [];
  length: number = 0;
  heroTitle: string = 'PRODUCTS';

  constructor(private allProducts: AllProductsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.allProducts.getProducts().subscribe(
      (data) => {
        this.clothsCards = data.data;
        this.length = this.clothsCards.length;
        this.clothsCards.forEach((card) => {
          card.current_image = card.cover_image;
        });
      }
    );

    this.route.params.subscribe(params => {
      let categoryName = params['category_name'];
      let subcategoryName = params['subcategory_name'];

      if (categoryName) {
        categoryName = categoryName.replace(/\s+/g, '-');
        this.heroTitle = categoryName;
      } else if (subcategoryName) {
        subcategoryName = subcategoryName.replace(/\s+/g, '-');
        this.heroTitle = subcategoryName;
      }

      if (categoryName || subcategoryName) {
        const nameToFetch = categoryName || subcategoryName;
        this.allProducts.getProductsByCategoryName(nameToFetch).subscribe(
          (data) => {
            this.clothsCards = data.data;
            this.length = this.clothsCards.length;
            this.clothsCards.forEach((card) => {
              card.current_image = card.cover_image;
              if (card.discount_value){
                card.priceAfterDiscount = this.allProducts.calculateDiscount(card.discount_type, card.discount_value, card.price);
              }
              else{
                card.discount_value = 0;
              }
            });
          },
          (error) => {
            console.error('Error fetching products:', error);
          }
        );
      }
    });
  }

  changeImage(card: any, newImage: string) {
    card.current_image = newImage;
  }
}
