import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'trm-route-creator-map',
  templateUrl: './route-creator-map.component.html',
  styleUrls: ['./route-creator-map.component.css']
})
export class RouteCreatorMapComponent implements OnInit {
  public lat: number = 24.799448;
  public lng: number = 120.979021;

  public origin: {};
  public destination: {};

  constructor() { }

  ngOnInit() {
    this.getDirection();
  }

  getDirection() {
    this.origin = { lat: 24.799448, lng: 120.979021 }
    this.destination = { lat: 24.799524, lng: 120.975017 }
   
    // this.origin = 'Taipei Main Station'
    // this.destination = 'Taiwan Presidential Office'
  }

}
