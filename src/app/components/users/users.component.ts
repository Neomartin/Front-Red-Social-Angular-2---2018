import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowService } from '../../services/follow.service';

@Component({
    selector: 'users',
    templateUrl: 'users.component.html',
    providers: [ UserService, FollowService ]
})
export class UsersComponent implements OnInit {
    public title:string;
    public globalUrl: string;
    public user: User;
    public counter;
    public users: User[];
    public page:number;
    public next_page: number;
    public prev_page: number;
    public status: string;
    public message: string;
    public total: number;
    public pages: number;
    public follows;
    public followUserOver;
    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _follow: FollowService
    ){
        this.title = 'Neobook';
        this.globalUrl = GLOBAL.url;
    }

    ngOnInit(){
        let page:string;
        this.user = this._userService.getIdentity();
        this.counter = this._userService.getCountersLocal();
        // console.log(this.counter);
        this.actualPage();
    }
    getUsers(page){
        this._userService.getUsers(page).subscribe(response =>{
            // console.log(response);
            this.users = response.users;
            this.total = response.total;
            this.pages = response.pages;
            this.follows = response.following;
            if(page > this.pages) this._router.navigate(['/users/',1])
        }, err =>{
            this.status = 'danger';
            this.message = err.message;
        })
    }
    actualPage(){
        this._route.params.subscribe(params => {
            if(params['page']) {
                    this.page = +params['page'];
            }
                else this.page = 1;

                // console.log('Pagina actual: ', this.page);
                this.next_page = this.page+1;
                this.prev_page = this.page-1;
                // if(this.prev_page < 1) this.prev_disabled = true;
                // console.log('Pagina previa: ', this.prev_page);
                // console.log('Pagina siguiente: ', this.next_page);
                this.getUsers(this.page);
            });
    }

    mouseEnter(userId) {
        this.followUserOver = userId;
    }
    mouseLeave() {
        this.followUserOver = 0;
    }
    seguir(followed) {
        let follow = new Follow('', this.user._id , followed);
        let token = this._userService.getToken().token;
        this._follow.addFollow(follow, token).subscribe(resp => {
            console.log(resp)
            this.follows.push(followed);
            this.getCounters();
        }, err => {
            console.log(err);
        })
    }

    getCounters() {
        let temp = this._userService.getCounters().subscribe(response=>{
            localStorage.setItem('counters', JSON.stringify(response));
            this.counter = this._userService.getCountersLocal();
        });
    }
    unfollow(id) {
        this._follow.deleteFollow(id, this._userService.getToken().token).subscribe(response => {
            console.log(response);
            const index = this.follows.indexOf(id);
            this.follows.splice(index, 1);
            this.getCounters();
        }, err => {
            console.log(err);
        });
    }
}