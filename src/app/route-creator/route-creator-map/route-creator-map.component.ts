import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'trm-route-creator-map',
  templateUrl: './route-creator-map.component.html',
  styleUrls: ['./route-creator-map.component.css']
})
export class RouteCreatorMapComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;
  constructor() { }

  ngOnInit() {
  }

}
