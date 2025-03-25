import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhotoDto } from '../../interfaces/photo-dto';
import { PhotoRecognitionDto } from '../../interfaces/photo-recognition-dto';
import { ImageDimension } from '../../interfaces/image-dimension';
import { EventService } from '../../services/event/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoUrlPipe } from '../../services/photo-url-pipe/photo-url.pipe';
import { PhotoPreviewComponent } from '../photo-preview/photo-preview.component';
import { MatchedFaceHolderService } from '../../services/matched-face-holder/matched-face-holder.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-photo-gallery',
  imports: [CommonModule, FormsModule, PhotoUrlPipe, PhotoPreviewComponent],
  templateUrl: './photo-gallery.component.html',
  styleUrl: './photo-gallery.component.scss',
})
export class PhotoGalleryComponent {
  @Input() photos: PhotoDto[] = [];
  @Input() matchedPhotos: PhotoRecognitionDto[] = [];
  @Input() matched: boolean = false;

  @Output() toggleUploadModal = new EventEmitter<void>();

  photosPerRow: number = 4;
  showBoundingBox: boolean = false;
  showPhotoPreview: boolean = false;
  currentPhotoIndex: number = 0;
  imageDimensions: { [index: number]: ImageDimension } = {};

  get galleryGap(): string {
    const gapMap: { [key: number]: string } = {
      1: '60px',
      2: '60px',
      3: '52px',
      4: '46px',
      5: '42px',
      6: '40px',
      7: '34px',
      8: '30px',
      9: '26px',
      10: '22px',
      11: '20px',
      12: '18px',
      13: '16px',
      14: '15px',
      15: '14px',
      16: '14px',
    };
    return gapMap[this.photosPerRow] || '20px';
  }

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    if (window.innerWidth < 768) {
      this.photosPerRow = 1;
    }
  }

  increasePhotosPerRow(): void {
    if (this.photosPerRow < 16) {
      this.photosPerRow++;
    }
  }

  decreasePhotosPerRow(): void {
    if (this.photosPerRow > 1) {
      this.photosPerRow--;
    }
  }

  onPhotoClick(index: number): void {
    this.currentPhotoIndex = index;
    this.showPhotoPreview = true;
  }

  onImageLoad(event: Event, index: number): void {
    const img = event.target as HTMLImageElement;
    const clientWidth = img.clientWidth;
    const clientHeight = img.clientHeight;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    const scale = Math.max(
      clientWidth / naturalWidth,
      clientHeight / naturalHeight
    );

    const displayedWidth = naturalWidth * scale;
    const displayedHeight = naturalHeight * scale;
    const offsetX = (clientWidth - displayedWidth) / 2;
    const offsetY = (clientHeight - displayedHeight) / 2;

    this.imageDimensions[index] = {
      clientWidth,
      clientHeight,
      naturalWidth,
      naturalHeight,
      offsetX,
      offsetY,
    };
  }

  getBoundingBoxStyle(photo: PhotoRecognitionDto, index: number): any {
    const dims = this.imageDimensions[index];
    if (!dims) {
      return {
        top: `${photo.faceBoundingBox.top * 100}%`,
        left: `${photo.faceBoundingBox.left * 100}%`,
        width: `${photo.faceBoundingBox.width * 100}%`,
        height: `${photo.faceBoundingBox.height * 100}%`,
        position: 'absolute',
        border: '2px solid red',
        pointerEvents: 'none',
      };
    }
    const {
      clientWidth,
      clientHeight,
      naturalWidth,
      naturalHeight,
      offsetX,
      offsetY,
    } = dims;
    const scale = Math.max(
      clientWidth / naturalWidth,
      clientHeight / naturalHeight
    );

    const adjustedTop =
      (photo.faceBoundingBox.top * naturalHeight * scale + offsetY) /
      clientHeight;
    const adjustedLeft =
      (photo.faceBoundingBox.left * naturalWidth * scale + offsetX) /
      clientWidth;
    const adjustedWidth =
      (photo.faceBoundingBox.width * naturalWidth * scale) / clientWidth;
    const adjustedHeight =
      (photo.faceBoundingBox.height * naturalHeight * scale) / clientHeight;

    return {
      top: `${(adjustedTop * 100).toFixed(2)}%`,
      left: `${(adjustedLeft * 100).toFixed(2)}%`,
      width: `${(adjustedWidth * 100).toFixed(2)}%`,
      height: `${(adjustedHeight * 100).toFixed(2)}%`,
      position: 'absolute',
      border: '2px solid red',
      pointerEvents: 'none',
    };
  }

  onUploadPhotoClick() {
    this.toggleUploadModal.emit();
  }

  toggleBoundingBox() {
    this.showBoundingBox = !this.showBoundingBox;
  }

  onDownloadClick() {
    const photoIds = this.matchedPhotos.map((photo) => photo.id);

    if (photoIds.length === 0) {
      return;
    }

    this.eventService.downloadEventMatchPhotos(photoIds).subscribe({
      next: (response: HttpResponse<Blob>) => {
        const contentDisposition = response.headers.get('content-disposition');
        let filename = 'photos.zip';
        if (contentDisposition) {
          const matches = contentDisposition.match(/filename="(.+)"/);
          if (matches && matches[1]) {
            filename = matches[1];
          }
        }
        const blob = new Blob([response.body!], {
          type: 'application/octet-stream',
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Erro ao baixar as fotos', err);
      },
    });
  }

  closePreview(): void {
    this.showPhotoPreview = false;
  }
}
