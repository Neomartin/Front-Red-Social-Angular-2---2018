import { Component, OnInit, DoCheck } from '@angular/core';

Component({
    selector: 'sended',
    templateUrl: 'sended.component.html'
});
export class MainComponent implements OnInit {
    public title: string;
    constructor() {
        this.title = 'Sended COMPONENT';
    }

    ngOnInit() {
        console.log('Sended Component cargado....');
    }
}


