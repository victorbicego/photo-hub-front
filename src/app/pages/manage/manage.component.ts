import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AdminHeaderComponent } from '../../components/admin-header/admin-header.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { LoadingHolderService } from '../../services/loading-holder/loading-holder.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage',
  imports: [AdminHeaderComponent, LoadingComponent, CommonModule],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss',
})
export class ManageComponent {
  constructor(public loadingHolderService: LoadingHolderService) {}
}
