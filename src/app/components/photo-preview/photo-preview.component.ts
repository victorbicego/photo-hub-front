import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhotoDto } from '../../interfaces/photo-dto';
import { PhotoUrlPipe } from '../../services/pipes/photo-url-pipe/photo-url.pipe';

@Component({
  selector: 'app-photo-preview',
  imports: [PhotoUrlPipe],
  templateUrl: './photo-preview.component.html',
  styleUrl: './photo-preview.component.scss',
})
export class PhotoPreviewComponent {
  @Input() photos: PhotoDto[] = [];
  @Input() currentPhotoIndex: number = 0;
  @Output() close = new EventEmitter<void>();

  onBackgroundClick(event: MouseEvent): void {
    this.close.emit();
  }

  prevPhoto(): void {
    if (this.currentPhotoIndex > 0) {
      this.currentPhotoIndex--;
    } else {
      this.currentPhotoIndex = this.photos.length - 1;
    }
  }

  nextPhoto(): void {
    if (this.currentPhotoIndex < this.photos.length - 1) {
      this.currentPhotoIndex++;
    } else {
      this.currentPhotoIndex = 0;
    }
  }
}
