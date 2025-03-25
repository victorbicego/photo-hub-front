import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event/event.service';
import { HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UploadPhotoComponent } from '../upload-photo/upload-photo.component';

@Component({
  selector: 'app-header-nav',
  imports: [CommonModule, ConfirmModalComponent, UploadPhotoComponent],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss',
})
export class HeaderNavComponent {
  showUploadModal: boolean = false;
  showUpLogoutModal: boolean = false;

  constructor(
    private router: Router,
    private eventService: EventService,
    private authenticationService: AuthenticationService
  ) {}

  navigateToPhotos(): void {
    this.router.navigate(['/event']);
  }

  navigateToFaceMatch(): void {
    this.router.navigate(['/event/match']);
  }

  toggleUploadModal(): void {
    this.showUploadModal = !this.showUploadModal;
  }

  closeUploadModal(): void {
    this.showUploadModal = false;
  }

  onUpload(file: File): void {
    this.showUploadModal = false;
    this.eventService.uploadPhoto(file).subscribe({
      next: (response) => {
        if (this.router.url === '/event') {
          window.location.reload();
        } else {
          this.router.navigate(['/event']);
        }
      },
      error: (err) => {
        console.error('Error uploading photo', err);
      },
    });
  }

  downloadPhotos(): void {
    this.eventService.downloadEventPhotos().subscribe({
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

  navigateToManage(): void {
    this.router.navigate(['/event/manage']);
  }

  toggleLogoutModal(): void {
    this.showUpLogoutModal = !this.showUpLogoutModal;
  }

  confirm(): void {
    this.authenticationService.logout().subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Logout fail', error);
      },
    });
  }
}
