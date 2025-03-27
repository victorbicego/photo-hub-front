import {Component} from '@angular/core';
import {AdminHeaderComponent} from '../../components/headers/admin-header/admin-header.component';
import {CommonModule} from '@angular/common';
import {LoadingHolderService} from '../../services/holders/loading-holder/loading-holder.service';
import {LoadingComponent} from '../../components/loading/loading.component';
import {AdminPhotoGalleryComponent} from '../../components/admin-photo-gallery/admin-photo-gallery.component';
import {PhotoDto} from '../../interfaces/photo-dto';
import {HostEventService} from '../../services/host-event/host-event.service';
import {GuestEventService} from '../../services/guest-event/guest-event.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admin-single-event',
  imports: [
    AdminHeaderComponent,
    CommonModule,
    LoadingComponent,
    AdminPhotoGalleryComponent,
  ],
  templateUrl: './admin-single-event.component.html',
  styleUrl: './admin-single-event.component.scss',
})
export class AdminSingleEventComponent {
  photos: PhotoDto[] = [];
  eventId: string | null = null;
  isHost: boolean = false;

  constructor(
    public loadingHolderService: LoadingHolderService,
    private hostEventSerivce: HostEventService,
    private guestEventService: GuestEventService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('eventId');
    this.loadingHolderService.isLoading = true;
    this.getPhotosFromHostAndGuest();
  }

  getPhotosFromHostAndGuest(): void {
    if (this.eventId) {
      this.hostEventSerivce.getEventPhotos(this.eventId).subscribe({
        next: (response) => {
          this.photos = response.data;
          this.loadingHolderService.isLoading = false;
          this.isHost = true;
        },
        error: (error) => {
          console.error('Error fetching host details', error);
          this.getPhotosFromGuest();
        },
      });
    } else {
      this.loadingHolderService.isLoading = false;
    }
  }

  getPhotosFromGuest(): void {
    if (this.eventId) {
      this.guestEventService.getEventPhotos(this.eventId).subscribe({
        next: (response) => {
          this.photos = response.data;
          this.loadingHolderService.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching guest details', error);
          this.router.navigate(['/home']);
        },
      });
    } else {
      this.loadingHolderService.isLoading = false;
    }
  }
}
