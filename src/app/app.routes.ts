import { Routes } from '@angular/router';
import { LoginComponent } from './pages/1-login/login.component';
import { EventComponent } from './pages/2-event/event.component';
import { AdminManageComponent } from './pages/admin-manage/admin-manage.component';
import { MatchedFacesComponent } from './pages/3-matched-faces/matched-faces.component';
import { AdminAccountComponent } from './pages/7-admin-account/admin-account.component';
import { AdminEventsComponent } from './pages/5-admin-events/admin-events.component';
import { AdminSingleEventComponent } from './pages/admin-single-event/admin-single-event.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'event', component: EventComponent },
  { path: 'event/match', component: MatchedFacesComponent },
  { path: 'admin', component: AdminManageComponent },
  { path: 'admin/account', component: AdminAccountComponent },
  { path: 'admin/events', component: AdminEventsComponent },
  { path: 'admin/event/:eventId', component: AdminSingleEventComponent },
];
