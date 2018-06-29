import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'trm-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css']
})
export class RouteDetailComponent implements OnInit {

  @Input() route: Route;
  @Output() edit = new EventEmitter<any>();
  @Output() back = new EventEmitter<any>();

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.data
        .pipe(map(data => data['route']))
        .subscribe(route => this.route = route);

    this.back.subscribe( () => this.router.navigate(['']));
  }

}
