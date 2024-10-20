import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/layout/header/header.component";
import { FooterComponent } from './core/layout/footer/footer.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';
import { ToastComponent } from "./core/layout/toast/toast.component";
import { MyCurrencyPipe } from './pipes/my-currency.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent, ToastComponent, MyCurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';

  constructor (private router: Router) {}

  ngOnInit(): void {
    initFlowbite();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({top:0, left:0, behavior:'smooth'});  // Scrolls to the top-left corner when route changes
      }
    });
  }

  inDashboard() {
    return this.router.url.startsWith('/dashboard');
  }
}
