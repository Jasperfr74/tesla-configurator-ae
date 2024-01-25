import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCurrentStep } from '../../../store/selectors/app.selectors';
import { AsyncPipe } from '@angular/common';
import { Step3Component } from './step-3.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-step-3-container',
  standalone: true,
  imports: [
    AsyncPipe,
    Step3Component
  ],
  templateUrl: './step-3.container.html'
})
export class Step3Container {
  currentStep$: Observable<number> = this.store.select(getCurrentStep);

  constructor(
    private store: Store
  ) {}
}
