import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getCurrentStep, getStep1Form,
  getTeslaModelInformation,
} from '../../../store/selectors/app.selectors';
import { AsyncPipe } from '@angular/common';
import { Step1Component } from './step-1.component';
import { updateStep1Form } from '../../../store/actions/app.action';
import { Step1FormInterface, Tesla } from '../../models/tesla';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-step-1-container',
  standalone: true,
  imports: [
    AsyncPipe,
    Step1Component
  ],
  templateUrl: './step-1.container.html'
})
export class Step1Container {
  teslaModelInformation$: Observable<Tesla[]|null> = this.store.select(getTeslaModelInformation);
  step1FormState$: Observable<Step1FormInterface|null> = this.store.select(getStep1Form);

  constructor(
    private store: Store
  ) {}

  onUpdateStep1Form(updateForm: Step1FormInterface) {
    this.store.dispatch(updateStep1Form( { step1Form: updateForm }))
  }
}
