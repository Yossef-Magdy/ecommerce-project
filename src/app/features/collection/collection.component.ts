import { Component } from '@angular/core';
import { ButtonComponent } from "../../shared/button/button.component";
import { AllProductsService } from './all-products.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent{

  clothsCards: any[] = [];
  length:number = 0;
  constructor(private allProducts:AllProductsService){}

  ngOnInit(){
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
    
  }
  changeImage(card: any, newImage: string){
    card.current_image = newImage;
  }

}
