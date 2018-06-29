import { GENDER } from '../data/gender';
import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contact } from '../models/contact';
import { Router } from '@angular/router';
import { EventBusServiceService } from '../services/event-bus-service.service';
import { COUNTRIES_DATA } from '../data/countries-data';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailAvailabilityValidatorDirective } from '../directives/email-availability-validator.directive';
import { validateEmail } from '../directives/email-validator.directive';

@Component({
  selector: 'trm-contacts-creator',
  templateUrl: './contacts-creator.component.html',
  styleUrls: ['./contacts-creator.component.css']
})
export class ContactsCreatorComponent implements OnInit {
  genders = GENDER;
  countries = COUNTRIES_DATA;

  checkEmailAvailability = EmailAvailabilityValidatorDirective.checkEmailAvailability(this.contactsService);
  validEmail = validateEmail;

  constructor(private contactsService: ContactsService, private router: Router,
    private eventBusService: EventBusServiceService, private fb: FormBuilder) { }

  form: FormGroup;

  ngOnInit() {
    this.eventBusService.emit('appTitleChange', 'New Contact');
    this.form = this.fb.group({
      // [initialValue, [syncValidators], [asyncValidators]]
      name: ['', [Validators.required, Validators.minLength(3)] /**, SyncValidators, AsyncValidators**/],
      email: ['', [this.validEmail], [this.checkEmailAvailability]],
      birthday: [''],
      phone: this.fb.array(['']),
      website: [''],
      address: [{  // With own formControls who implements ControlValueAccessor form fb.group(...). You can also define sync and async validators.
        street: [''],
        zip: [''],
        city: [''],
        country: ['']
      }]
    });
  }

  addPhoneField() {
    const control = <FormArray>this.form.get('phone');
    control.push(new FormControl(''));
  }

  removePhoneField(index) {
    const control = <FormArray>this.form.get('phone');
    control.removeAt(index);
  }

  save(formValue: Contact) {
    this.contactsService.addContact(formValue).subscribe(() => this.router.navigate(['/']));
  }
}
