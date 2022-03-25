import { Component, OnInit } from '@angular/core';
import { Publication } from '../../models/publication';
import { User } from '../../models/user';
import { PublicationService } from '../../services/publication.service';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'publications',
    templateUrl: 'publications.component.html',
    providers: [ PublicationService, UserService ]
})
export class PublicationsComponent implements OnInit {
    public user: User;
    public publications: Publication[];
    public token: string;
    public publication_count: number;
    public pubs;
    public globalUrl: string;
    public page:number;
    public pages: number = 1;
    public adding: boolean;
    public status: string;
    public title: string;
    constructor(
        private _pubServ: PublicationService,
        private _userService: UserService
    ){
        this.globalUrl = GLOBAL.url;
        this.page = 1;
        this.adding = false;
        this.title = 'Timeline Component'
    }
    ngOnInit(){
        this.user = this._userService.getIdentity();
        this.token = this._userService.getToken().token;
        this.getPublications(this.adding);
    }
    getPublications(adding){
        this._pubServ.getPublications(this.token, this.page).subscribe(response => {
            this.pages = response.pages;
            this.publication_count = response.total;
            // console.log(response);
            if(!adding){
                this.publications = response.publications;
                console.log(this.publications);
            }else{
                this.publications = this.publications.concat(response.publications);
                $('html, body').animate({ scrollTop: $('html').prop('scrollHeight')}, 500);
            }
            // console.log(this.publications);
        }, err => {
            console.log('Entra al error');
            console.log(err);
        })
    }
    morePublications(){
            this.page += 1;
            this.getPublications(true);
    }
    deletePublication(id){
        console.log(id);
        this._pubServ.deletePublication(this.token, id).subscribe(response => {
            console.log(response);
            this.getPublications(false);
        },err => {
            this.status = 'error';
            console.log('Error', err);
        });
    }

    
}