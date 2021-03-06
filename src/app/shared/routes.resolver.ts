import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { RoutesService } from "../routes.service";
import { Route } from "../models/route";

@Injectable()
export class RResolver implements Resolve<Route> {

  constructor(private routesService: RoutesService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.routesService
      .getRoute(route.paramMap.get('id'));
  }
}
