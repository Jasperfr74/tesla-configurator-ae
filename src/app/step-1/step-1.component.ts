import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { ImageComponent } from '../shared/components/image/image.component';
import { Color, ModelCodeAvailable, Step1FormInterface, ModelInformation } from '../core/models/tesla';


@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ImageComponent,
  ],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component implements OnInit {
  // https://angular.dev/style-guide#folders-by-feature-structure

  @Input() teslaModelInformation: ModelInformation[] | null = null;
  @Input() step1FormState: Step1FormInterface | null = null;
  @Output() updateStep1Form: EventEmitter<Step1FormInterface> = new EventEmitter<Step1FormInterface>();

  selectedModel: ModelInformation | null = null;

  step1Form: FormGroup = this.formBuilder.group({
    selectedModel: new FormControl<ModelInformation|null>( null),
    currentModel: new FormControl<string>('', { nonNullable: true }),
    selectedColor: new FormControl<Color|null>( null),
    currentColor: new FormControl<string>('', { nonNullable: true }),
    imagePathGenerated: new FormControl<string>('', { nonNullable: true }),
    isDirty: new FormControl<boolean>(false, { nonNullable: true }),
})

  constructor(private formBuilder: FormBuilder) {}

  onColorChange(event: Event): void {
    if (!event) return;

    const selectedColor: string = (event.target as HTMLInputElement).value;
    const color: Color | undefined = this.selectedModel?.colors?.find((color: Color): boolean => color.code === selectedColor);

    if (!color) {
      return;
    }

    this.step1Form.patchValue({
      selectedColor: color,
      currentColor: color.code
    })

    this.saveNewImagePath();
  }

  onModelChange(event: Event): void {
    if (!event) {
      return;
    }

    const selectedModelCode: string = (event.target as HTMLInputElement).value;
    const selectedModel: ModelInformation | undefined = this.teslaModelInformation?.find((model: ModelInformation) => model.description === selectedModelCode);

    if (!selectedModel) {
      return;
    }

    this.selectedModel = selectedModel;

    const firstColor: Color = selectedModel.colors[0];

    this.step1Form.patchValue({
      selectedModel,
      selectedColor: firstColor,
      currentColor: firstColor.code
    })

    this.setStep1Dirty(selectedModelCode);
    this.saveNewImagePath();
  }

  ngOnInit(): void {
    this.step1Form.patchValue({
      selectedModel:this.step1FormState?.selectedModel,
      currentModel: this.step1FormState?.currentModel,
      selectedColor: this.step1FormState?.selectedColor,
      currentColor: this.step1FormState?.currentColor,
      imagePathGenerated: this.step1FormState?.imagePathGenerated,
    })

    this.step1Form.valueChanges.pipe(
      tap((value: Step1FormInterface) => {
        this.updateStep1Form.next(value);
      })
    ).subscribe()

    this.setExistingSelectedModel();
  }

  private buildImagePath(modelCode: string, currentColor: string): string {
    return `assets/images/${modelCode}/${currentColor}.jpg`;
  }

  private setStep1Dirty(selectedModelCode: string) {
    // Set isDirty to know in step 2 if we keep the current config or reset it
    const isModelChanged = this.step1FormState?.selectedModel?.code !== selectedModelCode;
    this.step1Form.get('isDirty')?.setValue(isModelChanged);
  }

  private saveNewImagePath(): void {
    const code: ModelCodeAvailable = (this.step1Form.get('selectedModel')?.value as ModelInformation).code;
    const currentColor: string = this.step1Form.get('currentColor')?.value as string;

    if (code && currentColor) {
      this.step1Form.get('imagePathGenerated')?.patchValue(this.buildImagePath(code, currentColor));
    }
  }

  private setExistingSelectedModel(){
    if (this.step1FormState?.selectedModel) {
      this.selectedModel = this.step1FormState?.selectedModel
    }
  }
}
