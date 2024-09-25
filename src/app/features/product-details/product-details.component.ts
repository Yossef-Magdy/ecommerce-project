import { Component } from '@angular/core';
import { StarRatingComponent } from "../../shared/star-rating/star-rating.component";
import { ButtonComponent } from '../../shared/button/button.component';
import { GallerySwiperComponent } from "../gallery-swiper/gallery-swiper.component";
import { RouterLink } from '@angular/router';
import { SizeChartComponent } from '../../core/auth/components/label/size-chart/size-chart.component';
import { ProductCardComponent } from "../../shared/product-card/product-card.component";
import { ZoomComponent } from "../zoom/zoom.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [StarRatingComponent, StarRatingComponent, ButtonComponent, GallerySwiperComponent, GallerySwiperComponent, RouterLink, SizeChartComponent, ProductCardComponent, ZoomComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  product = {
    "slug": "slug",
    "name": "name",
    "description": "desc",
    "images": [
      "assets/1.jpg",
      "assets/2.jpg",
      "assets/3.jpg",
      "assets/4.jpg",
      "assets/5.jpg"
    ],
  };
  colors = ["red", "black", "grey", "beige"];
  sizes = ["S", "M", "L", "XL"];

}
