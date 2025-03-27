import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HostDto } from '../../../../interfaces/host-dto';
import { GuestDto } from '../../../../interfaces/guest-dto';
import { HostService } from '../../../../services/host/host.service';
import { GuestService } from '../../../../services/guest/guest.service';
import {LoadingHolderService} from '../../../../services/holders/loading-holder/loading-holder.service';

@Component({
  selector: 'app-update-user-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-user-modal.component.html',
  styleUrl: './update-user-modal.component.scss',
})
export class UpdateUserModalComponent {
  @Output() close = new EventEmitter<void>();
  @Input() hostDto: HostDto | null = null;
  @Input() guestDto: GuestDto | null = null;

  editFirstName: string = '';
  editLastName: string = '';

  constructor(
    private hostService: HostService,
    private guestService: GuestService,
    private loadingHolderService: LoadingHolderService
  ) {}

  ngOnInit(): void {
    if (this.guestDto) {
      this.editFirstName = this.guestDto.firstName;
      this.editLastName = this.guestDto.lastName;
    } else if (this.hostDto) {
      this.editFirstName = this.hostDto.firstName;
      this.editLastName = this.hostDto.lastName;
    }
  }

  onClose(): void {
    this.close.emit();
  }

  saveNameEdit(): void {
    if (this.hostDto) {
      this.loadingHolderService.isLoading = true;
      this.hostService
        .updateHostInfo({
          firstName: this.editFirstName,
          lastName: this.editLastName,
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
        .updateGuestInfo({
          firstName: this.editFirstName,
          lastName: this.editLastName,
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
