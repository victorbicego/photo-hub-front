import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HostService } from '../../../services/host/host.service';
import { GuestService } from '../../../services/guest/guest.service';
import { HostDto } from '../../../interfaces/host-dto';
import { GuestDto } from '../../../interfaces/guest-dto';
import {LoadingHolderService} from '../../../services/loading-holder/loading-holder.service';

@Component({
  selector: 'app-update-password-modal',
  imports: [FormsModule],
  templateUrl: './update-password-modal.component.html',
  styleUrl: './update-password-modal.component.scss',
})
export class UpdatePasswordModalComponent {
  @Output() close = new EventEmitter<void>();
  @Input() hostDto: HostDto | null = null;
  @Input() guestDto: GuestDto | null = null;

  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(
    private hostService: HostService,
    private guestService: GuestService,
    private loadingHolderService: LoadingHolderService
  ) {}

  onClose(): void {
    this.close.emit();
  }

  updatePassword(): void {
    if (this.hostDto) {
      this.loadingHolderService.isLoading = true;
      this.hostService
        .updateHostPassword({
          password: this.newPassword,
        })
        .subscribe({
          next: (response) => {
            this.loadingHolderService.isLoading = false;
            this.close.emit();
          },
          error: (error) => {
            this.loadingHolderService.isLoading = false;
            console.error('Erro ao obter detalhes do evento', error);
          },
        });
    } else if (this.guestDto) {
      this.loadingHolderService.isLoading = true;
      this.guestService
        .updateGuestPassword({
          password: this.newPassword,
        })
        .subscribe({
          next: (response) => {
            this.loadingHolderService.isLoading = false;
            this.close.emit();
          },
          error: (error) => {
            this.loadingHolderService.isLoading = false;
            console.error('Erro ao obter detalhes do evento', error);
          },
        });
    }
  }
}
