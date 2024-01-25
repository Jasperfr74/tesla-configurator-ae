import { Routes } from '@angular/router';
import { Step3Component } from './core/components/step-3/step-3.component';
import { Step1Container } from './core/components/step-1/step-1.container';
import { Step2Container } from './core/components/step-2/step-2.container';
import { step2Guard } from './core/guards/step-2.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'step-1', pathMatch: 'full' },
  { path: 'step-1', title: 'Step-1', component: Step1Container },
  { path: 'step-2', title: 'Step-2', component: Step2Container, canActivate: [step2Guard()] },
  { path: 'step-3', title: 'Step-3', component: Step3Component },
];
