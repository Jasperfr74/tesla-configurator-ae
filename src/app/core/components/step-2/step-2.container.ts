import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getConfigInformation, getStep1Form, getStep2Form } from '../../../store/selectors/app.selectors';
import { AsyncPipe } from '@angular/common';
import { Step2Component } from './step-2.component';
import { Observable } from 'rxjs';
import { ConfigInformation, Step1FormInterface, Step2FormInterface } from '../../models/tesla';
import { updateStep2Form } from '../../../store/actions/app.action';


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
  configInformation$: Observable<ConfigInformation | null> = this.store.select(getConfigInformation);
  step1FormState$: Observable<Step1FormInterface | null> = this.store.select(getStep1Form);
  step2FormState$: Observable<Step2FormInterface | null> = this.store.select(getStep2Form);

  constructor(
    private store: Store
  ) {}

  onUpdateStep2Form(updateForm: Step2FormInterface) {
    this.store.dispatch(updateStep2Form( { step2Form: updateForm }))
  }
}
