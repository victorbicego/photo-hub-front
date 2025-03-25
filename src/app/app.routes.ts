import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventComponent } from './pages/event/event.component';
import { ManageComponent } from './pages/manage/manage.component';
import { MatchedFacesComponent } from './pages/matched-faces/matched-faces.component';
import { AccountComponent } from './pages/account/account.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'event', component: EventComponent },
  { path: 'event/match', component: MatchedFacesComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'manage/account', component: AccountComponent },
];
