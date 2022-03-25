import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent implements OnInit, DoCheck{
  title: string;
  public identity;

  constructor(
    private _userService: UserService,
    private _router: Router,
    // private _route: ActivatedRoute
  ){
    this.title = 'RED SOCIAL';
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this._router.navigate(['/home']);
  }
}
