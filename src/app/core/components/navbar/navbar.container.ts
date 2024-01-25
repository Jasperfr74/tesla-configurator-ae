import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getStep1Form, isStep1Valid } from '../../../store/selectors/app.selectors';
import { AsyncPipe } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { Observable } from 'rxjs';
import { Step1FormInterface } from '../../models/tesla';


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
  step1Form$: Observable<Step1FormInterface> = this.store.select(getStep1Form);
  isStep1Valid$: Observable<boolean> = this.store.select(isStep1Valid);

  constructor(
    private store: Store
  ) {}
}
