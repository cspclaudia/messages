import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from './user.model'
import { UserService } from './user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `]
})

export class UserComponent {

    color = 'yellow';
    tam = 12;
    onMudaStyle(){
        this.color = 'red';
        this.tam = 16;
    }

    @Input() userVarClasse: User = new User("","");

    @Output() editClicked_UserMetodoClasse = new EventEmitter<string>();

    constructor(private userServiceObj: UserService) {}

/*     onEditService() {
        this.userServiceObj.editUser(this.userVarClasse);
    }

    onDeleteService(){
        this,userServiceObj.deleteUser(this.userVarClasse)
            .subscribe(
                dadosSucesso => console.log(dadosSucesso),
                dadosErro => console.log(dadosErro)
            );
    } */

}
