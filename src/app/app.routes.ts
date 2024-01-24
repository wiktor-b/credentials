import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SiteListComponent } from './site-list/site-list.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'site-list', component: SiteListComponent, canActivate: [AuthGuard] },
  {
    path: 'password-list',
    component: PasswordListComponent,
    canActivate: [AuthGuard],
  },
];
