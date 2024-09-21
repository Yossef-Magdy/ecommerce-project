import { Component } from '@angular/core';
import { StarRatingComponent } from "../../shared/star-rating/star-rating.component";
import { ButtonComponent } from '../../shared/button/button.component';
import { GallerySwiperComponent } from "../gallery-swiper/gallery-swiper.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [StarRatingComponent, StarRatingComponent, ButtonComponent, GallerySwiperComponent, GallerySwiperComponent, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  colors = ["red", "black", "grey", "beige"];
  sizes = ["S", "M", "L", "XL"];

}
