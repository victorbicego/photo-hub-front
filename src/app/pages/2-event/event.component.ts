import {Component} from '@angular/core';
import {HeaderComponent} from '../../components/headers/header/header.component';
import {EventService} from '../../services/event/event.service';
import {Router} from '@angular/router';
import {EventDto} from '../../interfaces/event-dto';
import {PhotoGalleryComponent} from '../../components/photo-gallery/photo-gallery.component';
import {PhotoDto} from '../../interfaces/photo-dto';
import {LoadingComponent} from '../../components/loading/loading.component';
import {CommonModule} from '@angular/common';
import {LoadingHolderService} from '../../services/holders/loading-holder/loading-holder.service';

@Component({
  selector: 'app-event',
  imports: [
    HeaderComponent,
    PhotoGalleryComponent,
    LoadingComponent,
    CommonModule,
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  photos: PhotoDto[] = [];
  event: EventDto | null = null;

  constructor(
    private eventService: EventService,
    private router: Router,
    public loadingHolderService: LoadingHolderService
  ) {}

  ngOnInit(): void {
    this.loadingHolderService.isLoading = true;
    this.eventService.photoUpdatedSubject.subscribe(() => {
      this.loadPhotos();
    });
    this.getActiveEvent();
  }

  getActiveEvent(): void {
    this.eventService.getActiveEvent().subscribe({
      next: (response) => {
        this.event = response.data;
        this.loadPhotos();
      },
      error: (error) => {
        this.router.navigate(['/']);
        console.error('Error fetching event details', error);
      },
    });
  }

  loadPhotos(): void {
    this.eventService.getEventPhotos().subscribe({
      next: (response) => {
        this.photos = response.data;
        this.loadingHolderService.isLoading = false;
      },
      error: (err) => {
        this.loadingHolderService.isLoading = false;
        console.error('Error fetching photos', err);
      },
    });
  }
}
