import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HostEventService} from '../../../services/host-event/host-event.service';
import {LoadingHolderService} from '../../../services/loading-holder/loading-holder.service';

@Component({
  selector: 'app-create-event-modal',
    imports: [
        ReactiveFormsModule, FormsModule
    ],
  templateUrl: './create-event-modal.component.html',
  styleUrl: './create-event-modal.component.scss'
})
export class CreateEventModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() eventCreated = new EventEmitter<void>();

  constructor(private hostEventService:HostEventService, private loadingHolderService:LoadingHolderService) {
  }

  name: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  onClose(): void {
    this.close.emit();
  }

  saveEvent(): void {
    if(this.name && this.startDate && this.endDate) {
      this.loadingHolderService.isLoading = true;
      this.hostEventService
        .createEvent({
          name: this.name,
          startDate: this.startDate!,
          endDate: this.endDate!,
        })
        .subscribe({
          next: (response) => {
            this.loadingHolderService.isLoading = false
            this.close.emit();
            this.eventCreated.emit();
          },
          error: (error) => {
            this.loadingHolderService.isLoading = false
            console.error('Erro ao criar evento', error);
          },
        });
    }
  }
}
