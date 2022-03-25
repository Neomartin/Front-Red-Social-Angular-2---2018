import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../models/publication';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from '../../services/upload.service';

@Component({
    selector: 'sidebar',
    templateUrl: 'sidebar.component.html',
    providers: [ UserService, PublicationService, UploadService ]
})
export class SidebarComponent implements OnInit {
    public title:string;
    public globalUrl: string;
    public counter;
    public follows;
    public user;
    public publication: Publication;
    public remember:string;
    public token: string;
    public url: string;
    constructor(
        private _userService: UserService,
        private _pubicationService: PublicationService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _upload: UploadService
    ){
        this.title = 'Neobook';
        this.globalUrl = GLOBAL.url;
        this.publication = new Publication("", "", "", "", "");
    }
    ngOnInit(){
        this.user = this._userService.getIdentity();
        this.token = this._userService.getToken().token;
        this.url = GLOBAL.url;
        this.counter = this._userService.getCountersLocal();
    }
    onSubmit(publicationForm){
        this.remember = this.publication.text;
        this._pubicationService.savePublication(this.publication, this.token).subscribe(response => {
            
            if(this.filesToUpload) {
                this._upload.makeFileRequest(this.url+'upload-image-pub/'+response.publicationStored._id, [], this.filesToUpload, this._userService.getToken().token, '')
                .then((result: any)=> {
                    this.updateCounters();
                    // this.publication.file = 'publication/'+result.image;
                    publicationForm.form.reset();
                })
                .catch(err => {
                    console.log('Error al Subir imagen', err);
                });
                this._router.navigate(['/publications']);
            }else{
                this.updateCounters();
                publicationForm.form.reset();
                this._router.navigate(['/publications']);
            }
        }, err => {
            console.log('ERROR');
            console.log(err);
        });
    }

    public filesToUpload: Array<File>;
    fileChangeEvent(files: any){
        this.filesToUpload = <Array<File>>files.target.files;
    }

    updateCounters(){
        this._userService.getCounters().subscribe(response => {
            localStorage.setItem('counters', JSON.stringify(response))
        }, err => {
            
        });
        this.counter = this._userService.getCountersLocal();
    }

    @Output() sended = new EventEmitter();
    send(){
        this.sended.emit({send: true});
    }
    myProfile(id){
        console.log(id);
        this._router.navigate(['/profile/'+id]);
    }
}