import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../../components/headers/admin-header/admin-header.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { LoadingHolderService } from '../../services/loading-holder/loading-holder.service';
import { HostDto } from '../../interfaces/host-dto';
import { GuestDto } from '../../interfaces/guest-dto';
import { HostService } from '../../services/host/host.service';
import { GuestService } from '../../services/guest/guest.service';
import { Router } from '@angular/router';
import { EventDto } from '../../interfaces/event-dto';
import { GuestEventService } from '../../services/guest-event/guest-event.service';
import { HostEventService } from '../../services/host-event/host-event.service';
import {EventCardComponent} from '../../components/event-card/event-card.component';
import {CreateEventModalComponent} from '../../components/modals/create-event-modal/create-event-modal.component';

@Component({
  selector: 'app-admin-events',
  imports: [AdminHeaderComponent, LoadingComponent, CommonModule, EventCardComponent, CreateEventModalComponent],
  templateUrl: './admin-events.component.html',
  styleUrl: './admin-events.component.scss',
})
export class AdminEventsComponent {
  hostDto: HostDto | null = null;
  guestDto: GuestDto | null = null;
  eventList: EventDto[] = [];

  showCreateEventModal = false;

  constructor(
    private hostService: HostService,
    private guestService: GuestService,
    private guestEventService: GuestEventService,
    private hostEventService: HostEventService,
    private router: Router,
    public loadingHolderService: LoadingHolderService
  ) {}

  ngOnInit(): void {
    this.loadingHolderService.isLoading = true;
    this.checkHostAndGuest();
  }

  checkHostAndGuest(): void {
    this.hostService.getHostInfo().subscribe({
      next: (response) => {
        if (response.data.enabled) {
          this.hostDto = response.data;
          this.getHostEvents();
        } else {
          this.checkGuest();
        }
      },
      error: (error) => {
        console.error('Error fetching host details', error);
        this.checkGuest();
      },
    });
  }

  checkGuest(): void {
    this.guestService.getGuestInfo().subscribe({
      next: (response) => {
        if (response.data.enabled) {
          this.guestDto = response.data;
          this.getGuestEvents();
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Error fetching guest details', error);
        this.router.navigate(['/home']);
      },
    });
  }

  getHostEvents(): void {
    this.hostEventService.getAllEventsForHost().subscribe({
      next: (response) => {
        this.eventList = response.data;
        this.loadingHolderService.isLoading = false;
      },
      error: (error) => {
        this.loadingHolderService.isLoading = false;
        console.error('Error fetching host event', error);
      },
    });
  }

  getGuestEvents(): void {
    this.guestEventService.getAllEventsForGuest().subscribe({
      next: (response) => {
        this.eventList = response.data;
        this.loadingHolderService.isLoading = false;
      },
      error: (error) => {
        this.loadingHolderService.isLoading = false;
        console.error('Error fetching guest event', error);
      },
    });
  }

  addEvent():void{
    this.showCreateEventModal = true;
  }

  closeCreateEventModal():void{
    this.showCreateEventModal = false;
  }

  reloadEvents(): void {
    this.loadingHolderService.isLoading = true;
    this.checkHostAndGuest();
  }
}
