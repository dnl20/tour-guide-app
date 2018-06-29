import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StarRatingColor } from '../../star-rating/star-rating.component';

@Component({
  selector: 'trm-route-creator-inputcard',
  templateUrl: './route-creator-inputcard.component.html',
  styleUrls: ['./route-creator-inputcard.component.css']
})
export class RouteCreatorInputcardComponent implements OnInit {
  activity = new FormControl();
  activityList: string[] = ['Hiking', 'Cycling', 'Running', 'Skating', 'Mountaineering', 'Tomato'];

  rating = 1;
  starCount = 5;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;

  constructor() { }

  ngOnInit() {
  }

  onRatingChanged(rating) {
    this.rating = rating;
  }

}
