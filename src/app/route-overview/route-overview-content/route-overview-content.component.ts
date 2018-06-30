import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Route } from '../../models/route';
import { COUNTRIES_DATA } from '../../data/countries-data';
import { count } from 'rxjs/operators';
import { StarRatingColor } from '../../star-rating/star-rating.component';

@Component({
  selector: 'trm-route-overview-content',
  templateUrl: './route-overview-content.component.html',
  styleUrls: ['./route-overview-content.component.css']
})
export class RouteOverviewContentComponent implements OnInit {

  @Input() routesArray$: Observable<Array<Route>>;
  countryData = COUNTRIES_DATA;
  code = 'be';
  routes: Array<Route>;

  rating;
  starCount = 5;
  ratingtypeDificulty = 'difficulity';
  ratingtypeStar = 'star';
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;
  ratingElements = ['easy-going', 'exhausting', 'challenging', 'extreme', 'super extreme'];
  constructor() { }

  ngOnInit() {
    this.routesArray$.subscribe(routes => { this.routes = routes; });
  }

  trackByRouteId(index, contact) {
    return contact.id;
  }

  getCountryCode(country: string) {
    const data = this.countryData.filter(c => c.name === country).map(c2 => c2.alpha2Code);
    return data[0] || '';
  }

  getStars(difficulty: string) {
    return this.ratingElements.indexOf(difficulty) + 1;

  }
}
