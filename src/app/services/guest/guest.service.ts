import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { GuestDto } from '../../interfaces/guest-dto';
import { UpdateGuestDto } from '../../interfaces/update-guest-dto';
import { PasswordDto } from '../../interfaces/password-dto';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  constructor(private http: HttpClient) {}

  getGuestInfo(): Observable<ApiResponse<GuestDto>> {
    return this.http.get<ApiResponse<GuestDto>>(
      `${environment.baseUrl}/guest`,
      {
        withCredentials: true,
      }
    );
  }

  updateGuestInfo(
    updateGuestDto: UpdateGuestDto
  ): Observable<ApiResponse<GuestDto>> {
    return this.http.put<ApiResponse<GuestDto>>(
      `${environment.baseUrl}/guest`,
      updateGuestDto,
      { withCredentials: true }
    );
  }

  updateGuestPassword(
    passwordDto: PasswordDto
  ): Observable<ApiResponse<GuestDto>> {
    return this.http.put<ApiResponse<GuestDto>>(
      `${environment.baseUrl}/guest/password`,
      passwordDto,
      { withCredentials: true }
    );
  }

  deleteGuestAccount(): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${environment.baseUrl}/guest`, {
      withCredentials: true,
    });
  }
}
