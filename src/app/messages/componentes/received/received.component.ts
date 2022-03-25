import { Component, OnInit } from '@angular/core';

Component({
    selector: 'received',
    templateUrl: 'received.component.html'
});
export class ReceivedComponent implements OnInit {
    public title: string;
    constructor() {
        this.title = 'Received Component';
    }

    ngOnInit(): void {
        console.log('Received Component loaded...');
    }
}
