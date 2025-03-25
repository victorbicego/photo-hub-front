import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ConfirmModalComponent } from '../../modals/confirm-modal/confirm-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-header-nav',
  imports: [ConfirmModalComponent, CommonModule],
  templateUrl: './admin-header-nav.component.html',
  styleUrl: './admin-header-nav.component.scss',
})
export class AdminHeaderNavComponent {
  showUploadModal: boolean = false;
  showUpLogoutModal: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  navigateToPhotos(): void {
    this.router.navigate(['/manage/events']);
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

  navigateToManage(): void {
    this.router.navigate(['/event/manage']);
  }

  navigateToMyAccount(): void {
    this.router.navigate(['/manage/account']);
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
