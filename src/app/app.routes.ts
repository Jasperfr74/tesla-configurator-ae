import { Routes } from '@angular/router';
import { Step1Component } from './core/components/step-1/step-1.component';
import { Step3Component } from './core/components/step-3/step-3.component';
import { Step2Component } from './core/components/step-2/step-2.component';

export const routes: Routes = [
  { path: 'step-1', title: 'Step-1', component: Step1Component },
  { path: 'step-2', title: 'Step-2', component: Step2Component },
  { path: 'step-3', title: 'Step-3', component: Step3Component },
];
