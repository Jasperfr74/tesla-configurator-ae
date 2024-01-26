import { createReducer, on } from '@ngrx/store';
import * as AppActions from '../actions/app.action';
import { Step1FormInterface, Tesla } from '../../core/models/tesla';

export interface AppState {
  step: number;
  teslaInformation: Tesla[];
  step1Form: Step1FormInterface;
}

export const initialState = {
  step: 1,
  teslaInformation: {},
  step1Form: {
    selectedModel: {},
    currentModel: '',
    currentColor: '',
    imagePathGenerated: '',
  },
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.setStep, (
    state, { step }) =>
    ({
      ...state,
      step: step
    })),
  on(AppActions.loadModelInformation, (
    state, { payload } ) =>
    ({
      ...state,
      teslaInformation: payload
    })),
  on(AppActions.updateCurrentModel, (
    state, { currentModel } ) =>
    ({
      ...state,
      currentModel
    })),
  on(AppActions.updateStep1Form, (
    state, { step1Form } ) =>
    ({
      ...state,
      step1Form
    })),
);

