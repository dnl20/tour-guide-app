import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray, ControlValueAccessor } from '@angular/forms';
import { StarRatingColor } from '../../star-rating/star-rating.component';
import { RoutesService } from '../../routes.service';
import { Router } from '@angular/router';
import { Route } from '../../models/route';
import { GEO_DATA } from '../../data/geo-data';
@Component({
  selector: 'trm-route-creator-inputcard',
  templateUrl: './route-creator-inputcard.component.html',
  styleUrls: ['./route-creator-inputcard.component.css']
})
export class RouteCreatorInputcardComponent implements OnInit {
  geo = GEO_DATA;
  countrys = [];
  place_deps = [];
  type = new FormControl();
  typeList: string[] = ['Hiking', 'Cycling', 'Running', 'Skating', 'Mountaineering'];
  form: FormGroup;

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
  propagateTouched: Function = () => { };

  ngOnInit() {
    this.form = this.fb.group({
      //[initialValue, [syncValidator], [asyncValidator]]
      name: ['', [Validators.required, Validators.minLength(3)]],
      country_dep: ['', [Validators.required, Validators.minLength(3)]],
      place_dep: ['', [Validators.required, Validators.minLength(3)]],
      country_arr: ['', [Validators.required, Validators.minLength(3)]],
      place_arr: ['', [Validators.required, Validators.minLength(3)]],
      distance: [null, [Validators.required]],
      type: this.fb.array(['']),
      difficulty: ['', [Validators.required]]
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

  registerOnTouched(fn) {
    this.propagateTouched = fn;
  }

  save(newRoute: Route) {
    console.log(newRoute)
    this.routesService.addRoute(newRoute).subscribe(() => this.router.navigate(['']));
  }

  countryDepChanged(country: string) {
    const countryElement = country['value'];
    console.log(countryElement)
    console.log(this.countrys)
    this.geo.forEach(geoelement => {
      // const place_dep = geoelement['City'];
      // if (this.countrys.includes(countryElement) && !this.place_deps.includes(place_dep)) {
      //   this.place_deps.push(place_dep);
      // }

      // if (!this.countrys.includes(countryElement) ) {
      //   console.log(geoelement);
      // }
    });
  }
}
