import { createAction, props } from '@ngrx/store';
import { ConfigInformation, Step1FormInterface, Step2FormInterface, Tesla } from '../../core/models/tesla';

export const loadModelInformation = createAction(
  '[TESLA] load model information',
  props<{ payload: Tesla[] }>()
);

export const loadConfigs = createAction(
  '[TESLA] load config options',
  props<{ payload: ConfigInformation }>()
);

export const updateStep1Form = createAction(
  '[FORM] update step 1 form',
  props<{ step1Form: Step1FormInterface }>()
);

export const setStep1FormDirty = createAction(
  '[FORM] set step1 dirty',
  props<{ isDirty: boolean }>()
);

export const updateStep2Form = createAction(
  '[FORM] update step 2 form',
  props<{ step2Form: Step2FormInterface }>()
);
