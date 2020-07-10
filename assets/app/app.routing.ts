import { Routes, RouterModule } from '@angular/router'
import { MessagesComponent } from './messages/messages.component'
import { AuthenticationComponent } from './auth/authentication.component'
import { AUTH_ROUTES } from './auth/auth.routers';
import { AuthGuard } from './auth/auth.guard';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
    { path: 'authentication', component: AuthenticationComponent, children: AUTH_ROUTES },
];

export const myrouting = RouterModule.forRoot(APP_ROUTES);
