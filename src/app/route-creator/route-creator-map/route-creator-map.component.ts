import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'trm-route-creator-map',
  templateUrl: './route-creator-map.component.html',
  styleUrls: ['./route-creator-map.component.css']
})
export class RouteCreatorMapComponent implements OnInit {
  // public lat: number = 24.799448;
  // public lng: number = 120.979021;

  // public origin: {};
  // public destination: {};
  public lat: Number = 24.799448;
  public lng: Number = 120.979021;
  public zoom: Number = 14;
  
  public dir = undefined;

  constructor() { }

  ngOnInit() {
    // this.getDirection();
  }

  
  getDirection() {
    console.log('bla')
    this.dir = {
      origin: { lat: 24.799448, lng: 120.979021 },
      destination: { lat: 24.799524, lng: 120.975017 }
    }
  }

}
