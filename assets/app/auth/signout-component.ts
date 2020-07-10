import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "../messages/message.model";
import { UserService } from "./user.service";

@Component({
    selector: 'app-logout',
    templateUrl: `
        <div class="col-md-8 col-md-offset-2">
            <button class="btn btn-danger"(click)="onSubmit()">Sign Out</button>
        </div>
    `
})

export class SignoutComponent {
    constructor(private userService: UserService, private router: Router) {}

    onSubmit(){
        localStorage.removeItem('token');
        this.userService.mostrarMenuEmitter.emit(false);
        this.router.navigate(["/authentication/signin"]);
        console.log('Logout realizado com sucesso.');
    }

    ngOnInit() {
        console.log(localStorage.getItem('token'));
    }
}
