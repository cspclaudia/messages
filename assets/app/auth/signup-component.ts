import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { UserService } from "./user.service";
import { User } from "./user.model";
import { Router } from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup-component.html'
})

export class SignupComponent implements OnInit {
    myForm: FormGroup;
    constructor (private userService: UserService, private router: Router) { }

    onSubmit(form: NgForm){
        //console.log(this.myForm);
        //this.myForm.reset();
        //Criar
        const userAux = new User(form.value.emailTS, form.value.passwordTS, form.value.firstNameTS, form.value.lastNameTS);
        this.userService.addUser(userAux)
            .subscribe(
                dadosSucesso => {
                    console.log(dadosSucesso);
                    this.router.navigate(["/authentication/signin"]);
                },
                dadosErro => console.log(dadosErro)
            );
        //console.log(form);
        form.resetForm();
    }

    userLoad: User;

    ngOnInit(){
        this.myForm = new FormGroup({
            firstNameTS: new FormControl(null, Validators.required),
            lastNameTS: new FormControl(null, Validators.required),
            emailTS: new FormControl(null, [
                Validators.required, 
                Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
            ]),
            passwordTS: new FormControl(null, Validators.required)
        });
    }
}
