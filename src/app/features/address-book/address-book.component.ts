import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { BlackButtonComponent } from "../../shared/black-button/black-button.component";

@Component({
  selector: 'app-address-book',
  standalone: true,
  imports: [ProfileComponent, BlackButtonComponent],
  templateUrl: './address-book.component.html',
  styleUrl: './address-book.component.css'
})
export class AddressBookComponent {

  @Output() tabChange = new EventEmitter<string>();


}
