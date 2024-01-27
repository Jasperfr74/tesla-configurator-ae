import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Color, ModelCodeAvailable, Step1FormInterface, Tesla } from '../../models/tesla';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { ImageComponent } from '../../../shared/components/image/image.component';


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
  step1Form!: FormGroup; // add type
  selectedModel: Tesla | undefined = undefined;

  @Input() teslaModelInformation: Tesla[] | null = null;
  @Input() step1FormState: Step1FormInterface | null = null;

  @Output() updateStep1Form: EventEmitter<Step1FormInterface> = new EventEmitter<Step1FormInterface>();

  constructor(private formBuilder: FormBuilder) {}

  onModelChange(event: Event): void {
    if (!event) return;

    const selectedModelCode: string = (event.target as HTMLInputElement).value;
    this.selectedModel = this.teslaModelInformation?.find((model: Tesla): boolean => model.description === selectedModelCode);

    this.step1Form.get('selectedModel')?.patchValue(this.selectedModel);
    this.step1Form.get('currentColor')?.patchValue(this.selectedModel?.colors?.[0].code);
    this.step1Form.get('selectedColor')?.patchValue(this.selectedModel?.colors?.[0]);

    // set is Dirty to know in step 2 in we keep the current config or reset it
    if (this.step1FormState?.selectedModel?.code && (this.step1FormState?.selectedModel?.code !== selectedModelCode)) {
      this.step1Form.get('isDirty')?.setValue(true);
    }

    this.saveNewImagePath();
  }

  onColorChange(event: Event): void {
    if (!event) return;

    const selectedColor: string = (event.target as HTMLInputElement).value;
    const color: Color | undefined = this.selectedModel?.colors?.find((color: Color): boolean => color.code === selectedColor);

    this.step1Form.get('currentColor')?.patchValue(color?.code);
    this.step1Form.get('selectedColor')?.patchValue(color);

    this.saveNewImagePath();
  }

  setExistingSelectedModel(){
    if (this.step1FormState?.selectedModel) {
      this.selectedModel = this.step1FormState?.selectedModel
    }
  }

  initForm(): void {
    this.step1Form = this.formBuilder.group({
      selectedModel: new FormControl<Tesla|null>(this.step1FormState?.selectedModel || null),
      currentModel: new FormControl<string>(this.step1FormState?.currentModel || ''),
      selectedColor: new FormControl<Color|null>(this.step1FormState?.selectedColor || null),
      currentColor: new FormControl<string>(this.step1FormState?.currentColor || ''),
      imagePathGenerated: new FormControl<string>(this.step1FormState?.imagePathGenerated || ''),
      isDirty: new FormControl<boolean>(false),
    })
  }

  listenToUpdateForm(): void {
    this.step1Form.valueChanges.pipe(
      tap((value: Step1FormInterface) => {
        this.updateStep1Form.next(value);
      })
    ).subscribe()
  }

  ngOnInit(): void {
    this.initForm();
    this.listenToUpdateForm();
    this.setExistingSelectedModel();
  }


  private saveNewImagePath(): void {
    const code: ModelCodeAvailable = (this.step1Form.get('selectedModel')?.value as Tesla).code;
    const currentColor: string = this.step1Form.get('currentColor')?.value as string;

    if (code && currentColor) {
      this.step1Form.get('imagePathGenerated')?.patchValue(this.buildImagePath(code, currentColor));
    }
  }

  private buildImagePath(modelCode: string, currentColor: string): string {
    return `assets/images/${modelCode}/${currentColor}.jpg`;
  }
}
