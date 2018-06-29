import { Component, OnInit } from '@angular/core';
import { EventBusServiceService } from '../services/event-bus-service.service';
import { RoutesService } from '../routes.service';
import { Observable, Subject } from 'rxjs';
import { merge } from 'rxjs/operators';
import { Route } from '../models/route';

@Component({
  selector: 'trm-route-overview',
  templateUrl: './route-overview.component.html',
  styleUrls: ['./route-overview.component.css']
})
export class RouteOverviewComponent implements OnInit {
  terms$ = new Subject<string>();
  routes$: Observable<Array<Route>>;

  routes: Array<Route>;

  constructor(private routeService: RoutesService, private eventBusService: EventBusServiceService) { }

  ngOnInit() {
    this.routes$ = this.routeService.search(this.terms$, 400).pipe(
      merge(this.routeService.getRoutes()));

    this.eventBusService.emit('appTitleChange', 'Route-Overview');
  }

}
