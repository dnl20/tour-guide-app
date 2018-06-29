import { Component, OnInit, EventEmitter, AfterViewInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactsService } from '../../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventBusServiceService } from '../../services/event-bus-service.service';
import { tap, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'trm-contacts-detail-view',
  templateUrl: './contacts-detail-view.component.html',
  styleUrls: ['./contacts-detail-view.component.css']
})
export class ContactsDetailViewComponent implements OnInit {
  contact: Contact;
  constructor(private router: Router, private route: ActivatedRoute,
    private eventBusService: EventBusServiceService) {

  }

  ngOnInit() {
    // this.route.paramMap.pipe(switchMap(paramMap => this.contactsService.getContact(paramMap.get('id'))))
    // .subscribe(contact => {
    //   this.contact = contact;
    //   this.eventBusService.emit('appTitleChange', this.contact.name);
    // });
    this.route.data
        .pipe(map(data => data['contact']))
        .subscribe(contact => this.contact = contact);
  }

  navigateToEditor() {
    // without backslash you append the router.
    // www.foo.de/foo   =>  www.foo.de/foo/edit
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  navigateToList() {
    // with backslash you set the relative URL new.
    // www.foo.de/foo   =>  www.foo.de/
    this.router.navigate(['/']);
  }

}
