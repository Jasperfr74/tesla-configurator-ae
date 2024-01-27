import { createReducer, on } from '@ngrx/store';
import * as AppActions from '../actions/app.action';
import { ConfigInformation, Step1FormInterface, Step2FormInterface, Tesla } from '../../core/models/tesla';

export interface AppState {
  teslaInformation: Tesla[];
  configInformation: ConfigInformation;
  step1Form: Step1FormInterface;
  step2Form: Step2FormInterface;
}

export const initialState = {
  teslaInformation: {},
  configInformation: {},
  step1Form: {
    selectedModel: {},
    currentModel: '',
    currentColor: '',
    imagePathGenerated: '',
    isDirty: false,
  },
  step2Form: {
    selectedConfig: {},
    currentConfig: '',
  }
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.loadModelInformation, (
    state, { payload } ) =>
    ({
      ...state,
      teslaInformation: payload
    })),
  on(AppActions.loadConfigs, (
    state, { payload } ) =>
    ({
      ...state,
      configInformation: payload
    })),
  on(AppActions.updateStep1Form, (
    state, { step1Form } ) =>
    ({
      ...state,
      step1Form,
    })),
  on(AppActions.updateStep2Form, (
    state, { step2Form } ) =>
    ({
      ...state,
      step2Form
    })),
  on(AppActions.setStep1FormDirty, (
    state, { isDirty } ) =>
    ({
      ...state,
      step1Form: {
        ...state.step1Form,
        isDirty
      }
    })),
);

