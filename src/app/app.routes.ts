import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventComponent } from './pages/event/event.component';
import { AdminManageComponent } from './pages/admin-manage/admin-manage.component';
import { MatchedFacesComponent } from './pages/matched-faces/matched-faces.component';
import { AdminAccountComponent } from './pages/admin-account/admin-account.component';
import { AdminEventsComponent } from './pages/admin-events/admin-events.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'event', component: EventComponent },
  { path: 'event/match', component: MatchedFacesComponent },
  { path: 'manage', component: AdminManageComponent },
  { path: 'manage/account', component: AdminAccountComponent },
  { path: 'manage/events', component: AdminEventsComponent },
];
