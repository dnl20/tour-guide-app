import { Component, OnInit } from '@angular/core';
import { EventBusServiceService } from '../services/event-bus-service.service';
import { RoutesService } from '../routes.service';
import { Observable, Subject, combineLatest } from 'rxjs';
import { merge, concatAll, concat, withLatestFrom, distinct, combineAll, share } from 'rxjs/operators';
import { Route } from '../models/route';


@Component({
  selector: 'trm-route-overview',
  templateUrl: './route-overview.component.html',
  styleUrls: ['./route-overview.component.css']
})
export class RouteOverviewComponent implements OnInit {
  searching$ = new Subject<Array<string>>();

  termsName$ = new Subject<string>();
  termsLocation$ = new Subject<string>();
  termsPerimeter$ = new Subject<string>();
  termsType$ = new Subject<string>();
  termsRating$ = new Subject<string>();
  termsReccomendations$ = new Subject<string>();

  searchingTermsName = '';
  searchingTermsLocation = '';
  searchingTermsPerimeter = '';
  searchingTermsType = '';
  searchingTermsRating = '';
  searchingTermsRecommendation = '';


  routes$: Observable<Array<Route>>;

  routes: Array<Route>;

  constructor(private routeService: RoutesService, private eventBusService: EventBusServiceService) { }

  ngOnInit() {
    this.termsName$.subscribe(name => this.searchingTermsName = name);
    this.termsLocation$.subscribe(location => this.searchingTermsLocation = location);
    this.termsPerimeter$.subscribe(perimeter => this.searchingTermsPerimeter = perimeter);
    this.termsReccomendations$.subscribe(recommendation => this.searchingTermsRecommendation = recommendation);
    this.termsRating$.subscribe(rating => this.searchingTermsType = rating);
    this.termsType$.subscribe(type => this.searchingTermsType = type);

    this.routes$ = this.routeService.searchAll(this.searching$, 400).pipe(
      merge(this.routeService.getRoutes()));

    this.routes$.subscribe(routes => console.log('NEW ROUTES ', routes));

    this.eventBusService.emit('appTitleChange', 'Route-Overview');
  }

  fillFilter() {
    const filterArray = [this.searchingTermsName, this.searchingTermsLocation,
    this.searchingTermsPerimeter, this.searchingTermsRecommendation, this.searchingTermsRating, this.searchingTermsType];

    this.searching$.next(filterArray);

  }
}

