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
    MatProgressSpinnerModule
  ]
})
export class ContactsMaterialModule {}
