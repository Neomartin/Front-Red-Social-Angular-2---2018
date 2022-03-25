import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Follow } from '../models/follow';

@Injectable()
export class FollowService {
    public url: string;
    public follow: Follow;
    constructor(
        private _http: HttpClient,
    ) {
        this.url = GLOBAL.url;
    }

    addFollow(follow, token) {
        const params = JSON.stringify(follow);
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);
        return this._http.post(this.url + 'follow', params, { headers: headers });
    }
    deleteFollow(id, token) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);
        return this._http.delete(this.url + 'follow/' + id, { headers: headers});
    }
    getFollowing(id = null, page = 1, token): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', token);
        let url = this.url + 'follows/';
        if (id) {
            url = this.url + 'follows/' + id + '/' + page;
        }
        return this._http.get(url, { headers: headers});
    }
}
