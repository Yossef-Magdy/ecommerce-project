import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-arrows-updated',
  standalone: true,
  imports: [],
  templateUrl: './arrows-updated.component.html',
  styleUrl: './arrows-updated.component.css'
})
export class ArrowsUpdatedComponent {
  @Input() cards: any[] = [];
  @Input() currentIndex = 0;
  @Input() maxVisibleCards !: number;
  @Output() arrowClick = new EventEmitter<number>();

  nextCard() {
    const maxIndex = this.cards.length - this.maxVisibleCards;
    console.log(this.maxVisibleCards);
    
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.arrowClick.emit(this.currentIndex);
    }
  }

  prevCard() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.arrowClick.emit(this.currentIndex);
    }
  }
}
