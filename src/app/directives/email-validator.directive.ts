import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

export function validateEmail(c: FormControl) {
  const VALID_EMAIL = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  return (VALID_EMAIL.test(c.value) || c.value === '') ? null :
    {
      validateEmail: { valid: true }
    };
}

export function otherValidateEmailCustom(c: FormControl) {
  const VALID_EMAIL = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  return (VALID_EMAIL.test(c.value) || c.value === '') ?
    {
      validateEmail: { valid: true }
    } : null;
}

@Directive({
  selector: '[trmValidateEmail][ngModel]',
  providers: [
    // Multi-Provider fügen values zu dem Service hinzu der mit dem Token an einem Provide rangefragt wird. 
    // Sowas wie ServiceValidationArray.push(something). Wir bekommen immer die Liste von registrierten values.
    { provide: NG_VALIDATORS, useValue: validateEmail, multi: true }
  ]
})

export class EmailValidatorDirective {

}

