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

  selectedModel: ModelInformation | undefined = undefined;
  step1Form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  onColorChange(event: Event): void {
    if (!event) return;

    const selectedColor: string = (event.target as HTMLInputElement).value;
    const color: Color | undefined = this.selectedModel?.colors?.find((color: Color): boolean => color.code === selectedColor);

    this.step1Form.get('currentColor')?.patchValue(color?.code);
    this.step1Form.get('selectedColor')?.patchValue(color);

    this.saveNewImagePath();
  }

  onModelChange(event: Event): void {
    if (!event) return;

    const selectedModelCode: string = (event.target as HTMLInputElement).value;
    this.selectedModel = this.teslaModelInformation?.find((model: ModelInformation): boolean => model.description === selectedModelCode);

    this.step1Form.get('selectedModel')?.patchValue(this.selectedModel);
    this.step1Form.get('currentColor')?.patchValue(this.selectedModel?.colors?.[0].code);
    this.step1Form.get('selectedColor')?.patchValue(this.selectedModel?.colors?.[0]);

    // set is Dirty to know in step 2 in we keep the current config or reset it
    if (this.step1FormState?.selectedModel?.code && (this.step1FormState?.selectedModel?.code !== selectedModelCode)) {
      this.step1Form.get('isDirty')?.setValue(true);
    }

    this.saveNewImagePath();
  }

  ngOnInit(): void {
    this.step1Form = this.formBuilder.group({
      selectedModel: new FormControl<ModelInformation|null>(this.step1FormState?.selectedModel || null),
      currentModel: new FormControl<string>(this.step1FormState?.currentModel || ''),
      selectedColor: new FormControl<Color|null>(this.step1FormState?.selectedColor || null),
      currentColor: new FormControl<string>(this.step1FormState?.currentColor || ''),
      imagePathGenerated: new FormControl<string>(this.step1FormState?.imagePathGenerated || ''),
      isDirty: new FormControl<boolean>(false),
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
