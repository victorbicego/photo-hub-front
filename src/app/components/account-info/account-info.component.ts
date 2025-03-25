import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HostDto} from '../../interfaces/host-dto';
import {GuestDto} from '../../interfaces/guest-dto';

@Component({
  selector: 'app-account-info',
  imports: [],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.scss'
})
export class AccountInfoComponent {
  @Input() hostDto: HostDto | null = null;
  @Input() guestDto: GuestDto | null = null;

  @Output() showEditNameModal = new EventEmitter<void>();
  @Output() showUpdatePasswordModal = new EventEmitter<void>();
  @Output() showDeleteAccountModal = new EventEmitter<void>();

  get userDto() {
    return this.hostDto || this.guestDto;
  }

  openEditNameModal(): void {
    this.showEditNameModal.emit()
  }

  openUpdatePasswordModal(): void {
    this.showUpdatePasswordModal.emit();
  }

  openDeleteAccountModal(): void {
    this.showDeleteAccountModal.emit();
  }
}
