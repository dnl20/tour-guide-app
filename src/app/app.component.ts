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
  fillerNav: Array<{title: string, link: string}> = [
    { title: 'Overview of Routes', link: '/' },
    { title: 'Create a new Route', link: '/creator'}
  ];
  title = '';
  constructor(private eventBusService: EventBusServiceService, private titleService: Title, private router: Router) { }
  ngOnInit() {
    this.eventBusService.observe('appTitleChange')
      .subscribe(title => {
        this.title = title;
        this.titleService.setTitle(title);
      });
  }
}
