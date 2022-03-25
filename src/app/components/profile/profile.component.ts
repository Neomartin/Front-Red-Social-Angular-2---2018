import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { GLOBAL } from '../../services/global';


@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [UserService, FollowService]
})
export class ProfileComponent implements OnInit {
    public title: String;
    public id: String;
    public user: User;
    public following: Boolean;
    public followed: Boolean;
    public followingCount: Number;
    public followedCount: Number;
    public globalUrl: String;
    public token: String;
    public identity: User;
    public buttonEffect: String;
    public imageUrl: String

    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _followService: FollowService
    ){
        this.title = 'Profile Component';
        
        this.globalUrl = GLOBAL.url;
        this.token = this._userService.getToken().token;
        this.identity = this._userService.getIdentity();
        // console.log(this.identity);
    }

    ngOnInit(){
        this._route.params.subscribe(p => {
            console.log(p);
            this.id = p.id;
            this.getUserProfile(this.id);
            this.getCounters(this.id);
        })
    }

    getUserProfile(id){
        this._userService.getUser(id).subscribe(
            response => {
                // console.log(response);
                this.user = response.user;
                if(response.user.image){
                    this.imageUrl = response.user.image;
                }
                if(response.value.following) this.following=true;
                if(response.value.followed) this.followed=true;
            }, 
            err => {
            console.log(err);
            }
        );
    }
    getCounters(id){
        this._userService.getCounters(id).subscribe(
            response => {
                // console.log('Response', response);
                this.followingCount = response.followingCount;
                this.followedCount = response.followersCount;
                // console.log(this.following);
            },
            err => {
                console.log(err);
            }
        )
    }
    followUser(id){
        // console.log(id);
        let follow = new Follow("", this.identity._id , id);
        this._followService.addFollow(follow, this.token).subscribe(response => {
            this.following = true;
            console.log(response);
            this.getUserProfile(id);
        }, err=> {
            console.log(err);
        })
    }
    unfollowUser(id){
        this._followService.deleteFollow(id, this.token).subscribe(response => {
            this.following = false;
        }, err => {
            console.log(err);
        })
    }
    mouseEnter(id){
        this.buttonEffect = id;
    }
    mouseLeave(){
        this.buttonEffect = null;
    }

}