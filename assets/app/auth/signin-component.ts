import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms"
import { UserService } from "./user.service";
import { User } from "./user.model";
import { Router } from "@angular/router";

@Component({
    selector: 'app-signin',
    templateUrl: './signin-component.html'
})

export class SigninComponent implements OnInit {
    myForm: FormGroup;
    checkboxModel = { value : false };
    constructor(private userService: UserService, private router: Router) {}

    onSubmit(form: NgForm){
        const userAux = new User(form.value.emailTS, form.value.passwordTS);
        this.userService.signInUser(userAux)
            .subscribe(
                dadosSucesso => {
                    console.log(dadosSucesso);
                    localStorage.setItem('token', dadosSucesso.token);
                    this.userService.mostrarMenuEmitter.emit(true);
                    this.router.navigate(["/messages"]);
                    console.log('CHECKBOX: ', this.checkboxModel.value);
                    if (!this.checkboxModel.value) {
                        this.teste();
                    }
                },
                dadosErro => {
                    console.log(dadosErro);
                    localStorage.removeItem('token');
                    this.router.navigate(["/authentication/signin"]);
                }
            );
        //console.log(form);
        form.resetForm();
    }
    
    ngOnInit(){
        this.myForm = new FormGroup({
            emailTS: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
            ]),
            passwordTS: new FormControl(null, Validators.required)
        });
    }

    teste() {
        var tempoLimite = 4;
        var tempoInicial = 1;
        document.onmousemove = document.onkeypress = () => {
          tempoInicial = 0;
          console.log('tempo: mousemove', tempoInicial);
        };
        window.setInterval(() => {
          console.log('tempo: setInterval', tempoInicial);
          if (++tempoInicial >= tempoLimite) {
            localStorage.removeItem('token');
            window.location.reload();
          }
        }, 3000);
      }

      ckeckValue() {
        if (this.checkboxModel.value == true) {
            this.checkboxModel.value = false;
        }
        else {
            this.checkboxModel.value = true;
        }
      }
}
