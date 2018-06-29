import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, startWith, merge } from 'rxjs/operators';
import { EventBusServiceService } from '../services/event-bus-service.service';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Array<Contact>>;
  terms$ = new Subject<string>();


  constructor(private contactsService: ContactsService, private eventBusService: EventBusServiceService) { }

  ngOnInit() {
    this.contacts$ = this.contactsService.search(this.terms$, 400).pipe(
      merge(this.contactsService.getContacts()));

    this.eventBusService.emit('appTitleChange', 'Contact');
  }

  trackByContactId(index, contact) {
    return contact.id;
  }
}
