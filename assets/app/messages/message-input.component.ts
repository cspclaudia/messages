import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MessageService } from "./message.service";
import { Message } from "./message.model";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
    //providers: [MessageService]
})

export class MessageInputComponent implements OnInit{
    constructor (private messageService: MessageService) { }

    onSubmit(form: NgForm){
        if(this.messageLoad){
            //Editar
            this.messageLoad.content = form.value.myContentngForm;
            this.messageService.updateMessage(this.messageLoad)
                .subscribe(
                    dadosSucesso => console.log(dadosSucesso),
                    dadosErro => console.log(dadosErro)
                );
            this.messageLoad = null;
        }
        else {
            //Criar
            const messageAux = new Message(form.value.myContentngForm, null);
            this.messageService.addMessage(messageAux)
                .subscribe(
                    dadosSucesso => console.log(dadosSucesso),
                    dadosErro => console.log(dadosErro)
                );
        }
        //console.log(form);
        form.resetForm();
    }

    messageLoad: Message;

    ngOnInit(){
        this.messageService.messageIsEdit.subscribe(
            (message: Message) => this.messageLoad = message
        );
    }

    onClear(form: NgForm){
        this.messageLoad = null;
        form.resetForm();
    }

/*     onSave(textoConsole: string){
        const messageAux = new Message(textoConsole, 'Cláudia');
        this.messageService.addMessage(messageAux);
        console.log(textoConsole); */
}
