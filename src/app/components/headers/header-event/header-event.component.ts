import { Component, Input } from '@angular/core';
import { EventDto } from '../../../interfaces/event-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-event',
  imports: [CommonModule],
  templateUrl: './header-event.component.html',
  styleUrl: './header-event.component.scss',
})
export class HeaderEventComponent {
  @Input() event: EventDto | null = null;
}
