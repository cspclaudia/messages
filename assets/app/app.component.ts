import { Component } from '@angular/core';
import { Message } from "./messages/message.model";
import { MessageService } from "./messages/message.service";
import { UserService } from "./auth/user.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [MessageService, UserService]
})

export class AppComponent {

    nomeNgSwitch: string = "";
    valorNgSwitch: number;
    mostrarElemento: boolean = true;
    mostrarMenu: boolean = false;

    constructor(private userService: UserService) { }

    ngOnInit() {
        /*         this.userService.mostrarMenuEmitter.subscribe(
                    (mostrar: boolean) => this.mostrarMenu = mostrar
                ); */
    }

    onMudaMostrarElemento() {
        this.mostrarElemento = !this.mostrarElemento;
    }

    messageS: Message[] = [new Message("Texto da Mensagem", "Cláudia"),
    new Message("Texto 2 da Mensagem", "dosSantos"),
    new Message("Texto 3 da Mensagem", "Pereira")
    ];

    messageBinding: Message = new Message("Texto da Mensagem", "Cláudia");
    //messageBindingAlias: Message = new Message("Texto da Mensagem Alias", "CláudiaAlias");

    age: number = 12;
    nome = 'Hoje';

    message = {
        content: 'Estou ficando fera no assunto',
        author: 'Cláudia'
    };

    conteudo1VarClassComponent = 'Conteúdo da variável de classe do Componente';
    conteudo2VarClassComponent = 123;
    conteudo3VarClassComponent = 123.45;
}