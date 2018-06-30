import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { COUNTRIES_DATA } from '../data/countries-data';

@Component({
  selector: 'trm-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css']
})
export class RouteDetailComponent implements OnInit {

  @Input() route: Route;
  @Output() edit = new EventEmitter<any>();
  @Output() back = new EventEmitter<any>();

  ratingElements = ['easy-going', 'exhausting', 'challenging', 'extreme', 'super extreme'];
  countryData = COUNTRIES_DATA;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.data
        .pipe(map(data => data['route']))
        .subscribe(route => this.route = route);

    this.back.subscribe( () => this.router.navigate(['']));
  }

  getCountryCode(country: string) {
    const data = this.countryData.filter(c => c.name === country).map(c2 => c2.alpha2Code);
    return data[0] || '';
  }

  getStars(difficulty: string) {
    return this.ratingElements.indexOf(difficulty) + 1;

  }

}
