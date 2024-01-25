import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCurrentStep } from '../../../store/selectors/app.selectors';
import { AsyncPipe } from '@angular/common';
import { Step2Component } from './step-2.component';


@Component({
  selector: 'app-step-2-container',
  standalone: true,
  imports: [
    AsyncPipe,
    Step2Component
  ],
  templateUrl: './step-2.container.html'
})
export class Step2Container {
  currentStep$ = this.store.select(getCurrentStep);

  constructor(
    private store: Store
  ) {}
}
