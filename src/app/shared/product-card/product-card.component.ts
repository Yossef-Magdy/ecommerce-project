import { Component } from '@angular/core';
import { ArrowsComponent } from "../arrows/arrows.component";

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

  clothsCards = [
    {
      title: 'Ripped Thick Strap Basic Top',
      oldPrice: 'LE 190',
      newPrice: 'LE 150',
      isSale: true,
      colors: ['black', 'blue', 'white', 'gray'],
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'Ripped Fitted Half Sleeve Top',
      isSale: false,
      price: 'LE 69',
      colors: ['black', 'white', 'gray'],
      image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'Swim Shorts',
      isSale: true,
      oldPrice: 'LE 190',
      newPrice: 'LE 150',
      colors: ['black', 'pink', 'green', 'yellow'],
      image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'Leggings',
      isSale: true,
      oldPrice: 'LE 190',
      newPrice: 'LE 150',
      colors: ['black', 'blue', 'white', 'gray'],
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'T-shirt',
      isSale: 'true',
      oldPrice: 'LE 190',
      colors: ['black', 'blue', 'white', 'gray'],
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'Swim Shorts',
      isSale: true,
      oldPrice: 'LE 190',
      newPrice: 'LE 150',
      colors: ['black', 'pink', 'green', 'yellow'],
      image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'Leggings',
      isSale: true,
      oldPrice: 'LE 190',
      newPrice: 'LE 150',
      colors: ['black', 'blue', 'white', 'gray'],
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
  ]
  
  getClothsTransform() {
    return `translateX(-${this.clothsCurrentIndex * (100 / this.maxClothsVisibleCards)}%)`;
  }

  onClothsArrowClick(newIndex: number) {
    this.clothsCurrentIndex = newIndex;
  }

}