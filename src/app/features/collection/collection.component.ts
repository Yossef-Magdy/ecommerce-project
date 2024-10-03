import { Component } from '@angular/core';
import { ButtonComponent } from "../../shared/button/button.component";
import { AllProductsService } from './all-products.service';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent{

  clothsCards !: any[];
  constructor(private allProducts:AllProductsService){}

  ngOnInit(){
    this.allProducts.getProducts().subscribe(
      (data) => {
        console.log(data.data);
        
        this.clothsCards = data.data;
      }
    );
  }
  // clothsCards = [
  //   {
  //     title: 'Ripped Thick Strap Basic Top',
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     isSale: true,
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/20.webp',
  //   },
  //   {
  //     title: 'Ripped Fitted Half Sleeve Top',
  //     isSale: false,
  //     price: 'LE 69',
  //     colors: ['black', 'white', 'gray'],
  //     image: 'assets/21.webp',
  //   },
  //   {
  //     title: 'Swim Shorts',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     colors: ['black', 'pink', 'green', 'yellow'],
  //     image: 'assets/22.webp',
  //   },
  //   {
  //     title: 'Leggings',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/23.webp',
  //   },
  //   {
  //     title: 'T-shirt',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/24.webp',
  //   },
  //   {
  //     title: 'Swim Shorts',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     colors: ['black', 'pink', 'green', 'yellow'],
  //     image: 'assets/25.webp',
  //   },
  //   {
  //     title: 'Leggings',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/26.webp',
  //   },
  //   {
  //     title: 'T-shirt',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/20.webp',
  //   },
  //   {
  //     title: 'Swim Shorts',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     colors: ['black', 'pink', 'green', 'yellow'],
  //     image: 'assets/21.webp',
  //   },
  //   {
  //     title: 'Leggings',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/26.webp',
  //   },
  //   {
  //     title: 'T-shirt',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/23.webp',
  //   },
  //   {
  //     title: 'Swim Shorts',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     colors: ['black', 'pink', 'green', 'yellow'],
  //     image: 'assets/22.webp',
  //   },
  //   {
  //     title: 'Leggings',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/20.webp',
  //   },
  //   {
  //     title: 'T-shirt',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/21.webp',
  //   },
  //   {
  //     title: 'Swim Shorts',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     colors: ['black', 'pink', 'green', 'yellow'],
  //     image: 'assets/23.webp',
  //   },
  //   {
  //     title: 'Leggings',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/22.webp',
  //   },
  //   {
  //     title: 'T-shirt',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/26.webp',
  //   },
  //   {
  //     title: 'Swim Shorts',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     colors: ['black', 'pink', 'green', 'yellow'],
  //     image: 'assets/20.webp',
  //   },
  //   {
  //     title: 'Leggings',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/21.webp',
  //   },
  //   {
  //     title: 'T-shirt',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/22.webp',
  //   },
  //   {
  //     title: 'Swim Shorts',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     colors: ['black', 'pink', 'green', 'yellow'],
  //     image: 'assets/23.webp',
  //   },
  //   {
  //     title: 'Leggings',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/20.webp',
  //   },
  //   {
  //     title: 'T-shirt',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/23.webp',
  //   },
  //   {
  //     title: 'Swim Shorts',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     colors: ['black', 'pink', 'green', 'yellow'],
  //     image: 'assets/26.webp',
  //   },
  //   {
  //     title: 'Leggings',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/21.webp',
  //   },
  //   {
  //     title: 'T-shirt',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/25.webp',
  //   },
  //   {
  //     title: 'Leggings',
  //     isSale: true,
  //     oldPrice: 'LE 190',
  //     newPrice: 'LE 150',
  //     colors: ['black', 'blue', 'white', 'gray'],
  //     image: 'assets/23.webp',
  //   },
  // ]



}
