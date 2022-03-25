import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowService } from '../../services/follow.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'following',
    templateUrl: 'following.component.html',
    providers: [ UserService, FollowService ]
})
export class FollowingComponent implements OnInit {
    public title: string;
    public globalUrl: string;
    public user: User;
    public counter;
    public users: User[];
    public token: String;
    public page: number;
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
    ) {
        this.title = 'Listado de Usuarios Suguiendo - Following **';
        this.globalUrl = GLOBAL.url;
    }

    ngOnInit() {
        // let page: string;
        this.user = this._userService.getIdentity();
        this.counter = this._userService.getCountersLocal();
        this.token = this._userService.getToken().token;
        // console.log(this.counter);
        this.actualPage();
    }
    getFollows(id, page) {
        this._follow.getFollowing(id, page, this.token).subscribe(response => {
            console.log(response.follows);
            this.users = response.follows;
            // this.total = response.total;
            // this.pages = response.pages;
            // this.follows = response.following;
            if (page > this.pages) {
                this._router.navigate(['/users/', 1 ]);
            }
        }, err => {
            this.status = 'danger';
            this.message = err.message;
        });
    }
    actualPage() {
        this._route.params.subscribe(params => {
            if (params['page']) {
                this.page = +params['page'];
            } else {
                this.page = 1;
            }
            const user_id = params['id'];
                this.next_page = this.page + 1;
                this.prev_page = this.page - 1;

                this.getFollows(user_id, this.page);
            });
    }
    mouseEnter(userId) {
        this.followUserOver = userId;
    }
    mouseLeave() {
        this.followUserOver = 0;
    }
    seguir(followed) {
        const follow = new Follow('', this.user._id , followed);
        this._follow.addFollow(follow, this.token).subscribe(resp => {
            this.follows.push(followed);
            this.getCounters();
        }, err => {
            console.log(err);
        });
    }

    getCounters() {
        const temp = this._userService.getCounters().subscribe(response => {
            localStorage.setItem('counters', JSON.stringify(response));
            this.counter = this._userService.getCountersLocal();
        });
        return temp;
    }
    unfollow(id) {
        this._follow.deleteFollow(id, this._userService.getToken().token).subscribe(response => {
            // console.log(response);
            const index = this.follows.indexOf(id);
            this.follows.splice(index, 1);
            this.getCounters();
        }, err => {
            console.log(err);
        });
    }

}
