import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/event/event.service';
import { QrCodeModalComponent } from '../../components/qr-code-modal/qr-code-modal.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { CommonModule } from '@angular/common';
import { GuestService } from '../../services/guest/guest.service';
import { HostService } from '../../services/host/host.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { LoadingHolderService } from '../../services/loading-holder/loading-holder.service';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FormsModule,
    QrCodeModalComponent,
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  username = '';
  password = '';
  showQrCodeModal: boolean = false;

  constructor(
    private eventService: EventService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private guestService: GuestService,
    private hostService: HostService,
    public loadingHolderService: LoadingHolderService
  ) {}

  ngOnInit(): void {
    this.loadingHolderService.isLoading = true;
    this.checkHostAndGuest();
  }

  checkHostAndGuest(): void {
    this.hostService.getHostInfo().subscribe({
      next: (response) => {
        if (response.data.enabled) {
          this.router.navigate(['/manage']);
        } else {
          this.checkGuest();
        }
      },
      error: (error) => {
        this.checkGuest();
        console.error('Error fetching host details', error);
      },
    });
  }

  checkGuest(): void {
    this.guestService.getGuestInfo().subscribe({
      next: (response) => {
        if (response.data.enabled) {
          this.router.navigate(['/manage']);
        } else {
          this.checkActiveEvent();
        }
      },
      error: (error) => {
        this.checkActiveEvent();
        console.error('Error fetching guest details', error);
      },
    });
  }

  checkActiveEvent(): void {
    this.eventService.getActiveEvent().subscribe({
      next: (response) => {
        this.router.navigate(['/event']);
      },
      error: (error) => {
        this.loadingHolderService.isLoading = false;
        console.error('No active event found', error);
      },
    });
  }

  toggleQrCodeModal(): void {
    this.showQrCodeModal = true;
  }

  closeQrCodeModal(): void {
    this.showQrCodeModal = false;
  }

  loginWithCredentials(): void {
    this.loadingHolderService.isLoading = true;
    this.authenticationService
      .authenticate(this.username, this.password)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/manage']);
        },
        error: (err) => {
          this.loadingHolderService.isLoading = false;
          console.error('Login with credentials failed', err);
        },
      });
  }

  loginWithQrCode(qrCode: string): void {
    this.closeQrCodeModal();
    this.loadingHolderService.isLoading = true;
    this.authenticationService.authenticateQrCode(qrCode).subscribe({
      next: (response) => {
        this.router.navigate(['/event']);
      },
      error: (err) => {
        this.loadingHolderService.isLoading = false;
        console.error('QR code authentication failed', err);
      },
    });
  }
}
