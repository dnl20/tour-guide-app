import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';
import {Contact} from '../models/contact';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent {

  @Input() contact: Contact;
  @Output() edit = new EventEmitter<any>();
  @Output() back = new EventEmitter<any>();


  constructor() {}
}
