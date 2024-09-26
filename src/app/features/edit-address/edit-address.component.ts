import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BlackButtonComponent } from "../../shared/black-button/black-button.component";

@Component({
  selector: 'app-edit-address',
  standalone: true,
  imports: [BlackButtonComponent],
  templateUrl: './edit-address.component.html',
  styleUrl: './edit-address.component.css'
})
export class EditAddressComponent {
  @Input() selectedTab: string ='';

  @Output() tabChange = new EventEmitter<string>();
  changeTab(tab: string) {
    this.tabChange.emit(tab);
  }
}
