import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Publication } from '../models/publication';

@Injectable()
export class PublicationService {
    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    savePublication(publication: Publication, token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);
        let params = publication;
        return this._http.post(this.url+'publication', params, { headers: headers })
    }

    getPublications(token, page = 1): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);

        return this._http.get(this.url+'publications/'+page, {headers: headers});
    }
    deletePublication(token, id){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);

        return this._http.delete(this.url+'publication/'+id, {headers: headers });
    }
    getUserPublications(token, id, page): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);
        return this._http.get(this.url+'user-publications/'+id+'/'+page, {headers: headers})
    }
}