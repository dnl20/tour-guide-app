import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventBusServiceService } from './services/event-bus-service.service';
import { Title } from '@angular/platform-browser';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter, mapTo, merge } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'trm-contacts-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class ContactsAppComponent implements OnInit {
  fillerNav = ['Overview of Routes', 'Create a new Route'];
  title = '';

  constructor(private eventBusService: EventBusServiceService, private titleService: Title, private router: Router) { }
  ngOnInit() {
    this.eventBusService.observe('appTitleChange')
      .subscribe(title => {
        this.title = title;
        this.titleService.setTitle(title);
      });

    // const showLoading$ = this.router.events.pipe(filter(event => event instanceof NavigationStart), mapTo(true));
    // const hideSpinner$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd), mapTo(false));

    // this.spinnerVisibility$ = merge(showLoading$, hideSpinner$);
    // this.spinnerVisibility$.subscribe(val => this.spinner = val);

  }
}
