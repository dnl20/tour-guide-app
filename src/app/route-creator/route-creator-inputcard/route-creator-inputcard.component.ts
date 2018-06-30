import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray, ControlValueAccessor } from '@angular/forms';
import { StarRatingColor } from '../../star-rating/star-rating.component';
import { RoutesService } from '../../routes.service';
import { Router } from '@angular/router';
import { Route, GeoData } from '../../models/route';
import { GEO_DATA } from '../../data/geo-data';
import { Subject } from 'rxjs';
import { filter, map, combineLatest } from 'rxjs/operators';
@Component({
  selector: 'trm-route-creator-inputcard',
  templateUrl: './route-creator-inputcard.component.html',
  styleUrls: ['./route-creator-inputcard.component.css']
})
export class RouteCreatorInputcardComponent implements OnInit, ControlValueAccessor {
  
  geo = GEO_DATA;
  countrys = [];
  place_deps = [];
  place_arrs = [];

  geo_data: GeoData;
  geo_data_complete: GeoData;
  type = new FormControl();
  typeList: string[] = ['Hiking', 'Cycling', 'Running', 'Skating', 'Mountaineering'];
  form: FormGroup;

  countryDepName$ = new Subject<string>();
  countryArrName$ = new Subject<string>();

  placeDepName$ = new Subject<string>();
  placeArrName$ = new Subject<string>();

  rating = 1;
  starCount = 5;
  ratingtype = 'difficulity';
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;
  ratingElements = ['easy-going', 'exhausting', 'challenging', 'extreme', 'super extreme'];

  constructor(private fb: FormBuilder, private routesService: RoutesService, private router: Router) {
    this.geo.forEach(geoelement => {
      const country = geoelement['country'];
      if (!this.countrys.includes(country)) {
        this.countrys.push(country);
      }
    });

  }

  ngOnInit() {
    this.form = this.fb.group({
      //[initialValue, [syncValidator], [asyncValidator]]
      name: ['', [Validators.required, Validators.minLength(3)]],
      country_dep: ['', [Validators.required, Validators.minLength(3)]],
      place_dep: ['', [Validators.required, Validators.minLength(3)]],
      country_arr: ['', [Validators.required, Validators.minLength(3)]],
      place_arr: ['', [Validators.required, Validators.minLength(3)]],
      distance: [null, [Validators.required]],
      coordinates: this.fb.group({
        latitude_dep: '',
        longitude_dep: '',
        latitude_arr: '',
        longitude_arr: ''
      }),
      type: this.fb.array(['']),
      difficulty: ['', [Validators.required]]
    });

    this.countryDepName$.subscribe(countryElement => {
      this.place_deps = this.geo.filter(geoElement => geoElement.country === countryElement).map(filterPlace => filterPlace.City);
    });

    this.placeDepName$.subscribe(placeElement => {
      this.geo.filter(geoElement => geoElement.City === placeElement)
      .map(filterGeo => {
        this.form.get('coordinates').get('latitude_dep').setValue(filterGeo.Latitude);
        this.form.get('coordinates').get('longitude_dep').setValue(filterGeo.Longitude);
      });
    });

    this.countryArrName$.subscribe(countryElement => {
      this.place_arrs = this.geo.filter(geoElement => geoElement.country === countryElement).map(filterCountrys => filterCountrys.City);
    });

    this.placeArrName$.subscribe(placeElement => {
      this.geo.filter(geoElement => geoElement.City === placeElement).map(filterGeo => {
        this.form.get('coordinates').get('latitude_arr').setValue(filterGeo.Latitude);
        this.form.get('coordinates').get('longitude_arr').setValue(filterGeo.Longitude);
      });
    });

    combineLatest(this.placeDepName$, this.placeArrName$, (placeDepName, placeArrName) => {
      this.propagateChange(this.geo_data);
    });

  }


  onRatingChanged(rating) {
    this.rating = rating;
    const controlRating = this.form.get('difficulty');
    controlRating.setValue(this.ratingElements[(rating - 1)]);
  }

  changeType(a) {
    const typeArray: FormArray = a.value;
    const control = <FormArray>this.form.get('type');
    control.removeAt(0);
    control.push(new FormControl(typeArray));

  }

  save(newRoute: Route) {
    console.log(newRoute);
    this.routesService.addRoute(newRoute).subscribe(() => this.router.navigate(['']));
  }

  propagateChange: Function = () => { };
  propagateTouched: Function = () => { };

  writeValue(coordinates: GeoData) {
    this.form.setValue(coordinates);
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    this.propagateTouched = fn;
  }

}
