import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  isUserLoggedIn: boolean = true;
  userEmail: string = 'user@gmail.com';
  dropdownVisible: boolean = false;
  paymentMethod: string = '';
  showBillingAddress: boolean = false;
  selectedBillingOption: string = 'same';

  constructor(private router: Router) { }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  onPaymentMethodChange(method: string) {
    this.paymentMethod = method;
    this.showBillingAddress = (method === 'wallets');

    if (method === 'credit-card' || method === 'cod') {
      this.showBillingAddress = false;
      this.selectedBillingOption = 'same';
    }
  }

  onBillingOptionChange(option: string) {
    this.selectedBillingOption = option;
  }


  onLogout() {
    this.isUserLoggedIn = false;
    this.router.navigate(['/auth/login']);
  }
}
