import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {EventService} from '../../services/event/event.service';
import {GuestService} from '../../services/guest/guest.service';
import {HostService} from '../../services/host/host.service';
import {LoadingHolderService} from '../../services/holders/loading-holder/loading-holder.service';
import {LoadingComponent} from '../../components/loading/loading.component';
import {QrCodeLoginCardComponent} from './components/qr-code-login-card/qr-code-login-card.component';
import {QrCodeModalComponent} from './components/qr-code-modal/qr-code-modal.component';
import {CredentialsLoginCardComponent} from './components/credentials-login-card/credentials-login-card.component';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../../components/headers/header/header.component';
import {ResetPasswordModalComponent} from './components/reset-password-modal/reset-password-modal.component';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    CommonModule,
    LoadingComponent,
    QrCodeLoginCardComponent,
    QrCodeModalComponent,
    CredentialsLoginCardComponent,
    HeaderComponent,
    ResetPasswordModalComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  showQrCodeModal: boolean = false;
  showResetPasswordModal: boolean = false;

  constructor(
    private eventService: EventService,
    private router: Router,
    private guestService: GuestService,
    private hostService: HostService,
    public loadingHolderService: LoadingHolderService
  ) {
  }

  ngOnInit(): void {
    this.loadingHolderService.isLoading = true;
    this.checkHostAndGuest();
  }

  checkHostAndGuest(): void {
    this.hostService.getHostInfo().subscribe({
      next: (response) => {
        if (response.data.enabled) {
          this.router.navigate(['/admin']);
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
          this.router.navigate(['/admin']);
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

  toggleResetPasswordModal(): void {
    this.showResetPasswordModal = true;
  }

  closeResetPasswordModal(): void {
    this.showResetPasswordModal = false;
  }
}
