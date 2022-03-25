import { Component, OnInit } from '@angular/core';

Component({
    selector: 'add',
    templateUrl: 'add.component.html'
});
export class AddComponent implements OnInit {
    public title: string;
    constructor() {
        this.title = 'AddComponent';
    }

    ngOnInit(): void {
        console.log('Add Component loaded...');
    }
}
