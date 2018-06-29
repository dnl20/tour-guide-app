import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import { COUNTRIES_DATA } from '../../data/countries-data';
import { Address } from '../../models/contact';

@Component({
  selector: 'trm-address-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddressInputComponent,
      multi: true
    }
  ],
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.css']
})
export class AddressInputComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  propagateChange: Function;
  propagateTouched: Function;

  addressForm: FormGroup;
  countries = COUNTRIES_DATA;
  constructor(private fb: FormBuilder) {

  }
  ngOnInit() {
    this.addressForm = this.fb.group({
      street: [''],
      zip: [''],
      city: [''],
      country: ['']
    });


  }

  ngAfterViewInit() {
    this.addressForm.valueChanges
      .subscribe(value => this.propagateChange(value));
  }

  writeValue(address: Address) {
    this.addressForm.setValue(address);
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    this.propagateTouched = fn;
  }
}
