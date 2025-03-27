import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-add-event-card',
  imports: [],
  templateUrl: './add-event-card.component.html',
  styleUrl: './add-event-card.component.scss'
})
export class AddEventCardComponent {
  @Output() emitToggle = new EventEmitter<void>();

  toggleCreateEventModal(): void {
    this.emitToggle.emit();
  }
}
