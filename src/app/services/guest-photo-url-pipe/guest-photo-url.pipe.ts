import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'guestPhotoUrl',
})
export class GuestPhotoUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(photoPath: string): SafeUrl {
    let encodedPath: string;
    if (photoPath.includes('%')) {
      encodedPath = photoPath;
    } else {
      encodedPath = encodeURIComponent(photoPath);
    }
    const url = `${environment.baseUrl}/guest/event/photo?url=${encodedPath}`;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
