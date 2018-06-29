import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { EventBusServiceService } from '../services/event-bus-service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  // we need to initialize since we can't use ?. operator with ngModel
  contact: Contact;

  constructor(private contactsService: ContactsService,
    private router: Router,
    private route: ActivatedRoute,
    private eventBusService: EventBusServiceService) { }
  warnOnClosing = true;

  ngOnInit() {
    // this.contactsService.getContact(this.route.snapshot.paramMap.get('id'))
    //   .subscribe(contact => {
    //     this.contact = contact;
    //     this.eventBusService.emit('appTitleChange', 'Edit ' + this.contact.name);
    //   });

      this.route.data
        .pipe(map(data => data['contact'])) // Map it to desired key.
        .subscribe(contact => {
          this.contact = contact;
          this.eventBusService.emit('appTitleChange', 'Edit ' + this.contact.name);
        });
  }
  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {
    this.warnOnClosing = false;
    this.contactsService.updateContact(contact)
      .subscribe(() => {
        this.warnOnClosing = false;
        this.goToDetails(contact);
      });
  }

  private goToDetails(contact: Contact) {
    this.router.navigate(['/contact', contact.id]);
  }
}

