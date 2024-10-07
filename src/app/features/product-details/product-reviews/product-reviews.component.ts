import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ProductReviewsServiceService } from './product-reviews-service.service';
import { ActivatedRoute } from '@angular/router';
import { StarRatingComponent } from "../../../shared/star-rating/star-rating.component";

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [NgFor, StarRatingComponent],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.css'
})
export class ProductReviewsComponent {
  reviews !: any[];
  constructor(private productReviewsService:ProductReviewsServiceService, private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    const routeId = this.activatedRoute.snapshot.params['id'];
    this.productReviewsService.getReviewsById(routeId).subscribe((reviews:any)=>{
      console.log(reviews);
      this.reviews = reviews;
    })
  }
}
