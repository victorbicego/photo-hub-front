import { Component, Input } from '@angular/core';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { HeaderEventComponent } from '../header-event/header-event.component';
import { CommonModule } from '@angular/common';
import { EventDto } from '../../interfaces/event-dto';

@Component({
  selector: 'app-header',
  imports: [HeaderNavComponent, HeaderEventComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() showNav: boolean = true;
  @Input() event: EventDto | null = null;
}
