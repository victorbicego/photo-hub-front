import { Component } from '@angular/core';
import {AdminHeaderComponent} from "../../components/headers/admin-header/admin-header.component";
import {LoadingComponent} from "../../components/loading/loading.component";
import {CommonModule, NgIf} from "@angular/common";
import {LoadingHolderService} from '../../services/loading-holder/loading-holder.service';

@Component({
  selector: 'app-admin-events',
    imports: [
        AdminHeaderComponent,
        LoadingComponent,
        CommonModule
    ],
  templateUrl: './admin-events.component.html',
  styleUrl: './admin-events.component.scss'
})
export class AdminEventsComponent {

  constructor(public loadingHolderService:LoadingHolderService) {
  }

}
