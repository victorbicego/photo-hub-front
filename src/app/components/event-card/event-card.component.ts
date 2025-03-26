import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EventDto } from '../../interfaces/event-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  imports: [DatePipe, CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent {
  @Input() event: EventDto | null = null;

  constructor(private router: Router) {}

  convertBase64(qr: string): string {
    return qr.replace(/-/g, '+').replace(/_/g, '/');
  }

  goToEvent(event: EventDto): void {
    this.router.navigate(['/manage/event', event.id]);
  }

  shareQrCodeByEmail(event: EventDto): void {
    const subject = encodeURIComponent(`QR code for event ${event.name}`);
    const body = encodeURIComponent(
      `Here is the QR code for event ${event.name} (ID: ${event.id}).`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  }

  shareQrCodeByWhatsapp(event: EventDto): void {
    const message = encodeURIComponent(
      `Check out the QR code for event ${event.name} (ID: ${event.id}).`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  }

  downloadQrCode(event: EventDto): void {
    const base64Data = this.convertBase64(event.qrCode);
    const dataUrl = 'data:image/png;base64,' + base64Data;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `event_${event.id}_qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
