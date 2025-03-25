import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-qr-code-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './qr-code-modal.component.html',
  styleUrl: './qr-code-modal.component.scss',
})
export class QrCodeModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<string>();

  qrCode: string = '';

  onSubmit(): void {
    this.submit.emit(this.qrCode);
  }

  onClose(): void {
    this.close.emit();
  }
}
