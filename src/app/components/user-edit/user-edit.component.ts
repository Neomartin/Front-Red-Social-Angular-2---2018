import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'user-edit',
    templateUrl: 'user-edit.component.html',
    providers: [ UserService,
                 UploadService ]
})
export class UserEditComponent{
    public title:string;
    public identity;
    public token;
    public user: User;
    public status: string;
    public changed: boolean = false;
    public error: string;
    public url: string;
    public imgCtrl: boolean;
    public imageStatus: string;

    constructor(
        private _userService: UserService,
        private _uploadService: UploadService
    ){
        this.title = 'Editar Datos del Usuario';
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        this.user = this._userService.getIdentity();
    }

    isDiferent(){
        if( this.user.name != this.identity.name || 
            this.user.surname != this.identity.surname ||
            this.user.nick != this.identity.nick ||
            this.user.email != this.identity.email ){
                this.changed = true;
        }else{
            this.changed = false;
        }
    }

    onSubmit(){
        // console.log(this.user);
        this.imageStatus = null;
        this._userService.updateUser(this.user).subscribe(response => {       
            if(!response.user){
                this.status = 'danger';
            }else{
                this.identity = response.user;
                this.status = 'success';
                localStorage.setItem('identity', JSON.stringify(this.user));
                this.isDiferent();
            }
        }, error=> {
            this.status = 'danger';
            this.error = error.error.message;
        });
        // console.log(temp);
    }
    public filesToUpload: Array<File>;
    fileChange(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        this.imgCtrl = true;
    }

    uploadImage(){
        //Subida de imagen
        this._uploadService.makeFileRequest(this.url+'update-image-user/'+this.user._id,[], this.filesToUpload, this.token.token, 'image')
                        .then((response: any) => {
                            this.status = null;
                            console.log(response);
                            this.user = response.user;
                            localStorage.setItem('identity', JSON.stringify(this.user));
                            this.imgCtrl = false;
                            this.imageStatus = 'success'
                        }).catch((err)=> {
                            console.log(err);
                            this.imageStatus = 'danger';
                            this.error = err.message;   
                        } )
    }
}
