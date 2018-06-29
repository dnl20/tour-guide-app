import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatNativeDateModule,
  MatRadioModule,
  MatTabsModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatGridListModule
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatTabsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatGridListModule
  ]
})
export class ContactsMaterialModule {}
