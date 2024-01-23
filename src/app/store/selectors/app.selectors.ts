import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../reducers/app.reducer';

export const app = 'app';

export const appState = createFeatureSelector<AppState>(app);

export const getCurrentStep = createSelector(
  appState,
  (state: AppState) => state.step
);
