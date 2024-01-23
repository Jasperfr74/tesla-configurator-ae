import { createReducer, on } from '@ngrx/store';
import * as AppActions from '../actions/app.action';

export interface AppState {
  step: number;
}

export const initialState = {
  step: 1,
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.setStep, (state, { step }) =>({ ...state, step: step })),
);
