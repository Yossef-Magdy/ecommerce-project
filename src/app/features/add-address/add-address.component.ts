import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BlackButtonComponent } from "../../shared/black-button/black-button.component";

@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [BlackButtonComponent],
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.css'
})
export class AddAddressComponent {
  @Input() selectedTab: string ='';

  @Output() tabChange = new EventEmitter<string>();
  changeTab(tab: string) {
    this.tabChange.emit(tab);
  }
}
