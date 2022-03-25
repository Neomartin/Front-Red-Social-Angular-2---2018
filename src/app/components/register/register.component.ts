import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    providers: [ UserService ]
})
export class RegisterComponent implements OnInit{
    title: String;
    user: User;
    password2: String;
    status: String;
    message: String;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'REGISTRARSE';
        this.user = new User("","","","","","","ROLE_USER","", false);
        this.password2='';
    }
    ngOnInit(){
        console.log('Componente de Registro cargado...');
    }   
    
    onSubmit(form){
        this._userService.register(this.user).subscribe(response =>{
            // console.log(response);
            if(response.user && response.user._id){
                // console.info(response.user);
                this.status = 'success';
                // form.reset();
            }else{
                this.status = 'warning';
                this.message = response.message;
            }
        }, err => {
                console.error(<any>err);
                this.status = 'danger';
        });
    }

}
