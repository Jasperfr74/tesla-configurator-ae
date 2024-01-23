import { Component } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TeslaService } from './shared/services/tesla.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, HttpClientModule, RouterOutlet, CommonModule, NavbarComponent],
  providers: [
    TeslaService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private teslaService: TeslaService) {
    // FIXME:: for debuging purposes
    this.teslaService.getModels().subscribe(res => console.log(res));
    this.teslaService.getOptionByModel('X').subscribe(res => console.log(res));
  }
}
