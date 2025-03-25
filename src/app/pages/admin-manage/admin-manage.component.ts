import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/headers/header/header.component';
import { AdminHeaderComponent } from '../../components/headers/admin-header/admin-header.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { LoadingHolderService } from '../../services/loading-holder/loading-holder.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage',
  imports: [AdminHeaderComponent, LoadingComponent, CommonModule],
  templateUrl: './admin-manage.component.html',
  styleUrl: './admin-manage.component.scss',
})
export class AdminManageComponent {
  constructor(public loadingHolderService: LoadingHolderService) {}
}
