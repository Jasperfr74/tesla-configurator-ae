import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Color, Step1FormInterface, Tesla } from '../../models/tesla';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    ImageComponent,
  ],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component implements OnInit {
  step1Form!: FormGroup;
  selectedModelColors?: Color[];
  selectedModel?: Tesla;

  @Input() teslaModelInformation!: Tesla[] | null;

  @Output() updateStep1Form: EventEmitter<Step1FormInterface> = new EventEmitter<Step1FormInterface>();
  @Output() imagePathGenerated: EventEmitter<string> = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {}

  onModelChange(): void {
    const selectedModelCode = this.step1Form.get('currentModel')?.value;
    this.selectedModel = this.teslaModelInformation?.find(model => model.description === selectedModelCode) || undefined;
    this.selectedModelColors = this.selectedModel?.colors || [];
    this.step1Form.get('currentColor')?.setValue(this.selectedModelColors?.[0]?.code);
    this.updateFormValues();
  }

  onColorChange(): void {
    const selectedColor = this.step1Form.get('currentColor')?.value;
    const color = this.selectedModelColors?.find(color => color.code === selectedColor) || undefined;
    this.step1Form.get('currentColor')?.setValue(color?.code);
    this.updateFormValues();
  }

  ngOnInit() {
    this.step1Form = this.formBuilder.group({
      currentModel: new FormControl<string>(''),
      currentColor: new FormControl<string>(''),
      imagePathGenerated: new FormControl<string>(''),
    })

    this.step1Form.valueChanges.pipe(
      debounceTime(300),
      tap(value => {
        this.updateStep1Form.next(value);
      })
    ).subscribe()
  }

  private updateFormValues(): void {
    const code = this.selectedModel?.code;
    const currentColor = this.step1Form.get('currentColor')?.value;

    if (code && currentColor) {
      this.step1Form.get('imagePathGenerated')?.patchValue(this.buildImagePath(code, currentColor));
    }
  }

  private buildImagePath(modelCode: string, currentColor: string): string {
    return `assets/images/${modelCode}/${currentColor}.jpg`;
  }
}
