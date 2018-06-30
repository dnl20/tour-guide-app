import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Route, GeoData } from '../models/route';
import { combineLatest, Subject } from 'rxjs';
import { StarRatingColor } from '../star-rating/star-rating.component';
import { RoutesService } from '../routes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GEO_DATA } from '../data/geo-data';
import { map } from 'rxjs/operators';

@Component({
  selector: 'trm-route-edit',
  templateUrl: './route-edit.component.html',
  styleUrls: ['./route-edit.component.css']
})
export class RouteEditComponent implements OnInit {
  @Input() route: Route;
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

  constructor(private fb: FormBuilder, private routesService: RoutesService,
    private router: Router, private activatedRoute: ActivatedRoute) {
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

    this.activatedRoute.data
      .pipe(map(data => data['route']))
      .subscribe(route => {
        this.route = route;
        console.log('RESOLVER ', route);
        this.form.get('name').setValue(route.name);
        this.form.get('country_dep').setValue(route.country_dep);
        this.form.get('country_arr').setValue(route.country_arr);
        this.form.get('place_dep').setValue(route.place_dep);
        this.form.get('place_arr').setValue(route.place_arr);
        this.form.get('distance').setValue(route.distance);
        this.form.get('coordinates').setValue(route.coordinates);
        

        const control = <FormArray>this.form.get('type');
        control.removeAt(0);
        control.push(new FormControl(route.type));
        this.form.get('difficulty').setValue(route.difficulty);

        this.propagateChange(this.form.get('coordinates'));

        // this.form.get('country_arr').setValue(route.name);
        // this.form.get('name').setValue(route.name);

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

  update(newRoute: Route) {
    console.log(newRoute);
    this.routesService.updateRoute(newRoute).subscribe(() => this.router.navigate(['']));
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
