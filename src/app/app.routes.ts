import { Routes } from '@angular/router';
import { RouteDashboardComponent } from './route-dashboard/route-dashboard.component';
import { RouteOverviewComponent } from './route-overview/route-overview.component';
import { RouteCreatorComponent } from './route-creator/route-creator.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: RouteDashboardComponent,
    children: [
      { path: '', component: RouteOverviewComponent },
      { path: 'creator', component: RouteCreatorComponent }
    ]
  },
  { path: '**', redirectTo: '/' }
];

