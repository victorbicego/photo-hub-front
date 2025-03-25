import { Component, Input } from '@angular/core';
import { AdminHeaderNavComponent } from '../admin-header-nav/admin-header-nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-header',
  imports: [AdminHeaderNavComponent, CommonModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent {
  @Input() userName: string = 'Usuario';
}
