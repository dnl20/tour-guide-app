import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactsMaterialModule } from './contacts-material.module';

import { ContactsAppComponent } from './app.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';

import { ContactsService } from './contacts.service';

import { APP_ROUTES } from './app.routes';
import { API_ENDPOINT } from './app.tokens';
import { ContactsDetailViewComponent } from './contacts-list/contacts-detail-view/contacts-detail-view.component';
import { TabsComponent } from './tabs/tabs/tabs.component';
import { TabComponent } from './tabs/tab/tab.component';
import { EventBusServiceService } from './services/event-bus-service.service';
import { ContactsCreatorComponent } from './contacts-creator/contacts-creator.component';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { EmailAvailabilityValidatorDirective } from './directives/email-availability-validator.directive';
import { AddressInputComponent } from './contacts-creator/address-input/address-input.component';
import { ContactsDashboardComponent } from './contacts-dashboard/contacts-dashboard.component';
import { RouteDashboardComponent } from './route-dashboard/route-dashboard.component';
import { RouteOverviewComponent } from './route-overview/route-overview.component';
import { RouteSearchComponent } from './route-overview/route-search/route-search.component';
import { RouteOverviewContentComponent } from './route-overview/route-overview-content/route-overview-content.component';
import { RouteCreatorComponent } from './route-creator/route-creator.component';
import { RouteCreatorInputcardComponent } from './route-creator/route-creator-inputcard/route-creator-inputcard.component';
import { RouteCreatorMapComponent } from './route-creator/route-creator-map/route-creator-map.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { RoutesService } from './routes.service';
import { RouteDetailComponent } from './route-detail/route-detail.component';
import { RResolver } from './shared/routes.resolver';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    ContactsAppComponent,
    ContactsListComponent,
    ContactsDetailComponent,
    ContactsEditorComponent,
    ContactsDetailViewComponent,
    TabsComponent,
    TabComponent,
    ContactsCreatorComponent,
    EmailValidatorDirective,
    EmailAvailabilityValidatorDirective,
    AddressInputComponent,
    ContactsDashboardComponent,
    RouteDashboardComponent,
    RouteOverviewComponent,
    RouteSearchComponent,
    RouteOverviewContentComponent,
    RouteCreatorComponent,
    RouteCreatorInputcardComponent,
    RouteCreatorMapComponent,
    StarRatingComponent,
    RouteDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ContactsMaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot(APP_ROUTES, {
      // preloadingStrategy: PreloadAllModules // preloads all lazy modules at the beginning.
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAa74U6p6t1Zq2N8Ta4wMv5HIO9ZW63_9g'
    })
  ],
  providers: [
    ContactsService,
    RoutesService,
    { provide: API_ENDPOINT, useValue: 'http://localhost:4201/api' },
    EventBusServiceService,
    Title,
    {
      provide: 'ConfirmNavigationGuard',
      useValue: doConfirm
    },
    RResolver
  ],
  bootstrap: [ContactsAppComponent]
})
export class ContactsModule {

}

// Needs to be an exported function for AOT to work
export function doConfirm(component) {
  return !component.warnOnClosing || window.confirm('Navigate away without saving?');
}
