import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-right-drawer',
  standalone: true,
  imports: [],
  templateUrl: './right-drawer.component.html',
  styleUrl: './right-drawer.component.css'
})
export class RightDrawerComponent {
  @Input() title!: string;
  @Input() text!: string;
}
