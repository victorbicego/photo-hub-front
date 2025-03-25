import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upload-photo',
  imports: [CommonModule],
  templateUrl: './upload-photo-modal.component.html',
  styleUrl: './upload-photo-modal.component.scss',
})
export class UploadPhotoModalComponent {
  @Input() title: string = 'Upload Photo';
  @Input() fileLabel: string = 'Escolha uma foto';
  @Output() close = new EventEmitter<void>();
  @Output() upload = new EventEmitter<File>();

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.upload.emit(this.selectedFile);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
