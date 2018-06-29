import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'mat-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingComponent implements OnInit {

  @Input('rating') private rating: number;
  @Input('ratingtype') private ratingtype: string;
  @Input('starCount') private starCount: number;
  @Input('color') private color: string;
  @Input('ratingElements') private ratingElements: any;

  @Output() private ratingUpdated = new EventEmitter();
  private snackBarDuration = 2000;

  constructor(private snackBar: MatSnackBar) {
  }


  ngOnInit() { }

  onClick(rating: number) {
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number, ratintype: string) {
    if (this.ratingtype === 'star') {
      if (this.rating >= index + 1) {
        return 'star';
      } else {
        return 'star_border';
      }
    } else {
      if (this.rating >= index + 1) {
        return 'fitness_center';
      } else {
        return 'remove';
      }
    }
  }

}

export enum StarRatingColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn'
}
