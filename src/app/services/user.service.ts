import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { GLOBAL } from './global';

 @Injectable()
 export class UserService{
    public url: String;
    public identity;
    public token;
    public localCounters;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(public _http: HttpClient){
        this.url = GLOBAL.url;
    }
    register(user: User): Observable<any>{
        let params = JSON.stringify(user);
        return this._http.post(this.url+'register', params, { headers:this.headers });
    }

    login(user: User, gettoken: boolean): Observable<any>{
        if(gettoken != null){
            user.gettoken = gettoken;
        }
        let params = JSON.stringify(user);
        return this._http.post(this.url+'login', params, {headers:this.headers});
    }
    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != 'undefined'){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return identity;
    }
    getToken(){
        let token = JSON.parse(localStorage.getItem('token'));
        if(token != 'undefined'){
            this.token = token;
        }else{
            this.token = null;
        }
        return token;
    }

    logout(){

    }
    getCountersLocal(){
        let localCounters= JSON.parse(localStorage.getItem('counters'));
        if(localCounters != 'undefined'){
            this.localCounters = localCounters;
        }else{
            this.localCounters = null
        }
        // console.log(localCounters);
        return this.localCounters;
    }
    getCounters(userId = null): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', this.getToken().token);
        if(userId != null){
            return this._http.get(this.url+'get-counters/'+userId, {headers: headers});
        }else{
            return this._http.get(this.url+'get-counters', { headers: headers });
        }
    }
    updateUser(user: User): Observable<any>{

       if(user && user._id){
           let headers = new HttpHeaders().set('Content-Type','application/json')
                                          .set('Authorization', this.getToken().token);
           let params = JSON.stringify(user);
            // console.log(headers);
            return this._http.put(this.url+'update-user/'+user._id, params, { headers: headers });
       }
    }
    getUsers(page): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', this.getToken().token);
        if(!page) page=null;
        return this._http.get(this.url+'users/'+page, { headers: headers});
    }

    getUser(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', this.getToken().token);
        return this._http.get(this.url+'user/'+id, { headers: headers});
    }
 }