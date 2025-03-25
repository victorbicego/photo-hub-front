import {Component} from '@angular/core';
import {AdminHeaderComponent} from '../../components/headers/admin-header/admin-header.component';
import {Router} from '@angular/router';
import {GuestService} from '../../services/guest/guest.service';
import {HostService} from '../../services/host/host.service';
import {HostDto} from '../../interfaces/host-dto';
import {GuestDto} from '../../interfaces/guest-dto';
import {LoadingComponent} from '../../components/loading/loading.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ConfirmModalComponent} from '../../components/modals/confirm-modal/confirm-modal.component';
import {
  UpdatePasswordModalComponent
} from '../../components/modals/update-password-modal/update-password-modal.component';
import {UpdateUserModalComponent} from '../../components/modals/update-user-modal/update-user-modal.component';
import {LoadingHolderService} from '../../services/loading-holder/loading-holder.service';
import {AccountInfoComponent} from '../../components/account-info/account-info.component';

@Component({
  selector: 'app-account',
  imports: [
    AdminHeaderComponent,
    LoadingComponent,
    CommonModule,
    FormsModule,
    ConfirmModalComponent,
    UpdatePasswordModalComponent,
    UpdateUserModalComponent,
    AccountInfoComponent
  ],
  templateUrl: './admin-account.component.html',
  styleUrl: './admin-account.component.scss',
})
export class AdminAccountComponent {
  hostDto: HostDto | null = null;
  guestDto: GuestDto | null = null;

  showEditNameModal: boolean = false;
  showUpdatePasswordModal: boolean = false;
  showDeleteAccountModal: boolean = false;

  constructor(
    private router: Router,
    private guestService: GuestService,
    private hostService: HostService,
    public loadingHolderService: LoadingHolderService
  ) {}

  ngOnInit(): void {
    this.loadingHolderService.isLoading = true;
    this.checkHostAndGuest();
  }

  get userDto() {
    return this.hostDto || this.guestDto;
  }

  checkHostAndGuest(): void {
    this.hostService.getHostInfo().subscribe({
      next: (response) => {
        if (response.data.enabled) {
          this.hostDto = response.data;
          this.loadingHolderService.isLoading = false;
        } else {
          this.checkGuest();
        }
      },
      error: (error) => {
        console.error('Error fetching host details', error);
        this.checkGuest();
      },
    });
  }

  checkGuest(): void {
    this.guestService.getGuestInfo().subscribe({
      next: (response) => {
        if (response.data.enabled) {
          this.guestDto = response.data;
          this.loadingHolderService.isLoading = false;
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Error fetching guest details', error);
        this.router.navigate(['/home']);
      },
    });
  }

  openEditNameModal(): void {
    this.showEditNameModal = true;
  }

  closeEditNameModal(): void {
    this.showEditNameModal = false;
    this.checkHostAndGuest();
  }

  openUpdatePasswordModal(): void {
    this.showUpdatePasswordModal = true;
  }

  closeUpdatePasswordModal(): void {
    this.showUpdatePasswordModal = false;
  }

  openDeleteAccountModal(): void {
    this.showDeleteAccountModal = true;
  }

  closeDeleteAccountModal(): void {
    this.showDeleteAccountModal = false;
  }

  confirmDeleteAccount(): void {
    this.closeDeleteAccountModal();
    if (this.hostDto) {
      this.hostService.deleteHostAccount().subscribe({
        next: (response) => {
          this.loadingHolderService.isLoading = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.loadingHolderService.isLoading = false;
          console.error('Error deleting host', error);
        },
      });
    }

    if (this.guestDto) {
      this.guestService.deleteGuestAccount().subscribe({
        next: (response) => {
          this.loadingHolderService.isLoading = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.loadingHolderService.isLoading = false;
          console.error('Error deleting guest', error);
        },
      });
    }
  }
}
