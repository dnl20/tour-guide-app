import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { API_ENDPOINT } from './app.tokens';

import { Contact } from './models/contact';

interface ContactResponse { item: Contact; }
interface ContactsResponse { items: Contact[]; }
interface EmailAvailableResponse { msg?: string; error?: boolean; }


@Injectable()
export class ContactsService {

  constructor(private http: HttpClient, @Inject(API_ENDPOINT) private apiEndpoint) { }

  search(terms$: Observable<string>, debounceMs = 400): Observable<Array<Contact>> {
    return terms$.pipe(
      debounceTime(debounceMs),       // Obersvable<string>
      distinctUntilChanged(),         // Obersvable<string>
      switchMap(term => this.rawSearch(term)) // Observable<Array<Contact>>
    );
  }

  rawSearch(term: string) {
    return this.http.get<ContactsResponse>(`${this.apiEndpoint}/search?text=${term}`)
      .pipe(map(data => data.items));
  }

  getContact(id: string): Observable<Contact> {
    return this.http.get<ContactResponse>(`${this.apiEndpoint}/contacts/${id}`)
      .pipe(map(data => data.item));
  }

  getContacts(): Observable<Array<Contact>> {
    return this.http.get<ContactsResponse>(`${this.apiEndpoint}/contacts`)
      .pipe(map(data => data.items));
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<ContactResponse>(`${this.apiEndpoint}/contacts/${contact.id}`, contact)
      .pipe(map(data => data.item));
  }

  addContact(contact: Contact) {
    return this.http.post<ContactResponse>(`${this.apiEndpoint}/contacts`, contact)
      .pipe(map(data => data.item));
  }

  isEmailAvailable(email: string) {
    return this.http.get<EmailAvailableResponse>(`${this.apiEndpoint}/check-email?email=${email}`)
      .pipe(map(data => data));
  }

}
