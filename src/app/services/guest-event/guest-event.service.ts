import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { EventDto } from '../../interfaces/event-dto';
import { PhotoDto } from '../../interfaces/photo-dto';

@Injectable({
  providedIn: 'root',
})
export class GuestEventService {
  constructor(private http: HttpClient) {}

  getAllEventsForGuest(
    search: string = '',
    sortBy: string = 'name',
    sortDirection: string = 'asc',
    page: number = 0,
    size: number = 10
  ): Observable<ApiResponse<EventDto[]>> {
    const params = new HttpParams()
      .set('search', search)
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ApiResponse<EventDto[]>>(
      `${environment.baseUrl}/guest/event/`,
      {
        params,
        withCredentials: true,
      }
    );
  }

  getEventByIdForGuest(id: number): Observable<ApiResponse<EventDto>> {
    return this.http.get<ApiResponse<EventDto>>(
      `${environment.baseUrl}/guest/event/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  getEventPhotos(id: string): Observable<ApiResponse<PhotoDto[]>> {
    return this.http.get<ApiResponse<PhotoDto[]>>(
      `${environment.baseUrl}/guest/event/${id}/photos`,
      {
        withCredentials: true,
      }
    );
  }
}
