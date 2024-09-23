import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-black-button',
  standalone: true,
  imports: [],
  templateUrl: './black-button.component.html',
  styleUrl: './black-button.component.css'
})
export class BlackButtonComponent {
  @Input() text: string = "";
}
