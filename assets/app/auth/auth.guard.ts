import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { UserService } from "./user.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private userService: UserService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
        boolean | Observable<boolean> | Promise<boolean> {

        if (!this.userService.isSignedIn()) {
            this.router.navigate(['/authentication/signin']);
            return false;
        }
        return true;
    }
}