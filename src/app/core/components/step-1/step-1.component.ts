import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Color, ModelCodeAvailable, Step1FormInterface, Tesla } from '../../models/tesla';
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
  step1Form!: FormGroup; // add type
  selectedModel: Tesla|undefined = undefined;

  @Input() teslaModelInformation!: Tesla[] | null;
  @Input() step1FormState!: Step1FormInterface | null;

  @Output() updateStep1Form: EventEmitter<Step1FormInterface> = new EventEmitter<Step1FormInterface>();

  constructor(private formBuilder: FormBuilder) {}

  onModelChange(event: Event): void {
    if (!event) return;

    const selectedModelCode = (event.target as HTMLInputElement).value;
    this.selectedModel = this.teslaModelInformation?.find(model => model.description === selectedModelCode);

    this.step1Form.get('selectedModel')?.patchValue(this.selectedModel);
    this.step1Form.get('currentColor')?.patchValue(this.selectedModel?.colors?.[0].code);

    this.saveNewImagePath();
  }

  onColorChange(event: Event): void {
    if (!event) return;

    const selectedColor = (event.target as HTMLInputElement).value;
    const color = this.selectedModel?.colors?.find((color: Color) => color.code === selectedColor);

    this.step1Form.get('currentColor')?.patchValue(color?.code);

    this.saveNewImagePath();
  }

  setExistingSelectedModel(){
    if (this.step1FormState?.selectedModel) {
      this.selectedModel = this.step1FormState?.selectedModel;
    }
  }

  initForm() {
    this.step1Form = this.formBuilder.group({
      selectedModel: new FormControl<Tesla|null>(this.step1FormState?.selectedModel || null),
      currentModel: new FormControl<string>(this.step1FormState?.currentModel || ''),
      currentColor: new FormControl<string>(this.step1FormState?.currentColor || ''),
      imagePathGenerated: new FormControl<string>(this.step1FormState?.imagePathGenerated || ''),
    })
  }

  listenToUpdateForm() {
    this.step1Form.valueChanges.pipe(
      debounceTime(300),
      tap((value: Step1FormInterface) => {
        this.updateStep1Form.next(value);
      })
    ).subscribe()
  }

  ngOnInit() {
    this.initForm();
    this.listenToUpdateForm();
    this.setExistingSelectedModel();
  }


  private saveNewImagePath(): void {
    const code: ModelCodeAvailable = (this.step1Form.get('selectedModel')?.value as Tesla).code;
    const currentColor = this.step1Form.get('currentColor')?.value;

    if (code && currentColor) {
      this.step1Form.get('imagePathGenerated')?.patchValue(this.buildImagePath(code, currentColor));
    }
  }

  private buildImagePath(modelCode: string, currentColor: string): string {
    return `assets/images/${modelCode}/${currentColor}.jpg`;
  }
}
