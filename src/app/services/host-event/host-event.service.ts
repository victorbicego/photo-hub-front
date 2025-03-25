import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../interfaces/api-response';
import { Observable } from 'rxjs';
import { EventDto } from '../../interfaces/event-dto';
import { CreateEventDto } from '../../interfaces/create-event-dto';

@Injectable({
  providedIn: 'root',
})
export class HostEventService {
  constructor(private http: HttpClient) {}

  getAllEventsForHost(
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
      `${environment.baseUrl}/host/event`,
      {
        params,
        withCredentials: true,
      }
    );
  }

  getEventByIdForHost(id: number): Observable<ApiResponse<EventDto>> {
    return this.http.get<ApiResponse<EventDto>>(
      `${environment.baseUrl}/host/event/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  createEvent(event: CreateEventDto): Observable<ApiResponse<EventDto>> {
    return this.http.post<ApiResponse<EventDto>>(
      `${environment.baseUrl}/host/event`,
      event,
      {
        withCredentials: true,
      }
    );
  }

  deletePhoto(photoId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(
      `${environment.baseUrl}/host/event/photo/${photoId}`,
      {
        withCredentials: true,
      }
    );
  }
}
