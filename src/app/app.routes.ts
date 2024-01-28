import { Routes } from '@angular/router';
import { step2Guard } from './core/guards/step-2.guard';
import { step3Guard } from './core/guards/step-3.guard';
import { Step1Container } from './step-1/step-1.container';
import { Step2Container } from './step-2/step-2.container';
import { Step3Container } from './step-3/step-3.container';

export const routes: Routes = [
  { path: '', redirectTo: 'step-1', pathMatch: 'full' },
  { path: 'step-1', title: 'Step-1', component: Step1Container },
  { path: 'step-2', title: 'Step-2', component: Step2Container, canActivate: [step2Guard()] },
  { path: 'step-3', title: 'Step-3', component: Step3Container, canActivate: [step3Guard()] },
];
