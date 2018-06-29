import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Contact } from "../models/contact";
import { ContactsService } from "../contacts.service";

@Injectable()
export class ContactResolver implements Resolve<Contact> {

  constructor(private contactsService: ContactsService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.contactsService
               .getContact(route.paramMap.get('id'));
  }
}
