import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { COUNTRIES_DATA } from '../data/countries-data';
import { Route, GeoData } from '../models/route';

@Component({
  selector: 'trm-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css']
})
export class RouteDetailComponent implements OnInit {

  @Input() route: Route;
  @Output() edit = new EventEmitter<any>();
  @Output() back = new EventEmitter<any>();
  public lat: Number = 24.799448;
  public lng: Number = 120.979021;
  public dir = null;
  public zoom = 12;


  ratingElements = ['easy-going', 'exhausting', 'challenging', 'extreme', 'super extreme'];
  countryData = COUNTRIES_DATA;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.data
      .pipe(map(data => data['route']))
      .subscribe(route => {
        this.route = route;
        this.dir = this.getDirection(route.coordinates);
      });

    this.back.subscribe(() => this.router.navigate(['']));
    this.edit.subscribe(() => this.router.navigate(['route/edit/', this.route.id]));
  }

  getDirection(coordinates: GeoData) {
    return this.dir = {
      origin: { lat: coordinates.latitude_dep, lng: coordinates.longitude_dep },
      destination: { lat: coordinates.latitude_arr, lng: coordinates.longitude_arr }
    };
  }


  getCountryCode(country: string) {
    const data = this.countryData.filter(c => c.name === country).map(c2 => c2.alpha2Code);
    return data[0] || '';
  }

  getStars(difficulty: string) {
    return this.ratingElements.indexOf(difficulty) + 1;

  }

}
