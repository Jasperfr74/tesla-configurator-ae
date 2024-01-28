import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { ImageComponent } from '../shared/components/image/image.component';
import { CurrencyFormatPipe } from '../shared/pipes/currency-format.pipe';
import { Config, ConfigInformation, Step1FormInterface, Step2FormInterface } from '../core/models/tesla';

@Component({
  selector: 'app-step-2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ImageComponent,
    CurrencyFormatPipe
  ],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.scss'
})
export class Step2Component implements OnInit, OnChanges {
  // https://angular.dev/style-guide#folders-by-feature-structure

  @Input() configInformation: ConfigInformation | null = null;
  @Input() step1FormState: Step1FormInterface | null = null;
  @Input() step2FormState: Step2FormInterface | null = null;
  @Output() updateStep2Form: EventEmitter<Step2FormInterface> = new EventEmitter<Step2FormInterface>();

  selectedConfig: Config | undefined = undefined;
  step2Form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.step2Form = this.formBuilder.group({
      selectedConfig: new FormControl<Config|null>( null),
      currentConfig: new FormControl<string>(''),
      towHitch: new FormControl<boolean>(false),
      yoke: new FormControl<boolean>(false),
    });
  }

  onModelChange(event: Event): void {
    if (!event) return;

    const selectConfig: string = (event.target as HTMLInputElement).value;
    this.selectedConfig = this.configInformation?.configs?.find((config: Config): boolean => config.description === selectConfig);
    this.step2Form.get('selectedConfig')?.patchValue(this.selectedConfig);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['configInformation']?.currentValue !== changes?.['configInformation']?.previousValue) {
      this.step2Form.patchValue({
        selectedConfig: this.step2FormState?.selectedConfig,
        currentConfig: this.step2FormState?.currentConfig,
        towHitch: this.step2FormState?.towHitch,
        yoke: this.step2FormState?.yoke,
      }, { emitEvent: false }) // emitEvent to false because we do not want to trigger valueChanges and update the current store
    }
  }

  ngOnInit(): void {
    this.step2Form.valueChanges.pipe(
      tap((value: Step2FormInterface) => {
        this.updateStep2Form.next(value);
      })
    ).subscribe()
  }
}
