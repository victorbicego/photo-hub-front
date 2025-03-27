import { GuestPhotoUrlPipe } from './guest-photo-url.pipe';
import {DomSanitizer} from '@angular/platform-browser';

describe('GuestPhotoUrlPipe', () => {
  it('create an instance', () => {
    // @ts-ignore
    const pipe = new GuestPhotoUrlPipe(new DomSanitizer());
    expect(pipe).toBeTruthy();
  });
});
