import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { StarRatingColor } from '../../star-rating/star-rating.component';

@Component({
  selector: 'trm-route-creator-inputcard',
  templateUrl: './route-creator-inputcard.component.html',
  styleUrls: ['./route-creator-inputcard.component.css']
})
export class RouteCreatorInputcardComponent implements OnInit {
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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      //[initialValue, [syncValidator], [asyncValidator]]
      name: ['', [Validators.required, Validators.minLength(3)]],
      country: ['', [Validators.required, Validators.minLength(3)]],
      place: ['', [Validators.required, Validators.minLength(3)]],
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

  save(newRoute: any) {
    console.log(newRoute);
    // this.contactsService.addContact(contact)
    //   .subscribe(() => this.router.navigate(['/']));
  }
}
