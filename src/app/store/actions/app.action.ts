import { createAction, props } from '@ngrx/store';
import { Step1FormInterface, Tesla } from '../../core/models/tesla';


export const setStep = createAction(
  '[STEP] Set current step',
  props<{ step: number }>()
);

export const loadModelInformation = createAction(
  '[TESLA] load model information',
  props<{ payload: Tesla[] }>()
);

export const updateCurrentModel = createAction(
  '[TESLA] update current model',
  props<{ currentModel: string }>()
);

export const updateStep1Form = createAction(
  '[FORM] update step 1 form',
  props<{ step1Form: Step1FormInterface }>()
);
