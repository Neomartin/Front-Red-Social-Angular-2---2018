import { Component, OnInit} from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    providers: [UserService]
})
export class LoginComponent implements OnInit{
    title:string;
    user: User;
    gettoken: boolean = true;
    status: string;
    userId: string;

    constructor(
        private _userService: UserService,
        private _router: Router
    ){
        this.title='LOGIN',
        this.user = new User("","","","","","","","", true);
    }
    ngOnInit(){
        console.log('Componente de Login cargado');
    }

    onSubmit(){
        //Loguear usuario y conseguir datos
        this._userService.login(this.user, false).subscribe(response => {
            // console.log(response);
            if(!response._id || !response){
                localStorage.setItem('identity', JSON.stringify(response.user));
                this.getToken();
            }else {
                this.status = 'danger';
            }
        }, err => {
            var errorMessage = <any>err;
            if (errorMessage != null){
                this.status = 'danger';
            }
        });
        // console.log(this.user);
    }

    getToken(){
        this._userService.login(this.user, this.gettoken).subscribe(token => { 
            // console.log(token);
            if(token.token != undefined){
                //Persistir informacion
                localStorage.setItem('token', JSON.stringify(token));
                
                //Conseguir contadores o estadisticas del usuario
                this.getCounters();
                
            }else {
                this.status = 'error';
            }
            
        })
    }

    getCounters(){
        // console.log();
        this._userService.getCounters().subscribe(response => {
            localStorage.setItem('counters', JSON.stringify(response))
            this._router.navigate(['/home']);
            this.status = 'success';
            }, err => {
                console.log(<any>err);
            });
    }
}