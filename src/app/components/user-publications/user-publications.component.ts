import { Component, OnInit, Input } from '@angular/core';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { GLOBAL } from '../../services/global';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'user-publications',
    templateUrl: 'user-publications.component.html',
    providers: [ PublicationService ]
})
export class UserPublicationsComponent implements OnInit {
    public publications: Publication[];
    public status: Object;
    public id: String;
    public title:String;
    public token: String;
    public globalUrl: String;
    public pages: Number;
    public page;
        constructor(
        private _publicationService: PublicationService,
        private _route: ActivatedRoute,
        private _userService: UserService
    ){
        this.title = 'PUBLICACIONES DEL USUARIO';
        this.globalUrl = GLOBAL.url;
        this.page = 1;
    }
    
    ngOnInit(){
        this._route.params.subscribe(params => {
            this.id = params.id;
        });
        this.token = this._userService.getToken().token;
        this.getUserPublications(false);
    }

    @Input ('image') image: String;

    getUserPublications(adding){
        this._publicationService.getUserPublications(this.token, this.id, this.page).subscribe(response => {
            // console.log('PUBLICATIONS RESPOSNE:');
            // console.log(response);
            this.pages = response.pages;
            console.log(this.pages);
            if(!adding){
                this.publications = response.publications;
            }else{
                this.publications = this.publications.concat(response.publications);
                $('html, body').animate({ scrollTop: $('html').prop('scrollHeight')}, 500);
            }
 
            this.status = {
                type: 'success',
                message: 'Publicaciones Obtenidas correctamente'
            }
        }, err => {
            console.log(err);
            this.status = {
                type: 'error',
                message: err
            };
        })
    }
    morePublications(){
        this.page += 1;
        this.getUserPublications(true);
        // console.log(this.pages);
    }
}