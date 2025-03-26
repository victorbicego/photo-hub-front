import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-qr-code-modal',
  imports: [FormsModule, CommonModule, ZXingScannerModule],
  templateUrl: './qr-code-modal.component.html',
  styleUrl: './qr-code-modal.component.scss',
})
export class QrCodeModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<string>();

  onClose(): void {
    this.close.emit();
  }

  onSubmit(result: string): void {
    this.submit.emit(result);
  }
}
