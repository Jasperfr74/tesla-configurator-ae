import { createAction, props } from '@ngrx/store';


export const setStep = createAction(
  '[STEP] Set current step',
  props<{ step: number }>()
);
