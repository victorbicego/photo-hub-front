import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {LoadingHolderService} from '../../../../services/holders/loading-holder/loading-holder.service';
import {AuthenticationService} from '../../../../services/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-qr-code-modal',
  imports: [FormsModule, CommonModule, ZXingScannerModule],
  templateUrl: './qr-code-modal.component.html',
  styleUrl: './qr-code-modal.component.scss',
})
export class QrCodeModalComponent {
  @Output() emitClose = new EventEmitter<void>();

  constructor(private loadingHolderService: LoadingHolderService, private authenticationService: AuthenticationService,
              private router: Router) {
  }

  onClose(): void {
    this.emitClose.emit();
  }

  onSubmit(qrCode: string): void {
    this.loadingHolderService.isLoading = true;
    this.authenticationService.authenticateQrCode(qrCode).subscribe({
      next: (response) => {
        this.router.navigate(['/event']);
      },
      error: (err) => {
        this.loadingHolderService.isLoading = false;
        this.emitClose.emit();
        console.error('QR code authentication failed', err);
      },
    });
  }
}
