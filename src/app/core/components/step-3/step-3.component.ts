import { Component, Input } from '@angular/core';
import { Step2FormInterface } from '../../models/tesla';

@Component({
  selector: 'app-step-3',
  standalone: true,
  imports: [],
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.scss'
})
export class Step3Component {
  @Input() step2FormState!: Step2FormInterface|null;
}
