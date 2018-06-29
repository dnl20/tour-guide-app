import { Directive } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { NG_ASYNC_VALIDATORS, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[trmCheckEmailAvailability]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: EmailAvailabilityValidatorDirective,
      multi: true
    }
  ]
})
export class EmailAvailabilityValidatorDirective {
  _validate: Function;
  constructor(private contactService: ContactsService) {
    this._validate = EmailAvailabilityValidatorDirective.checkEmailAvailability(contactService);
  }

  static checkEmailAvailability(contactsService: ContactsService) {
    return (c: FormControl) => {
      return contactsService.isEmailAvailable(c.value)
        .pipe(map(response => !response.error ? null : {
          emailTaken: true
        }));
    };
  }

  validate(c: FormControl) {
    return this._validate(c);
  }
}
