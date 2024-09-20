import { Component } from '@angular/core';
import { StarRatingComponent } from "../../shared/star-rating/star-rating.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [StarRatingComponent, StarRatingComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  colors = ["red", "black", "grey", "beige"];
  sizes = ["S", "M", "L", "XL"];

}
