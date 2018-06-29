import { Routes } from '@angular/router';
import { RouteDashboardComponent } from './route-dashboard/route-dashboard.component';
import { RouteOverviewComponent } from './route-overview/route-overview.component';
import { RouteCreatorComponent } from './route-creator/route-creator.component';
import { RouteDetailComponent } from './route-detail/route-detail.component';
import { RResolver } from './shared/routes.resolver';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: RouteDashboardComponent,
    children: [
      { path: '', component: RouteOverviewComponent },
      { path: 'creator', component: RouteCreatorComponent },
      {
        path: 'route/:id', component: RouteDetailComponent,
        resolve: {
          route: RResolver
        }
      }
    ]
  },
 // { path: 'about', loadChildren: './about/about.module#AboutModule' },
 { path: 'about', loadChildren: './aboutOnGoing/about.module#AboutModule' },
  { path: '**', redirectTo: '/' }
];

