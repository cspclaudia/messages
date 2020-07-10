import { Message } from "./message.model";
import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/Rx";
import { Observable } from "rxjs";

@Injectable()
export class MessageService {
    private messageSService: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();
    constructor(private http: Http) {}
    
    addMessage(message: Message){
        const bodyReq = JSON.stringify(message);
        const myHeaders = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token');
        return this.http
            .patch('http://localhost:3000/message/' + token, bodyReq, {headers: myHeaders})
            .map((responseRecebida: Response) => {
                const aux = responseRecebida.json();
                console.log(aux);
                const newObjMessage = new Message(aux.objMessageSave.content, aux.userRecuperado.firstName,
                                                  aux.objMessageSave._id, aux.userRecuperado._id);
                this.messageSService.push(newObjMessage);
                return newObjMessage;
            })
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }

    getMessages(){
        return this.http
            .get('http://localhost:3000/message/')
            .map((responseRecebida: Response) => {
                const aux = responseRecebida.json();
                console.log(aux);
                const messageSResponseRecebida = aux.objSMessageSRecuperadaS;
                let transformedCastMessageModelFrontend: Message[] = [];
                    for(let msg of messageSResponseRecebida){
                        transformedCastMessageModelFrontend.push(
                            new Message(msg.content, msg.user.firstName, msg._id, msg.user));
                    }
                this.messageSService = transformedCastMessageModelFrontend;
                return transformedCastMessageModelFrontend;
            })
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }
    
    updateMessage(message: Message){
        const bodyReq = JSON.stringify(message);
        const myHeaders = new Headers({'Content-Type': 'application/json'});
        return this.http
            .patch('http://localhost:3000/message/edit/' + message.messageId, bodyReq, {headers: myHeaders})
            .map((responseRecebida: Response) => responseRecebida.json())
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }

    deleteMessage(message: Message){
        this.messageSService.splice(this.messageSService.indexOf(message), 1);
        return this.http
            .delete('http://localhost:3000/message/' + message.messageId)
            .map((responseRecebida: Response) => responseRecebida.json())
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }
}
