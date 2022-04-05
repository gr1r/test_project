import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contacts';

@Component({
  selector: 'app-single-contact',
  templateUrl: './single-contact.component.html',
  styleUrls: ['./single-contact.component.css']
})
export class SingleContactComponent implements OnInit {

  @Input()singleContact!: Contact ;

  constructor() { }

  ngOnInit() {
  }

}
