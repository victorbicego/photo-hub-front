import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhotoDto } from '../../interfaces/photo-dto';
import { ImageDimension } from '../../interfaces/image-dimension';
import { HttpResponse } from '@angular/common/http';
import { EventService } from '../../services/event/event.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HostPhotoUrlPipe } from '../../services/pipes/host-photo-url-pipe/host-photo-url.pipe';
import { GuestPhotoUrlPipe } from '../../services/pipes/guest-photo-url-pipe/guest-photo-url.pipe';

@Component({
  selector: 'app-admin-photo-gallery',
  imports: [FormsModule, CommonModule, HostPhotoUrlPipe, GuestPhotoUrlPipe],
  templateUrl: './admin-photo-gallery.component.html',
  styleUrl: './admin-photo-gallery.component.scss',
})
export class AdminPhotoGalleryComponent {
  @Input() photos: PhotoDto[] = [];
  @Input() isHost: boolean = false;

  @Output() toggleUploadModal = new EventEmitter<void>();

  photosPerRow: number = 4;
  imageDimensions: { [index: number]: ImageDimension } = {};
  selectedPhotos: PhotoDto[] = [];

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

  onUploadPhotoClick() {
    this.toggleUploadModal.emit();
  }

  onDeletePhotoClick() {
    this.toggleUploadModal.emit();
  }

  onDownloadClick() {
    const photoIds = this.selectedPhotos.map((photo) => photo.id);

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

  togglePhotoSelection(photo: PhotoDto): void {
    const index = this.selectedPhotos.findIndex((p) => p.id === photo.id);
    if (index === -1) {
      // Photo is not selected, add it to the array
      this.selectedPhotos.push(photo);
    } else {
      // Photo is already selected, remove it from the array
      this.selectedPhotos.splice(index, 1);
    }
  }

  isPhotoSelected(photo: PhotoDto): boolean {
    return this.selectedPhotos.some((p) => p.id === photo.id);
  }
}
