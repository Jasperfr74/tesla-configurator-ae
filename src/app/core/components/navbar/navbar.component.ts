import { booleanAttribute, Component, inject, Input, OnInit } from '@angular/core';
import { Step1Component } from '../step-1/step-1.component';
import { Step2Component } from '../step-2/step-2.component';
import { Step3Component } from '../step-3/step-3.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Step1FormInterface } from '../../models/tesla';
import { JsonPipe, NgClass } from '@angular/common';
import { step2Guard } from '../../guards/step-2.guard';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    Step1Component,
    Step2Component,
    Step3Component,
    RouterLink,
    RouterLinkActive,
    NgClass,
    JsonPipe,
    ImageComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() step1Form!: Step1FormInterface;
  @Input() isStep1Valid: boolean | undefined;
}
