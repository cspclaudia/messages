import { Routes } from "@angular/router";
import { SignupComponent } from "./signup-component";
import { SigninComponent } from "./signin-component";
import { SignoutComponent } from "./signout-component";
import { AuthGuardChildren } from "./auth.guard.children";
import { AuthGuard } from "./auth.guard";

/* Este Path é relativo a /authentication
Aqui temos as sub-rotas ("child routes") */
export const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent, canActivate: [AuthGuardChildren] },
    { path: 'signin', component: SigninComponent, canActivate: [AuthGuardChildren] },
    { path: 'signout', component: SignoutComponent, canActivate: [AuthGuard] }
];
