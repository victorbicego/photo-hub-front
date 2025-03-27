import {Component} from '@angular/core';
import {HeaderComponent} from '../../components/headers/header/header.component';
import {LoadingComponent} from '../../components/loading/loading.component';
import {PhotoGalleryComponent} from '../../components/photo-gallery/photo-gallery.component';
import {CommonModule} from '@angular/common';
import {PhotoRecognitionDto} from '../../interfaces/photo-recognition-dto';
import {EventDto} from '../../interfaces/event-dto';
import {EventService} from '../../services/event/event.service';
import {Router} from '@angular/router';
import {MatchedFaceHolderService} from '../../services/holders/matched-face-holder/matched-face-holder.service';
import {UploadPhotoModalComponent} from '../../components/modals/upload-photo-modal/upload-photo-modal.component';
import {LoadingHolderService} from '../../services/holders/loading-holder/loading-holder.service';

@Component({
  selector: 'app-matched-faces',
  imports: [
    HeaderComponent,
    LoadingComponent,
    PhotoGalleryComponent,
    CommonModule,
    UploadPhotoModalComponent,
    LoadingComponent,
  ],
  templateUrl: './matched-faces.component.html',
  styleUrl: './matched-faces.component.scss',
})
export class MatchedFacesComponent {
  matchedPhotos: PhotoRecognitionDto[] = [];
  event: EventDto | null = null;
  showUploadModal: boolean = true;

  constructor(
    private eventService: EventService,
    private router: Router,
    private matchedFaceHolderService: MatchedFaceHolderService,
    public loadingHolderService: LoadingHolderService
  ) {
  }

  ngOnInit(): void {
    this.loadingHolderService.isLoading = true;
    this.getActiveEvent();
  }

  getActiveEvent(): void {
    this.eventService.getActiveEvent().subscribe({
      next: (response) => {
        this.event = response.data;
        this.loadingHolderService.isLoading = false;
        if (this.matchedFaceHolderService.selectedFile != null) {
          this.onMatch(this.matchedFaceHolderService.selectedFile);
        }
      },
      error: (error) => {
        this.router.navigate(['/']);
        console.error('Error fetching event details', error);
      },
    });
  }

  onMatch(file: File): void {
    this.showUploadModal = false;
    this.matchedFaceHolderService.selectedFile = file;
    this.loadingHolderService.isLoading = true;
    this.eventService
      .getMatchedPhotos(this.matchedFaceHolderService.selectedFile)
      .subscribe({
        next: (response) => {
          this.matchedPhotos = response.data;
          this.loadingHolderService.isLoading = false;
        },
        error: (err) => {
          this.loadingHolderService.isLoading = false;
          console.error('Error fetching photos', err);
        },
      });
  }

  toggleUploadModal(): void {
    this.showUploadModal = true;
  }

  closeUploadModal(): void {
    this.showUploadModal = false;
  }
}
