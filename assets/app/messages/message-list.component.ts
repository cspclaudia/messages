import { Component, OnInit } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";

@Component({
    selector: 'app-message-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-message [messageVarClasse]="msg"
                (editClicked_MessageMetodoClasse)="msg.content = $event"
                *ngFor="let msg of messageS">
            </app-message>
        </div>
    `,
    //providers: [MessageService]
})

export class MessageListComponent implements OnInit{
    messageS: Message[] = [new Message("Texto da Mensagem-LIST-Comp", "Cláudia-LIST-Comp"),
                           new Message("Texto 2 da Mensagem-LIST-Comp", "dosSantos-LIST-Comp"),
                           new Message("Texto 3 da Mensagem-LIST-Comp", "Pereira-LIST-Comp"),
                          ];

    constructor (private messageService: MessageService) {}

    ngOnInit(): void {
        //messageS aponta para o array messageSService que armazena os dados
        //this.messageS = this.messageService.getMessages();
        this.messageService.getMessages()
            .subscribe(
                (dadosSucesso: Message[]) => {
                    this.messageS = dadosSucesso;
                    console.log(dadosSucesso)
                },
                dadosErro => console.log(dadosErro)
            );
    }
}
