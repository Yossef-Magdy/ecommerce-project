import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() totalStars: number = 5;

  get stars() {
    const filledCount = Math.floor(this.rating); // Number of fully filled stars
    const hasHalfStar = this.rating % 1 >= 0.5; // Check if a half star is needed
    const emptyCount = this.totalStars - filledCount - (hasHalfStar ? 1 : 0); // Remaining empty stars

    return {
      filled: filledCount,
      half: hasHalfStar ? 1 : 0, // Either 1 or 0 half star
      empty: emptyCount,
    };
  }
}
