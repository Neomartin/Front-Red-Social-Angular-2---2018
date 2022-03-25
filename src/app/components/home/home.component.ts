import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    providers: [ UserService ]
})
export class HomeComponent{
    public title:string;
    public identity;

    constructor(
        private _userService: UserService
    ){
        this.title = 'Jome Component'
    }

    ngOnInit(){
        this.identity = this._userService.getIdentity();
    }
}