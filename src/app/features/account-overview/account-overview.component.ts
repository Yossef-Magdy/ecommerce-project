import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-account-overview',
  standalone: true,
  imports: [],
  templateUrl: './account-overview.component.html',
  styleUrl: './account-overview.component.css'
})
export class AccountOverviewComponent {
  @Input() selectedTab: string ='';

  @Output() tabChange = new EventEmitter<string>();

  changeTab(tab: string) {
    this.tabChange.emit(tab);
  }
}
