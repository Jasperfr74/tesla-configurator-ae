import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarContainer } from './navbar/navbar.container';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarContainer
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
