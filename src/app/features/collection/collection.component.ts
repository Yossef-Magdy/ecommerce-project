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
  constructor(private allProducts: AllProductsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.allProducts.getProducts().subscribe(
      (data) => {
        console.log(data.data);
        this.clothsCards = data.data;
        this.length = this.clothsCards.length;
        this.clothsCards.forEach((card) => {
          card.current_image = card.cover_image;
        });
      }
    );

    this.route.params.subscribe(params => {
      let categoryName = params['category_name'];
      if (categoryName) {
        categoryName = categoryName.replace(/\s+/g, '-');
        categoryName = encodeURIComponent(categoryName);

        this.allProducts.getProductsByCategoryName(categoryName).subscribe(
          (data) => {
            this.clothsCards = data.data;
            this.length = this.clothsCards.length;
            this.clothsCards.forEach((card) => {
              card.current_image = card.cover_image;
            });
          },
          (error) => {
            console.error('Error fetching products by category:', error);
          }
        );
      }
    });


    this.route.params.subscribe(params => {
      let subcategoryName = params['category_name'];
      if (subcategoryName) {
        subcategoryName = subcategoryName.replace(/\s+/g, '-');
        subcategoryName = encodeURIComponent(subcategoryName);
        console.log('Encoded subcategory name:', subcategoryName);

        this.allProducts.getProductsByCategoryName(subcategoryName).subscribe(
          (data) => {
            this.clothsCards = data.data;
            this.length = this.clothsCards.length;
            this.clothsCards.forEach((card) => {
              card.current_image = card.cover_image;
            });
          },
          (error) => {
            console.error('Error fetching products by subcategory:', error);
          }
        );
      }
    });

  }
  changeImage(card: any, newImage: string) {
    card.current_image = newImage;
  }

}
