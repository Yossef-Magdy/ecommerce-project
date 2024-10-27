import { Component, NgModule } from '@angular/core';
import { AllProductsService } from '../collection/all-products.service';
import { ProductReviewsServiceService } from '../product-details/product-reviews/product-reviews-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.css'
})
export class CreateReviewComponent {

  product: any;
  rating: number = 0;
  reviewText: string = '';

  constructor(private productService: AllProductsService, private reviewService: ProductReviewsServiceService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');
  if (slug) {
    this.productService.getProductBySlug(slug).subscribe((res) => {
      this.product = res.data;
    }, error => {
      console.error('Error fetching product:', error);
    });
  }
  }

  setRating(value: number) {
    this.rating = value;
  }

  onReviewTextChange(event: Event) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.reviewText = inputElement.value;
  }

  submitReview() {
    const reviewData = {
      rating: this.rating,
      comment: this.reviewText,
      product_id: this.product?.id
    };
  
    this.reviewService.createReview(reviewData).subscribe(response => {
      this.router.navigate(['/reviews', this.product.id]);
    }, error => {
      console.error('Error submitting review:', error);
    });
  }
}
