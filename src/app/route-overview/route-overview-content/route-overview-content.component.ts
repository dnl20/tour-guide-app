import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Route } from '../../models/route';

@Component({
  selector: 'trm-route-overview-content',
  templateUrl: './route-overview-content.component.html',
  styleUrls: ['./route-overview-content.component.css']
})
export class RouteOverviewContentComponent implements OnInit {

  @Input() routesArray$: Observable<Array<Route>>;

  routes: Array<Route>;
  constructor() { }

  ngOnInit() {
    this.routesArray$.subscribe(routes => {  this.routes = routes; });
  }

  trackByRouteId(index, contact) {
    return contact.id;
  }
}
