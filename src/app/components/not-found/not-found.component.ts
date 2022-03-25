import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'not-found',
    templateUrl: 'not-found.component.html'
})
export class PageNotFoundComponent implements OnInit{
    title:string;

    constructor(){
        this.title='PageNotFoundComponent'
    }
    ngOnInit(){
        console.log('Error 404 PageNotFoundComponent');
    }
}