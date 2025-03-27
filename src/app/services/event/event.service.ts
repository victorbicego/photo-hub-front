import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../interfaces/api-response';
import {Observable, Subject} from 'rxjs';
import { environment } from '../../../environments/environment';
import { EventDto } from '../../interfaces/event-dto';
import { PhotoDto } from '../../interfaces/photo-dto';
import { PhotoRecognitionDto } from '../../interfaces/photo-recognition-dto';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  photoUpdatedSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  getEventPhotos(): Observable<ApiResponse<PhotoDto[]>> {
    return this.http.get<ApiResponse<PhotoDto[]>>(
      `${environment.baseUrl}/event/photo/all`,
      {
        withCredentials: true,
      }
    );
  }

  uploadPhoto(file: File): Observable<ApiResponse<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<ApiResponse<any>>(
      `${environment.baseUrl}/event/photo`,
      formData,
      {
        withCredentials: true,
      }
    );
  }

  getMatchedPhotos(file: File): Observable<ApiResponse<PhotoRecognitionDto[]>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<ApiResponse<PhotoRecognitionDto[]>>(
      `${environment.baseUrl}/event/photo/match`,
      formData,
      {
        withCredentials: true,
      }
    );
  }

  downloadEventPhotos(): Observable<HttpResponse<Blob>> {
    return this.http.get(`${environment.baseUrl}/event/photo/download`, {
      responseType: 'blob',
      observe: 'response',
      withCredentials: true,
    });
  }

  getActiveEvent(): Observable<ApiResponse<EventDto>> {
    return this.http.get<ApiResponse<EventDto>>(
      `${environment.baseUrl}/event`,
      {
        withCredentials: true,
      }
    );
  }

  downloadEventMatchPhotos(photoIds: number[]): Observable<HttpResponse<Blob>> {
    let params = new HttpParams();
    photoIds.forEach((id) => {
      params = params.append('photoIds', id.toString());
    });

    return this.http.get(`${environment.baseUrl}/event/photo/download/match`, {
      params: params,
      responseType: 'blob',
      observe: 'response',
      withCredentials: true,
    });
  }

  notifyPhotoUpdated(): void {
    this.photoUpdatedSubject.next();
  }
}
