import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { isStep1Valid, isStep2Valid } from '../../../store/selectors/app.selectors';
import { AsyncPipe } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navbar-container',
  standalone: true,
  imports: [
    AsyncPipe,
    NavbarComponent
  ],
  templateUrl: './navbar.container.html'
})
export class NavbarContainer {
  isStep1Valid$: Observable<boolean | null> = this.store.select(isStep1Valid);
  isStep2Valid$: Observable<boolean | null> = this.store.select(isStep2Valid);

  constructor(
    private store: Store
  ) {}
}
