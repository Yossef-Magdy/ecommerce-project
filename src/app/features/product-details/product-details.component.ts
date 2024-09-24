import { Component } from '@angular/core';
import { StarRatingComponent } from "../../shared/star-rating/star-rating.component";
import { ButtonComponent } from '../../shared/button/button.component';
import { GallerySwiperComponent } from "../gallery-swiper/gallery-swiper.component";
import { RouterLink } from '@angular/router';
import { SizeChartComponent } from '../../core/auth/components/label/size-chart/size-chart.component';
import { ProductCardComponent } from "../../shared/product-card/product-card.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [StarRatingComponent, StarRatingComponent, ButtonComponent, GallerySwiperComponent, GallerySwiperComponent, RouterLink, SizeChartComponent, ProductCardComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  colors = ["red", "black", "grey", "beige"];
  sizes = ["S", "M", "L", "XL"];

}
