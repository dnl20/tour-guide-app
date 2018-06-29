import { Routes } from '@angular/router';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';
import { ContactsDetailViewComponent } from './contacts-list/contacts-detail-view/contacts-detail-view.component';
import { ContactsCreatorComponent } from './contacts-creator/contacts-creator.component';
import { ContactsDashboardComponent } from './contacts-dashboard/contacts-dashboard.component';
import { AboutComponent } from './about/about.component';
import { ContactResolver } from './shared/contacts.resolver';
import { RouteDashboardComponent } from './route-dashboard/route-dashboard.component';
import { RouteOverviewComponent } from './route-overview/route-overview.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: RouteDashboardComponent,
    children: [
      { path: '', component: RouteOverviewComponent },
      // { path: 'contact/new', component: ContactsCreatorComponent, canDeactivate: ['ConfirmNavigationGuard'] },
      // { path: '', redirectTo: 'contact/0', pathMatch: 'full' },
      // {
      //   path: 'contact/:id',
      //   component: ContactsDetailViewComponent,
      //   resolve: {
      //     contact: ContactResolver
      //   }
      // },
      // {
      //   path: 'contact/:id/edit',
      //   component: ContactsEditorComponent,
      //   canDeactivate: ['ConfirmNavigationGuard'/** executed in order **/],
      //   resolve: {
      //     contact: ContactResolver
      //   }
      // }
    ]
  },
  { path: 'about', loadChildren: './about/about.module#AboutModule' },
  { path: '**', redirectTo: '/' }
];

