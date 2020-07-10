import { User } from "./user.model";
import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/Rx";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class UserService {
    private userSService: User[] = [];

    userIsEdit = new EventEmitter<User>();
    mostrarMenuEmitter = new EventEmitter<boolean>();

    constructor(private http: Http, private router: Router) {}

    addUser(user: User){
        //console.log(this.userSService);
        const bodyReq = JSON.stringify(user);
        const myHeaders = new Headers({'Content-Type': 'application/json'});
        return this.http
            .post('http://localhost:3000/user', bodyReq, {headers: myHeaders})
            .map((responseRecebida: Response) => {
                const aux = responseRecebida.json();
                console.log(aux);
                const newObjUser = new User(aux.objUserSave.email, null, 
                                            aux.objUserSave.firstName, aux.objUserSave.lastName);
                this.userSService.push(newObjUser);
                return newObjUser;
            })
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }

    signInUser(user: User) {
        const bodyReq = JSON.stringify(user);
        const myHeaders = new Headers({ "Content-Type": "application/json" });
        return this.http
            .post('http://localhost:3000/user/signin', bodyReq, {headers: myHeaders})
            .map((responseRecebida: Response) => {
                const aux = responseRecebida.json();
/*                 console.log(aux);
                const newObjUser = new User(aux.objUserSave.email, null, 
                                            aux.objUserSave.firstName, aux.objUserSave.lastName); */
                return aux;
            })
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json())
        );
    }

    isSignedIn(): boolean {
        
        return localStorage.getItem('token') ? true : false;
    }

    getToken() {
        return localStorage.getItem('token');
    }

}
