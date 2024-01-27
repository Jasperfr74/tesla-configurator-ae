import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getStep2Form } from '../../../store/selectors/app.selectors';
import { AsyncPipe } from '@angular/common';
import { Step3Component } from './step-3.component';
import { Observable } from 'rxjs';
import { Step2FormInterface } from '../../models/tesla';


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
  step2FormState$: Observable<Step2FormInterface|null> = this.store.select(getStep2Form);

  constructor(
    private store: Store
  ) {}
}
