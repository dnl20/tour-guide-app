import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { GeoData } from '../../models/route';

@Component({
  selector: 'trm-route-creator-map',
  templateUrl: './route-creator-map.component.html',
  styleUrls: ['./route-creator-map.component.css']
})
export class RouteCreatorMapComponent implements OnInit, ControlValueAccessor {
  form: FormGroup;
  propagateChange = Function;
  propagateTouched = Function;

  public lat: Number = 24.799448;
  public lng: Number = 120.979021;
  public zoom: Number = 14;

  public dir = undefined;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      latitude_dep: '',
      longitude_dep: '',
      latitude_arr: '',
      longitude_arr: ''
    });
    this.form.valueChanges
    .subscribe(value => {
      this.propagateChange(value);
      this.getDirection(value);
    });
  }


  getDirection(coordinates: GeoData) {
    console.log(coordinates);
    this.dir = {
      origin: { lat: 24.799448, lng: 120.979021 },
      destination: { lat: 24.799524, lng: 120.975017 }
    }
  }

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
