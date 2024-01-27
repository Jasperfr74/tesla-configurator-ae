import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  standalone: true,
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  @Input() path: string | undefined = undefined;
  @Input() alt: string | undefined = undefined;
}
