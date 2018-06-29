import { Component, OnInit } from '@angular/core';
import { EventBusServiceService } from './services/event-bus-service.service';
import { Title } from '@angular/platform-browser';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter, mapTo, merge } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'trm-contacts-app',
  template: `
  <mat-toolbar color="primary">
  <div fxLayout fxLayoutAlign="space-between center" fxFlex>
    Contacts
    <a mat-button title="Go to about page" class="right" 
       routerLink="/about">
      About
    </a>
  </div>
</mat-toolbar>
<div class="spinner" *ngIf="spinner">
  <mat-spinner></mat-spinner>
</div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class ContactsAppComponent implements OnInit {
  title: string;
  spinnerVisibility$;
  spinner = false;

  constructor(private eventBusService: EventBusServiceService, private titleService: Title, private router: Router) { }
  ngOnInit() {
    this.eventBusService.observe('appTitleChange')
      .subscribe(title => {
        this.title = title;
        this.titleService.setTitle(title);
      });

    const showLoading$ = this.router.events.pipe(filter(event => event instanceof NavigationStart), mapTo(true));
    const hideSpinner$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd), mapTo(false));

    this.spinnerVisibility$ = merge(showLoading$, hideSpinner$);
    this.spinnerVisibility$.subscribe(val => this.spinner = val);

  }
}
