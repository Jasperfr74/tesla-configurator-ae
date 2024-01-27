import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getStep1Form, getStep2Form } from '../../../store/selectors/app.selectors';
import { AsyncPipe } from '@angular/common';
import { Step3Component } from './step-3.component';
import { Observable } from 'rxjs';
import { Step1FormInterface, Step2FormInterface } from '../../models/tesla';


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
  step1FormState$: Observable<Step1FormInterface | null> = this.store.select(getStep1Form);
  step2FormState$: Observable<Step2FormInterface | null> = this.store.select(getStep2Form);

  constructor(
    private store: Store
  ) {}
}
