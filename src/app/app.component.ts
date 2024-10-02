import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/layout/header/header.component";
import { FooterComponent } from './core/layout/footer/footer.component';
import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';
import { ControlHeaderComponent } from "./core/layout/control-header/control-header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ControlHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';

  constructor (private router: Router) {}

  ngOnInit(): void {
    initFlowbite();
  }

  inDashboard() {
    return this.router.url.startsWith('/dashboard');
  }
}
