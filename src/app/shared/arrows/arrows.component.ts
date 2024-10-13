import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-arrows',
  standalone: true,
  templateUrl: './arrows.component.html',
  styleUrls: ['./arrows.component.css']
})
export class ArrowsComponent {
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
