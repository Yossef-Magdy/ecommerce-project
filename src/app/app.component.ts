import { Component, DoCheck, OnInit } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/layout/header/header.component";
import { FooterComponent } from './core/layout/footer/footer.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';
import { ToastComponent } from "./core/layout/toast/toast.component";
import { SpinnerComponent } from "./core/layout/spinner/spinner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent, ToastComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';
  inDashboard: null | boolean = null;
  dashboardLogin: null | boolean = null;

  constructor (private router: Router) {}

  ngOnInit(): void {
    initFlowbite();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({top:0, left:0, behavior:'smooth'});  // Scrolls to the top-left corner when route changes
        const url = this.router.url;
        this.inDashboard = url.startsWith('/dashboard');
        if (this.inDashboard) {
          this.dashboardLogin = url.includes('login');
        }
      }
    });
  }
}
