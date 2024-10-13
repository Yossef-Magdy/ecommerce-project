import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() from: number = 0;
  @Input() to: number = 0;
  @Input() total: number = 0;
  @Input() prev?: any;
  @Input() next?: any;
  @Input() load?: any;
}
